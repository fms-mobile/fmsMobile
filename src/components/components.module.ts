import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BastbTree01ComponentModule } from './bastb-tree01/bastb-tree01.module';
@NgModule({
	declarations: [],
	imports: [
		BastbTree01ComponentModule,
	],
	exports: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
