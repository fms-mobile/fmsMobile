import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

/**
 * Generated class for the SecurePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'securePipe',
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(url): Observable<SafeUrl> {
    return this.http
      .get(url, { responseType: 'blob' })
      .map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)));
  }
}
