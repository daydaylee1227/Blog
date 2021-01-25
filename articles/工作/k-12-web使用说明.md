## 项目初始化

[初始化项目教程地址](https://gitlab.corp.youdao.com/k12/k12-web/commit/9672d96e8bf3118af594ed476d30fc6d89bfc977)





**基础模板**

```react
import React from 'react'
import QuestionBlock from '../../../blocks/questionBlocks/QuestionBlock'
import IMAGE_SPEAKER_SHADOW from '../../../widgets/FixedVoice/speakerShadow.svg'
import { MODE } from '../../../../../../isolations/queman/constants'
import IMAGE_BG from './bg.svg'

const BG_NATURAL_WIDTH = 2304
const BG_NATURAL_HEIGHT = 694
const TOP_BAR_HEIGHT = 74

export default class FrogJumpToLotusLeafQuestion extends QuestionBlock {
    static type = 'FrogJumpToLotusLeafQuestion'
    _bg = this._renderBlock({
        type: 'BackgroundImage',
        data: IMAGE_BG,
    })
    constructor(...args) {
        super(...args)
        const { 
            props: {
                context: {
                    elBlocksContainer: {
                        clientWidth,
                        clientHeight,
                    },
                    widgets: {
                        fixedVoice,
                    },
                },
                config: {
                    questionInVideo,
                    mode
                },
            }
        } = this 
        this._mode = mode || MODE.NORMAL
        let scale = clientHeight / BG_NATURAL_HEIGHT
        if (questionInVideo) {
            scale = (clientHeight - TOP_BAR_HEIGHT) / BG_NATURAL_HEIGHT
        }
        const leftCut = (BG_NATURAL_WIDTH * scale - clientWidth) / 2
        fixedVoice.setShadow(IMAGE_SPEAKER_SHADOW, scale)
        console.log(leftCut, '------')
        this._context = '1232'
        this._contextStyle = {
            position: 'absolute',
            left: 1025 * scale - leftCut,
            top: 286.8 * scale,
            width: 264 * scale,
            height: 76 * scale,
            color: '#976222',
            fontSize: 46 * scale,
            borderRadius: 44 * scale,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: 1.71 * scale,
            zIndex: 10,
        }
        this.state = {
            ...this.state,
            leftCut,
            scale
        }
    }

    
    render() {
        const {
            _bg,
            state: {
                scale,
            },
            props: {
                config: {
                    questionInVideo,
                },
            },
        } = this
        let style = {}
        if (questionInVideo) {
            style = {
                position: 'relative',
                top: TOP_BAR_HEIGHT * scale,
            }
        }
        return (
            <div style = {style}>
                {_bg}
                {this._renderContext()}
               DirectionAndPositionQuestion222
            </div>
        )
    }
    _renderContext() {
        const {
            _contextStyle,
            _context
        } = this 
        return (
            <div style = {_contextStyle}>
                {_context}
            </div>
        )
    }
}
```



## 拖住组件使用

```
type = 'Overlap2Question'  

http://localhost:8088/#164
// 
UI:
https://app.zeplin.io/project/5995547e5a81de29e6d9a34e/screen/5e7497d371fa70b1be045186
```



### constructor

对于里面的一些信息的配置如下:point_down:

```react
import IMAGE_SPEAKER_SHADOW from "../../../widgets/FixedVoice/speakerShadow.svg";
import { shouldShowGuide } from '../../../../../utils/playground'

constructor(...args) {
    super(...args);
    const {
      // 解构这个constructor类型
      constructor: { type },
      props: {
        context: {
          elBlocksContainer: { clientWidth, clientHeight },
          widgets: { fixedVoice, fixedGuide },
        },
        data: { answer, windows, options, content },
      },
    } = this;
	
    // clientHeight,clientWidth从它的父类解构过来的,获取屏幕的宽度高度
    // fixedVoice 是否需要喇叭的阴影
    // fixedGuide 解构的这个目的,就是查看是否需要小手去指引它
    // data中的数据 来着与模拟的数据,或者类似于
    const scale = clientHeight / BG_NATURAL_HEIGHT;

    // 裁剪左边的距离,固定的公式
    
    const leftCut = (BG_NATURAL_WIDTH * scale - clientWidth) / 2;
    // setShadow含义 小喇叭的阴影
    // IMAGE_SPEAKER_SHADOW就是喇叭的背景图
    fixedVoice.setShadow(IMAGE_SPEAKER_SHADOW, scale);
    
    // 判断是否需要小手来完成任务
    if (shouldShowGuide(`${type}_引导`)) {
            const fromY = (54 + (159 + 41) * answer) * scale
            const emptyWindowIndex = windows.findIndex(el => el == null)
            const toX = (803 + (160 + 12) * (emptyWindowIndex % 3)) * scale - leftCut
            const toY = (102 + (159 + 11) * parseInt(emptyWindowIndex / 3)) * scale
            if (fromY && toX & toY) {
                fixedGuide.showDrag({
                    fromX: 1468 * scale - leftCut,
                    fromY,
                    toX,
                    toY,
                    scale,
                })
            }
        }
    
    // 这个变量挂载在当前的组件组件中,我们通过这个变量dragDropContextRef,就可以获取组件或者是变量
    // 举个例子
    // <DragDropContext ref = {this.dragDropContextRef}></DragDropContext>
    // 这样子的话,我们需要获取到当前的组件的实例的话,通过这个this.dragDropContextRef.current
    // 这样子的话,即可获取到DragDropContext组件
    this.dragDropContextRef = React.createRef()
}
```







## UI构建API

### this._renderBlock()函数使用

给定一个对象，type为BackgroundImage,渲染这个整个背景

```js
renderBg() {
        // this._renderBlock() 渲染背景
        return this._renderBlock({
            type: 'BackgroundImage',
            data: BG_IMG,
        })
    }
```

渲染这个Block块，也就是渲染背景，当你需要在一个div中渲染一个图片时，我们需要怎么去操作呢？

给定一个对象，它的参数如下所示的话↓

```js
{
                            type: 'Image',
                            data: '/yxt/api/image/447079D44FF648AEBD1646D01F455320',
                            options: {
                                style: {
                                    width: '100%',
                                },
                            },
                        }
```

这个时候,我们需要导入的内容就是↓

```
import { normalizeImgBlockDefinition } from "../../../../../utils/playground";
```

然后还是调用对于的方法

```js
temp = {
                            type: 'Image',
                            data: '/yxt/api/image/447079D44FF648AEBD1646D01F455320',
                            options: {
                                style: {
                                    width: '100%',
                                },
                            },
}

this._renderBlock(normalizeImgBlockDefinition(temp))
```

这样子的话，还是可以完成图片的渲染，一般的情况下，我们需要给这样子的父盒子设置flex-box布局,这样子的话，图片的效果就是会居中的现实出来。





### 指导小手使用







## 填空组件的使用

// 193

主要的就是比如数字板块，是如何使用的:point_down:

```
type = 'CompareDiffInputQuestion'

http://localhost:8088/#158
// 拿这个题目来联系吧
UI:
https://app.zeplin.io/project/5995547e5a81de29e6d9a34e/screen/5e1eb5119da20e040401616c


// 自己写的一个项目
// CompareDiffInputQuestionLee
```



如何使用该组件呢👇

```
		const {
            props : {
                context: {
                    widgets: {
                        fixedKeyboard
                    },
                }
            }
        } = this
        fixedKeyboard.setConfig(getKeyboardConfig(scale, leftCut))
        // 然后需要注意的就是创建一个getKeyboardConfigwen文件
```

具体的这个文件的话，可以参照这个`CompareDiffInputQuestion`文件。



主要的就是比如数字板块，是如何使用的。

那么开始搭建自己的项目



### RemoveAndSupplementDrag组件

这个组件的作用是什么，应该如何去使用呢？

```react
			<RemoveAndSupplementDrag
                // 绑定事件
                onRef={this.onRef.bind(this)}
                
                // 样式
                propsStyle={boxStyle}
                // 背景图
                boxBg={IMAGE_BOX}
                scale={scale}
                leftCut={leftCut}
                topNum={topImgs.length}
                bottomNum={bottomImgs.length}
                imageBlocks={imageBlocks}
                styleIndex={1}
                parent={this}
            />
```



### js中设置属性值

```js
			{
                        position: 'absolute',
                        top : (113 + (107 + 30) * parseInt(i/7)) * scale,
                        left: (732 + (109 + 13) * (i % 7) ) * scale - leftCut,
                        width : 109 * scale,
                        height: 107 * scale,
                        borderRadius: 10 * scale,
                        background : '#fff7e1',
                        zIndex: 2,
                        border:`solid ${4 * scale}px #ffd894`
            }
