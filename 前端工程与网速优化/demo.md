title: 前端工程与性能优化
speaker: 郭学敏
url: 
transition: slide3
files: /js/demo.js,/css/demo.css,/js/zoom.js
theme: moon
usemathjax: yes

[slide]
# 前端工程与性能优化
<small>演讲者：前端开发部-郭学敏</small>


[slide]

## 经典！
----

<img  src="/img/1.jpg" id="img1" class="no-screenfull">

<style>
#img1{
    width: 600px;
}
</style>




[slide]
## 性能优化原则及分类


优化方向|优化手段
--------|:------
请求数量|合并js和css，*CSS Sprites*，拆分初始化负载，*划分主域*
请求带宽|*开启GZip*，*压缩js和CSS*，移除重复脚本，*图像优化*，*减少cookie大小*
缓存利用|*使用CDN*，*使用外部js和CSS*，*减少DNS查找*，添加Expires或Cache-Control，配置ETag或last-modified
页面结构|将样式表放在顶部，将脚本放在底部，*精简DOM结构*
代码校验|*避免CSS表达式*，*避免重定向*



[slide]

优化方向|优化手段
--------|:------
请求数量|合并js和css，拆分初始化负载
请求带宽|移除重复脚本
缓存利用|添加Expires或Cache-Control，配置ETag或last-modified
页面结构|将样式表放在顶部，将脚本放在底部






[slide]
###Expires? Cache-Control? ETag? last-modified?

----

<img  src="/img/2.jpg" id="img2" class="no-screenfull">



[slide]
##缓存与静态资源版本更新


[slide]

先来看看现在一般前端团队的做法：

----

<div class="columns-1">
    <pre><code class="html">
&lt;h1>hello world&lt;/h1&gt;

&lt;script type="text/javascript" src="a.js?t=20170523"&gt;&lt;/script&gt;
或者
&lt;script type="text/javascript" src="a.js?t=v1.1.0"&gt;&lt;/script&gt;
    </code></pre>
   
</div>




  


[slide]

# 覆盖式发布
----

<img  src="/img/3.jpg" id="img3" class="no-screenfull">



[slide]
## 弊端？

1. 如果先覆盖index.html，后覆盖a.js，用户在这个时间间隙访问，会得到新的index.html配合旧的a.js的情况，从而出现错误的页面。 {:&.fadeIn}

1. 如果先覆盖a.js，后覆盖index.html，用户在这个间隙访问，会得到旧的index.html配合新的a.js的情况，从而也出现了错误的页面。


[slide]

# 非覆盖式发布

<span  class="text-success">方案：文件名添加`md5`戳</span>

<div class="mt15"></div>
<div class="columns-1">
    <pre><code class="html">
&lt;script type="text/javascript" src="a.js"&gt;&lt;/script&gt;
    </code></pre>
   
</div>

发布后代码变成

----

<div class="columns-1">
    <pre><code class="html">
&lt;script type="text/javascript" src="a_8244e91.js"&gt;&lt;/script&gt;
    </code></pre>
   
</div>

[slide]

## 好处？

1. 上线的a.js不是同名文件覆盖，而是文件名+md5戳，所以可以先上线静态资源，再上线html页面，不存在间隙问题； {:&.fadeIn}
1. 遇到问题回滚版本的时候，无需回滚a.js，只须回滚页面即可；
1. 由于静态资源版本号是文件内容的md5，因此所有静态资源可以开启永久强缓存，只有更新了内容的文件才会缓存失效，缓存利用率大增。
  

[slide]

优化方向|优化手段
--------|:------
请求数量|合并js和css，拆分初始化负载
请求带宽|移除重复脚本
页面结构|将样式表放在顶部，将脚本放在底部


[slide]
# 静态资源管理与模块化框架



[slide]
<img  src="/img/4.jpeg" id="img4" class="no-screenfull">



[slide]
## 某个web产品页面有A、B、C三个资源
<img  src="/img/4.png" id="imgpng4" class="no-screenfull">


[slide]
## 工程师根据“减少HTTP请求”的优化原则合并了资源
<img  src="/img/5.png" id="imgpng5" class="no-screenfull">

[slide]
## 新需求：C模块按需出现，此时C资源已出现多余的可能
<img  src="/img/6.png" id="imgpng6" class="no-screenfull">

[slide]
## C模块不再需要了，注释掉吧！代码1秒钟搞定，但C资源通常不敢轻易剔除
<img  src="/img/7.png" id="imgpng7" class="no-screenfull">

[slide]
## 不知不觉中，性能优化变成了性能恶化……
<img  src="/img/8.png" id="imgpng8" class="no-screenfull">



