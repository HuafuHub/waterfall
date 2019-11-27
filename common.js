var myFunctions = {
  /**
   * isPrime: 判定一个数是否是素数
   * @param {number} n 需要判定的数
   * @returns {boolean} ture是素数 false不是素数
   */
  isPrime(n) {
    if (n < 2) {
      return false;
    }
    for (var i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  },

  /**
   * isOdd: 判定一个数是否是奇数
   * @param {number} n 需要判定的数
   * @returns {boolean} ture是奇数 false不是奇数
   */
  isOdd(n) {
    return n % 2 === 0 ? false : true;
  },

  /**
   * sumOfArray: 求数组各项相加之和
   * @param {Array<number>} arr 需要求和的数组
   * @returns {number} 数组每一项相加之和
   */
  sumOfArray(arr) {
    var sum = arr[0];
    for (var i = 1; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  },

  /**
   * maxOfArray: 查找数组中的最大值
   * @param {Array<number>} arr 需要查找的数组
   * @returns {number} 最大值
   */
  maxOfArray(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  },

  /**
   * minOfArray: 查找数组中的最小值
   * @param {Array<number>} arr 需要查找的数组
   * @returns {number} 最小值
   */
  minOfArray(arr) {
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    return min;
  },

  /**
   * multipeOfArray: 查找数组中的众数
   * @param {Array<number>} arr 需要查找的数组
   * @returns {Array<Object>} 查找到的众数及数量
   */
  multipeOfArray(arr) {
    var multipe = [];
    var obj = {};
    var resault = null;
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = 1;
      } else {
        obj[arr[i]]++;
      }
    }
    for (var prop in obj) {
      if (!resault || resault.count < obj[prop]) {
        resault = {
          value: prop,
          count: obj[prop]
        }
      }
    }
    multipe.push(resault);
    for (var prop in obj) {
      if (prop !== resault.value && obj[prop] === resault.count) {
        multipe.push({
          value: prop,
          count: obj[prop]
        });
      }
    }
    return multipe;
  },

  /**
   * isLeap: 判定是不是闰年（四年一润，百年不润 || 四百年一润）
   * @param {number} year 需要判定的年份
   * @returns {boolean} ture是闰年 false不是闰年
   */
  isLeap(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? true : false;
  },

  /**
   * 获取指定月的天数
   * @param {number} year 
   * @param {number} month 1-12代表月数
   * @returns {number} 指定月的天数
   */
  getDays(year, month) {
    var monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (this.isLeap(year)) {
      monthArr[1] = 29
    }
    return monthArr[month - 1];
  },

  /**
   * getWeek获取指定日期的星期几
   * @param {number} year 
   * @param {number} month 
   * @param {number} day 
   * @returns {string} 星期几
   */
  getWeek(year, month, day) {
    var week = new Date(year, month - 1, day).getDay();
    switch (week) {
      case 0:
        return "星期天";
      case 1:
        return "星期一";
      case 2:
        return "星期二";
      case 3:
        return "星期三";
      case 4:
        return "星期四";
      case 5:
        return "星期五";
      case 6:
        return "星期六";
    }
  },

  /**
   * sort: 给数组按条件排序
   * @param {Array} arr 需要排序的数组
   * @param {Function} compare 自定义排序的规则 （a, b）
   * @returns {number}
   * 如果a > b 返回正数;
   * 如果a == b 返回0;
   * 如果a < b 返回负数;
   */
  sort(arr, compare) {
    compare = compare || function (a, b) {
      if (a > b) {
        return 1;
      } else if (a === b) {
        return 0;
      } else {
        return -1;
      }
    }
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = 0; j < arr.length - 1 - i; j++) {
        if (compare(arr[j], arr[j + 1]) > 0) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  },

  /**
   * filter: 筛选符合条件的集合
   * @param {Array} arr 原始数据
   * @param {Function} cond 筛选条件（item）符合条件返回true
   * @returns {Array} 符合条件的集合
   */
  filter(arr, cond) {
    if (!cond) {
      return arr.slice();
    }
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (cond(arr[i])) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },

  /**
   * find: 筛选符合条件的第一个
   * @param {Array} arr 原始数据
   * @param {Function} cond 筛选条件（item）符合条件返回true
   * @returns {*} 符合条件的元素
   */
  find(arr, cond) {
    if (!cond) {
      return null;
    }
    for (var i = 0; i < arr.length; i++) {
      if (cond(arr[i])) {
        return arr[i];
      }
    }
  },

  /**000000
   * count: 统计符合条件的元素数量
   * @param {Array} arr 原始数据
   * @param {Function} cond 筛选条件（item）符合条件返回true
   * @returns {number} 符合条件的元素的数量00000000000000000000
   */
  count(arr, cond) {
    if (!cond) {
      return 0;
    }
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      if (cond(arr[i])) {
        total++;
      }
    }
    return total;
  },

  /**
   * rundom获取指定区间的随机数
   * @param {number} min 最小边界
   * @param {number} max 最大边界
   * @returns {number} 随机数
   */
  random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  },

  /**
   * toStringOfDate 获取xxxx-xx-xx xx:xx:xx形式的日期字符串
   * @param {Date} date 日期对象
   */
  toStringOfDate(date) {
    date = date || new Date();
    var year = date.getFullYear().toString().padStart(4, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var hour = date.getHours().toString().padStart(2, "0");
    var minute = date.getMinutes().toString().padStart(2, "0");
    var second = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  },

  /**
   * getAge 根据生日计算到指定时间的年龄
   * @param {*} birth 20190101格式的生日
   * @param {*} date 指定时间的日期对象（若不传，则默认为当前系统时间）
   */
  getAge(birth, date) {
    //指定日期
    date = date || new Date();
    //指定日期的年份
    var year = date.getFullYear();
    //生日字符串
    birth = typeof (birth) === "string" ? birth : birth.toString();
    //生日年、月、日
    var birthYear = birth.substr(0, 4);
    var birthMonth = birth.substr(4, 2);
    var birthDay = birth.substr(6, 2);
    //若果出生在闰年的2月29日，则平年2月28日就过生日
    if (birthMonth == 2 && birthDay == 29 && !myFunctions.isLeap(year)) {
      birthDay = 28;
    }
    //出生日期
    var birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    //虚岁
    var age = year - birthDate.getFullYear();
    //指定年份的生日
    birthDate.setFullYear(year);
    //若指定年份的生日在指定日期之后，则实际年龄比虚岁少一岁
    if (birthDate > date) {
      age--;
    }
    return age;
  },

  /**
   * 将对象obj2混合到obj1中，返回混合结果的新对象
   * @param {Object} obj1
   * @param {Object} obj2
   * @returns {Object}
   */
  mixin(obj1, obj2) {
    // return Object.assign({}, obj1, obj2);
    var newObj = {};
    for (var prop in obj2) {
      newObj[prop] = obj2[prop];
    }
    for (var prop in obj1) {
      if (!(prop in obj2)) {
        newObj[prop] = obj1[prop];
      }
    }
    return newObj;
  },

  /**
   * 克隆
   * @param {*} obj 克隆数据
   * @param {*} deep 是否深度克隆（true 或 false），不传默认浅克隆
   * @returns
   */
  clone(obj, deep) {
    if (Array.isArray(obj)) {
      if (deep) {
        var data = [];
        for (var i = 0; i < obj.length; i++) {
          data.push(this.clone(obj[i], deep))
        }
        return data;
      } else {
        return obj.slice();
      }
    } else if (typeof (obj) === "object") {
      var data = {};
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (deep) {
            data[prop] = this.clone(obj[prop]);
          } else {
            data[prop] = obj[prop];
          }
        }
      }
      return data;
    } else {
      return obj;
    }
  },

  /**
   * 函数防抖
   * @param {*} callback 处理函数
   * @param {*} time 等待时间
   * @returns 返回一个防抖函数
   */
  debounce(callback, time){
    var timer = null;
    return function(){
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function(){
        callback.apply(null, args);
      }, time)
    }
  },

  /**
   * 函数节流
   * @param {*} callback 处理函数
   * @param {*} time 间隔时间
   * @param {*} immediately 是否立即执行
   * @returns
   */
  throttle(callback, time, immediately){
    if(immediately){
      var t = null;
      return function(){
        if(!t || Date.now() - t >= time){
          callback.apply(null, arguments);
          t = Date.now();
        }
      }
    }else{
      var timer = null;
      return function(){
        var args = arguments;
        if(timer){
          return;
        }
        timer = setTimeout(function(){
          callback.apply(null, args);
          timer = null;
        }, time)
      }
    }
    
  },

  /**
   * 函数科里化
   * @param {*} callback 处理函数
   * @returns 若参数够则返回执行结果，若参数不够，返回固定参数的函数
   */
  curry(callback){
    var args = Array.prototype.slice.call(arguments, 1);
    var that = this;
    return function () {
      var currentArgs = Array.from(arguments);
      var totalArgs = args.concat(currentArgs);
      if(totalArgs.length >= callback.length){
        return callback.apply(that, totalArgs);
      }else{
        totalArgs.unshift(callback);
        return that.curry.apply(that, totalArgs);
      }
    }
  },

  /**
   * 函数管道
   * @returns 组合后的单参函数
   */
  pipe(){
    var args = Array.from(arguments);
    return function(data){
      args.reduce(function(resault, fn){
        return fn(resault);
      }, data)
    }
    
  }
}