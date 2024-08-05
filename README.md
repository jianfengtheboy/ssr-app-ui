# Nuxt-APP-UI

## Nuxt3 PC 端模板（兼容多种布局模式）

### 一、安装依赖

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

### 二、启动项目

```bash
# npm
npm run dev

# pnpm
pnpm run dev 或 pnpm dev

# yarn
yarn dev
```

### 三、项目打包

#### 3.1、线上生产构建:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

#### 3.2、本地预览生产构建:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

### 四、系统简介

#### 4.1、概述

Nuxt3 PC 端模板（兼容多种布局模式）

#### 4.2、服务维护者

- name: jianfengtheboy email: jianfengtheboy@163.com

### 五、系统介绍

#### 5.1、主要技术

-1、nuxt@^3.6.5
-2、vue@^3.3.4
-3、element-plus@^2.3.8
-4、@pinia/nuxt@^0.4.11
-5、@pinia-plugin-persistedstate/nuxt@^1.1.1
-6、typescript@^5.1.6
-7、tailwindcss@^3.3.3
-8、sass@^1.64.0
-9、postcss@^8.4.26
-10、nuxt-lodash@^2.5.0

#### 5.2、项目结构

##### 文件说明

| 文件名称           | 说明                                       |
| ------------------ | ------------------------------------------ |
| src                | 项目配置项目开发的所有内容页面             |
| src/apis           | 接口统一管理                               |
| src/assets         | 配置项目所需的公共的静态资源页面           |
| src/components     | 全局组件（基础组件、业务组件）             |
| src/composables    | 全局方法（hooks、请求方法等）              |
| src/config         | 全局配置（枚举、正则表达式方法等）         |
| src/content        | markdown 文档                              |
| src/layouts        | 自定义全局布局页面                         |
| src/middleware     | 配置自定义中间件                           |
| src/model          | 配置全局 ts 模型、接口                     |
| src/pages/         | 配置所有业务页面                           |
| src/plugins        | 配置全局插件                               |
| src/public         | 配置 favicon.ico                           |
| src/store          | 配置 pinia 全局状态管理                    |
| src/utils          | 全局共用方法                               |
| src/app.vue        | 入口页面                                   |
| src/error.vue      | 自定义全局错误页面（404 等）               |
| .env.development   | 开发环境相关配置                           |
| .env.production    | 生产环境相关配置                           |
| .env.test          | 测试环境相关配置                           |
| .prettierrc        | 代码格式化配置                             |
| types              | 全局 ts 类型处理                           |
| tailwind.config.js | tailwindcss 自定义配置                     |
| nuxt.config.ts     | nuxt 自定义配置、开发代理配置、vite 配置等 |

### 六、项目结构详细说明

#### 6.1、assets 目录

-1、icons：全局 svg 图统一纳管文件夹，可通过 BaseIcon 组件引用
-2、images：全局静态图片纳管文件夹
-3、styles：全局静态样式纳管文件夹

#### 6.2、components 目录

-1、base：全局基础组件
-2、business：全局业务组件

#### 6.3、composables 目录

-1、hooks：全局 hooks
--1.1、hooks/base：全局基础 hooks
--1.2、hooks/business：全局业务 hooks

-2、request：全局请求方法封装
--2.1、request/useHttp：基于 useFetch 请求方法的封装
--2、2、request/useRequest：基于$fetch API 的封装

#### 6.4、layouts 目录

-1、default：默认布局，包含 header、sideBar 组件，主要应用于需要头部导航和左侧菜单栏的页面，例如系统管理模块
-2、fullscreen：全屏布局，不包含 header、sideBar 等组件，主要应用于全屏显示或需要额外自定义布局的页面，例如登录页
-3、grail：圣杯布局，包含 header 组件，主要应用于需要头部导航的页面，例如门户页面

#### 6.5、middleware 目录

- 注意：全局中间件需要在文件名中加上 `.global` 后缀，在所有页面都执行，否则只在引用的页面执行

-1、router.global.ts：全局路由导航守卫

#### 6.6、pages 目录

- 注意：若菜单路由通过接口获取，则文件名和文件结构需与接口返回的结构保持一致

#### 6.7、plugins 目录

- 注意：vue 中的 directive 自定义指令须作为插件在此定义
