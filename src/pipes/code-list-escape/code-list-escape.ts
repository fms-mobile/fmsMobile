import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CodeListEscapePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'codeListEscape',
})
export class CodeListEscapePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    const srcStr = args[0];
    const trgStr = args[1];
    let returnStr = value;

    if(srcStr && trgStr){
      returnStr = returnStr.replace(srcStr,trgStr);
    }

    return returnStr;
  }
}
