// pages/index2/index.js
const util = require('../../utils/util.js');
const _ = require('../../utils/k-lodash.js');
const StorageDB = require('../../utils/storage.js');
const eatM = new StorageDB('eats');
const runM = new StorageDB('runs');
const morningNightM = new StorageDB('morningnights');
const thingsM = new StorageDB('things');
const requireM = new StorageDB('requires');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weight: (128.5 - ((new Date()).getTime() - (new Date(2018, 7, 26)).getTime()) / (1000 * 60 * 60 * 24) * (8.5 / 36)).toFixed(2),
    animation: '',
    todayData: {
      eat: "",
      run: "",
      morning: "",
      night: "",
      thing: '',
      news: [],
      today: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const today = new Date();
    const todayStr = util.formatDate(today);
    const todayData = wx.getStorageSync('todayData');

    // 如果存储的日期是今天，则直接展示
    if (todayStr == todayData.today) {
      this.setData({ todayData: todayData });
    } else { // 如果不是，则重新计算再显示
      const week = today.getDay();
      const eat = eatM.find({})[week];
      const run = runM.find({ _id: 1 })[0];

      // 地铁早晚
      let morning_and_night = [];
      const requireMorningNight = requireM.find({ morning_and_night: true }) || [];
      if (requireMorningNight.length >= 2) {
        morning_and_night = requires;
      } else if (requireMorningNight.length == 1) {
        morning_and_night[0] = requires[0];
        const data = morningNightM.find({});
        morning_and_night[1] = data[parseInt(Math.random() * data.length)];
      } else {
        morning_and_night = morningNightM.find({});
      }
      const morningIndex = parseInt(Math.random() * morning_and_night.length);
      const nightIndex = morningIndex >= morning_and_night.length - 1 ? morningIndex - 1 : morningIndex + 1;
      const morning = morning_and_night[morningIndex];
      const night = morning_and_night[nightIndex];

      // 其他事项
      let things = [];
      const requireThings = requireM.find({ morning_and_night: false }) || [];
      if (requireThings.length > 0) {
        things = requireThings;
      } else {
        things = thingsM.find({});
      }
      const thing = things[parseInt(Math.random() * things.length)];

      const todayData = {
        eat: eat? eat.name : '',
        run: run? run.name : '',
        morning: morning? morning.name : '',
        night: night? night.name : '',
        thing: thing? thing.name : '',
        news: [],
        today: todayStr
      };
      this.setData({ todayData: todayData });
      wx.setStorageSync('todayData', todayData);
    }
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
  
  },

  /**
   * 完成task
   */
  finish: function(e) {
    const _this = this;

    _this.setData({ animation: e.currentTarget.dataset.task });
    
    setTimeout(function() {
      _this.setData({ animation: '' });
      const todayData = _this.data.todayData;
      todayData[e.currentTarget.dataset.task] = '';
      _this.setData({ todayData: todayData });
      wx.setStorageSync('todayData', todayData);
      // remove require
      const result = requireM.remove({ name: e.currentTarget.dataset.name });
      console.log(result)
    }, 800);

  },

  /**
   * 删除今日添加事项
   */
  removeNews: function(e) {
    const _this = this;

    _this.setData({animation: e.currentTarget.dataset.name});

    setTimeout(function() {
      _this.setData({ animation: '' });
      const todayData = _this.data.todayData;
      todayData.news.splice(todayData.news.indexOf(e.currentTarget.dataset.name), 1);
      _this.setData({ todayData: todayData });
      wx.setStorageSync('todayData', todayData);
    }, 800);
  }

})