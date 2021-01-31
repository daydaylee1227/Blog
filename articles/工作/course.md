## 基本模板

```jsx
/** @jsx jsx */
import { useQuestionViewport, css, jsx, styled,} from "@ceramics-math/system"
import React from 'react'
import {
  QuestionProps,
  // CONSTANT,
  getScaleAndLeftCut,
  adapterDevice,
} from "@ceramics-math/question-shared"
import BG_IMG from '../resources/bg.svg'
const designWidth = 2304
const designHeight = 694

interface QuestionConfig {}
interface FactoryListStyle {
  fourPlantStyleList: object[]
}

const styleListFactory:FactoryListStyle = {
  fourPlantStyleList: Array(4).fill(null).map((_, i) => {
    const left = (697 + (164 + 88) * i)
    return {
      position: "absolute",
      top: 267,
      left,
      width: 164,
      height: 170,
      color: "#8c6950",
      backgroundImage: `url(${BG_IMG})`,
      backgroundSize: "100% 100%",
    }
  })
}

export interface RemainderDivision1QuestionProps extends QuestionProps {
  questionConfig: QuestionConfig
  deviceConfig: {
    mode: number
  }
}

function RemainderDivision1Question(props: RemainderDivision1QuestionProps, ref: React.Ref<HTMLDivElement>) {

  const {
    deviceConfig: { mode },
  } = props 
  const { viewportSize } = useQuestionViewport()
  const { scale, leftCut } = getScaleAndLeftCut(
    viewportSize,
    designWidth,
    designHeight,
  )
  const Bg = styled.img({
    position: "absolute",
    top: 0,
    left: 0 * scale - leftCut,
    right: 0,
    bottom: 0,
    zIndex: -9999,
    overflow: "hidden",
    height: "100%",
    pointerEvents: "none",
    borderRadius: "none",
    verticalAlign: "middle",
  })
  console.log('Bg ===', Bg)
  console.log('MindPlantTreeQuestionProps ==== ', props)
  console.log('styleListFactory ==== ', styleListFactory)
  return (
    <div ref={ref}>
      <Bg src={BG_IMG} />
     {/* <div
        style = {adapterDevice(
          {
            position: "absolute",
            top: 444,
            left: 100,
            width: 600,
            height: 320,
            borderTopLeftRadius: 79,
            borderTopRightRadius: 79,
            backgroundColor: "rgb(159, 163, 254)",
          },
          scale,
          leftCut,
        )}
     >
     </div> */}
      <div>hello world</div>
    </div>
  )
}

const _RemainderDivision1Question = React.forwardRef(RemainderDivision1Question)
export { _RemainderDivision1Question as RemainderDivision1Question }
```





## 如何传数据

MindPlantTreeQuestion.stories.tsx



```jsx
import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import {MindPlantTreeQuestion,MindPlantTreeQuestionProps } from '../src'
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { styleStoryContainer } from "@ceramics-math/question-shared"

const viewportSize = [812, 375]
const containerCss = css`${styleStoryContainer(viewportSize)}`

const Template: Story<MindPlantTreeQuestionProps> = (args) =>
<section css={containerCss}>
  <div>
    <MindPlantTreeQuestion {...args} />
  </div>
</section>

export default {
  title: "Questions/MindPlantTreeQuestion",
  component: MindPlantTreeQuestion,
}

export const Primary = Template.bind({})
Primary.args = {
    questionConfig: {
      data: {
        expression: "2,5,10",
        voiceData: "找到口诀对应的生物并把它钓上来吧",
      },
    },
    deviceConfig: {
      viewportSize,
      mode: 1,
    },
}
```



## 单独运行一个包

