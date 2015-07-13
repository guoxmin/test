;(function(win){

    var blackReg = /a755\.100msh|cmigate|10\.123\.32\.253|192\.168\.50\.26/;

    //<ie8 没有公开Node类型构造函数
    if("Node" in window){
        rewriteAppendChild(Node.prototype);
    }else{
        var nodeList = [document.body,document.getElementsByTagName("head")[0]];

        var i=0, len = nodeList.length;
        for(; i<len; i++){
            rewriteAppendChild(nodeList[i]);
        }
    }

    function rewriteAppendChild(Node){
        var appendChild =  Node.appendChild;

       Node.appendChild = function(node){

            if(node.nodeName.toLowerCase()=="script"){

                var src = node.src,
                    domain = getDomain(src);

                if(blackReg.test(domain)) return;
            }

            appendChild.call(this,node);
        }

    }

    function getDomain(sUrl) {
        var regDomain = /^https?:\/\/([\w\-]+\.[\w\-.]+)/i;
        var m = regDomain.exec(sUrl);
        if(!m){
            return ; 
        }
        return m[1]; 
    }

})(window);