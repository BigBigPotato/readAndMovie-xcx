// pages/movies/index.js
const app = getApp();
const baseUrl = app.data.baseUrl;
const inTheatersUrl = `${baseUrl}/v2/movie/in_theaters?start=0&count=3`;
const comingSoonUrl = `${baseUrl}/v2/movie/coming_soon?start=0&count=3`;
const top250Url = `${baseUrl}/v2/movie/top250?start=0&count=3`;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovies(inTheatersUrl, '正在热映');
    this.getMovies(comingSoonUrl, '即将上映');
    this.getMovies(top250Url, '豆瓣Top250');
  },
  getMovies (url,title) {
    app.handleRequest(url).then((d) => {
      // console.log(d);
      if(d.statusCode === 200){
        switch(title){
          case '正在热映':
            this.setData({
              ['list['+ 0 +']']: {
                title: title,
                list: d.data.subjects
              }
            });
            break;
          case '即将上映':
            this.setData({
              ['list[' + 1 + ']']: {
                title: title,
                list: d.data.subjects
              }
            });
            break;
          case '豆瓣Top250':
            this.setData({
              ['list[' + 2 + ']']: {
                title: title,
                list: d.data.subjects
              }
            });
            break;
        }
      }
    }).catch((err) => {
      console.log(err);
    });
  }
})