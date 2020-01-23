import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html'
})
export class ErrorHandlerComponent implements OnInit {
  @Input() loading = false
  @Input() error?: Error = null
  @Input() settings?: Settings = new Settings()
  constructor() { }

  ngOnInit() {
    if (!this.settings) this.settings = new Settings()
  }
}

export class Error {
  message: string
  type: ErrorType
  constructor(message?: string, type?: ErrorType) {
    this.message = message || 'Ups! An error occurred, please try again.'
    this.type = type || ErrorType.danger
  }
}

export enum ErrorType {
  primary = 'alert-primary',
  secondary = 'alert-secondary',
  success = 'alert-success',
  danger = 'alert-danger',
  warning = 'alert-warning',
  info = 'alert-info',
  light = 'alert-light',
  dark = 'alert-dark'
}

export class Settings {
  style?: LoadingStyle
  type?: LoadingType
  place?: LoadingPlace
  constructor(settings?: any) {
    this.setProperty('style', settings, LoadingStyle.border)
    this.setProperty('type', settings, LoadingType.primary)
    this.setProperty('place', settings, LoadingPlace.textCenter)
  }
  private setProperty(property: string, settings: Settings, defaultObj: any) {
    this[property] = settings && settings[property] ? settings[property] : defaultObj
  }
}

export enum LoadingStyle {
  border = 'spinner-border',
  grow = 'spinner-grow',
  borderSm = 'spinner-border spinner-border-sm',
  growSm = 'spinner-grow spinner-grow-sm'

}

export enum LoadingType {
  primary = 'text-primary',
  secondary = 'text-secondary',
  success = 'text-success',
  danger = 'text-danger',
  warning = 'text-warning',
  info = 'text-info',
  light = 'text-light',
  dark = 'text-dark'
}

export enum LoadingPlace {
  textLeft = 'text-left',
  textRight = 'text-right',
  textCenter = 'text-center'
}
