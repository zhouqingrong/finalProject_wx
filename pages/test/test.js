// js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    aimgurl: "", // //临时图片的路径
    countIndex: 1, // 可选图片剩余的数量
    imageData: [] // 所选上传的图片数据
  },
testToast(){
  Toast.fail({
    message:'请上传图片',
    position:'top',
    color:'#ffffff'
  });
},
  /*图片浏览及上传 */
  browse: function(e) {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera');
          }
        }
      }
    })
  },

  /*打开相册、相机 */
  chooseWxImage: function(type) {
    let that = this;
    wx.chooseImage({
      count: that.data.countIndex,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        // 选择图片后的完成确认操作
        that.setData({
          aimgurl: res.tempFilePaths
        });
        console.log(that.data.aimgurl);
        that.upLoadImgFun(res.tempFilePaths);
      }
    })
  },
   /**上传：图片到服务器 */
   upLoadImgFun(tempFilePathsData) {
    let that = this;
    let orderCommentMaterial = []; // 每次选择添加的图片并上传到服务器后的图片信息
    tempFilePathsData.forEach((item, index) => {
      wx.uploadFile({
        url:'http://139.9.140.136:9090/upload ', // 上传服务器的后台请求接口地址
        filePath: item, // 要上传的图片数据对象
        name: 'file', // 上传类型
        header: {
          'content-Type': 'multipart/form-data' // 此处加上，用form表单的格式传
        },
        // 要携带的参数
        formData: {
          "systemCode": "aaa",
          "belongCode": "cccccc",
          "belongID": "123456"
        },
        success(res) {
          // console.log('success-res:',res);
          // console.log('success-res-data',res.data)
          // 图片的url
          var resJSON = JSON.parse(res.data);
          console.log('success2:',resJSON.data.url);
        },
        fail(err) {
          console.log('err:',err);
        },
        complete(all) {
          console.log('all',all);
        }
      });
    });
  }
})
 

