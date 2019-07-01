import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BastbTree01ComponentModule } from './bastb-tree01/bastb-tree01.module';
import { SearchBoxComponentModule } from './search-box/search-box.module';
@NgModule({
	declarations: [],
	imports: [
		BastbTree01ComponentModule,
		SearchBoxComponentModule,
	],
	exports: [
		BastbTree01ComponentModule,
		SearchBoxComponentModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
