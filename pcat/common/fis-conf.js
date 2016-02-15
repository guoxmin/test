var meta = require('./package.json');
fis.set('project', meta.name);
fis.set('version', meta.version);

// 设置输出路径
var outputPath = "../../_output";

fis.match('*', {
    release: false
});

fis.media('qa').match("/widget/**/(*.js)", {
    useHash: true,
    release: "${project}/${version}/j/$1",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/'
    })
})

.match("/widget/**/(*.css)", {
    useHash: true,
    release: "${project}/${version}/c/$1",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/'
    })
})


.match("/widget/**/{(*.jpg),(*.png),(*.gif)}", {
    useHash: true,
    release: "${project}/${version}/i/$1$2$3",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/'
    })
})

.match("/npm_module/zepeto*j/{(*.jpg),(*.png),(*.gif)}", {
    useHash: true,
    release: "${project}/${version}/i/$1$2$3",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/static/'
    })
})

.match("/widget/**/{(*.html),(*.cms),(*.tpl)}", {
        useHash: true,
        isHtmlLike: true,
        isWidget: true,
        useSameNameRequire: true,
        useMap: true,
        release: "${project}/${version}/template/$1$2$3",
        deploy: fis.plugin('local-deliver', {
            to: outputPath + '/qa/template/'
        })
    })
    .match("/page/**/{(*.html),(*.cms),(*.tpl)}", {
        // useHash: true,
        useSameNameRequire: true,
        isPage: true,
        extras: {
            isPage: true
        },
        useMap: true,
        release: "${project}/${version}/template/$1$2$3",
        deploy: fis.plugin('local-deliver', {
            to: outputPath + '/qa/template/'
        })
    })


fis.media('qa').match("*.html", {
    parser: fis.plugin("widget-load")
})

.match("::package", {
    packager: function(ret, conf, settings, opt) {
        var projectPath = fis.project.getProjectPath();

        var res = ret.map["res"];

        // 已存在的项目
        var project = {};

        Object.keys(res).forEach(function(key, index) {
           var namespace = key.split(":")[0];
           project[namespace] = true;
        });


        Object.keys(res).forEach(function(key, index) {
            var id = res[key];

            if (id.extras && id.extras.isPage) {
                comboMap(id["deps"]);
            }
        });

        // 生成依赖表MD5
        res["hash"] = fis.util.md5(JSON.stringify(res));

        function comboMap(deps) {
            deps.forEach(function(dep, index) {

                var namespace = dep.split(":")[0];

                if (project[namespace]) return;

                var ohterDeps = requireOhteProjectDeps(namespace, dep);

                extend(res,ohterDeps["res"]);

                project[namespace] = true;

            })
        }

        function extend(target,object){
            for(var x in object){
                target[x] = object[x];
            }
        }


        // 获取其他系统的依赖表
        function requireOhteProjectDeps(project, dep) {

           var version = require(projectPath + "/../" + project + "/package.json").version;
            var media = fis.project.currentMedia() || "dev";

            // 跨系统获取资源依赖表
            var mapPath = projectPath + "/" + outputPath + "/" + media + "/map/" + project + "/" + version + "/map.json";


            var map = require(mapPath);

            return map;
        }

    }
})

.match("*map.json", {
    useHash: false,
    release: "${project}/${version}/$0",
    deploy: fis.plugin('local-deliver', {
        to: outputPath + '/qa/map/'
    })
})
