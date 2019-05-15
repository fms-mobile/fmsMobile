import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the QuestionableBooleanPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'questionableBooleanPipe',
})
export class QuestionableBooleanPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: boolean): string {
    return value == true ? '예' : '아니오'
  };

}