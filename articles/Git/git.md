





## 前言

最近在`网易`工作之余，遇到Git上面一些问题，趁这次的机会，就好好的补一补基础，一些概念性的内容，这里就不描述了，直接开门见山，梳理有用的点。



首先我们的了解Git通常的操作流程，网上流行的不错一张图👇

![Git经典流程图](..\..\images\Git\Git经典流程图.png)





## 基本概念

基于上面的图，我们就有接下来一些概念👇

- 版本库👉`.git`
  - 当我们使用git管理文件时，比如`git init`时，这个时候，会多一个`.git`文件，我们把这个文件称之为版本库。
  - `.git文件`另外一个作用就是它在创建的时候，会自动创建master分支，并且将HEAD指针指向master分支。

- 工作区 
  - 本地项目存放文件的位置
  - 可以理解成图上的workspace
- 暂存区 (Index/Stage) 
  - 顾名思义就是暂时存放文件的地方，通过是通过add命令将工作区的文件添加到缓冲区
- 本地仓库（Repository）
  - 通常情况下，我们使用commit命令可以将暂存区的文件添加到本地仓库
  - 通常而言，HEAD指针指向的就是master分支
- 远程仓库（Remote）
  - 举个例子，当我们使用GitHub托管我们项目时，它就是一个远程仓库。
  - 通常我们使用clone命令将远程仓库代码拷贝下来，本地代码更新后，通过push托送给远程仓库。



## Git文件状态

- 通常我们需要查看一个文件的状态

```bash
git status
```

- `Changes not staged for commit` 
  - 表示得大概就是工作区有该内容，但是缓存区没有，需要我们`git add`
- `Changes to be committed` 
  - 一般而言，这个时候，文件放在缓存区了，我们需要`git commit`
- `nothing to commit, working tree clean`
  - 这个时候，我们将本地的代码推送到远端即可

## 常见命令



### git配置命令

- 列出当前配置

```bash
git config --list	
```

- 列出Repository配置

```bash
git config --local --list
```

- 列出全局配置

```bash
git config --global --list
```

- 列出系统配置

```bash
git config --system --list
```



### 分支管理

- 查看本地分支

```bash
git branch
```

- 查看远程分支

```bash
git branch -r
```

- 查看本地和远程分支

```bash
git branch -a
```

- 从当前分支，切换到其他分支

```bash
git checkout <branch-name>
// 举个例子
git checkout feature/tiantian
```

- 创建并切换到新建分支

```bash
git checkout -b <branch-name>
// 举个例子👇
git checkout -b feature/tiantian
```

- 删除分支

```
git branch -d <branch-name>
// 举个例子👇
git branch -d feature/tiantian
```

- 当前分支与指定分支合并

```
git merge <branch-name>
// 举个例子👇
git merge feature/tiantian
```





通过上述的命令，发现你并没有配置用户信息的话，接下来配置一下👇

- 配置用户名

```bash
git config --global user.name "your name"
```

- 配置用户邮箱

```bash
git config --global user.email "youremail@github.com"
```



### 工作区命令





#### 基本操作

- 创建本地仓库 git init

  > git init

- 链接本地仓库与远端仓库

  > git remote add  origin <url>
  >
  > origin默认是远端仓库别名  url 可以是**可以使用https或者ssh的方式新建**

- 检查配置信息

  - git config --list

- Git user name 与email

  > git config --global user.name "yourname"
  >
  > git config --global user.email  "your_email"

- 生成SSH密钥

  > ssh-keygen -t rsa -C "这里换上你的邮箱"
  >
  > cd ~/.ssh 里面有一个文件名为id_rsa.pub,把里面的内容复制到git库的我的SSHKEYs中

- 常看远端仓库信息 

  - git remote -v

- 远端仓库重新命名 

  - git remote rename old new

- 提交到缓存区 

  - git add .  全部上传到缓存区
  - git add <path>  指定文件

- 提交到本地仓库

  - git commit -m 'some message'

- 提交远程仓库

  - git push <远程主机名> <本地分支名>:<远程分支名>
  
- 查看分支

  - git	branch

- 创建新分支

  - git branch <name>

- 切换分支

  - git checkout <name>

- 创建分支并切换

  - git checkout -b <name>

- 删除分支

  - git branch -d <name>

- 删除远程分支

  - git push -d <origin> <branch>

- 切换分支

  - git checkout <name>



### 分支命名

**master分支**







####  花式撤销 本地版本库回退

- 撤销**工作区**修改

  - git checkout --  <file>

- 暂存区文件撤销 (不覆盖工作区)

  - git reset HEAD <file>

- 版本回退

  - git reset --(soft | mixed | hard )  < HEAD ~(num) > |  <commit ID>

  - | 指令    | 作用范围                                |
    | ------- | --------------------------------------- |
    | --hard  | 回退全部，包括HEAD，index，working tree |
    | --mixed | 回退部分,包括HEAD，index                |
    | --soft  | 只回退HEAD                              |

    

#### 差异比较

- 比较工作区与缓存区
  - git diff
- 比较缓存区与本地库最近一次commit内容
  - git diff -- cached
- 比较工作区与本地最近一次commit内容
  - git diff HEAD 
- 比较两个commit之间差异
  - git diff <commit ID> <commit ID>

#### 状态查询

- 查看状态
  - git status
- 查看历史操作记录
  - git reflog
- 查看日志
  - git log <fileName>

#### 文档查询

- 展示Git命令大纲
  - git help (--help)
- 展示Git命令大纲全部列表
  - git help -a
- 展示具体命令说明手册
  - git help <command>



#### 文件暂存

- 添加改动到stash
  - git stash save -a “message”
- 删除暂存
  - git stash drop <stash@{ID}>

- 查看stash列表
  - git stash list
- 删除全部缓存
  - git stash clear
- 恢复改动
  - git stash pop <stash@{ID}>







## 参考

- [git基本操作，一篇文章就够了！](https://juejin.im/post/6844903598522908686#heading-5)
- [Git 常用操作总结](https://juejin.im/post/6844903586120335367)
- [您必须知道的 Git 分支开发规范](https://juejin.im/post/6844903635533594632#heading-3)
- [如何优雅地使用 Git](https://juejin.im/post/6844903546104135694#heading-5)
- [优雅的提交你的 Git Commit Message](https://juejin.im/post/6844903606815064077)