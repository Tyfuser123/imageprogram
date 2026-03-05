# 线上部署详细步骤

本文档提供从零开始的完整部署流程，包括 GitHub 注册、代码推送和 GitHub Pages 部署。

---

## 一、注册 GitHub 账号

1. 打开浏览器，访问 [https://github.com](https://github.com)
2. 点击右上角 **Sign up**
3. 按提示填写：
   - 邮箱
   - 密码（至少 15 位，或 8 位以上且含数字和小写字母）
   - 用户名（将作为你的 GitHub 地址，如 `username`）
4. 完成人机验证（如拼图）
5. 验证邮箱：查收 GitHub 发送的验证邮件，点击链接完成验证

---

## 二、安装 Git

1. 访问 [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. 下载对应系统的安装包（Windows 选 64-bit）
3. 安装时保持默认选项即可
4. 安装完成后，打开**命令提示符**或 **PowerShell**，输入：
   ```bash
   git --version
   ```
   若显示版本号则安装成功

---

## 三、配置 Git 用户信息（首次使用）

在命令行执行：

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的GitHub邮箱"
```

例如：
```bash
git config --global user.name "zhangsan"
git config --global user.email "zhangsan@example.com"
```

---

## 四、在 GitHub 创建仓库

1. 登录 GitHub，点击右上角 **+** -> **New repository**
2. 填写：
   - **Repository name**：如 `imageprogram`（与 vite.config.ts 中 base 的仓库名一致）
   - **Description**：可选，如「图形编程教育平台」
   - **Public**：选择公开
   - **不要**勾选 "Add a README file"
3. 点击 **Create repository**

---

## 五、将本地项目推送到 GitHub

在项目根目录 `e:\tyf20260121\imageprogram` 下打开命令行，依次执行：

### 1. 初始化 Git（若项目尚未初始化）

```bash
cd e:\tyf20260121\imageprogram
git init
```

### 2. 添加远程仓库

将 `你的用户名` 和 `imageprogram` 替换为你的实际值：

```bash
git remote add origin https://github.com/你的用户名/imageprogram.git
```

例如：`git remote add origin https://github.com/zhangsan/imageprogram.git`

### 3. 添加并提交代码

```bash
git add .
git commit -m "初始化项目"
```

### 4. 推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

若提示输入账号密码：
- **用户名**：你的 GitHub 用户名
- **密码**：需使用 **Personal Access Token**（GitHub 已不再支持密码登录）

#### 创建 Personal Access Token

1. GitHub 右上角头像 -> **Settings**
2. 左侧最下方 **Developer settings** -> **Personal access tokens** -> **Tokens (classic)**
3. **Generate new token** -> **Generate new token (classic)**
4. 填写 Note（如 `deploy`），勾选 **repo** 权限
5. 点击 **Generate token**，复制生成的 token（只显示一次，请妥善保存）
6. 推送时在「密码」处粘贴该 token

---

## 六、部署到 GitHub Pages

### 1. 执行部署命令

```bash
cd e:\tyf20260121\imageprogram
npm install
npm run deploy
```

### 2. 开启 GitHub Pages

1. 打开仓库页面：`https://github.com/你的用户名/imageprogram`
2. 点击 **Settings** -> 左侧 **Pages**
3. 在 **Source** 中选择 **Deploy from a branch**
4. **Branch** 选择 `gh-pages`，文件夹选 `/ (root)`
5. 点击 **Save**

### 3. 访问网站

等待 1–2 分钟后，访问：

```
https://你的用户名.github.io/imageprogram/
```

例如：`https://zhangsan.github.io/imageprogram/`

---

## 七、后续更新部署

修改代码后，重新部署：

```bash
git add .
git commit -m "更新说明"
git push
npm run deploy
```

---

## 八、常见问题

| 问题 | 处理 |
|------|------|
| `git` 不是内部或外部命令 | 检查 Git 是否安装成功，或重启命令行 |
| 推送时提示 403 / 认证失败 | 使用 Personal Access Token 而非密码 |
| 页面 404 | 确认 base 为 `'/imageprogram/'`，且仓库名为 `imageprogram` |
| 页面空白 | 检查 base 是否与仓库名一致，或改为 `'/仓库名/'` |
