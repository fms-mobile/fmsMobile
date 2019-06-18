import { NgModule } from '@angular/core';
import { QuestionableBooleanPipe } from './questionable-boolean/questionable-boolean';
import { DateFormatPipe } from './date-format/date-format';
import { SecurePipe } from './secure/secure';
import { NewLinePipe } from './new-line/new-line';
import { CodeListEscapePipe } from './code-list-escape/code-list-escape';
@NgModule({
    declarations: [QuestionableBooleanPipe,
    DateFormatPipe,
    SecurePipe,
    NewLinePipe,
    CodeListEscapePipe,
    ],
	imports: [],
	exports: [QuestionableBooleanPipe,
    DateFormatPipe,
    SecurePipe,
    NewLinePipe,
    CodeListEscapePipe,
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
