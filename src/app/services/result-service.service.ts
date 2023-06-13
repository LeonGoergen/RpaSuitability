import { Injectable } from '@angular/core';
import { resultTexts } from '../../assets/resultTexts';
import { resultInterface } from "../../assets/result-interface";

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentRanges: resultInterface[] = resultTexts;

  getContentByPercentage(percentage: number): resultInterface | null {
    return this.contentRanges.find(
      (range) => percentage >= range.min && percentage <= range.max
    ) || null;
  }
}
