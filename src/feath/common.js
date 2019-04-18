import url from './server/url'
import { get, post } from './server/http.js'
import axios from 'axios'

export default {
  backList (params) {
    return post(url.backList, params)
  },
  backSave (params) {
    return post(url.backSave, params)
  },
  backRemove (params) {
    return post(url.backRemove, params)
  },
  backUpdate (params) {
    return post(url.backUpdate, params)
  },
  getAPI (params) {
    return post(url.getAPI, params)
  }
}
