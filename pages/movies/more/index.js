// pages/movies/more/index.js
const app = getApp();
const baseUrl = app.data.baseUrl;
const urls = [
  {
    name:'正在热映',
    url: `${baseUrl}/v2/movie/in_theaters`
  },
  {
    name: '即将上映',
    url: `${baseUrl}/v2/movie/coming_soon`
  },
  {
    name: '豆瓣Top250',
    url: `${baseUrl}/v2/movie/top250`
  }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickIndex:0,
    list:[],
    limit:20,
    totalCount:0,
    isEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      clickIndex:options.index
    });
    wx.setNavigationBarTitle({
      title: urls[options.index].name,
    });
    this.getList();
  },
  getList () {
    let clickIndex = this.data.clickIndex,
        datas = this.data,
        url = urls[clickIndex].url + `?start=${datas.totalCount}&count=${datas.limit}`;
    app.handleRequest(url).then((d) => {
      // console.log(d);
      if(d.statusCode === 200){
        let getCount = d.data.count,
            flag = false;
        if(getCount < datas.limit){
          flag = true;
        }
        this.setData({
          list: datas.list.concat(d.data.subjects),
          isEmpty:flag,
          totalCount: datas.totalCount + d.data.count
        });
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  onReachBottom () {
    let datas = this.data,
        isEmpty = datas.isEmpty;
    if(!isEmpty){
      wx.showLoading({
        title: '正在加载',
      });
      setTimeout(() => {
        wx.hideLoading();
        this.getList();
      },2000);
    }
  }
})