```



## 渲染问号的语法👇

```react
			this._renderBlock({
                type:'InputQuestion',
                options : {
                    placeholder : '?',
                    style: {
                        width: 78 * scale,
                        height:49 * scale,
                        border: `${3 * scale}px solid #FFA61C`,
                        borderRadius: 4 * scale,
                        backgroundColor: '#FFFCF1',
                        fontSize: 34 * scale,
                        fontWeight: 600,
                        marginLeft: 12 * scale,
                        marginRight: 12 * scale,
                        color: '#f9df77',
                    },
                    answer: `${answer}`,
                    maxLen: 2,
                }
            })
```





## 出题系统使用



查找这个关键字即可`DirectionAndPositionQuestion`

看看那些文件加了东西即可

需要修改的问题有 `questionsDefaultData.js`  `questionsWidthGui.js`文件

然后在 queman/components/questionsGUI创建对应的组件即可



## 测试需求

```
_IO.callJS({
    type: 'SHOW_EXPLAIN',
})

_IO.callJS({
    type: 'HIDE_EXPLAIN',
})

// 判断是否需要解析

explainIsShowing
```



我们需要做的就是👇

```
// 这个在state中设置为false,然后需要解析的内容 前面设置为fasle
{explainIsShowing&&this._renderGuideBg()}
```





## 逻辑代码判断





```react
	/** 
     * @override
     */
    _check() {
        const {
            _rightAnswer,
            state: {
                clickedIndex,
                // answerIsRight
            }
        } = this 
        if (_rightAnswer === clickedIndex) {
            return true
        }
        return false
    }    

    /** 
     * @override
     */
    onChecked(isRight, isEnd) {
        super.onChecked(isRight, isEnd)
    
        if(isRight) {
            playMp3(MP3_RIGHT)
        }else{
            playMp3(MP3_WRONG)

        }
    }
