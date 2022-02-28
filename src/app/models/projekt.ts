export interface Projekt {
  id?:number;
  thema:string;
  startTime: Date;
  endTime: Date;
  gruPpeMitglieder?:string[];
}