```cmd
 yarn pkg plant-tree4-question build // 单独运行包
 yarn pkg plant-tree3-question build
 yarn pkg remainder-division1-question build
 yarn pkg remainder-division2-question build
 yarn pkg remainder-division3-question build
 yarn pkg enlighten-choose-fruit-question build
 lerna add lodash --scope=@ceramics-math/utils
 lerna add @ceramics-math/enlighten-choose-fruit-question --scope=@ceramics-math/core
 lerna add @ceramics-ae/base --scope=@ceramics-math/remainder-division1-question 
 lerna add @ceramics-math/components --scope=@ceramics-math/enlighten-choose-fruit-question
 enlighten-choose-fruit-question
 
 // 
 yarn pkg enlighten-choose-fruit-question build
```



## 本地如何跑ceremis

```
如何在本地引入 @ceramics-math/core。

一般情况下，我们开发完 ceramics-math/core 中的题板后，需要发布才能给第三方项目使用。
然而这种开发->发布->调试->发布 严重依赖发布的流程导致 bugfix 环节相当繁琐。

对于一些库的开发，借助 npm link，可以直接将本地的库引入在对应的项目中。

针对当前 @ceramics-math/core 项目的执行流程



link 所有组件

lerna exec yarn link
// 没有安装 lerna 的话
npx lerna exec yarn link

到对应的项目执行 link


比如，k12-web 依赖了 @ceramics-math/core。

我们需要 cd 到 k12-web 目录中。
执行以下 link 命令


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
yarn link "@ceramics-math/remainder-division1-question"
yarn link "@ceramics-math/remainder-division2-question"
yarn link "@ceramics-math/remainder-division3-question"
yarn link "@ceramics-math/block-overlap-1-question"
yarn link "@ceramics-math/block-overlap-2-question"
yarn link "@ceramics-math/enlighten-choose-fruit-question"
yarn link "@ceramics-math/recognize-one-2-question"

如果有新增组件，则需要再额外执行 yarn link @xx/xxx

执行完毕后，k12-web 中依赖的 @ceramics-math/core 对应的组件就是我们 @ceramics-math/core 中的代码。


对齐 React 版本
当你启动的时候，大概率会报错。因为 @ceramics-math/core 中开发依赖的 React 和 k12-web 所依赖的 React 大概率不相同。


所以，我们还需要在 @ceramics-math 的目录下使用 k12-web 的 React。

切换到 @ceramics-math 目录中： 

npm link ../k12-web/node_modules/react // (当前目录相对于 k12-web 的路径)
npm unlink ../k12-web/node_modules/react // (当前目录相对于 k12-web 的路径)
npm unlink ./k12-web/node_modules/react // (当前目录相对于 k12-web 的路径)
```



然后就是DOM-->>Style-->>layout-->>分层-->>绘制-->>分块-->>光栅化-->>合成显示





cd 到 k12-web 的 node_modules/react

yarn link

然后在 ceramics 中 执行 yarn link 'react'



## 组件的运行



```jsx
const HelpModeTemplate: Story<BlockOverlap1QuestionProps> = (args) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [mode, setMode] = React.useState(1)

  const enterHelpMode = () => {
    setMode(3)
    setIsPlaying(true)
  }
  const exitHelpMode = () => {
    setMode(1)
    setIsPlaying(false)
  }

  return (
    <section css={containerCss}>
      <div
        style={{
          position: "absolute",
          zIndex: 9999,
        }}
      >
        {isPlaying ? (
          <button style={{ backgroundColor: "red" }} onClick={exitHelpMode}>
            退出帮助
          </button>
        ) : (
          <button style={{ backgroundColor: "green" }} onClick={enterHelpMode}>
            进入帮助
          </button>
        )}
      </div>
      <div>
        <BlockOverlap1Question
          {...args}
          deviceConfig={{ mode, soundMute: false }}
        />
      </div>
    </section>
  )
}

export const HelpMode = HelpModeTemplate.bind({})

HelpMode.args = {
  questionConfig: {
    overlapWidth: overlapRadomWidth,
    randomColor: randomColorCombination(),
  },
}
```





## link导致yarn安装包出现的问题



npm config set registry https://nexus3.corp.youdao.com/repository/npm-all/





