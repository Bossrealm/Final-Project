import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextPage } from './text';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    TextPage,
  ],
  imports: [
    IonicPageModule.forChild(TextPage),
    NgxErrorsModule
  ],
})
export class TextPageModule {}
