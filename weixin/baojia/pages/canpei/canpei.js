Page({
    data: {
    	isScrollY:false,
        startX: 0,
        startY: 0
    },
    touchstart: function(e) {
        var clientX = e.touches[0].clientX,
            clientY = e.touches[0].clientY;

        this.setData({
            startX: clientX,
            startY:clientY
        })
    },
    touchmove: function(e) {
        var clientX = e.touches[0].clientX,
            clientY = e.touches[0].clientY;

     var diffX = (Math.abs(this.data.startX - clientX)),
    	diffY =(Math.abs(this.data.startY - clientY));



        if(diffY>diffX){
    	   this.setData({
	            isScrollY: true
	        })
        }else{
        	this.setData({
	            isScrollY: false
	        })
        }
    },
    onLoad: function(options) {

    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    }
})
