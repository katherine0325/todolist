// pages/setting/setting.js
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
    eats: [],
    morning_and_nights: [],
    runs: [],
    things: [],
    requires: [],
    data_name: '',
    data_collection: 'requires',
    data_morning_and_night: false,
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
    this.init();
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
   * 初始化数据
   */
  init: function() {
    const eats = eatM.find({});
    const morning_and_nights = morningNightM.find({});
    const runs = runM.find({});
    const things = thingsM.find({});
    const requires = requireM.find({});

    this.setData({
      eats,
      morning_and_nights,
      runs,
      things,
      requires
    });
  },

  /**
   * 添加数据内容变化
   */
  changeName: function(e) {
    this.setData({data_name: e.detail.value});
  },

  /**
   * 添加数据类别变化
   */
  changeCollection: function(e) {
    this.setData({data_collection: e.detail.value});
  },

  /**
   * 添加数据是否地铁变化
   */
  changeMorningNight: function(e) {
    this.setData({data_morning_and_night: e.detail.value});
  },

  /**
   * 添加数据提交
   */
  submit: function() {
    // if (this.data.data_collection === 'news') {
    //   const todayData = wx.getStorageSync('todayData');
    //   todayData.news.push(this.data.data_name);
    //   wx.setStorageSync('todayData', todayData);
    // } else {



      const data = {};

      if(!this.data.data_name) return;

      data.name = this.data.data_name;
      // if(this.data.data_collection === 'requires') {
      //   data.morning_and_night = this.data.data_morning_and_night;
      // }

      const insertM = new StorageDB(this.data.data_collection);

      const result = insertM.insert(data);
      console.log(result);

      if (this.data.data_collection === 'requires') {
        const todayData = wx.getStorageSync('todayData');
        todayData.requires.push(result.data);
        wx.setStorageSync('todayData', todayData);
      }

      this.init();
    // }

    wx.showToast({
      icon: 'none',
      title: '添加成功',
    })

    this.setData({ data_name: '' });
  },

  /**
   * 删除 
   */
  delete: function(e) {
    const _this = this;

    wx.showModal({
      // title: '',
      content: '确定删除吗',
      success: function(res) {
        if(res.confirm) {
          const removeM = new StorageDB(e.currentTarget.dataset.collection);
          const result = removeM.remove({ _id: e.currentTarget.dataset.id });
          console.log(result);

          _this.init();
        }
      }
    })


  },

  /**
   * 删除当天缓存，使list重新加载
   */
  removeTodayData: function() {
    wx.removeStorageSync('todayData');
  },
})