// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const appId = 'wx6ee743d570d519a2'
    const appSecret = 'ad6d4977570b9adfab015bb35c07ac28'


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appId+'&secret='+appSecret+'&js_code=' + res.code + '&grant_type=authorization_code',
          success: res =>{
            // 获取到openId
            this.globalData.openid = res.data.openid
            console.log("openid:",res.data.openid)
            console.log("res:",res)
          }
        })
      }
    })


    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log("-----------",this.globalData.userInfo)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  
  globalData: {
    userInfo: null,
    allInfo:null,
    openid:null,
    haslogin:false,
    hasBind:false,
    hasUserInfo:false
  }
})
