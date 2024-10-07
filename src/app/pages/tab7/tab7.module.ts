import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Tab7Page } from './tab7.page';
import { Tab7PageRoutingModule } from './tab7-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    Tab7PageRoutingModule
  ],
  declarations: [Tab7Page]
})
export class Tab7PageModule {}
