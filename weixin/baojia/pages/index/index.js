//index.js


//获取应用实例
var app = getApp()
Page( {
  data: {
    flag:true,
    toView:"",
    animationData:{},
    tabIndex:0,
    slide:false,
    brand: {}
      
  },
  //事件处理函数
  goSearch: function() {
    wx.navigateTo( {
      url: '../search/search'
    })
  },
  onLoad: function() {

    this.getBrand();
   
  },
  getBrand:function(){

    var self = this;

    wx.request({
      url: 'http://price.pcauto.com.cn/api/hcs/select/dashouye/brand_json_chooser?data=json&v2',
      
      success: function(res) {
        self.setData({
          brand:res
        })
      }
    })
  },
  goToView:function(e){
    this.setData({
        toView:e.currentTarget.dataset.captial
      })
  },
  scroll:function(e){
    // console.log(e)
  },
  openSlide:function(e){
    
    this.setData({
     slide:true
    })

    var animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease',
    })

    

    animation.right(0).step()

    this.setData({
      animationData:animation.export()
    })
    
  },
  closeSlide:function(){
   

    var animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease',
    })


    animation.right("-13rem").step()

    this.setData({
      animationData:animation.export()
    })

    setTimeout(function(){
      this.setData({
        slide:false
      })
    }.bind(this),820)
  },
  tab:function(e){
    this.setData({
      tabIndex:e.currentTarget.dataset.index
    })
  }
})

