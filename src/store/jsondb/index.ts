import {
  VuexModule,
  mutation,
  action,
  getter,
  Module
} from 'vuex-class-component'
import * as helper from '@/assets/_js/helpers'
import { Package } from 'dapp-client'

interface jsonData {
  error: boolean
  errorMsg: string
  data: {} | any
}

@Module({ namespacedPath: 'jsondb/' })
export class jsondbModule extends VuexModule {
  @getter pkgJsonDb: any = []
  @getter dspJsonDb: any = []

  @action getJsonData(url: string): any {
    return new Promise(resolve => {
      fetch(url)
        .then(response => {
          response
            .json()
            .then(data => {
              resolve({
                error: false,
                errorMsg: '',
                data: data
              })
            })
            .catch((error: any) => {
              resolve({
                error: true,
                errorMsg: error.toString(),
                data: {}
              })
            })
        })
        .catch(error => {
          resolve({
            error: true,
            errorMsg: error.toString(),
            data: {}
          })
        })
    })
  }

  @action async getPkgJson(pkg: Package) {
    let pkgJson = {
      id: pkg.id,
      provider: pkg.provider,
      pkgJson: {}
    }
    if (pkg.id) {
      let dbPkg = this.pkgJsonDb.find((p: any) => p.id === pkg.id)
      if (!dbPkg) {
        pkgJson.pkgJson = await this.getJsonData(pkg.package_json_uri)
        this.setPkgJson(pkgJson)
      } else {
        pkgJson = dbPkg
      }
    }
    return pkgJson.pkgJson
  }

  @action async getDspJson(pkg: Package) {
    let dspJson = {
      provider: pkg.provider,
      dspJson: {}
    }
    let result = this.dspJsonDb.find((p: any) => p.provider === pkg.provider)
    if (!result) {
      let pkgJson = await this.getPkgJson(pkg)
      // @ts-ignore
      if (!pkgJson.error) {
        // @ts-ignore
        dspJson.dspJson = await this.getJsonData(pkgJson.data.dsp_json_uri)
      } else {
        dspJson.dspJson = {
          error: true,
          errorMsg: '',
          data: {}
        }
      }
      this.setDspJson(dspJson)
    } else {
      dspJson = result
    }
    return dspJson.dspJson
  }

  @mutation setPkgJson(json: any) {
    if (!this.pkgJsonDb.find((p: any) => p.id === json.id)) {
      this.pkgJsonDb.push(json)
      localStorage.setItem('pkgJsonDb', JSON.stringify(this.pkgJsonDb))
      localStorage.setItem('jsonDbUpdate', helper.currentTime())
    }
  }
  @mutation setDspJson(json: any) {
    if (!this.dspJsonDb.find((p: any) => p.provider === json.provider)) {
      this.dspJsonDb.push(json)
      localStorage.setItem('dspJsonDb', JSON.stringify(this.dspJsonDb))
      localStorage.setItem('jsonDbUpdate', helper.currentTime())
    }
  }

  @mutation setJsonDb(jsonDb: any) {
    this.pkgJsonDb = jsonDb.pkgJsonDb
    this.dspJsonDb = jsonDb.dspJsonDb
  }
}
export const jsondb = jsondbModule.ExtractVuexModule(jsondbModule)
