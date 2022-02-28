import { IFile } from "./Files";

export interface Imaterial {
  id?:number;
  subject: string;
  files:string[];
  toggle:boolean;
}
