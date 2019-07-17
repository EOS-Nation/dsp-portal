import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import i18n from '@/i18n'

@Module({ namespacedPath: 'core/' })
export class CoreModule extends VuexModule {
  @getter language: string = 'en'
  @getter tableView = true
  @getter showSearch = false
  @getter isMobile = false
  @getter settings = {
    autoLogin: true,
    onlyErrorAlerts: false,
    txDelay: false,
    txDelaySec: 0,
    darkMode: false,
    showLangSelect: true
  }

  // Get / Set Language from Browser/LocaleStorage
  // or
  // Set Language from user input
  @mutation setLanguage(lang: string | null) {
    if (lang) {
      this.language = i18n.locale = lang
      localStorage.setItem('language', lang)
    } else {
      let userLang: string | null = localStorage.getItem('language')
      if (userLang) {
        this.language = i18n.locale = userLang
      } else {
        let browserLang = navigator.language.split('-')[0]
        this.language = i18n.locale = browserLang
        localStorage.setItem('language', browserLang)
      }
    }
  }

  @mutation setTableView(data: boolean) {
    this.tableView = data
  }

  @mutation setShowSearch(data: boolean) {
    this.showSearch = data
  }

  @mutation setIsMobile(data: boolean) {
    this.isMobile = data
    this.tableView = !data
  }

  @mutation setSingleSetting(data: any) {
    Reflect.set(this.settings, data.key, data.value)
    localStorage.setItem('settings', JSON.stringify(this.settings))
  }

  @mutation setSettings(data: any) {
    this.settings = JSON.parse(data)
  }
}
export const core = CoreModule.ExtractVuexModule(CoreModule)
