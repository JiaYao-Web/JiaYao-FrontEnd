import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

// manageClass an axios instance
const service = axios.create({
  baseURL: 'http://localhost:5011/api/', // url = base url + request url
  // baeURL: 'http://localhost:8001/', // url = base url + request url

  // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000, // request timeout
  crossDomain: true
})

service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (sessionStorage.getItem('MyAuthentication')) {
      config.headers['MyAuthentication'] = sessionStorage.getItem('MyAuthentication')
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default service
