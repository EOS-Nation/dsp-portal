import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'
import lynx from 'eos-transit-lynx-provider'
import ledger from 'eos-transit-ledger-provider'
import tp from 'eos-transit-tokenpocket-provider'
import meetone from 'eos-transit-meetone-provider'
import whalevault from 'eos-transit-whalevault-provider'
import keycat from 'eos-transit-keycat-provider'

export const accessContext = initAccessContext({
  appName: 'DSP Portal',
  network: {
    host: 'nodes.get-scatter.com',
    // host: 'kylin.eoscanada.com',
    port: 443,
    protocol: 'https',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
  },
  walletProviders: [
    scatter(),
    lynx(),
    ledger(),
    tp(),
    meetone(),
    whalevault(),
    keycat()
  ]
})