```



这个代码的作用就是逻辑判断正确，然后完成的内容就是把数据发出去。

```react
import MP3_RIGHT from '../../../../../sounds/right.mp3'
import MP3_WRONG from '../../../../../sounds/wrong.mp3'
import MP3_CLICK from '../../../../../sounds/click.mp3'

import {
    playMp3,
} from '../../../../../utils/sounds'
```





## react中使用animation



如何优雅的使用动画呢？👇



```react
	_renderAnimation(index) {
        const {
            _ks,
            _renderBollonStyle
        } = this 
        let ansStyle = {
            ..._renderBollonStyle,
            animation: `1000ms ease-in 0s forwards move${index}`
        }
        return (
            <div
            >
                <style>
                    {_ks}
                </style>
                <div style={ansStyle}>
                </div>
            </div>
        )
    }
```



然后需要注意的就是，这个需要写在`style标签`中。

```react
		this._ks = `
            @keyframes move1 {
                0% {
                    opacity:0;
                    left:${1120 * scale - leftCut}px;
                    top:${284 * scale}px;
                }
                30% {
                    opacity: 1;
                }

                100% {
                    opacity: 1;
                    left:${1120 * scale - leftCut}px;
                    top:${106 * scale}px;
                }
            }
            @keyframes move2 {
                0% {
                    opacity:0;
                    left:${1120 * scale - leftCut}px;
                    top:${284 * scale}px;
                }
                30% {
                    opacity: 1;
                }
                100% {
                    opacity:1;
                    left:${1398 * scale - leftCut}px;
                    top:${284 * scale}px;
                }
            }
        `
