// pages/index/index.js
const datas = require('../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsList: datas.postList
    });
  },
})