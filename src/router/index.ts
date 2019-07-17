import Vue from 'vue'
import Router from 'vue-router'
import UserIndex from '@/views/user/UserIndex.vue'
import UserWelcome from '@/views/user/UserWelcome.vue'
import UserPackages from '@/views/user/UserPackages.vue'
import AccountsAll from '@/components/accounts/AccountsAll.vue'
import Providers from '@/views/user/Providers.vue'
import PkgDetails from '@/views/user/PkgDetails.vue'
import UserDetails from '@/views/user/UserDetails.vue'
import PrvDetails from '@/views/user/PrvDetails.vue'
import UserAccounts from '@/views/user/UserAccounts.vue'
import Settings from '@/views/user/UserSettings.vue'
import UserTokens from '@/views/user/UserTokens.vue'
import UserFaq from '@/views/user/UserFaq.vue'
import PrivacyPolicy from '@/views/legal/PrivacyPolicy.vue'
import ServiceTerms from '@/views/legal/ServiceTerms.vue'
import Statistics from '@/views/user/Statistics.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '*',
      redirect: {
        name: 'UserPackages'
      }
    },
    {
      path: '/',
      component: UserIndex,
      children: [
        {
          path: '',
          name: 'Welcome',
          component: UserWelcome
        },
        {
          path: 'packages',
          name: 'UserPackages',
          component: UserPackages
        },
        {
          path: 'packages/:id',
          name: 'PkgDetails',
          component: PkgDetails,
          props: true
        },
        {
          path: 'accounts',
          component: UserAccounts,
          children: [
            {
              path: '',
              name: 'UserAccounts',
              component: AccountsAll
            },
            {
              path: ':account',
              name: 'AccountDetails',
              component: UserDetails,
              props: true
            }
          ]
        },
        {
          path: 'providers',
          name: 'Providers',
          component: Providers
        },
        {
          path: 'providers/:provider',
          name: 'PrvDetails',
          component: PrvDetails,
          props: true
        },
        {
          path: 'tokens',
          name: 'Tokens',
          component: UserTokens
        },
        {
          path: 'statistics',
          name: 'Statistics',
          component: Statistics
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
          props: true
        },
        {
          path: 'faq',
          name: 'faq',
          component: UserFaq
        },
        {
          path: 'privacy-policy',
          name: 'PrivacyPolicy',
          component: PrivacyPolicy
        },
        {
          path: 'terms-of-service',
          name: 'ServiceTerms',
          component: ServiceTerms
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    next()
  } else {
    next()
  }
})

export default router
