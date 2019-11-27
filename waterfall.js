function createWaterFall(config) {
  //默认配置
  var defaultConfig = {
    container: null, //图片容器
    minGap: 10, //最小间隙
    imgWidth: 200, //图片宽度
    imgData: [], //图片路径
    imgDom: [], //图片元素
    pullOver: true, //是否靠边排列
  }
  config = myFunctions.mixin(defaultConfig, config);
  var debounce = myFunctions.debounce(setImagesPosition, 10);


  //初始化图片
  createImages();
  //处理容器为定位元素
  setContainerPosition();
  //获取图片信息
  getImagesInfo();
  //窗口事件
  window.onresize = debounce;

  /**
   * 初始化图片
   */
  function createImages() { 
    var fragment = document.createDocumentFragment()//文档碎片，存放创建的图片元素
    config.imgData.forEach((path, index) => {
      var img = new Image();
      img.src = path;
      img.style.width = config.imgWidth + "px";
      img.style.position = "absolute";
      img.style.transition = "0.5s";
      fragment.appendChild(img);
      config.imgDom.push(img);
      //设置图片位置
      img.onload = debounce;
    });
    config.container.appendChild(fragment);
  }

  /**
   * 处理容器为定位元素
   */
  function setContainerPosition(){
    if(getComputedStyle(config.container).position === "static"){
      config.container.style.position = "relative";
    }
  }

  /**
   * 计算图片信息
   */
  function getImagesInfo(){
    var info = {};
    info.containerWidth = config.container.clientWidth;//计算容器宽度
    info.columns = config.pullOver ? Math.floor((info.containerWidth-config.minGap)/(config.imgWidth+config.minGap)) : Math.floor((info.containerWidth+config.minGap)/(config.imgWidth+config.minGap))//计算可以排多少列
    info.gap = config.pullOver ? (info.containerWidth - info.columns*config.imgWidth)/(info.columns-1) : (info.containerWidth - info.columns*config.imgWidth)/(info.columns+1);//计算间隙
    return info;
  }

  /**
   * 设置图片位置
   */
  function setImagesPosition(){
    var info = getImagesInfo();//获取图片信息
    var row = new Array(info.columns);//创建数组，存储每行图片TOP信息
    row.fill(0);
    config.imgDom.forEach(img => {
      //设置top值
      var minTop = Math.min.apply(null, row);
      var index = row.indexOf(minTop);
      img.style.top = config.pullOver ? minTop + "px" : minTop + info.gap + "px";
      row[index] += img.clientHeight + info.gap;
      //设置left值
      img.style.left = config.pullOver ? (config.imgWidth+info.gap)*index + "px" : (config.imgWidth+info.gap)*index + info.gap + "px";
    })
    //设置容器高度
    config.container.style.height = config.pullOver ? Math.max.apply(null, row) - info.gap + "px" : Math.max.apply(null, row) + info.gap + "px";
  }
}