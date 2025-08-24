# 个人简历网站

基于您的阿里巴巴经验和ByteDance豆包团队LLM工程师岗位要求定制的专业简历网站。

## 🚀 快速启动

### 方法一：Python服务器（推荐）
```bash
python3 server.py
```
或者
```bash
python server.py
```

服务器将自动：
- 查找可用端口（默认8000）
- 打开默认浏览器
- 显示网站URL和使用说明

### 方法二：直接打开HTML文件
直接双击 `index.html` 文件在浏览器中打开

## 📁 文件结构

```
├── index.html      # 主页面文件
├── styles.css      # 样式表
├── script.js       # 交互脚本
├── server.py       # Python服务器脚本
├── docs/           # 原始文档
│   ├── resume.md   # 个人简历
│   └── jd.md       # 岗位要求
└── README.md       # 说明文档
```

## 🎯 网站特色

### 专业设计
- 针对LLM工程师岗位优化的布局
- 突出显示相关技术栈：Java, Python, Golang
- 强调AI技术经验和大规模系统架构能力

### 响应式设计
- 移动端友好，适配各种屏幕尺寸
- 现代化的CSS Grid和Flexbox布局
- 流畅的动画效果和交互体验

### 核心内容亮点
- **工作经验**：4年阿里巴巴后端开发经验
- **技术项目**：
  - 亿级QPS广告系统优化
  - Text2SQL智能查询系统（LLM应用）
- **技术栈匹配**：与豆包团队要求高度吻合
- **教育背景**：卡内基梅隆大学硕士

## 🛠️ 自定义修改

### 联系信息
编辑 `index.html` 文件中的联系信息部分：
```html
<div class="contact-method">
    <strong>邮箱:</strong> 
    <a href="mailto:your.email@example.com">your.email@example.com</a>
</div>
```

### 个人信息
修改页面标题、姓名、技能描述等个人信息。

### 样式调整
编辑 `styles.css` 文件来调整：
- 色彩方案
- 字体大小
- 布局间距
- 动画效果

## 📱 浏览器兼容性

支持现代浏览器：
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🔧 技术栈

- **前端**：纯HTML5 + CSS3 + Vanilla JavaScript
- **服务器**：Python 3 内置 HTTP 服务器
- **设计**：响应式设计，移动优先
- **动画**：CSS动画 + Intersection Observer API

## 📊 性能优化

- 纯静态文件，加载速度快
- 优化的CSS，减少重绘和重排
- 懒加载动画，提升交互体验
- 压缩的代码结构

## 🎨 设计理念

专门针对豆包团队的LLM工程师岗位设计：
1. **技术导向**：突出后端开发和AI应用经验
2. **数据驱动**：用具体数字展示项目成果
3. **创新意识**：展现LLM技术落地能力
4. **工程思维**：体现大规模系统架构经验

---

💡 **提示**：网站已经根据您的简历和目标岗位进行了深度定制，直接展示了与豆包团队最匹配的技术能力和项目经验。