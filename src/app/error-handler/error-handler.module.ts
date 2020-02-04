import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorHandlerComponent} from '../error-handler/error-handler.component';



@NgModule({
  declarations: [ErrorHandlerComponent],
  imports: [
    CommonModule
  ], exports: [ErrorHandlerComponent]
})
export class ErrorHandlerModule { }