```





## 动态效果的使用

具体可以参考这个效果 `DirectionAndPosition3Question`



```react


import LottieAnimation from '../../../../LottieAnimation'
import ANIMATION_DATA_FLOWER from './flower.json'

const ANIMATION = {
    loop: true,
    animationData: ANIMATION_DATA_FLOWER
}



_renderCorrectBg() {
        const {
            _dropCorrectStyle
        } = this 
        return (
            <div>
                {
                    _dropCorrectStyle.map( (el, index) => {
                        return (
                            <LottieAnimation 
                                style = {el} 
                                key = {index} 
                                options={ANIMATION}>
                            </LottieAnimation>
                        )
                    })
                }
            </div>
        )
    }
```







## 代码的拉取

- 切换到小伙伴的分支
  - git checkout  feature/template_12web
- 然后需要pull她的最新代码
  - git pull origin feature/template_12web
- 然后切换到我的分支
  - git checkout feature/template_my
- 最后需要做的就是merge下
  - git merge  feature/template_my





## 骰子的使用





```react
import Game from '../../../commonComponent/diceCube'

this._gameContainer = (
            <div
                style={{
                    position: 'absolute',
                    width: 446 * scale,
                    height: 275 * scale,
                    left: 734 * scale - leftCut,
                    top: 163 * scale,
                }}

                ref={e => e && (this._elGameContainer = e)}
            >
            </div>
        )
        
componentDidMount() {
        const {
            _elGameContainer,
            _initFaces,
            _options
        } = this
        this._game = new Game(_elGameContainer, {initFaces: _initFaces, fov: 16})
        console.log(_elGameContainer,'--------------')
    }

```



//SplitSubtractionQuestion 异步的情况





// 设置不可拖拽



## 文字居中对齐



```css
textAlign: 'center',
verticalAlign: 'middle'
```



## 可配置喇叭

```
			fixedVoice.show(
                this._renderBlock({
                    type: 'CustomVoice',
                    data,
                    options: {
                        ...options,
                        independent: true,
                    },
                })
            )
```





## 抖动效果

_elOptions



```
@keyframes compareSelectQuestionShake {
    25% {
        transform: rotate(-3deg);
    }
    50% {
        transform: rotate(3deg);
    }
    75% {
        transform: rotate(-3deg);
    }
}
```



## 点击按钮使用





```
{this._renderCheckBtn()}
import CheckButton, { CHECK_BUTTON_COLORS } from '../../../other/CheckButton'
_renderCheckBtn() {
        const {
            state: {
                checkBtnStyle,
                changedAfterCheck,
            },
        } = this
        return (
            <CheckButton
                color={CHECK_BUTTON_COLORS.GREEN_WITH_BORDER}
                style={checkBtnStyle}
                isDisabled={!changedAfterCheck}
                onClick={this._checkPlayground}
            />
        )
}
```





## 内容展示区域



```
this._contextStyle = {
            position: 'absolute',
            left: 711 * scale - leftCut,
            top: 32 * scale,
            width: 882 * scale,
            height: 88 * scale,
            backgroundColor: '#fffdf4',
            color: '#512511',
            borderRadius: 44 * scale,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
}
```





## 动画写法

```js
import LottieAnimation from '../../../../LottieAnimation'
import ANIMATION_DATA_FLOWER from '../InterestEnumeration1Question/enumeration'


const ANIMATION_OPTIONS_MAP = {
    RIGHT_FLOWER: {
        animationData: ANIMATION_DATA_FLOWER,
        loop: true,
    },
}


<LottieAnimation 
                style = {_correctAnimationStyle} 
                    options={ANIMATION_OPTIONS_MAP.RIGHT_FLOWER}>
</LottieAnimation>
```



## Drag组件中失败的回调函数



```jsx
				<DragDropContext
                    ref={this._dragDropContextRef}
                    onDrop={this.onDrop}
                    shakeAndPlayMP3AndShowImg={false}
                    needHover={false}
                    onDropInEmptyArea={this._onDropInEmptyArea.bind(this)}
               >
                   {this._renderDropBg()}
                   { this._renderDragContent()}
               </DragDropContext>
