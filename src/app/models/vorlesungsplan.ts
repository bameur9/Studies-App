import { Data } from "@angular/router";

export interface Vorlesungsplan {
  Description?: string;
  EndTime?: Date;
  EndTimezone?: any;
  Id?: number;
  IsAllDay?: false;
  Location?: string;
  RecurrenceRule?: string;
  StartTime?: Date;
  StartTimezone?: any;
  Subject: string;
}


