import request from '../utils/request.js'
// 获取openID
//上传照片
export const uploadPhoto = data => {
  return request({
    method: 'POST',
    url: '/weChat/photo',
    header: { 'content-Type': 'multipart/form-data'}, // 此处加上，用form表单的格式             
    data
  })
}
// 添加记录
export const addRecord = data => {
  return request({
    method: 'POST',
    url: '/weChat/records' ,
    data
  })
}
// 查询今日打卡是否打卡
export const  hasRecord = data => {
  return request({
    method: 'GET',
    url: '/weChat/record/'+ data ,
  })
}