```





## 填空组件在脑力大比拼中遇到点击失效问题



// FixedKeyboard



// AddKnowledgeModal







## ceramics下如何构建新项目的流程

目前，我们采取的方案，是在k12中引入ceramics工程中的题班，接下来完成对应的出题系统。

主要分为以下步骤

- k12如何跑动一个新题班
- ceramics如何在k12中正常展示
- 出题系统的开发流程





### k12如何跑动一个新题班

首先，k12新建一个题班的步骤有以下几个步骤：

首先，我们找到**src/isolations/playground**目录，里面有个mock.js文件

```js
// ....
// 209  填空题 植树问题1                              PlantTrees1Question
// 210  拖拽题 植树问题2                              PlantTrees2Question
```

接下来，我们需要新增加一个题班的话，可以这么写上备注

```js
// 题号  题班类型   题班名称                               组件名称
// 211  填空题     植树问题3                              PlantTrees3Question
```

接下来，还是这个目录，我们需要找到**src/isolations/playground/questions/QuestionsMockData/**目录，找到v2.js文件，配置每个单独的题班的数据类型⬇️ 那么它的数据结构是怎么样的呢？

```js
// 旧的题班数据结构
{
        id: lUniqueId(),
        data: [
            {
                type: 'PlantTrees3Question', // 组件名称
                data: {                     // data为题班需要传递的数据
                    species: 2, 
                    direction: 'left',
                    separateNumber: 4, 
                    totalLength: 12
                }
            },
          	{                  // 这个是小喇叭语音部分，看情况而定，是否需要配置
                type: 'Voice',      
                data: '帮助小青蛙跳到正确的荷叶上吧',
            }
        ]
    },
```

那么我们来看看ceramics下的卓越新题班的数据结构该如何配置

```js
// 旧的题班数据结构
{
        id: lUniqueId(),
        data: {
            ceramicsType: 'PlantTree3Question', // 组件名称
            category: 'testing',  // 一定要配置, 可选参数output learning testing
                // data里面的数据对应题板的数据
            data: {
                  separateNumber: 3,
                  treeCount: 8,
                  voice: {
                    value: '围绕环形小路植树,每隔3米植一棵,一共植8棵树,小路总长多少米',
                    type: 'tts',
                  },
            },
        },
    },
