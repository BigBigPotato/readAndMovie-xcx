// pages/movies/detail/index.js
const app = getApp();
const baseUrl = app.data.baseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 326
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   id:options.id
    // });
    this.getDetails();
  },
  getDetails() {
    let id = this.data.id,
        url = `${baseUrl}/v2/movie/subject/${id}`;
    app.handleRequest(url).then((d) => {
      // console.log(d);
      if(d.statusCode === 200){
        this.setData({
          msg:d.data
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})