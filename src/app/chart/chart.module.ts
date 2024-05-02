import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './chart.component';
import { ChartRoutingModule } from './chart-routing.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartService } from './chart.service';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    ChartsModule
  ],
  providers:[
    ChartService,
  ]
})
export class ChartModule { }
