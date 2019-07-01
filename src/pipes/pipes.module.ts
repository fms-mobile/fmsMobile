import { NgModule } from '@angular/core';
import { QuestionableBooleanPipe } from './questionable-boolean/questionable-boolean';
import { DateFormatPipe } from './date-format/date-format';
import { SecurePipe } from './secure/secure';
import { NewLinePipe } from './new-line/new-line';
import { CodeListEscapePipe } from './code-list-escape/code-list-escape';
import { HTMLEscapeUnescapeModule } from 'html-escape-unescape'

@NgModule({
    declarations: [QuestionableBooleanPipe,
    DateFormatPipe,
    SecurePipe,
    NewLinePipe,
    CodeListEscapePipe,
    ],
	imports: [HTMLEscapeUnescapeModule,],
	exports: [QuestionableBooleanPipe,
    DateFormatPipe,
    SecurePipe,
    NewLinePipe,
    CodeListEscapePipe,
    HTMLEscapeUnescapeModule,
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
