import axios from 'axios'
import qs from 'qs'
export function sendHttp (param) {
    return axios({
        headers: param.headers,
        url: param.url,
        method: param.type,
        data: qs.stringify(param.data)
    })
  }
