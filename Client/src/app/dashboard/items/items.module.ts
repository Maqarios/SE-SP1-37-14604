import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ItemsRoutingModule } from './items-routing.module';
import { SmartTableComponent } from './smart-table/smart-table.component';


@NgModule({
  imports: [ThemeModule, ItemsRoutingModule],
  declarations: [SmartTableComponent],
  providers: []
})
export class ItemsModule {}
