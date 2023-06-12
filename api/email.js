import axios from "axios"

export function get() {
  return axios({
    url: 'api/email',
    method: 'get'
  })
}

export function update(data) {
  return axios({
    url: 'api/email',
    data,
    method: 'put'
  })
}

export function send(data) {
  return axios({
    url: 'api/email',
    data,
    method: 'post'
  })
}