```

category选择不同的值，会对应渲染不同的PaintBoard，分别有OutputPaintBoard，LearningPaintBoard和TestingPaintBoard。



--------



配置好了题目的数据后，接下来题班组件应该写在哪里呢⬇️

对于旧题板而言，也就是在k12中开发题板的话，可以参考下面步骤

找到**src/common/components/Playground/blocks/blockClassFactory.js**文件，找到init方法，

```js
for (const options of [
            require('./BackgroundImage'),
            require('./Explain'),
            require('./Image'),
            LazyLoader = require('./LazyLoader').default,
            require('./RichText'),
            require('./RootBlock'),
            require('./Table'),
            require('./Text'),
            require('./Voice'),
            require('./SpecialPositionVoice'),
            require('./CustomVoice'),
            ...[
                'AddWithImages2Question',
                ....,
                'PlantTrees1Question',
                'PlantTrees2Question',
                'PlantTrees3Question',  // 添加组件名称
            ].map(type => ({
                type,
                [USE_LAZY_LOADER_SYMBOL]: true,
            }))
```

然后紧接着，我们**src/common/components/Playground/blocks/LazyLoader.js**文件，然后新增加配置

```js
switch (type) {
            case 'AddWithImages2Question':
                return await import(/* webpackChunkName: "AddWithImages2Question" */ )
        	......,
            case 'PlantTrees1Question':
                return await import(/* webpackChunkName: "PlantTrees1Question" */ './questionBlocksV2/PlantTrees1Question')
            case 'PlantTrees3Question':
                    return await import(/* webpackChunkName: "PlantTrees3Question" */ './questionBlocksV2/PlantTrees3Question')
            default:
                throw `can't find the BlockClass: ${type}`
        }
```

配置完后，然后我们找到**src/common/components/Playground/blocks/questionBlocksV2/**目录，新建一个文件，名称就是组件名称，然后具体的组件业务就写在该组件目录下即可，这个index.jsx可以参考下面的模板下👇

```js
import React from 'react'
import QuestionBlock from '../../../blocks/questionBlocks/QuestionBlock'
import IMAGE_SPEAKER_SHADOW from '../../../widgets/FixedVoice/speakerShadow.svg'
import { MODE } from '../../../../../../isolations/queman/constants'
import IMAGE_BG from './bg.svg'

const BG_NATURAL_WIDTH = 2304
const BG_NATURAL_HEIGHT = 694
const TOP_BAR_HEIGHT = 74

export default class FrogJumpToLotusLeafQuestion extends QuestionBlock {
    static type = 'FrogJumpToLotusLeafQuestion'
    _bg = this._renderBlock({
        type: 'BackgroundImage',
        data: IMAGE_BG,
    })
    constructor(...args) {
        super(...args)
        const { 
            props: {
                context: {
                    elBlocksContainer: {
                        clientWidth,
                        clientHeight,
                    },
                    widgets: {
                        fixedVoice,
                    },
                },
                config: {
                    questionInVideo,
                    mode
                },
            }
        } = this 
        this._mode = mode || MODE.NORMAL
        let scale = clientHeight / BG_NATURAL_HEIGHT
        if (questionInVideo) {
            scale = (clientHeight - TOP_BAR_HEIGHT) / BG_NATURAL_HEIGHT
        }
        const leftCut = (BG_NATURAL_WIDTH * scale - clientWidth) / 2
        fixedVoice.setShadow(IMAGE_SPEAKER_SHADOW, scale)
        this._context = '1232'
        this._contextStyle = {
            position: 'absolute',
            left: 1025 * scale - leftCut,
            top: 286.8 * scale,
            width: 264 * scale,
            height: 76 * scale,
            color: '#976222',
            fontSize: 46 * scale,
            borderRadius: 44 * scale,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: 1.71 * scale,
            zIndex: 10,
        }
        this.state = {
            ...this.state,
            leftCut,
            scale
        }
    }

    
    render() {
        const {
            _bg,
            state: {
                scale,
            },
            props: {
                config: {
                    questionInVideo,
                },
            },
        } = this
        let style = {}
        if (questionInVideo) {
            style = {
                position: 'relative',
                top: TOP_BAR_HEIGHT * scale,
            }
        }
        return (
            <div style = {style}>
                {_bg}
                {this._renderContext()}
               DirectionAndPositionQuestion222
            </div>
        )
    }
    _renderContext() {
        const {
            _contextStyle,
            _context
        } = this 
        return (
            <div style = {_contextStyle}>
                {_context}
            </div>
        )
    }
}
```

当然了，可以看GitLab对应的history ，也能看到对比 [init a  new board](https://gitlab.corp.youdao.com/k12/k12-web/commit/9672d96e8bf3118af594ed476d30fc6d89bfc977)



以上说得都是在k12中开发的流程，那么在ceramics中是怎么样的呢



### ceramics如何在k12中正常展示

在这里，我们假设在ceramics题板以及能正常的运行成功，我们看下如何在k12中嵌入。

基于本地调试的功能，我们看下具体的流程

首先，我们需要切到ceramics项目下，然后执行命令

```cmd
lerna exec yarn link
// 没有安装 lerna 的话
npx lerna exec yarn link
```

PS：link本身是软链接，yarn link是将资源存在yarn的内存中，相当于建立了一个通道。

接着看下你需要的项目依赖的是哪些包，我们需要切换到 k12-web 目录中，然后执行下面命令

```cmd
// 执行以下 link 命令


yarn link "@ceramics-math/hooks"
yarn link "@ceramics-math/question-shared"
yarn link "@ceramics-math/utils"
yarn link "@ceramics-math/system"
yarn link "@ceramics-math/feedback"
yarn link "@ceramics-math/button"
yarn link "@ceramics-math/components"
yarn link "@ceramics-math/core"
yarn link "@ceramics-ae/base"
yarn link "@ceramics-math/plant-tree4-question"
yarn link "@ceramics-math/combine-puzzle-question"
yarn link "@ceramics-math/mind-circle-question"
yarn link "@ceramics-math/mind-bridge-question"
yarn link "@ceramics-math/plant-tree3-question"
// 如果有新增组件，则需要再额外执行 yarn link @xx/xxx
```

当然了，你可以只link部分的依赖，理论上是行得通的，你需要找到对应新组件的package.json，需要依赖哪些即可。



执行完毕后，k12-web 中依赖的 @ceramics-math/core 对应的组件就是我们 @ceramics-math/core 中的代码。



当然了，这里有个小问题，也就是React版本不一致的问题，当你启动的时候，大概率会报错。因为 @ceramics-math/core 中开发依赖的 React 和 k12-web 所依赖的 React 大概率不相同。



所以，我们还需要在 @ceramics-math 的目录下使用 k12-web 的 React。

切换到 @ceramics-math 目录中： 

```cmd
npm link ../k12-web/node_modules/react // (当前目录相对于 k12-web 的路径)
```



接下来，然后你在 k12-web，运行下面命令

```cmd
yarn dev-playground

// http://localhost:8088/#200 找到对应的题板，看是否能正常运行
```

启动后，然后就能看到正常运行了，接下来，我们需要做的工作就是完成出题系统对应的开发。



### 出题系统的开发流程

首先，我们需要配置QuestionGUI的入口文件配置，找到**src/isolations/queman/components/testQuestionsGUI/index.js**

然后需要新增加以下配置下

```jsx
import PlantTree4Question from './PlantTree4Question'

this._componentMap = {
        'MoveMatchQuestion': MoveMatchQuestion,
        ....,
        'PlantTree3Question': PlantTree3Question,
        'PlantTree4Question': PlantTree4Question,
        // 新的组件
      }
```

然后找到**k12-web\src\isolations\queman\constants\questionsByType\testQuestions**下的questionDefaultData.js文件，然后配置出题系统中默认的数据👇

```js
PlantTree4Question: { // 组件名称
        id: lUniqueId(),
        data: {
            ceramicsType: 'PlantTree4Question',  // 可以参考上面的数据配置  
            category: 'testing',
            data: {
                totalNumber: 56,
                treeCount: 8,
                separateNumber: 7,
                voice: {
                  value: '围绕在全长64米的环形小路上植树，每隔7米植一棵，一共要植多少棵',
                  type: 'tts',
                },
              },
        },
    }
```

接下来，我们还需要配置一个信息👇，找到**\k12-web\src\isolations\queman\constants\questionsByType\testQuestions\index.js**文件，然后可以参考里面的配置选项，新增加配置信息

```jsx
// modes为该题版支持的出题模式，1为全手动，2为部分配置，3为全自动
{
                name: '植树问题',
                templates: [
                    {
                        id: 'PlantTrees1Question',
                        name: '植树问题L1',
                        modes: [3],
                    },
                    {
                        id: 'PlantTrees2Question',
                        name: '植树问题L2',
                        modes: [3],
                    },
                    {
                        id: 'PlantTree3Question',
                        name: '植树问题3',
                        modes: [3],
                    },
                    {
                        id: 'PlantTree4Question',
                        name: '植树问题4',
                        modes: [3],
                    }
                ]
            },
```

接下来，也就是最后一步，组件应该写在哪里呢，我们需要找到**k12-web\src\isolations\queman\components\testQuestionsGUI**

接着，新建一个文件夹，名称就是组件名称，然后的话，就可以参考之前的组件来写，当然了，不同的类型题板会在不同的目录下完成的，具体的话，比如还有outputQuestionsGUI，这里的话，就以卓越题板为例子。



配置完后，接下来的操作就是在index中写相应的业务逻辑即可。

```cmd
yarn dev-queman 
// 看是否能正常运行即可
```



到这里的话，基本的流程配置就完成了。

