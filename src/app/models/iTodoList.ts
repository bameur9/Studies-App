import { Todo } from "./todo";

export interface ItodoList{
  id?:number;
  name: string;
  liste: Todo[];
}
