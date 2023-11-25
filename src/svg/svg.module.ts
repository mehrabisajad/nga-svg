import { NgModule } from '@angular/core';

import { SvgDirective } from './svg.directive';

@NgModule({
  declarations: [SvgDirective],
  exports: [SvgDirective],
})
export class SvgModule {}
