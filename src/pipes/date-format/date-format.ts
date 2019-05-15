import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import 'moment/locale/ko';

/**
 * Generated class for the DateFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateFormatPipe',
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  	constructor(){
		super("ko");
	}

	superTransform(value: any, format?: string, timezone?: string, locale?: string): string | null {
		return super.transform(value, format, timezone, locale);
	}


	/**
	 * Takes a value and makes it lowercase.
	 */
	transform(value: any, ...args): any {
		let fromFormat = args[0];
		let toFormat = args[1];

		let returnDate : Date = null;
		let returnString :string = '';

		if(fromFormat && toFormat) {
			try {
				returnDate = moment(value,fromFormat).toDate();
				returnString = super.transform(returnDate,toFormat);
			} catch (error) {
			}
		}
		return returnString;
	}

	returnDate(dateString: string, formatString:string) : Date {
		let returnDate : Date = null;
		try {
			returnDate = moment(dateString,formatString).toDate();
		} catch (error) {
			
		}
		return returnDate;
	}
}
