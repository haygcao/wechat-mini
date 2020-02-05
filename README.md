
## 基于 MeEdu 2.x版本 开发的微信小程序


#### 使用教程

下载代码：

```
git clone https://github.com/Meedu/wechat-mini.git meedu-wechat-mini
```

修改Api请求地址（`api/instance.js`）：

```
const baseUrl = 'http://127.0.0.1:8000'
```

将其中的地址改为你自己的地址。

修改应用名（`app.json`）：

```
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "我是应用名",
    "navigationBarTextStyle": "black",
    "navigationStyle": "custom"
  },
```

将其中的 `我是应用名` 改为你自己的小程序名称。

接下来使用微信小程序开发工具导入该项目，填写自己的 `AppId` ，然后上传即可。