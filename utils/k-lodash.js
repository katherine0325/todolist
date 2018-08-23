class KLodash {
  constructor() {

  }

  find(datas, query) {
    const results = [];
    datas.forEach(i => {
      let flag = true;
      for (let j in query) {
        if (query[j] != i[j]) {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        results.push(i);
      }
    });
    return results;
  }

  findExclude(datas, query) {
    const results = [];
    datas.forEach(i => {
      let flag = true;
      for (let j in query) {
        if (query[j] == i[j]) {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        results.push(i);
      }
    });
    return results;
  }
}

module.exports = new KLodash;