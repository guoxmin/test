
//获取应用实例
var app = getApp()
Page( {
    data:{
        items:[]
    },
     bindKeyInput: function(e) {
         
        this.setData({
            // 模拟多条数据
            items: function(value){
                var ret = [];

                if(!value) return ret;

                for(var i=0; i<20; i++){
                    ret.push(value+i);
                }
                return ret;
            }(e.detail.value)
        })
    }
})

