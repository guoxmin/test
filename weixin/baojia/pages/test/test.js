var t = +new Date();

Page({
  data: {
      current:0,
      blank:"http://www.atool.org/placeholder.png?size=400x200&text=blank",

      currentList:[],
  
    allImgUrls:[
        'http://www.atool.org/placeholder.png?size=400x200&text=0',
        'http://www.atool.org/placeholder.png?size=400x200&text=1',
        'http://www.atool.org/placeholder.png?size=400x200&text=2',
        'http://www.atool.org/placeholder.png?size=400x200&text=3',
        'http://www.atool.org/placeholder.png?size=400x200&text=4',
        'http://www.atool.org/placeholder.png?size=400x200&text=5',
        'http://www.atool.org/placeholder.png?size=400x200&text=6',
        'http://www.atool.org/placeholder.png?size=400x200&text=7',
        'http://www.atool.org/placeholder.png?size=400x200&text=8',
        'http://www.atool.org/placeholder.png?size=400x200&text=9',
        'http://www.atool.org/placeholder.png?size=400x200&text=10',
        'http://www.atool.org/placeholder.png?size=400x200&text=11'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad:function(){

    var r = this.getThree(0);

    var arr = this.data.allImgUrls.slice(r[0],r[0]+3)

      this.setData({
          currentList:arr
      })
  },
  change:function(e){

    var self = this;

    // t = +new Date();

    console.log((+new Date()-t))

    if((+new Date()-t)<200) return;
    

    console.log(11)


    var current = e.detail.current


     var r = this.getThree(current);


// console.log(this.data.allImgUrls)
   var arr = this.data.allImgUrls.slice(r[0],r[0]+3)


    // console.log(t)

    

self.setData({
          currentList:arr
      })

   setTimeout(function(){
         self.setData({
          current:1
      })
   },1500)


  
    //  this.setData({
    //     current:current
    // })
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


