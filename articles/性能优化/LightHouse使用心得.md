LightHouse使用心得



## 前言

阅读完本文，你可以了解到

- Lighthouse 是什么
- 如何快速上手Lighthouse 
- 衡量性能并找到加快页面加载的机会。



衡量性能并找到加快页面加载的机会。





Lighthouse为我们本地开发提供了非常好的性能检测工具，对于后续的各项测量标准都有较好的支持。缺点也很明显，不能在用户设备的机器上运行，所以它们不能反映用户真实的用户体验。



## Lighthouse 是什么

官方对它的解读:

> [Lighthouse](https://github.com/GoogleChrome/lighthouse) 是一个开源的自动化工具，用于改进网络应用的质量。 您可以将其作为一个 Chrome 扩展程序运行，或从命令行运行。 您为 Lighthouse 提供一个您要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告。



它是如何工作的呢？

如果你跟我一样，翻过它的代码，看过它的介绍肯定很懵逼，它的代码依赖性如下:

![](../../images/前端性能优化/lighthouse/lighthouse内部模块依赖.png)

感兴趣的可以看看它的仓库，参考链接已经给出。





## 使用入门

运行 Lighthouse 的方式有两种: 作为 Chrome 扩展程序运行，或作为命令行工具运行。 Chrome 扩展程序提供了一个对用户更友好的界面，方便读取报告。 命令行工具允许您将 Lighthouse 集成到持续集成系统。

### Chrome 扩展程序

下载 Google Chrome 52 或更高版本。

安装 [Lighthouse Chrome 扩展程序](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)。

> 地址:https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk

点击 **Generate report** 按钮以针对当前打开的页面运行 Lighthouse 测试。



### 命令行工具

Node CLI在配置和报告Lighthouse运行情况方面提供了最大的灵活性。如果用户需要更多的高级功能，或者想自动运行Lighthouse，可以使用Node CLI。安装 Lighthouse 作为一个全局节点模块。

**Installation**:

```bash
npm install -g lighthouse
# or use yarn:
# yarn global add lighthouse
```

针对一个页面运行 Lighthouse 审查。

```bash
lighthouse https://www.taobao.com/
```

传递 `--help` 标志以查看可用的输入和输出选项。

```bash
lighthouse --help
```

对于一些options不清楚的，可以点击这个链接:

> https://github.com/GoogleChrome/lighthouse#cli-options







## 参考

[1] **Lighthouse performance scoring**: https://web.dev/performance-scoring/

[2] **GoogleChrome-lighthouse**: https://github.com/GoogleChrome/lighthouse

[3] **What's New in Lighthouse 6.0**: https://web.dev/lighthouse-whats-new-6.0/

[4] **Measure:** https://web.dev/measure/

[5] **How does Lighthouse work?**: https://github.com/GoogleChrome/lighthouse/blob/master/docs/architecture.md

