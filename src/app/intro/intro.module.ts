import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IntroPage } from './intro.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule
  ],
  declarations: [IntroPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
})
export class IntroPageModule {}
