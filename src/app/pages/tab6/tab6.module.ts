import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Tab6Page } from './tab6.page';
import { Tab6PageRoutingModule } from './tab6-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    Tab6PageRoutingModule
  ],
  declarations: [Tab6Page]
})
export class Tab6PageModule {}
