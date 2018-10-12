// pages/news/detail/index.js
const datas = require('../../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    news:{},
    headImg: '',
    headImgDefault: '',
    headImgPlay: '',
    topIcon: ['music-start.png','music-stop.png'],
    playFlag:0,
    collectIcon: ['collection-anti.png','collection.png'],
    collectFlag:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = Number(options.id),  
        item = datas.postList[id];
    this.setData({
      id: id,
      news: item,
      headImgDefault: item.headImgSrc,
      headImg: item.headImgSrc
    });
    let collectFlag = this.checkCollect();
    this.setData({
      collectFlag: collectFlag
    });
  },
  checkCollect () {
    let collected = wx.getStorageSync('collect'),
        id = this.data.id;
    collected = collected ? collected : [];
    for(let item of collected){
      if(item === id){
        return 1;
      }
    }
    return 0;
  },
  toPlayMusic () {
    let musicPlayer = wx.createInnerAudioContext(),
        datas = this.data,
        music = datas.news.music,
        playFlag = datas.playFlag;
    musicPlayer.src = music.url;
    if(playFlag){
      // 在播放
      this.setData({
        headImg: datas.headImgDefault,
        playFlag: 0
      });
      musicPlayer.pause();
    }else{
      // 未播放
      this.setData({
        headImgPlay: music.coverImg,
        headImg: music.coverImg,
        playFlag: 1
      });
      musicPlayer.play();
    }
  },
  onShareAppMessage: function (res) {
    let datas = this.data;
    return {
      title: datas.news.title,
      path: `/page/user?id={{datas.id}}`
    }
  },
  toCollect () {
    let collectFlag = this.data.collectFlag,
        id = this.data.id,
        collected = wx.getStorageSync('collect');
    collected = collected ? collected : [];
    if(collectFlag){
      let start = collected.indexOf(id);
      collected.splice(start, 1);
      wx.setStorageSync('collect', collected);
      this.setData({
        collectFlag: 0
      });
    }else{
      collected.push(id);
      wx.setStorageSync('collect', collected);
      this.setData({
        collectFlag:1
      });
    }
  }
})