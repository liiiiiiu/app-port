# 应用端口

记录Web开发时各项目在不同环境下使用的端口号，防止端口冲突。

## 使用

克隆代码到本地后，打开谷歌浏览器，点击 `更多工具 -> 扩展程序 -> 加载已解压的扩展程序 -> 选择chrome-extension文件夹`；

在chrome-extension目录下新增 data.json，并按以下规则输入数据：

```json
{
  "ports": [
    {
      // 应用名称
      "title": "应用A",
      // 应用描述，可不填
      "sub_title": "描述A",
      // 开发环境使用的端口号，可不填
      "dev_port": 3000,
      // 测试环境使用的端口号，可不填
      "test_port": 6000,
      // 生产环境使用的端口号，可不填
      "prd_port": 8000
    },
    {
      "title": "应用B",
      "sub_title": "",
      "dev_port": 3001,
      "test_port": null,
      "prd_port": null
    },
    // ...
  ]
}
```

### 插件展示

常规状态：

![常规状态](https://i.postimg.cc/pLgQ4xCj/1.png)

端口推荐：

![推荐端口](https://i.postimg.cc/Wzb0g4NB/2.png)

端口检测：

![推荐端口](https://i.postimg.cc/j5THqXGd/3.png)

![推荐端口](https://i.postimg.cc/bJRQZnh0/4.png)
