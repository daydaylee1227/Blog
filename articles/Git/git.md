

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

- 创建分支并切换

  - git checkout -b <name>

- 删除分支

  - git branch -d <name>

- 删除远程分支

  - git push -d <origin> <branch>

- 切换分支

  - git checkout <name>

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