<!--
 * @Author: kangrun.shao kangrun.shao@ly.com
 * @Date: 2023-01-18
 * @LastEditors: kangrun.shao kangrun.shao@ly.com
 * @LastEditTime: 2023-01-30
 * @Description: 
-->
# 开发记录
🛌 = 待开发
🧑‍💻 = 开发/解决中
✅ = 已解决
❓︎ = 存在问题
❌ = 不管了
## 日常问题
### react

- ✅ [输入框修改用户输入，光标变到最后位置](https://github.com/shaokr/development-record/issues/4)
	- ✅ 可控制光标显示位置
### antd
- ✅ [Table表单虚拟滚动条](https://github.com/shaokr/development-record/issues/5)
	- ✅ 滚动条会出表格区域
	- ✅ 干掉定时器去获取宽度方式
	- ✅ 因占用summary属性让使用者无法使用summary属性的问题
	- 🛌 偶尔出现抽搐现象
	- ✅ 获取最外层的滚动元素存在问题


## vscode插件
### 相关内容
- [api文档](https://vscode-api-cn.js.org/)
### 【[jr-tools](https://marketplace.visualstudio.com/items?itemName=jr-tools.jr-tools)】为解决公司业务中会出现的一些问题开发的插件工具集

- ✅ 右键编译功能
- ✅ 右键编译变更了模块功能
- ✅ 常量生成
- ✅ 持续常量生成
- ✅ 快速创建模块功能
	- 🛌 提取出来创建一个独立的插件工具
	- 🛌 新增默认右键中的目录为模块输出地址

### 问题
- ✅ [加载工作区内的js文件](https://github.com/shaokr/development-record/issues/1) 
- ❓︎ [vscode访问插件内文件内容](https://github.com/shaokr/development-record/issues/2)
- ✅ [工作区中鼠标右键菜单显示控制]
- ❓︎ [插件载入马上读取项目中的js会造成编辑器卡死问题](https://github.com/shaokr/development-record/issues/6)
- ✅ [工作区中右键功能也在命令中出现](https://github.com/shaokr/development-record/issues/7)

### 【[skr-tools](https://marketplace.visualstudio.com/items?itemName=shaokr.skr-tools)】自己偷懒用的一些工具集

- ✅ 大驼峰
- ✅ 小驼峰
- ✅ 中划线
- ✅ 获取文件大驼峰
- ✅ 获取文件小驼峰
- ✅ 获取文件夹大驼峰
- ✅ 获取文件夹小驼峰
- ✅ 获取当前文件目录下所有内容的引用
- ✅ 模板快速生成内容
	- ✅ 使用js去做模板配置
	- ✅ 可处理数据内容，以适应更加复杂的场景
- ✅ 根据yapi生成mock文件
	- ✅ 支持项目、分类、接口的三种类型生成文件
	- 🛌 输出内容可自定义
- ❌（不维护-后续删除）转换数据为antd表格用的columns数据-可用模板快速生成功能替代
- ❌（不维护-后续删除）转换数据为antd的Form表单Item数据
- ✅ 根据ts(需要含注释)填写表格dataIndex
- ✅ 根据ts(需要含注释)填写Form.Item的name
- ✅ ts类型映射写入

### 问题
- ✅ [输出内容到当前光标位置](https://github.com/shaokr/development-record/issues/3)


## 其他构想

- 🛌 实现一个低代码平台
	- 采用jsonschema数据格式
	- 版本变化数据转换能力
	
	