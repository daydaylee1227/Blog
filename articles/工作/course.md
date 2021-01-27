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
 lerna add remainder-division1-question --scope=@ceramics-math/core
 lerna add @ceramics-ae/base --scope=@ceramics-math/remainder-division1-question 
 lerna add @ceramics-math/components --scope=@ceramics-math/remainder-division3-question
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