var app = new Vue({
    el: "#app",
    data: {
        username: "匿名",
        msg: "爱你",
        sending: false
    },
    methods: {
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
                    url: '/demo/chat/send.php',
                    type: 'POST',
                    dataType: 'json',
                    data
                })
                .done(function() {
                    console.log("success");
                    _this.msg = "";
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    _this.sending = false;
                });

        },


        msgBlur(e) {
            let target = e.target;

            let value = target.value.trim();

            this.msg = value;
        },
        showMsgError() {
            this.showError = true;

            setTimeout(() => {
                this.showError = false;
            }, 1000)
        }
    }
})


