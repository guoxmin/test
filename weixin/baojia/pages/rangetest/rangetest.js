var touchstartPosX,
    rangeLStartPosX,
    rangeRStartPosX,
    rangeStart;

Page({
    data: {
        loadingHidden: false,
        // 记录滑块初始位置
        // touchstartPosX: 0,
        // 左侧滑块位置
        rangeLPosX: 0,
        // 右侧滑块位置
        rangeRPosX: 0,
        // 单位
        units: "rpx",
        // 滑块宽度
        rangeWidth: "480",
        scale:[5,10,15,20,25,40,60,80,100],

        // 价格范围 0~110
        RANGE: [0, 110],
        // 两个滑块最小数值间隔
        space: 5,
        // 当前价格范围 
        currentRange: [50, 90]
    },
    loadingChange: function() {

    },
    rangetap: function(e) {
        var targetID = e.target.id;

        if (!(targetID == "range-L" || targetID == "range-R")) {

            console.log(e)
        }
    },
    rangeTouchstart: function(e) {

        var targetID = e.target.id;

        // 只处理左右滑块的 touchmove 逻辑
        if (!(targetID == "range-L" || targetID == "range-R")) return;

        touchstartPosX = e.touches[0].clientX;
        rangeLStartPosX = this.data.rangeLPosX;
        rangeRStartPosX = this.data.rangeRPosX;
        rangeStart = this.data.currentRange;


    },
    rangeTouchmove: function(e) {


        var targetID = e.target.id;

        // 只处理左右滑块的 touchmove 逻辑
        if (!(targetID == "range-L" || targetID == "range-R")) return;

        // 滑块当前位置
        var rangeLPosX = this.data.rangeLPosX,
            rangeRPosX = this.data.rangeRPosX;

        var distance = this.data.distance;

        // console.log(distance)

        var rangeWidth = this.data.rangeWidth;

        // var touchstartPosX = this.data.touchstartPosX;

        var currentPosX = e.touches[0].clientX;

        // 移动的距离
        var move = currentPosX - touchstartPosX;

        var currentRange = this.data.currentRange;


        // 移动之后的位置
        var currentRangeLPosX = rangeLPosX,
            currentRangeRPosX = rangeRPosX;


        if (targetID == "range-L") {

            currentRangeLPosX = rangeLStartPosX + move;

            // console.log(currentRangeLPosX, rangeRPosX)

            // 左侧滑块超出左侧边界
            if (currentRangeLPosX <= 0) currentRangeLPosX = 0;

            // 左侧滑块等于或超出右侧滑块位置的时候
            if (currentRangeLPosX >= rangeRPosX - distance) {
                // console.log(currentRangeRPosX,rangeWidth)

                // 当右侧滑块位置超出右侧边界的时候
                if (currentRangeRPosX >= rangeWidth) {
                    currentRangeLPosX = rangeWidth - distance;
                    currentRangeRPosX = rangeWidth;
                } else {
                    // currentRangeRPosX += move
                    currentRangeRPosX = currentRangeLPosX + distance;
                }


            }


        }

        if (targetID == "range-R") {


            currentRangeRPosX = rangeRStartPosX + move;

            // console.log(currentRangeRPosX, rangeLPosX)

            // 右侧滑块距离超出右侧边界的时候
            if (currentRangeRPosX >= rangeWidth) currentRangeRPosX = rangeWidth;


            // 右侧滑块滑动位置超出或等于左侧滑块位置的时候
            if (currentRangeRPosX <= rangeLPosX + distance) {

                // 当右侧滑块滑动距离超出左侧边界
                if (currentRangeLPosX <= 0) {
                    currentRangeRPosX = 0 + distance;

                    currentRangeLPosX = 0;
                } else {
                    // currentRangeLPosX += move
                    currentRangeLPosX = currentRangeRPosX - distance;
                }


            }


        }

        // 设置当前左侧滑块对应值
        currentRange[0] = this.D2N(currentRangeLPosX);


        // 设置当前右侧滑块对应值
        currentRange[1] = this.D2N(currentRangeRPosX);

        this.setData({
            currentRange,
            rangeLPosX: currentRangeLPosX,
            rangeRPosX: currentRangeRPosX
        })



    },
    rangeTouchend: function() {
        // 判断范围是否有变化
        if (this.data.currentRange.toString() != rangeStart.toString()) {
            this.rangeChange();
        }
    },
    // 范围改变执行函数
    rangeChange: function() {

        console.log(this.data.currentRange)
    },
    // rpx 转 px
    rpx2px: function(rpx) {
        var windowWidth = this.data.windowWidth;

        return rpx * windowWidth / 750;


    },
    // 将宽度转为px
    changeRangeWidth2px: function() {

        var rpx = this.data.rangeWidth;

        var px = this.rpx2px(rpx);

        this.setData({
            units: "px",
            rangeWidth: px
        })

    },
    // 初始化滑块位置
    initRangeLRPOs: function() {

        var currentRange = this.data.currentRange;

        this.setData({
            rangeLPosX: this.N2D(currentRange[0]),
            rangeRPosX: this.N2D(currentRange[1])

        })
    },

    // 数值转距离
    N2D: function(N) {
        var rangeWidth = this.data.rangeWidth,
            range = this.data.RANGE;

        return N * rangeWidth / range[1];

    },

    // 距离转数值
    D2N: function(D) {
        var rangeWidth = this.data.rangeWidth,
            range = this.data.RANGE;

        return parseInt((D * range[1] / rangeWidth));

    },
    // 初始化两滑块最小数值间隔的距离
    initDistance: function() {
        var space = this.data.space;

        this.setData({
            distance: this.N2D(space)
        })
    },


    onLoad: function(options) {
        var self = this;

        wx.getSystemInfo({
            success: function(res) {

                self.setData({
                    loadingHidden: true,
                    windowWidth: res.windowWidth
                })

                self.changeRangeWidth2px();

                self.initRangeLRPOs();

                self.initDistance();


            }
        })


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
