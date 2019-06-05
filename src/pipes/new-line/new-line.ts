import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NewLinePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'newLinePipe',
})
export class NewLinePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let type = args[0];

    switch (type) {
      case 'escape':
        return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
      case 'unescape':
        return value.replace(/(<br>|<br\/>|<br \/>)/g,'\r\n');
      case 'unescape_space':
        return value.replace(/(<br>|<br\/>|<br \/>)/g,' ');
      default:
        return value;
    }
  }
}
