Page({
  data: {
      current:0,
      blank:"http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/blank/50",
  
    allImgUrls:[
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/0/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/1/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/2/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/3/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/4/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/5/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/6/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/7/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/8/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/9/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/10/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/11/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/12/50',
        'http://zzb.pcauto.com.cn/tools/img/?500x300/05a/fff/13/50'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  change:function(e){
    var current = e.detail.current


   console.log(e)

  
     this.setData({
        current:current
    })
  },

  getThree:function(current){
      var arr = [];
      var L = current-1,
            C = current,
            R = current+1;

    var length = this.data.allImgUrls.length;


    if(L<0){
        L=0;
        C=1;
        R=2;
    }else if(R>=length){
         L=current-2;
        C=current-1;
        R=current;
    }
      arr.push(L,C,R);

      return arr;
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})