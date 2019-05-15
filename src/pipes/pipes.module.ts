import { NgModule } from '@angular/core';
import { QuestionableBooleanPipe } from './questionable-boolean/questionable-boolean';
import { DateFormatPipe } from './date-format/date-format';
@NgModule({
    declarations: [QuestionableBooleanPipe,
    DateFormatPipe,
    ],
	imports: [],
	exports: [QuestionableBooleanPipe,
    DateFormatPipe,
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
