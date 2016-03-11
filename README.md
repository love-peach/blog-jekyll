http://www.w3cplus.com/solution/index/index.html
有意思的博客： 
-  http://www.itxuye.com/
- [hongkiat](http://www.hongkiat.com/blog/)
- [guolingfa](http://www.guolingfa.cn/)
- [make tech easier](https://www.maketecheasier.com/)
- [blog oh blog](http://www.blogohblog.com/)
- [deafpigeon](http://deafpigeon.co.uk/)
- [旅行博客](http://www.zcool.com.cn/work/ZMTQ0MDUyMDg=.html)
- [个人博客](http://www.zcool.com.cn/work/ZMTQxMTM1OTY=.html)
- [情侣博客网页手机版 ](http://www.zcool.com.cn/work/ZNjE3NzcxNg==.html)
- [Erique Chong's Personal Website](http://www.zcool.com.cn/work/ZMTQ2MzYyMDg=.html)
- [anew](http://demo.alxmedia.se/anew/)
- [单列](http://www.zcool.com.cn/work/ZMzM4NDYzNg==.html)
- [猫猫](http://www.2zzt.com/bokezhuti/5987.html) 

# gh-pages 页面

###How Creat Project Page
参考链接：[Creating Project Pages manually](https://help.github.com/articles/creating-project-pages-manually/)
- 首先，我们在github上创建一个项目仓库。
- 然后，将这么项目仓库克隆到本地。 

```command
git clone github.com/user/repository.git
```
- 接着，创建gh-pages分支。(分支名字必须是这个名字)

```command
cd repository  
git checkout --orphan gh-pages  
git rm -rf . 
#这个移除命令是移除master分支或者其他分支的内容，保证第一次创建的时候，仓库是干净的。
```
- 然后，添加内容到该分支。

```command 
echo "My Page" > index.html
```
- 最后，add,commit,push。  
``` command 
git add index.html
git commit -a -m "First pages commit"
git push origin gh-pages
```

## TODO 

- [ ] 结合gulp自动压缩等任务，或者看jekyll有自带的插件没

## DONE 
- [x] 本地搭建jekyll环境
- [x] 初始化jekyll并上传到github

## DOING

### 1. 本地搭建jekyll环境

`参考链接：` [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/#troubleshooting)
`参考链接：` [使用 GitHub, Jekyll 打造自己的独立博客](http://www.tuicool.com/articles/BVVBvu)
`参考链接：` [jekyll中文网](http://jekyll.bootcss.com/)

**貌似官网上说不管是uer pages 还是project pages页面发布后，github会处理jekyll语法的，不需要在本地安装jekyll。只是为了能在发布之前预览和调试页面，最好还是安装比较好。**

- 更新ruby。推荐使用rvm安装ruby。所以先安装rvm。[安装rvm出错处理方法](http://blog.csdn.net/caspiansea/article/details/47802331)

> curl -L get.rvm.io | bash -s stable --ruby  

    在安装rvm时，可能会报这样的错：public key not found（无法检查签名：找不到公钥），这时你的终端找到这句话：
    try downloading the signatures:  
    gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
    然后执行gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3，
    然后再执行curl -L get.rvm.io | bash -s stable --ruby，

- 在 ~/.profile 或 ~/.bashrc文件中添加如下代码：

> [[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm"


- 安装github-pages或者Bundler 。这里有两套方案选择，参考 [Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/#troubleshooting)。我用的是直接安装github-pages，会将所以来的包统一安装上，包括jkeyll。

    这里需要注意下，可能由于你的网络环境这一步执行不了报错，`参考链接：`[解决国内gem不能用的问题](http://www.haorooms.com/post/gem_not_use)`ERROR:  While executing gem ...(Gem::RemoteFetcher::FetchError)    Errno::ECONNRESET: Connection reset by peer - SSL_connect (https://api.rubygems.org/quick/Marshal.4.8/github-pages-43.gemspec.rz)`原因是ruby 的gem被和谐了，现在淘宝的ruby工程师架设了rubygems的国内镜像。使用方法如下：
```command
$ gem sources --remove https://rubygems.org/
$ gem sources -a https://ruby.taobao.org/
$ gem sources -l
*** CURRENT SOURCES ***
https://ruby.taobao.org
```

### 2. 初始化jekyll并上传到github

`参考链接：` [搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)

- 在github上新建一个仓库。例如：blog-jekyll

- 在本地，jekyll初始化一个同名的文件夹。

> jekyll new blog-jekyll

- 进入该文件夹，初始化git

> cd blog-jekyll
> git init

- 新建gh-pages分支

> git checkout --orphan gh-pages

- 将远程服务器添加到本地仓库中。

>  git remote add origin https://github.com/love-peach/blog-jekyll.git

- 添加 提交 推送

> git add -all
> git commit -m "first post"
> git push origin gh-pages

### 3. 博客搭架子

- [x] 设计自己博客的样式
- [x] 生成导航栏　链接，顺序
- [x] 子页面（每个子页面一个首页）
- [x] 生成分类

```html
<ul>
    {% for category in site.categories.html %}
    <li>
       <a href="{{category.url | prepend: site.baseurl }}">{{category.title }} {{ category.date | date: "%b %-d, %Y" }}</a>
    </li>
    {% endfor %}
</ul>
```


### 4. 代码高亮

jekyll 自身就带有代码高亮的功能。需要安装Pygments: `gem install pygments.rb` ,然后修改_config文件：
`markdown: kramdown (注意换行) highlighter: pygments`,然后重启jekyll即可。

目前，github-pages的最新版本推荐使用rouge，只需要修改`highlighter: rouge`，然后重启jekyll.

默然的代码高亮主题，如果不太喜欢，可以修改。一种简便方法是，直接修改highlight默认主题样式css即可。
可以上[这里](http://pygments.org/demo/3666780/)，右边选择你喜欢的主题，然后F12，找到pygments.css 下载即可。

或者在某个文件夹下，打开终端`rougify style monokai.sublime > rouge.css`，这样在这个文件夹就有了一个rouge.css的文件，替换默认的主题样式即可。

可能背景不是黑色的，你可以自己修改一下，打开　rouge.css　添加如下代码：
```style
.highlight {
    margin: 0 -15px 2rem;
    padding: 1px 1rem;
    background-color: #202020;
    overflow-x: auto;
}
```

如需代码显示行号，这样：`{% highlight html linenos %}`

参考链接：[Jekyll 代码高亮的几种选择](http://www.2cto.com/kf/201602/489968.html)
我用的主题：　[monokai](http://pygments.org/demo/3666780/?style=monokai),[下载地址](http://pygments.org/_static/pygments.css)

### 5. 图床选择

在网站中，不可避免的需要使用图片，如果图片比较少，当然可以放在当前项目的对应目录中，但是当图片变得多了起来，
我们就需要找个地方，将图片什么的静态资源放在一起，一方面方便管理，另一方面也能一定程度上做到CDN的效果。那么，
问题来了，我们将图片放在哪呢。我这里试了几种办法，记录一下

- 第一种：　使用百度云。

百度云的使用就不多说，自行百度。当我们吧文件上传到百度云后，创建文件外链，就可以拿来用，`问题`是百度云的外链有时效。好像是两个小时。

- 第二种：使用github仓库。

在github上创建一个仓库，专门存放静态资源文件。然后在github中打开这个文件，点击右上角的`Raw`,这时会在浏览器中看到这个文件，
地址栏中的地址就是你要用的文件外链，例如:  
https://raw.githubusercontent.com/love-peach/images/master/cloudIMG/img/picture/indexBanner1.jpg  
注意，这个外链前面的一长串都是一样的，不变的，需要用应用不同的文件，只需要改变后面的文件名就行，例如:  
https://raw.githubusercontent.com/love-peach/images/master/cloudIMG/img/picture/indexBanner2.jpg

`问题`是github毕竟是个代码托管网站，适合存放代码的，不太适合存放图片等文件，而且有仓库大小限制，好像是1G.

- 第三种：使用七牛云存储。

七牛云存储，空间10G,足够我用了，而且免费。点击文件，在右侧就有文件的外链，图片外链跟github一样好用，前面一大串也是一样的。例如：　
http://7xrioc.com1.z0.glb.clouddn.com/img%2Fillustration%2F2016.jpg
（自动将外链转码）

如果升级为标准用户后，这个一大长串的字符，可以解析为你的域名。下面说下，怎么在本地（ubuntu系统）利用qrsync工具批量上传文件到七牛云存储。

首先，创建七牛账号，创建空间，获取AK值，和SK值（七牛提供，在账号－秘钥下）。
然后，下载qrsync工具。然后在qrsync的目录下，打开终端，`cp qrsync /usr/local/bin/`（不然，无法在终端中使用qrsync命令）
接着，配置qrsync。随便在哪个目录下创建conf.json文件，内容如下：　
```javascript
{
    "access_key": "Please apply your access key here",
    "secret_key": "Dont send your secret key to anyone",
    "bucket": "Bucket name on qiniu resource storage",
    "sync_dir": "Local directory to upload",
    "async_ops": "fop1;fop2;fopN",
    "debug_level": 1
}
```
具体参数啥意思，自行百度。提供参考链接[如何使用七牛云做为图床？](http://www.jianshu.com/p/6dce6094bf61) [qrsync 命令行同步工具](http://docs.qiniu.com/tools/v6/qrsync.html)

另外需要注意的时，有可能你的qrsync执行不了，可能时.qrsync文件夹缓存的问题，删除该文件夹下的文件就行。
 
 
### 6.使用html格式发布文章

跟使用markdown发布文章一样，添加好头部信息，指定好模板，就可以开始写文章了。不用写｀<html>｀,`<head>`,`<body>`等标签了。

在markdown中新起一行，网页渲染出来时是有个p标签的，因此我们在写的时候注意带上相应的标签即可。比如｀[]()｀渲染出来是一个链接，那么就用一个a链接去写。
 

- [x] 分页功能。

    中文网上有相关文档一看就懂，但是需要注意的是，好笑得在_config.yml文件中增加这一行代码：`gems: [jekyll-paginate]`

### jekyll 使用注意事项

- 启动了多个jekyll,如何关闭

    一般来说，在终端使用命令`jekyll serve`默认在4000端口启动，可以为不同的jekyll设置不同的端口启动，如果未设置
    这时启动多个jekyll项目会报错：`Address already in use - bind(2) for 127.0.0.1:4000`,可以通过命令来关闭
    如果你想关闭服务器，可以使用`kill -9 1234`命令，"1234" 是进程号（PID）。
    如果你找不到进程号，那么就用`ps aux | grep jekyll`命令来查看，然后关闭服务器。

- 第一次搭建jekyll环境时，分页插件并不会自动安装，编译时报错，需要手动安装`gem install jekyll-paginate`

npm install --save-dev gulp gulp-less gulp-minify-css gulp-autoprefixer gulp-jshint gulp-uglify imagemin-pngquant gulp-changed gulp-clean gulp-notify browser-sync gulp-concat gulp-rename gulp-imagemin run-sequence
