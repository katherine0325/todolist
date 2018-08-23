// pages/index2/index.js
const util = require('../../utils/util.js');
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
    todayData: {
      eat: "",
      run: "",
      morning: "",
      night: "",
      things: "",
      requires: [],
      today: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const today = new Date();
    const todayStr = util.formatDate(today);
    const todayData = wx.getStorageSync('todayData');

    // 如果存储的日期是今天，则直接展示
    if (todayStr == todayData.today) {
      this.setData({todayData: todayData});
    } else { // 如果不是，则重新计算再显示
      const week = today.getDay();
      const eat = eatM.find({ _id: week })[0];
      const run = runM.find({ _id: 1 })[0];
      const morning_and_night = morningNightM.find({});
      const morningIndex = parseInt(Math.random() * morning_and_night.length);
      const nightIndex = morningIndex >= morning_and_night.length ? morningIndex - 1 : morningIndex + 1;
      const morning = morning_and_night[morningIndex];
      const night = morning_and_night[nightIndex];
      const things = thingsM.find({});
      const thing = things[parseInt(Math.random() * things.length)];
      const requires = requireM.find({});

      const todayData = {
        eat: eat.name,
        run: run.name,
        morning: morning.name,
        night: night.name,
        thing: thing.name,
        requires: requires,
        today: todayStr
      };
      this.setData({ todayData: todayData });
      wx.setStorageSync('todayData', todayData);
    }
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

  find: () => {
    const data = morningNightM.find({});
    console.log(data);
  },

  add: () => {
    const insertres = requireM.insert({ name: 'mongo PPT', create_time: new Date(), update_time: new Date() });
    console.log(insertres)
  },

  // update: () => {
  //   const res = eatM.update({_id: 8}, {name: 'biede'});
  //   console.log(res);
  // },

  // remove: () => {
  //   const res = eatM.remove({});
  //   console.log(res);
  // }

})