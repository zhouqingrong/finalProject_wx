import request from '../utils/request.js'
// 获取openID
export const openId = data => {
  return request({
    method: 'GET',
    url: '/weChat/openId?userCode=' + data,
    data
  })
}
// 登录后端，本质是获取信息
export const login = data => {
  return request({
    method: 'POST',
    url: '/weChat/login?openId=' + data,
    data
  })
}
// 绑定学生
export const bindStu = data => {
  return request({
    method: 'POST',
    url: '/weChat/student/bind',
    data
  })
}
//绑定辅导员
export const bindAdmin = data =>{
  return request ({
    method:'POST',
    url:'/weChat/teacher/bind',
    data
  })
}
// 修改绑定信息
export const modifyBind = data=>{
  return request({
    method:'PUT',
    url:'/weChat/student/update/'+data.id,
    data
  })
}
//解除绑定
export const deleteBind = data =>{
  return request({
    method:'DELETE',
    url:'/weChat/bind/info/'+data,
  })
}
