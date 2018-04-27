var app = new Vue({
    el: "#app",
    data: {
        isLogin: false,
        loginError:false,
        username: "",
        msg: "",
        msgList:[],
        msgBoxHeight: {
            height: "40px"
        },
        sending: false
    },
    methods: {
        // 登录
        login() {
            const _this = this;

            let username = this.username;

            let logining = this.logining;

            if (logining || !username) return;

            _this.logining = true;

            $.ajax({
                    url: '/chat/login.php',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username
                    }
                })
                .done(function(data) {

                    if (data.code == 0) {
                        _this.isLogin = true;
                         localStorage["user"] = username;
                        _this.polling();
                    }

                    if (data.code == 1) {
                    	_this.loginError = true;
                    }

                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    _this.logining = false;
                });
        },

        autoLogin() {
            let username = localStorage["user"];

            if (username) {
                this.username = username;
                this.isLogin = true;
                this.polling();
            }
        },

        // 发送消息
        send() {
            const _this = this;

            let username = this.username;
            let msg = this.msg;

            let sending = this.sending;


            if (!username || !msg || sending) return;

            this.sending = true;

            let data = {
                username,
                msg,

            }

            $.ajax({
                    url: '/chat/send.php',
                    type: 'POST',
                    dataType: 'json',
                    data
                })
                .done(function() {
                    console.log("success");
                    _this.clearMsgBox();
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    _this.sending = false;
                });

        },

        // 清空发送消息框
        clearMsgBox() {
            this.msg = "";
            this.msgBoxHeight.height = "40px";
        },

        // 消息框输入
        input(e) {
            let target = e.target;
            let height = target.scrollHeight + 2;

            height = height > 120 ? 100 : height;

            this.msgBoxHeight.height = height + "px";

        },

        // 获取消息列表
        getMessage(pageSize) {
        	const _this = this;

            var pageSize = pageSize || 30;

            $.ajax({
                    url: '/chat/get.php?pageSize=' + pageSize,
                    dataType: 'json'
                })
                .done(function(data) {
                	
                	_this.msgList = data;

                	// $("#JmessageBox").scrollTop($("#JmessageBox")[0].offsetHeight)
                })
                .fail(function() {})
                .always(function() {});
        },
        polling(){
        	setInterval(this.getMessage,1000)
        }
    },
    mounted() {
        this.autoLogin();


    }
})