[slide]
## 使用工具在线下进行静态资源合并存在的问题？

1. 无法解决资源按需加载，导致资源的冗余
2. 资源加载和使用分离，非常容易引起维护不同步的问题，导致使用资源的代码删除了，引用资源的代码却还在的情况



[slide]
## 理想要求

1. 在使用资源的地方引用资源（就近依赖，就近维护），不使用不加载（按需）
2. 虽然资源引用不是集中书写的，但资源引用的代码最终还能出现在页面头部（css）或尾部（js）
3. 能够避免重复加载资源（去重）

[slide]
## 将以上要求综合考虑，不难发现，单纯依靠前端技术或者工具处理是很难达到这些理想要求的。

[slide]
## 新的模板架构设计
>  核心思想：基于依赖关系表的静态资源管理系统与模块化框架设计


[slide]
#### 考虑一段这样的页面代码：
<div class="columns-1">
    <pre><code class="html">
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;page&lt;/title&gt;
    &lt;link rel="stylesheet" type="text/css" href="a.css"/&gt;
    &lt;link rel="stylesheet" type="text/css" href="b.css"/&gt;
    &lt;link rel="stylesheet" type="text/css" href="c.css"/&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div&gt; content of module a &lt;/div&gt;
    &lt;div&gt; content of module b &lt;/div&gt;
    &lt;div&gt; content of module c &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;    
</code></pre>
   
</div>


[slide]
#### 根据理想要求中的第二项，我们希望资源引用与使用能尽量靠近，这样将来维护起来会更容易一些，因此，理想的源码是：
<div class="columns-1">
    <pre><code class="html">
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;link rel="stylesheet" type="text/css" href="a.css"/&gt;
    &lt;div&gt; content of module a &lt;/div&gt;

    &lt;link rel="stylesheet" type="text/css" href="b.css"/&gt;
    &lt;div&gt; content of module b &lt;/div&gt;

    &lt;link rel="stylesheet" type="text/css" href="c.css"/&gt;
    &lt;div&gt; content of module c &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;    
</code></pre>
   
</div>


[slide]
##  带来的问题

*严重的页面闪烁！！！*

[slide]
#### 那么我们考虑一下这样的源码（以php为例）：
<div class="columns-2 mt15">
    <pre>模板<code class="html">
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;page&lt;/title&gt;
    &lt;!--[ CSS LINKS PLACEHOLDER ]--&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;?php load_widget('a'); ?&gt;
    &lt;?php load_widget('b'); ?&gt;
    &lt;?php load_widget('c'); ?&gt;
    &lt;!--[ SCRIPTS PLACEHOLDER ]--&gt;
&lt;/body&gt;
&lt;/html&gt; 
</code></pre>

<pre>目录结构<code class="html">
    ├── widget
    │   ├── a
    │   │   ├── a.css
    │   │   ├── a.js
    │   │   └── a.php
    │   ├── b
    │   │   ├── b.css
    │   │   ├── b.js
    │   │   └── b.php
    │   └── c
    │       ├── c.css
    │       ├── c.js
    │       └── c.php
    ├── index.php
</code></pre>
   
</div>

<p style="font-size:16px;">load_widget(wiget_id)：加载拆分成小组件模板的接口。我们需要一个接口把一个大的页面模板拆分成一个个的小部分来维护，最后在原来的页面中以组件为单位来加载这些小部件。</p>


[slide]
#### 而最终在模板解析的过程中，资源收集与去重、页面script收集、占位符替换操作，最终从服务端发送出来的html代码为：
<div class="columns-1">
    <pre><code class="html">
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;page&lt;/title&gt;
    &lt;link rel="stylesheet" type="text/css" href="a.css"/&gt;
    &lt;link rel="stylesheet" type="text/css" href="b.css"/&gt;
    &lt;link rel="stylesheet" type="text/css" href="c.css"/&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div&gt; content of module a &lt;/div&gt;
    &lt;div&gt; content of module b &lt;/div&gt;
    &lt;div&gt; content of module c &lt;/div&gt;
    &lt;script type="text/javascript" src="a.js"&gt;&lt;/script&gt;
    &lt;script type="text/javascript" src="b.js"&gt;&lt;/script&gt;
    &lt;script type="text/javascript" src="c.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
   
</div>

[slide]
### 不难看出，我们目前已经实现了 按需加载，将脚本放在底部，将样式表放在头部 三项优化原则。


[slide]
###   前面讲到静态资源在上线后需要添加md5戳作为版本标识，那么这种使用模板语言来收集的静态资源该如何实现这项功能呢？


[slide]
> 答案是：静态资源依赖关系表。

[slide]
### 目录结构

