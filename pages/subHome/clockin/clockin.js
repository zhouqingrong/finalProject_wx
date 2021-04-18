// pages/clockin/clockin.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClockIn:false,
    show:true,//上拉菜单
    aimgurl: "", // //临时图片的路径
    canDel:false,//是否出现红叉
    countIndex: 1, // 可选图片剩余的数量
    imageData: [], // 所选上传的图片数据
    imgurl:'',
    // actions: [
    //   {
    //     name: '拍照上传',
    //     status:0
    //   },
    //   {
    //     name: '从相册中选择',
    //     status:1
    //   }
    // ],
    imgList: [],
    modalName:'bottomModal'
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
          aimgurl: res.tempFilePaths,
          canDel:true
        });
        console.log("aimgurl",that.data.aimgurl);
        // that.upLoadImgFun(res.tempFilePaths);
      }
    })
  },
  //确定按钮
  confirm(){
    // 需要先检测是否合法，人脸识别，照片识别
    console.log("上传的aimgurl",this.data.aimgurl[0]);
    this.upLoadImgFun(this.data.aimgurl[0]);
  },
  /**上传：图片到服务器 */
  upLoadImgFun(tempFilePathsData) {
    let that = this;
    let orderCommentMaterial = []; // 每次选择添加的图片并上传到服务器后的图片信息
    // tempFilePathsData.forEach((item, index) => {
      console.log("tempFilePathsData----",tempFilePathsData)
      if(tempFilePathsData==''|| tempFilePathsData==undefined){
        Toast.fail({
          message:'请上传图片',
          position:'top'
        });
      }else{
        wx.uploadFile({
          url:'http://139.9.140.136:9090/upload ', // 上传服务器的后台请求接口地址
          filePath: tempFilePathsData, // 要上传的图片数据对象
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
            // 图片的url
            var resJSON = JSON.parse(res.data);
            console.log('success2:imgurl',resJSON.data.url);
            // 获取到上传到云端的url，保存在imgurl中
            that.setData({
              imgurl:resJSON.data.url,
              isClockIn:true,
              canDel:false
            })  
            Toast.success({
             message: '打卡成功',
             position:'top'
            });
           
            // console.log('success2:imgurl',that.data.imgurl);
          },
          fail(err) {
            Toast.fail({
              message:'请上传图片',
              position:'top'
            });
            console.log('err:',err);
          },
          complete(all) {
            // console.log('all',all);
          }
        });
      // });
      }
  },
  // ChooseImage() {
  //   wx.chooseImage({
  //     count: 1, //默认9
  //     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], //从相册选择 、相机
  //     success: (res) => {
  //       if (this.data.imgList.length != 0) {
  //         this.setData({
  //           imgList: this.data.imgList.concat(res.tempFilePaths)
  //         })
  //       } else {
  //         this.setData({
  //           imgList: res.tempFilePaths
  //         })
  //       }
  //     }
  //   });
  // },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgurl,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.setData({
            aimgurl: '',
            canDel:false
          })
        }
      }
    })
  },
  // 模态框
  // showModal(e) {
  //   this.setData({
  //     modalName: e.currentTarget.dataset.target
  //   })
  // },
  // hideModal(e) {
  //   this.setData({
  //     modalName: null
  //   })
  // },
//取消弹窗
  // onClose() {
  //   this.setData({ show: false });
  // },
//不同的事件
  // onSelect(event) {
  //   if(event.detail.status==0){
  //     console.log("拍照上传")
     
  //   }else{
  //     console.log("从相册中选择")
  //   }
  // },
  //拍照
  // takePhoto() {
  //   wx.createCameraContext().takePhoto({
  //     quality: 'high',
  //     success: (res) => {
  //       this.setData({
  //         src: res.tempImagePath
  //       })
  //     }
  //   })
  // },
  // error(e) {
  //   console.log(e.detail)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.ctx = wx.createCameraContext()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.browse()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})