import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

// manageClass an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // baeURL: 'http://localhost:8001/', // url = base url + request url

  // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000, // request timeout
  crossDomain: true
})

export default service
