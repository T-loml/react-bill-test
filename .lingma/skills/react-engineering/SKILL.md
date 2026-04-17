# Skill: React Engineering Standard

## 适用范围
React + TypeScript 项目代码生成与修改

---

## 技术栈规范（必须遵循官方推荐用法）

### Redux Toolkit
- 必须使用 `@reduxjs/toolkit`
- 禁止手写原始 reducer switch-case
- 必须使用 `createSlice` + `configureStore`
- state 必须可序列化

### React Redux
- 使用 hooks API：
  - useSelector
  - useDispatch
- 禁止使用 connect（除非明确要求）

### React Router DOM
- 使用 v6+ 写法
- 使用 createBrowserRouter 或 useRoutes
- 禁止使用 v5 写法（Switch / withRouter）

### Axios
- 必须封装 request instance
- 必须支持 interceptors
- 不允许直接 axios.get/post 散用

### Dayjs
- 禁止使用 moment
- 时间格式统一 dayjs

### Ant Design Mobile
- 必须按组件官方文档引入
- 禁止全量引入

### Sass + classnames
- classnames 必须用于条件样式拼接
- sass 使用模块化（.module.scss 优先）

---

## 代码修改原则（非常重要）

- ❌ 禁止重写整个文件
- ❌ 禁止删除未要求修改的逻辑
- ✅ 必须基于现有代码做 diff 修改
- ✅ 保留用户已有修改内容
- ✅ 只修改“明确相关区域”

---

## 输出规则

- 只输出代码
- 不解释
- 保持最小修改

---