<div class="columns-2">
    <pre><code class="html">
    ├── widget
    │   ├── a
    │   │   ├── a.css
    │   │   ├── a.js
    │   │   └── a.php
    │   ├── b
    │   │   ├── b.css
    │   │   ├── b.js
    │   │   └── b.php
    │   └── c
    │       ├── c.css
    │       ├── c.js
    │       └── c.php
    ├── index.php
</code></pre>
   
</div>

[slide]
### 通过工具扫描得到该项目资源依赖表

<div class="columns-1">
    <pre><code class="html">
    {
    "res" : {
        "widget/a/a.css" : "/widget/a/a_1688c82.css",
        "widget/a/a.js"  : "/widget/a/a_ac3123s.js",
        "widget/b/b.css" : "/widget/b/b_52923ed.css",
        "widget/b/b.js"  : "/widget/b/b_a5cd123.js",
        "widget/c/c.css" : "/widget/c/c_03cab13.css",
        "widget/c/c.js"  : "/widget/c/c_bf0ae3f.js",
        "jquery.js"      : "/jquery_9151577.js",
        "bootstrap.css"  : "/bootstrap_f5ba12d.css",
        "bootstrap.js"   : "/bootstrap_a0b3ef9.js"
    },
    "pkg" : {}
}
</code></pre>
   
</div>

[slide]
### 利用查表来解决md5戳的问题，最终页面是这样的：

<div class="columns-1">
    <pre><code class="html">
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;page&lt;/title&gt;
    &lt;link rel="stylesheet" type="text/css" href="/bootstrap_f5ba12d.css"/&gt;
    &lt;link rel="stylesheet" type="text/css" href="/widget/a/a_1688c82.css"/&gt;
    &lt;link rel="stylesheet" type="text/css" href="/widget/b/b_52923ed.css"/&gt;
    &lt;link rel="stylesheet" type="text/css" href="/widget/c/c_03cab13.css"/&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div&gt; content of module a &lt;/div&gt;
    &lt;div&gt; content of module b &lt;/div&gt;
    &lt;div&gt; content of module c &lt;/div&gt;
    &lt;script type="text/javascript" src="/widget/a/a_ac3123s.js"&gt;&lt;/script&gt;
    &lt;script type="text/javascript" src="/widget/b/b_a5cd123.js"&gt;&lt;/script&gt;
    &lt;script type="text/javascript" src="/widget/c/c_bf0ae3f.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
    
</code></pre>
   
</div>

[slide] 
## 实现静态资源合并

*combo服务*

[slide] 

<div class="columns-1">
    <pre><code class="html">
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;page&lt;/title&gt;
    &lt;link rel="stylesheet" type="text/css" href="/??widget/a/a_1688c82.css,widget/b/b_52923ed.css,widget/c/c_03cab13.css"/&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div&gt; content of module a &lt;/div&gt;
    &lt;div&gt; content of module b &lt;/div&gt;
    &lt;div&gt; content of module c &lt;/div&gt;
    &lt;script type="text/javascript" src="/??widget/a/a_ac3123s.js,widget/b/b_a5cd123.js,widget/c/c_bf0ae3f.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
    
</code></pre>
   
</div>

[slide]


优化方向|优化手段
--------|:------
请求数量|拆分初始化负载


[slide]
### **拆分初始化负载** 的目标是将页面一开始加载时不需要执行的资源从所有资源中分离出来，等到需要的时候再加载
----


[slide]
> 方法：把静态资源表的一部分输出在页面上，供前端模块化框架加载静态资源


[slide]
<div class="columns-1">
    <pre><code class="html">
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;page&lt;/title&gt;
    &lt;link rel="stylesheet" type="text/css" href="/??widget/a/a_1688c82.css,widget/b/b_52923ed.css,widget/c/c_03cab13.css"/&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div&gt; content of module a &lt;/div&gt;
    &lt;div&gt; content of module b &lt;/div&gt;
    &lt;div&gt; content of module c &lt;/div&gt;
    &lt;script type="text/javascript" src="/??widget/a/a_ac3123s.js,widget/b/b_a5cd123.js,widget/c/c_bf0ae3f.js"&gt;&lt;/script&gt;
    &lt;script&gt;
        //将静态资源表输出在前端页面中
        require.config({
            res : {
                'dialog.js' : '/dialog_fa3df03.js'
            }
        });
   &lt;/script&gt;
   &lt;script&gt;
        $(document.body).click(function(){
            //require.async接口查表确定加载资源的url
            require.async('dialog.js', function(dialog){
                dialog.show('you catch me!');
            });
        });
   &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
    
</code></pre>
   
</div>


[slide]
## 总结
> 性能优化是一个工程问题  


[slide]
# 谢谢大家！
