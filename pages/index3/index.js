// pages/index2/index.js
const util = require('../../utils/util.js');
const _ = require('../../utils/k-lodash.js');
const StorageDB = require('../../utils/storage.js');
const everydayM = new StorageDB('everydays');
const randomM = new StorageDB('randoms');
const mondayM = new StorageDB('mondays');
const tuesdayM = new StorageDB('tuesdays');
const wednesdayM = new StorageDB('wednesdays');
const thursdayM = new StorageDB('thursdays');
const fridayM = new StorageDB('fridays');
const saturdayM = new StorageDB('saturdays');
const sundayM = new StorageDB('sundays');
const dateM = new StorageDB('dates');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayData: [],
    data: {
      everyday: [],
      random: [],
      week: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      date: [

      ]
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
    const cur_week = today.getDay();
    const todayStr = util.formatDate(today);
    const todayData = wx.getStorageSync('todayData');
    if(todayData.todayStr == todayStr) {
      this.setData({todayData: todayData})
    } else {
      todayData = [];
      // 每天
      const everyday = everydayM.find({});
      // 随机
      const randoms = randomM.find({});
      const random = [ randoms[parseInt(Math.random() * randoms.length)] ];
      // 周天
      const weekData = [];
      weekData[0] = sundayM.find({});
      weekData[1] = mondayM.find({});
      weekData[2] = tuesdayM.find({});
      weekData[3] = wednesdayM.find({});
      weekData[4] = thursdayM.find({});
      weekData[5] = fridayM.find({});
      weekData[6] = saturdayM.find({});
      const week = weekData[cur_week];
      // 指定日期
      const date = dateM.find({key_date: todayStr});
      // 连接起来
      todayData.concat(everyday);
      todayData.concat(random);
      todayData.concat(week);
      todayData.concat(date);
      
      this.setData({todayData: todayData});
      wx.setStorageSync(todayData);
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
  finish: function() {
    const _this = this;

    _this.setData({ animation: e.currentTarget.dataset.name });
    
    setTimeout(function() {
      _this.setData({ animation: '' });
      const todayData = _this.data.todayData;
      todayData.splice(todayData.indexOf(e.currentTarget.dataset.name), 1);
      _this.setData({ todayData: todayData });
      wx.setStorageSync('todayData', todayData);
    }, 800);
  },

})