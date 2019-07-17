import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'

interface AlertPayload {
  show: boolean
  dismissible: boolean
  title: string
  message: string
  variant: string
  txId?: number
  dismissSecs?: number
  dismissCountDown?: number
}

@Module({ namespacedPath: 'alerts/' })
export class AlertsModule extends VuexModule {
  @getter alertState: AlertPayload = {
    show: false,
    dismissible: false,
    title: '',
    message: '',
    variant: ''
  }

  @mutation setAlert(alert: AlertPayload | null) {
    if (alert) {
      this.alertState = alert
    } else {
      this.alertState = {
        show: false,
        dismissible: false,
        title: '',
        message: '',
        variant: ''
      }
    }
  }
  @mutation countDownAlert(count: number) {
    if (this.alertState.dismissible) this.alertState.dismissCountDown = count
  }
}
export const alerts = AlertsModule.ExtractVuexModule(AlertsModule)
