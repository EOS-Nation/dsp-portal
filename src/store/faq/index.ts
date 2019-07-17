import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'

@Module({ namespacedPath: 'faq/' })
export class faqModule extends VuexModule {
  @getter faqEn = [
    {
      categoryTitle: 'General',
      subCategory: [
        {
          subCategoryTitle: 'DAPP Network',
          subCategoryDesc: 'Description for sub category goes here.',
          questionsAnswers: [
            {
              question: 'What is a Dapp Service Provider (DSP)?',
              answer:
                'Any individual or entity can become a DSP. DSPs maintain complete autonomy over all aspects of their operation. Each DSP can offer customized data packages accompanied by predefined terms determined by the DSP.'
            },
            {
              question: 'What is a Package?',
              answer:
                'A package is provided by a DSP and includes: a service, a quota, a minimum stake, a package period and an unstake period.'
            },
            {
              question: 'What is a Service',
              answer:
                'A service is offered by DSPs to dapp developers allowing off-chain processing with on-chain integrity. Access to IPFS storage, executing cron jobs, querying an oracle and DAPP staking services are current examples of services provided by DSPs.'
            },
            {
              question: 'What are DAPP tokens?',
              answer:
                'The Dapp Network native token, known as DAPP, is a multi-purpose utility token designed to power an ecosystem of utilities, resources, and services specifically serving the needs of dapp developers building user centric dapps.'
            },
            {
              question: 'What are DAPPHDL tokens?',
              answer:
                'The Air-HODLed DAPP tokens (DAPPHDL) will be distributed on a block by block basis, matching up to a maximum of 3 million EOS per account. The tokens will be continuously vested on a block to block basis over a period of 2 years, so the complete withdrawal will only be possible at the end of this period. These 2 years began as soon as the DAPP Generation Event was launched. Any Pioneer Holder choosing to withdraw the Air-HODLed tokens before the end of those 2 years will only receive the vested portion (i.e. 50% of the distributed DAPP tokens will be vested after 1 year). The remainder of their unvested DAPP tokens will be distributed to Pioneer Holders who are still holding their Air-HODL DAPP tokens. HODLers are allowed to stake their vested Air-HODLed tokens immediately using our new staking mechanics. Withdrawing the tokens will transfer the vested tokens to their DAPP account, forfeiting the unvested portion to be redistributed amongst remaining eligible participants.'
            },
            {
              question: 'What are vTokens?',
              answer:
                'vTokens are tokens distributed to EOS public network accounts via the DAPP Network’s vRAM offering. The vTokens tab allows you to look up the balance of those tokens, something that many EOS block explorers currently do not offer.'
            }
          ]
        },
        {
          subCategoryTitle: 'DSP Portal',
          subCategoryDesc: 'Description for sub category goes here.',
          questionsAnswers: [
            {
              question: 'Why the need for a DSP Portal?',
              answer:
                'The EOS Nation DSP Portal provides a user-friendly way to access to all services offered by all DPSs in a random, unbiased order. Services are listed by lists or icons depending on your preference.'
            }
          ]
        }
      ]
    },
    {
      categoryTitle: 'Packages',
      subCategory: [
        {
          subCategoryTitle: 'Getting Started',
          subCategoryDesc: 'Description for sub category goes here.',
          questionsAnswers: [
            {
              question: 'Select a Package',
              answer:
                'Using the same account, you can (1) select different packages from different DSPs (select 2 different oracle packages from 2 different DSPs), (2) select different package service types from the same DSP (select cron + oracle packages from the same DSP), (3) select only 1 package service type per DSP ( can not select multiple oracle services from the same DSP)'
            },
            {
              question: 'Stake and Unstake DAPP or DAPPHDL',
              answer:
                'In order to use a DSP service, you must first stake the minimum amount of DAPP (or DAPPHDL) required by the DSP package. You can unstake your tokens once you no longer wish to use the DSP service.'
            },
            {
              question: 'Refund Required',
              answer:
                'In some rare cases staked Tokens are not automatically refunded after the unstake period has passed. If unstake period has passed but Tokens have not been refunded to your account, you will need to request a refund to regain access to your tokens by using the Refund Action.'
            },
            {
              question: 'Close a Package',
              answer:
                'After unstaking and refunding your tokens, closing your current package which will allow you to select a different one from any DSP of your choosing.'
            },
            {
              question: 'What does QUOTA mean?',
              answer:
                'Quota refers to the amount of transactions allowed per package period.  A quota of 1 allows 10,000 actions per package period.'
            },
            {
              question: 'What does Minimum Stake mean?',
              answer:
                'This is the minimum amount of DAPP tokens that needs to be staked to the DSP in order to receive services. NOTE: staking less then the minimum required for a service is possible but would not allow you to use the services offered by the package.'
            },
            {
              question: 'Package Period',
              answer: 'The time period until your quota is refreshed.'
            },
            {
              question: 'Unstake Period',
              answer:
                'The amount of time required when unstaking your DAPP tokens from the DSP.'
            }
          ]
        },
        {
          subCategoryTitle: 'Status',
          subCategoryDesc: 'Description for sub category goes here.',
          questionsAnswers: [
            {
              question: 'Available',
              answer: 'Online services currently being offered.'
            },
            {
              question: 'Selected',
              answer:
                'Service Package you’ve selected and ready to communicated with.'
            },
            {
              question: 'Deprecated',
              answer:
                'Packages that are no longer available as the API endpoints are set to null.'
            },
            {
              question: 'Active',
              answer:
                'You are currently staking to this package and have access to the service.'
            },
            {
              question: 'Pending',
              answer:
                'You have selected the service package but have not reached the minimum stake quantity yet.'
            },
            {
              question: 'Low Stake',
              answer:
                'You are under the minimum stake required and cannot access the service.'
            },
            {
              question: 'Depleted',
              answer:
                'You have used up all the actions allocated in your quota and must wait for your package period to end for your quota to be refreshed.'
            }
          ]
        }
      ]
    },
    {
      categoryTitle: 'Services',
      subCategory: [
        {
          subCategoryTitle: 'Definitions',
          subCategoryDesc: 'Description for sub category goes here.',
          questionsAnswers: [
            {
              question: 'IPFS',
              answer:
                'Allows users to store data off-chain on the Inter Planetary File System (IPFS) while retaining on-chain integrity of the data.'
            },
            {
              question: 'Cron',
              answer: 'Allows a user to perform cron jobs.'
            },
            {
              question: 'Oracle',
              answer: 'Allows a user to maintain an oracle service.'
            },
            {
              question: 'Stake',
              answer:
                'Allows the user to collect a % of the inflation rewards earned by that DSP.'
            }
          ]
        }
      ]
    }
  ]
}
export const faq = faqModule.ExtractVuexModule(faqModule)
