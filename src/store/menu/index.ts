import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'

@Module({ namespacedPath: 'menu/' })
export class MenuModule extends VuexModule {
  @getter hideMobileNav = false
  @getter userMenu: object[] = [
    {
      id: '1',
      category: 'User',
      items: [
        {
          id: '1.1',
          name: 'Packages',
          icon: 'box-open',
          target: 'UserPackages'
        },
        {
          id: '1.2',
          name: 'Providers',
          icon: 'user-tie',
          target: 'Providers'
        },
        {
          id: '1.3',
          name: 'Users',
          icon: 'users',
          target: 'UserAccounts'
        },
        {
          id: '1.4',
          name: 'vTokens',
          icon: 'coins',
          target: 'Tokens'
        },
        {
          id: '1.5',
          name: 'FAQ',
          icon: 'question-circle',
          target: 'faq'
        }
      ]
    }
  ]
  @getter providerMenu: object[] = [
    {
      id: '2',
      category: 'Provider',
      items: [
        {
          id: '2.1',
          name: 'Dashboard',
          icon: 'home',
          target: 'ProviderHome'
        },
        {
          id: '2.2',
          name: 'Claim',
          icon: 'info-circle',
          target: 'ProviderAbout'
        }
      ]
    }
  ]
  private activeEntry: any = {
    category: undefined,
    firstLvl: undefined,
    secondLvl: undefined,
    thirdLvl: undefined,
    toIgnore: 0
  }

  @mutation setActiveMenu(id: string) {
    if (this.activeEntry.toIgnore === 0) {
      const levels = ['category', 'firstLvl', 'secondLvl', 'thirdLvl']
      const itemId = id.split('.')
      for (let i = 0; i < 4; i++) {
        this.activeEntry[levels[i]] = itemId[i]
      }
      this.activeEntry.toIgnore = itemId.length - 2
    } else {
      this.activeEntry.toIgnore -= 1
    }
  }

  @mutation setMobileNav(data: boolean) {
    this.hideMobileNav = data
  }

  get activeMenuId() {
    const levels = ['category', 'firstLvl', 'secondLvl', 'thirdLvl']
    let itemId = []
    for (let i = 0; i < 4; i++) {
      if (this.activeEntry[levels[i]]) {
        itemId.push(this.activeEntry[levels[i]])
      }
    }
    return itemId
  }
}
export const menu = MenuModule.ExtractVuexModule(MenuModule)
