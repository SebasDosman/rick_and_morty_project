import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Tab5Page } from './tab5.page';
import { Tab5PageRoutingModule } from './tab5-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    Tab5PageRoutingModule
  ],
  declarations: [Tab5Page]
})
export class Tab5PageModule {}
