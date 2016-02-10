有意思的博客：  
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
>  git push origin gh-pages

### 博客搭架子

- [x] 设计自己博客的样式
- [x] 生成导航栏　链接，顺序
- [x] 子页面（每个子页面一个首页）
- [x] 生成分类


npm install --save-dev gulp gulp-less gulp-minify-css gulp-autoprefixer gulp-jshint gulp-uglify imagemin-pngquant gulp-changed gulp-clean gulp-notify browser-sync gulp-concat gulp-rename gulp-imagemin run-sequence
