var meta = require('./package.json');
fis.set('name', meta.name);
fis.set('version', meta.version);


function getTemplate(tag,ret) {
    var fileName = tag.split("-")[1];

    var path = "/widget/" + fileName + "/" + fileName + ".html";


    // if (!fis.util.exists(path)) {
    //     path = "../common/" + path;
    // }

    // var content = fis.util.read(path, true).trim();
    
    var content = ret[path]["_content"];

    if (!content) {
        fis.log.error("找不到" + fileName + "组件");
    }

    return content;
}



//匹配组件标签
var regString = "<(w-[a-z]+)([^>]+)*(?:>(.*)<\\/\\1>|\\s+\\/)";

//匹配{{val}}
var propReg = /{{([^{}]+)}}/gmi;

//匹配标签的属性和值 k=v
var prostr = /(\S+)\s*\=\s*("[^"]*")|('[^']*')/gi;


//获取组件列表
function render(content,ret) {

    var pattern = new RegExp(regString, "gim");

    var widgets = content.match(pattern);

    if (widgets) {
        content = content.replace(pattern, function(tag, name, props) {


            
            var propsObj = {};
            
            if(props){
                var propsArr = props.trim().match(prostr);

                propsObj = require("querystring").parse(propsArr.join("&").replace(/["']/g,""));

            }

            var template = getTemplate(name,ret);

            template = template.replace(/^(<([a-z]+)([^<]+)*)(?=>)/,"$1 "+props).replace(propReg, function(prop, $1) {
                return propsObj[$1] || "";
            })


            return template;


        });

        return render(content);

    }


    return content;
}





fis.match('*', {
    release: false
});

fis.media('qa').match("/widget/**/(*.js)", {
    useHash: true,
    release: "${name}/${version}/j/$1",
    deploy: fis.plugin('local-deliver', {
        // to: '../qa/static/'
    })
})

.match("/widget/**/(*.css)", {
    useHash: true,
    release: "${name}/${version}/c/$1",
    deploy: fis.plugin('local-deliver', {
        // to: '../qa/static/'
    })
})


.match("/widget/**/{(*.jpg),(*.png),(*.gif)}", {
    useHash: true,
    release: "${name}/${version}/i/$1$2$3",
    deploy: fis.plugin('local-deliver', {

        // to: '../qa/static/'
    })
})



.match("/widget/**/(*.html)", {
        useHash: true,
        isHtmlLike: true,
        useSameNameRequire: true,
        useMap: true,
        release: "${name}/${version}/template/$1",
        deploy: fis.plugin('local-deliver', {
            // to: '../qa/template/'
        })
    })

.match("/widget/**/(*.cms)", {
        useHash: true,
        isHtmlLike: true,
        useSameNameRequire: true,
        useMap: true,
        release: "${name}/${version}/template/$1",
        deploy: fis.plugin('local-deliver', {
            // to: '../qa/template/'
        })
    })
    .match("/page/{(*.html),(*.cms),(*.tpl)}", {
        // useHash: true,
        isHtmlLike: true,
        useSameNameRequire: true,
        useMap: true,
        release: "${name}/${version}/template/$1$2$3",
        parser: function(content, file, settints) {
            // content = render(content);
            file.isPage = true;
            // console.log(content);

            return content;
        },
        deploy: fis.plugin('local-deliver', {
            // to: '../qa/template/'
        })
    })

.match('::package', {
    postpackager: function(ret, conf, settings, opt){
        // console.log(ret.ids["widget/header/header.html"]["_content"]);

        fis.util.map(ret.src, function (subpath, file){
            if(file.isHtmlLike && file.isPage){
              
                var content = render(file.getContent(),ret.src);

                  file.setContent(content);

            }
        })
    }
})

.match("map.json", {
    useHash: true,
    release: "${name}/${version}/$0",
    deploy: fis.plugin('local-deliver', {
        // to: '../qa/map/'
    })
})




fis.media('online').match("/widget/**/(*.js)", {
    useHash: true,
    release: "${name}/${version}/j/$1",
    deploy: fis.plugin('local-deliver', {
        to: '../online/static/'
    })
})



fis.media('online').match("/widget/**/(*.css)", {
    useHash: true,
    release: "${name}/${version}/c/$1",
    deploy: fis.plugin('local-deliver', {
        to: '../online/static/'
    })
})


fis.media('online').match("/widget/**/{(*.jpg),(*.png),(*.gif)}", {
    useHash: true,
    release: "${name}/${version}/i/$1$2$3",
    deploy: fis.plugin('local-deliver', {
        to: '../online/static/'
    })
})

fis.media('online').match("/widget/**/{(*.html),(*.cms),(*.tpl)}", {
    useHash: true,
    release: "${name}/${version}/$1$2$3",
    deploy: fis.plugin('local-deliver', {
        to: '../online/template/'
    })
})

fis.media('online').match("map.json", {
    useHash: true,
    release: "${name}/${version}/$0",
    deploy: fis.plugin('local-deliver', {
        to: '../online/map/'
    })
})

