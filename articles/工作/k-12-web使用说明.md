## 项目初始化

[初始化项目教程地址](https://gitlab.corp.youdao.com/k12/k12-web/commit/9672d96e8bf3118af594ed476d30fc6d89bfc977)





**基础模板**

```react
import React from 'react'
import QuestionBlock from '../../../blocks/questionBlocks/QuestionBlock'
import IMAGE_SPEAKER_SHADOW from '../../../widgets/FixedVoice/speakerShadow.svg'
import { MODE } from '../../../../../../isolations/queman/constants'
import IMAGE_BG from './bg.svg'

const BG_NATURAL_WIDTH = 2340
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