import request from '../utils/request.js'

export const openId = data => {
  return request({
    method: 'GET',
    url: '/weChat/openId?userCode=' + data,
    data
  })
}

export const login = data => {
  return request({
    method: 'POST',
    url: '/weChat/login?openId=' + data,
    data
  })
}

export const bindStu = data => {
  return request({
    method: 'POST',
    url: '/weChat/student/bind',
    data
  })
}

// module.exports = {
//   openId,
//   login
// }