## 版本回退



\1. 查看所有的历史版本，获取你git的某个历史版本的id， git log
\2. 回退本地代码库：git reset --hard ID
\3. 推送到远程服务器：git push -f -u origin master
\4. 重新拉代码：git pull





```
/** @jsx jsx */
import { useQuestionViewport, css, jsx, styled } from "@ceramics-math/system"
import React, { CSSProperties, memo } from "react"

import {
  QuestionProps,
  // CONSTANT,
  getScaleAndLeftCut,
  adapterDevice,
} from "@ceramics-math/question-shared"
import { LottieAnimation, HelpMode } from "@ceramics-math/components"
import { useGesture, useInternalAudio } from "@ceramics-math/hooks"
import CLICK_MP3 from "../resources/click.mp3"
import BG_IMG from "../resources/bg.svg"
import PLANT_IMG from "../resources/plate.svg"
import BANANA_ONE_IMG from "../resources/banana_one.svg"
import BANANA_TWO_IMG from "../resources/banana_two.svg"
import BANANA_THREE_IMG from "../resources/banana_three.svg"
import BANANA_FOUR_IMG from "../resources/banana_four.svg"
import BANANA_FIVE_IMG from "../resources/banana_five.svg"
import APPLE_ONE_IMG from "../resources/apple_one.svg"
import APPLE_TWO_IMG from "../resources/apple_two.svg"
import APPLE_THREE_IMG from "../resources/apple_three.svg"
import APPLE_FOUR_IMG from "../resources/apple_four.svg"
import APPLE_FIVE_IMG from "../resources/apple_five.svg"
import ORANGE_ONE_IMG from "../resources/orange_one.svg"
import ORANGE_TWO_IMG from "../resources/orange_two.svg"
import ORANGE_THREE_IMG from "../resources/orange_three.svg"
import ORANGE_FOUR_IMG from "../resources/orange_four.svg"
import ORANGE_FIVE_IMG from "../resources/orange_five.svg"
import PEAR_ONE_IMG from "../resources/pear_one.svg"
import PEAR_TWO_IMG from "../resources/pear_two.svg"
import PEAR_THREE_IMG from "../resources/pear_three.svg"
import PEAR_FOUR_IMG from "../resources/pear_four.svg"
import PEAR_FIVE_IMG from "../resources/pear_five.svg"
import DESK_IMG from "../resources/desk.svg"
import ANIMATION_DATA_PIG_INIT from "../resources/pig_init.json"
import ANIMATION_DATA_PIG_ACTIVE from "../resources/pig_active.json"
import ANIMATION_DATA_PIG_WRONG from "../resources/pig_wrong.json"
import ANIMATION_DATA_PIG_CORRECT from "../resources/pig_correct.json"
import ANIMATION_DATA_SQUIRREL_INIT from "../resources/squirrel_init.json"
import ANIMATION_DATA_SQUIRREL_ACTIVE from "../resources/squirrel_active.json"
import ANIMATION_DATA_SQUIRREL_WRONG from "../resources/squirrel_wrong.json"
import ANIMATION_DATA_SQUIRREL_CORRECT from "../resources/squirrel_correct.json"
import ANIMATION_DATA_BEAR_INIT from "../resources/bear_init.json"
import ANIMATION_DATA_BEAR_ACTIVE from "../resources/bear_active.json"
import ANIMATION_DATA_BEAR_WRONG from "../resources/bear_wrong.json"
import ANIMATION_DATA_BEAR_CORRECT from "../resources/bear_correct.json"
const designWidth = 2304
const designHeight = 694

const ANIMATION_OPTIONS_MAP = {
  PIG_INIT: {
    loop: true,
    animationData: ANIMATION_DATA_PIG_INIT,
  },
  PIG_ACTIVE: {
    loop: true,
    animationData: ANIMATION_DATA_PIG_ACTIVE,
  },
  PIG_WRONG: {
    loop: false,
    animationData: ANIMATION_DATA_PIG_WRONG,
  },
  PIG_CORRECT: {
    loop: true,
    animationData: ANIMATION_DATA_PIG_CORRECT,
  },
  SQUIRREL_INIT: {
    loop: true,
    animationData: ANIMATION_DATA_SQUIRREL_INIT,
  },
  SQUIRREL_ACTIVE: {
    loop: true,
    animationData: ANIMATION_DATA_SQUIRREL_ACTIVE,
  },
  SQUIRREL_WRONG: {
    loop: false,
    animationData: ANIMATION_DATA_SQUIRREL_WRONG,
  },
  SQUIRREL_CORRECT: {
    loop: true,
    animationData: ANIMATION_DATA_SQUIRREL_CORRECT,
  },
  BEAR_INIT: {
    loop: true,
    animationData: ANIMATION_DATA_BEAR_INIT,
  },
  BEAR_ACTIVE: {
    loop: true,
    animationData: ANIMATION_DATA_BEAR_ACTIVE,
  },
  BEAR_WRONG: {
    loop: false,
    animationData: ANIMATION_DATA_BEAR_WRONG,
  },
  BEAR_CORRECT: {
    loop: true,
    animationData: ANIMATION_DATA_BEAR_CORRECT,
  },
}
interface FactoryListStyle {
  fourPlantStyleList: CSSProperties[]
  fruitContainerStyleList: CSSProperties[]
  contextContainerStyle: CSSProperties
  animalStyle: CSSProperties
  deskStyle: CSSProperties
}
interface Rect {
  left: number
  top: number
  width: number
  height: number
}

interface PositionLeftAndTop {
  left: number
  top: number
}
interface VirtualDragProps {
  scale: number
  leftCut: number
  fourBaseStyle: Rect
  viewportSize: number[]
  onDragEndCallback: Function
  onDragMoveCallback: Function
  isCanDrag: boolean
  dragId: number
  dropStyleList: CSSProperties[]
  imgSrc: string
  isShow: boolean
}

const styleListFactory: FactoryListStyle = {
  fourPlantStyleList: Array(4)
    .fill(null)
    .map((_, i) => {
      return {
        position: "absolute",
        top: i <= 1 ? 325 : 527,
        left: i % 2 === 0 ? 1127 : 1365,
        width: 200,
        height: 28,
        color: "#8c6950",
        backgroundImage: `url(${PLANT_IMG})`,
        backgroundSize: "100% 100%",
      }
    }),
  fruitContainerStyleList: Array(4)
    .fill(null)
    .map((_, i) => {
      return {
        position: "absolute",
        top: i <= 1 ? 212 : 414,
        left: i % 2 === 0 ? 1139 : 1377,
        width: 176,
        height: 130,
        color: "#8c6950",
        zIndex: 200,
        backgroundImage: `url(${BANANA_ONE_IMG})`,
        backgroundSize: "100% 100%",
      }
    }),
  contextContainerStyle: {},
  animalStyle: {
    position: "absolute",
    top: 238,
    left: 673,
    width: 370,
    height: 456,
    backgroundSize: "100% 100%",
  },
  deskStyle: {
    position: "absolute",
    top: 613,
    left: 0,
    width: 2304,
    height: 81,
    zIndex: 999,
    backgroundImage: `url(${DESK_IMG})`,
    backgroundSize: "100% 100%",
  },
}

interface QuestionConfig {
  species: string
  fruit: string
  rightAnswerIndex: number
  imgList: number[]
  voice: {
    value: string
    type: string
  }
}

export interface EnlightenChooseFruitQuestionProps extends QuestionProps {
  questionConfig: QuestionConfig
  deviceConfig: {
    mode: number
  }
}

function EnlightenChooseFruitQuestion(
  props: EnlightenChooseFruitQuestionProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    deviceConfig: { mode },
    questionConfig: { imgList, species, fruit, rightAnswerIndex },
  } = props
  const { viewportSize } = useQuestionViewport()
  const { scale, leftCut } = getScaleAndLeftCut(
    viewportSize,
    designWidth,
    designHeight,
  )
  const Bg = styled.img({
    position: "absolute",
    top: 0,
    left: 0 * scale - leftCut,
    right: 0,
    bottom: 0,
    zIndex: -9999,
    overflow: "hidden",
    height: "100%",
    pointerEvents: "none",
    borderRadius: "none",
    verticalAlign: "middle",
  })
  const {
    fourPlantStyleList,
    fruitContainerStyleList,
    animalStyle,
    deskStyle,
  } = styleListFactory
  // 0 1 2 3 表示动画效果, 初始 移入 错误 正确
  const [animationStatus, setAnimationStatus] = React.useState(0)

  const [isShowIndex, setShowIndex] = React.useState(-1)
  // const context = `请从下面挑出1个香蕉,喂给小猪吃吧!`
  const currentPlantList = [animalStyle]
  const fruitImgList = [
    [
      BANANA_ONE_IMG,
      BANANA_TWO_IMG,
      BANANA_THREE_IMG,
      BANANA_FOUR_IMG,
      BANANA_FIVE_IMG,
    ],
    [
      APPLE_ONE_IMG,
      APPLE_TWO_IMG,
      APPLE_THREE_IMG,
      APPLE_FOUR_IMG,
      APPLE_FIVE_IMG,
    ],
    [PEAR_ONE_IMG, PEAR_TWO_IMG, PEAR_THREE_IMG, PEAR_FOUR_IMG, PEAR_FIVE_IMG],
    [
      ORANGE_ONE_IMG,
      ORANGE_TWO_IMG,
      ORANGE_THREE_IMG,
      ORANGE_FOUR_IMG,
      ORANGE_FIVE_IMG,
    ],
  ]
  const imgIndexList = imgList.map((el, i) => {
    return fruitImgList[parseInt(String(el / 5))][el % 5]
  })
  const animationDataList = [
    ["PIG_INIT", "PIG_ACTIVE", "PIG_WRONG", "PIG_CORRECT"],
    ["SQUIRREL_INIT", "SQUIRREL_ACTIVE", "SQUIRREL_WRONG", "SQUIRREL_CORRECT"],
    ["BEAR_INIT", "BEAR_ACTIVE", "BEAR_WRONG", "BEAR_CORRECT"],
  ]
  // 默认是小猪
  const animalIndex = species === "pig" ? 0 : species === "squirrel" ? 1 : 2
  const currentAnimationList = animationDataList[animalIndex]
  const animalContext =
    animalIndex === 0 ? "小猪" : animalIndex === 1 ? "小松鼠" : "小熊"
  const fruitContext =
    fruit === "apple"
      ? "苹果"
      : fruit === "pear"
      ? "梨"
      : fruit === "banana"
      ? "香蕉"
      : "橘子"
  const { onCheck, onCompleteCheck } = props
  console.log("rightAnswerIndex === ", rightAnswerIndex)
  const onDragEndCallback = (status: boolean, dragId: number) => {
    onCheck?.(status)
    if (status === true && rightAnswerIndex === dragId) {
      setAnimationStatus(3)
      onCompleteCheck?.(status)
      setShowIndex(dragId)
      console.log("答案正确")
    } else {
      setAnimationStatus(2)
      console.log("答案错误")
      setTimeout(() => {
        setAnimationStatus(0)
      }, 3000)
    }
  }

  const onDragMoveCallback = (status: boolean) => {
    if (status === true) {
      setAnimationStatus(1)
    }
  }

  return (
    <div ref={ref}>
      <Bg src={BG_IMG} />
      <div
        className="deskContainer"
        style={adapterDevice(deskStyle, scale, leftCut)}
      ></div>
      <div className="contextContainer">
        <div
          style={adapterDevice(
            {
              position: "absolute",
              top: 32,
              left: 711,
              width: 882,
              height: 88,
              color: "#444444",
              background: "#ffffff",
              borderRadius: 44,
              letterSpacing: 3,
              fontSize: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "FZLANTY_ZHONGJW-GB1-0",
            },
            scale,
            leftCut,
          )}
        ></div>
        <div
          className="contextLeft"
          style={adapterDevice(
            {
              position: "absolute",
              top: 56,
              left: 887,
              width: 180,
              height: 40,
              color: "#444444",
              letterSpacing: 2,
              fontSize: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "FZLANTY_ZHONGJW-GB1-0",
            },
            scale,
            leftCut,
          )}
        >
          请从下面挑出
        </div>
        <div
          className="contextCenter"
          style={adapterDevice(
            {
              position: "absolute",
              top: 56,
              left: 1071,
              width: 19,
              height: 40,
              color: "#ff8818",
              background: "#ffffff",
              borderRadius: 44,
              letterSpacing: 2,
              fontSize: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "FZLANTY_ZHONGJW-GB1-0",
            },
            scale,
            leftCut,
          )}
        >
          1
        </div>
        <div
          className="contextRight"
          style={adapterDevice(
            {
              position: "absolute",
              top: 56,
              left: 1094,
              width: 360,
              height: 40,
              color: "#444444",
              borderRadius: 44,
              letterSpacing: 3,
              fontSize: 28,
              display: "flex",
              fontFamily: "FZLANTY_ZHONGJW-GB1-0",
            },
            scale,
            leftCut,
          )}
        >
          {`个${fruitContext},喂给${animalContext}吃吧!`}
        </div>
      </div>
      <div className="plantContainer">
        {fourPlantStyleList.map((el, i) => {
          return <div key={i} style={adapterDevice(el, scale, leftCut)}></div>
        })}
      </div>
      <div className="fruitContainer">
        {fruitContainerStyleList.map((_, i) => {
          const offsetIndex = 0
          const ele: Rect = {
            left: Number(fruitContainerStyleList[i + offsetIndex].left),
            top: Number(fruitContainerStyleList[i + offsetIndex].top),
            width: Number(fruitContainerStyleList[i + offsetIndex].width),
            height: Number(fruitContainerStyleList[i + offsetIndex].height),
          }
          return (
            <VirtualDrag
              fourBaseStyle={ele}
              scale={scale}
              leftCut={leftCut}
              viewportSize={viewportSize}
              onDragEndCallback={onDragEndCallback}
              onDragMoveCallback={onDragMoveCallback}
              isCanDrag={mode === 3 || mode === 2}
              dragId={i}
              dropStyleList={currentPlantList}
              key={i}
              imgSrc={imgIndexList[i]}
              isShow={mode === 3 ? true : isShowIndex !== i}
            />
          )
        })}
      </div>

      <div className="animalContainer">
        <LottieAnimation
          config={ANIMATION_OPTIONS_MAP[currentAnimationList[animationStatus]]}
          style={adapterDevice(animalStyle, scale, leftCut)}
        />
      </div>
    </div>
  )
}

// 两个矩形碰撞检测
function collisionDetection(aRect: Rect, bRect: Rect) {
  const l1 = aRect.left
  const r1 = aRect.left + aRect.width
  const t1 = aRect.top
  const b1 = aRect.top + aRect.height
  const l2 = bRect.left
  const r2 = bRect.left + bRect.width
  const t2 = bRect.top
  const b2 = bRect.top + bRect.height
  if (r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) return false
  return true
}

const VirtualDrag = memo((props: VirtualDragProps) => {
  const {
    scale,
    leftCut,
    viewportSize,
    isCanDrag,
    onDragEndCallback,
    onDragMoveCallback,
    fourBaseStyle,
    dragId,
    dropStyleList,
    imgSrc,
    isShow,
  } = props
  const dragElementStyle = {
    position: "absolute",
    top: fourBaseStyle.top,
    left: fourBaseStyle.left,
    width: fourBaseStyle.width,
    height: fourBaseStyle.height,
    zIndex: 400,
    backgroundImage: `url(${imgSrc})`,
    backgroundSize: "100% 100%",
  }
  const audioPlayer = useInternalAudio()
  const positionInitLeftAndTop = [
    dragElementStyle.left * scale - leftCut,
    dragElementStyle.top * scale,
  ]
  const [lastPos, setPosition] = React.useState({
    left: dragElementStyle.left * scale - leftCut,
    top: dragElementStyle.top * scale,
  })
  const initPosition: PositionLeftAndTop = {
    left: dragElementStyle.left * scale - leftCut,
    top: dragElementStyle.top * scale,
  }
  const rectBox: Rect = {
    width: dragElementStyle.width * scale,
    height: dragElementStyle.height * scale,
    left: dragElementStyle.left * scale - leftCut,
    top: dragElementStyle.top * scale,
  }

  const bind = useGesture({
    onDragStart: () => {
      audioPlayer.mp3(CLICK_MP3)
    },
    onDrag: ({ movement: [mx, my] }: any) => {
      if (!isCanDrag) {
        // 加上上次被吸附后的由动画触发的偏移量
        const currentLeft = initPosition.left + mx
        const currentTop = initPosition.top + my
        const boundLeft = currentLeft < 0
        const boundRight = currentLeft + rectBox.width / 2 >= viewportSize[0]
        const boundTop = currentTop < 0
        const boundBottom = currentTop + rectBox.height / 2 >= viewportSize[1]
        const finalX = boundLeft
          ? 0
          : boundRight
          ? viewportSize[0] - rectBox.width / 2
          : currentLeft
        const finalY = boundTop
          ? 0
          : boundBottom
          ? viewportSize[1] - rectBox.height / 2
          : currentTop

        // 拖拽的过程做判断
        let collisionFlag = false
        // 检测
        dropStyleList.forEach((el, i) => {
          const currentStyle = {
            left: Number(el.left) * scale - leftCut,
            top: Number(el.top) * scale,
            width: Number(el.width) * scale,
            height: Number(el.height) * scale,
          }
          collisionFlag = collisionDetection(
            {
              ...rectBox,
              left: lastPos.left,
              top: lastPos.top,
            },
            currentStyle,
          )
          if (collisionFlag) {
            onDragMoveCallback(true, dragId, i)
          } else {
            onDragMoveCallback(false, dragId, null)
          }
        })
        setPosition({ left: finalX, top: finalY })
      }
    },
    onDragEnd: () => {
      if (!isCanDrag) {
        let collisionFlag = false
        // 检测
        dropStyleList.forEach((el, i) => {
          const currentStyle = {
            left: Number(el.left) * scale - leftCut,
            top: Number(el.top) * scale,
            width: Number(el.width) * scale,
            height: Number(el.height) * scale,
          }
          collisionFlag = collisionDetection(
            {
              ...rectBox,
              left: lastPos.left,
              top: lastPos.top,
            },
            currentStyle,
          )
          if (collisionFlag) {
            console.log("在合理范围内")
            onDragEndCallback(true, dragId, i)
          } else {
            console.log("没有在合理范围")
            onDragEndCallback(false, dragId, null)
          }
        })
        setPosition({
          left: positionInitLeftAndTop[0],
          top: positionInitLeftAndTop[1],
        })
        // 成功失败,调用回调函数
      }
    },
  })
  return (
    <div>
      {isShow ? (
        <div
          {...bind()}
          style={{
            ...adapterDevice(dragElementStyle, scale, leftCut),
            left: lastPos.left,
            top: lastPos.top,
          }}
        ></div>
      ) : (
        ""
      )}
    </div>
  )
})

const _EnlightenChooseFruitQuestion = React.forwardRef(
  EnlightenChooseFruitQuestion,
)
export { _EnlightenChooseFruitQuestion as EnlightenChooseFruitQuestion }

```

