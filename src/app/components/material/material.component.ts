import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Imaterial } from 'src/app/models/imaterial';
import { MaterialsService } from 'src/app/services/materials.service';
import { saveAs } from 'file-saver';
import { FileService } from 'src/app/services/file.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  public materialien : Imaterial[] =[];
  closeResult: string;

  public filenames: string[] = [];
  public isUploadBtn: boolean = true;
  public fileStatus = {status:'', requestType:'', percent: 0};

  constructor(private route: Router,
              private materialService: MaterialsService,
              private fileService: FileService,
              private modalService: NgbModal) {
  }


  ngOnInit(): void {
    this.materialien = this.materialService.getMaterialien();
  }

  save(material : Imaterial):void{
    let exist = false;
    this.materialien.forEach((m) => {
      if(m.subject !=material.subject){
        exist = false;
      }else{
        exist = true;
      }
    });

    if(!exist){
      material.files=[];
      this.materialService.addMaterial(material);
    }

    this.ngOnInit();
  }

  public openForRemove(content,m : Imaterial) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.removeModul(m);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  removeModul(m : Imaterial):void{
     this.materialService.deleteMaterial(m);
  }



  removeClick(i1: number, i2: number){
    this.materialService.deleteFile(i1,i2);
  }


  gotoHome():void{
    this.route.navigate(['/home']);
  }

  toggleSection(i:number):void{
    this.materialien[i].toggle = !this.materialien[i].toggle;
  }

  onUploadFiles(files: File[], i : number): void{
    const formData = new FormData();
    let materialByIndex = this.materialService.getMaterialien()[i];

    if( materialByIndex.files == null|| materialByIndex.files == undefined){
      this.materialService.getMaterialien()[i].files = [];
    }

    for(let file of files ){
      formData.append('files', file, file.name);
      this.materialService.addFile(i, file.name);
      //console.log(this.materialien);
    }

    this.fileService.upload(formData).subscribe(
      event => {
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      });
    }

    private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
      switch(httpEvent.type) {
        case HttpEventType.UploadProgress:
          this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
          break;
        case HttpEventType.DownloadProgress:
          this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Header returned', httpEvent);
          break;
        case HttpEventType.Response:
          if (httpEvent.body instanceof Array) {
            this.fileStatus.status = 'done';
            for (const filename of httpEvent.body) {
              this.filenames.unshift(filename);
            }
          } else {
            saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                    {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          }
          this.fileStatus.status = 'done';
          break;
          default:
            console.log(httpEvent);
            break;

      }
    }

      // define a function to download files
  onDownloadFiles(filename: string): void {
    this.fileService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

    private updateStatus(loaded: number, total: number, requestType: string): void {
      this.fileStatus.status = 'progress';
      this.fileStatus.requestType = requestType;
      this.fileStatus.percent = Math.round(100 * loaded / total);
    }


}

