# 云协作

https://note.youdao.com/group/#/50380124

# 开发

用yarn管理包，入口都在package.json的scripts中，比如yarn dev-playground就可以开始开发题目渲染器。dev-是开发，build-是编译，clear-是清理，cp-是复制到其他项目，cb-是clear+build，cbp-是clear+build+cp。package.json的scripts条目非常多，是因为当时不想用gulp，如果之后觉得不方便，也可以把这些条目改成gulp实现。

## 项目文件组织结构介绍

文件夹|用途
:-|:-
dist|编译产出
src|源代码
src/common|一些通用代码
src/common/animations|一些通用的lottie动画数据
src/common/components|一些通用的组件
src/common/components/HandwritingCanvas|手写板
src/common/components/Playground|题目渲染器（暂时起名叫playground）
src/common/components/Playground/blocks|Block及其子类，Block是题目基本元素
src/common/components/Playground/other|其他组件
src/common/components/Playground/widgets|单个题目渲染器的全局唯一组件
src/common/constants|常量
src/common/io|js和native的互调接口
src/common/sounds|一些通用的音效
src/common/utils|一些通用的工具
src/isolations|一些相互独立的代码
src/isolations/player|断点播放器
src/isolations/playground|题目渲染器单独编译入口
src/isolations/queman|出题系统
src/isolations/studyReport|学习报告
src/sundries|一些杂物
src/sundries/playgroundSundry|出题系统相关的一些杂物
src/sundries/scripts|一些脚本
webpack|webpack编译配置。其下的大部分文件夹和src/isolations下的文件夹对应，表示其编译配置
webpack/playground_player|表示题目渲染器、断点播放器的联合编译配置，因为断点播放器也用到了题目渲染器，可以一起编译减少产出

## 断点播放器开发配置

* 启动webpack-dev-server, 监听8080端口

```
yarn dev-player
```

* 打开http://localhost:8080/

---

断点播放器的断点默认被注释掉了，解开src/isolations/player/mock.js的breakpoints相关注释即可看到题目中断播放器。

## 题目渲染器开发配置

* 启动webpack-dev-server, 监听8088端口

```
yarn dev-playground
```

* 打开http://localhost:8088/

---

改变url刷新页面可以开发不同的题型，比如http://localhost:8088/#127

数字和题型的具体对应关系可以参考src/isolations/playground/mock.js文件。

手写识别服务在开发环境的话，目前部署在部署机上。部署机目前的ip是10.216.17.40，变了的话可以联系刘俊灏。用PM2维护，名称叫k12-hw，目录在/home/cloudstorage/lsh/k12-hw-recognizer。这个服务由于网段的限制，目前只有杭州能访问到，之后可能需要搬到测试环境，最好是docker环境，当然在本地跑一下[这个项目](https://gitlab.corp.youdao.com/k12/k12-hw-recognizer/tree/single)也是可以的。app里是native跑的TensorFlow。

## 出题系统开发配置

* 启动webpack-dev-server, 监听8080端口

```
yarn dev-queman
```

* 配置nginx

```
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 9401;

    location /auth {
        proxy_pass http://k12queman.youdao.com;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api {
        proxy_pass http://k12queman.youdao.com;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location / {
        proxy_buffering off;

        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

* 配置Chrome插件 Host Switch Pro

```
localhost:9401 k12queman.youdao.com
```

* 打开https://k12queman.youdao.com

---

要注意当前是测试环境还是线上环境，切换环境之后，有时候需要nginx -s reload。

ms环境的hosts配置为：

```
103.72.47.155 login.k12.youdao.com
103.72.47.155 k12.youdao.com
103.72.47.155 k12admin.youdao.com
103.72.47.155 k12queman.youdao.com
103.72.47.155 shuxue.youdao.com
103.72.47.155 k12internal.youdao.com
```

ga环境的hosts配置为：

```
103.72.47.156 login.k12.youdao.com
103.72.47.156 k12.youdao.com
103.72.47.156 k12admin.youdao.com
103.72.47.156 k12queman.youdao.com
103.72.47.156 shuxue.youdao.com
103.72.47.156 k12internal.youdao.com
```

cd环境的hosts配置为：

```
123.125.40.104 shuxue.youdao.com
123.125.40.104 k12internal.youdao.com
123.125.40.104 k12admin.youdao.com
123.125.40.104 k12queman.youdao.com
```

离线环境的hosts配置为：

```
123.58.182.196 shuxue.youdao.com
123.58.182.196 k12admin.youdao.com
123.58.182.196 k12queman.youdao.com
123.58.182.196 k12internal.youdao.com
```

## 出题系统部署
* 部署到ms环境
```
yarn build-queman-ms
yarn deploy-queman-ms
```

* 部署到ga环境
```
yarn build-queman-ga
yarn deploy-queman-ga
```

## 出题系统上线
```
yarn build-queman
dist文件夹拷贝到https://gitlab.corp.youdao.com/k12/k12quemanTarget
上线产品ynote_k12_server-k12quemanTarget，master分支
```

## 学习报告开发配置

* 启动webpack-dev-server, 监听8080端口

```
yarn dev-studyReport
```

* 打开http://localhost:8080/studyReport.html

## 微信小程序内webview题板

* 启动webpack-dev-server, 监听8084端口
```
npm run dev-applet
```

* 上线
```
将feature分支合到online分支，在ticket里选择ynote_k12-web-applet-webview项目的自助上线，代码分支填online，代码版本号填online分支的最新版本号





