import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable()
export class Globals {
  public locale: string = 'fr_FR';
  public currentWeek: string = formatDate(
    new Date().getTime(), 
    'ww', 
    this.locale
  );
}