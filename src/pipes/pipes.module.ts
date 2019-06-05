import { NgModule } from '@angular/core';
import { QuestionableBooleanPipe } from './questionable-boolean/questionable-boolean';
import { DateFormatPipe } from './date-format/date-format';
import { SecurePipe } from './secure/secure';
import { NewLinePipe } from './new-line/new-line';
@NgModule({
    declarations: [QuestionableBooleanPipe,
    DateFormatPipe,
    SecurePipe,
    NewLinePipe,
    ],
	imports: [],
	exports: [QuestionableBooleanPipe,
    DateFormatPipe,
    SecurePipe,
    NewLinePipe,
    ]
})
export class PipesModule {
	static forRoot() {
      return {
          ngModule: PipesModule,
          providers: [],
      };
   }
}
