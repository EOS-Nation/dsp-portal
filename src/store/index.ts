import Vue from 'vue'
import Vuex from 'vuex'

import { core, CoreModule } from './core'
import { menu, MenuModule } from './menu'
import { transit, TransitModule } from './transit'
import { alerts, AlertsModule } from './alerts'
import { dappservices, dappservicesModule } from './dappservices'
import { packages, PackagesModule } from './packages'
import { user, userModule } from './user'
import { modals, modalsModule } from './modals'
import { jsondb, jsondbModule } from './jsondb'
import { faq, faqModule } from './faq'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    core,
    menu,
    transit,
    alerts,
    dappservices,
    packages,
    user,
    modals,
    jsondb,
    faq
  },
  strict: process.env.NODE_ENV !== 'production'
})

export const vxm = {
  core: CoreModule.CreateProxy(store, CoreModule) as CoreModule,
  menu: MenuModule.CreateProxy(store, MenuModule) as MenuModule,
  transit: TransitModule.CreateProxy(store, TransitModule) as TransitModule,
  alerts: AlertsModule.CreateProxy(store, AlertsModule) as AlertsModule,
  dappservices: dappservicesModule.CreateProxy(
    store,
    dappservicesModule
  ) as dappservicesModule,
  packages: PackagesModule.CreateProxy(store, PackagesModule) as PackagesModule,
  user: userModule.CreateProxy(store, userModule) as userModule,
  modals: modalsModule.CreateProxy(store, modalsModule) as modalsModule,
  jsondb: jsondbModule.CreateProxy(store, jsondbModule) as jsondbModule,
  faq: faqModule.CreateProxy(store, faqModule) as faqModule
}
