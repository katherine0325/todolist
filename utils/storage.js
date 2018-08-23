const _ = require('./k-lodash.js');

class StorageDB {
  constructor(collection) {
    this.collection = collection;
  }

  find(query) {
    const datas = wx.getStorageSync(this.collection) || [];
    return _.find(datas, query);
  }

  insert(data) {
    const insertData = {};
    const datas = wx.getStorageSync(this.collection) || [];
    if(datas.length >= 1) {
      Object.assign(insertData, { _id: datas[datas.length - 1]._id + 1}, data);
    } else {
      Object.assign(insertData, {_id: 1}, data);
    }
    datas.push(insertData);
    wx.setStorageSync(this.collection, datas);
    return { ok: 1, data: insertData };
  }

  update(query, updateData) {
    const datas = wx.getStorageSync(this.collection) || [];
    if(datas.length === 0) {
      return {ok: 1, updateRows: 0};
    }
    const data = (_.find(datas, query))[0];
    for(let i in data) {
      if(updateData[i]) {
        data[i] = updateData[i];
      }
    }
    wx.setStorageSync(this.collection, datas);
    return {ok: 1, updateRows: 1};
  }

  remove(query) {
    const datas = wx.getStorageSync(this.collection) || [];
    if(JSON.stringify(query) == "{}") {
      wx.setStorageSync(this.collection, []);
      return { ok: 1, removeRows: datas.length };
    } else {
      const results = _.findExclude(datas, query);
      wx.setStorageSync(this.collection, results);
      return {ok: 1, removeRows: datas.length - results.length};
    }
  }
}

module.exports = StorageDB;
