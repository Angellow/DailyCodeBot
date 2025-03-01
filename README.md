# DailyCodeBot - LeetCode刷题群智能管理系统 🚀

通过Google Sheets + 微信推送实现自动化题目管理与进度跟踪

> 基于Google Sheets + 微信生态的LeetCode刷题全流程管理系统  
> 每日自动推送 | LeetCode验证打卡 | 智能进度跟踪 | 多平台协同

## 🌟 核心功能

### 📋 简易版功能清单
- ✅ 每日定时推送题目  
- ✅ 微信消息打卡自动记录  
- ✅ 实时进度看板生成  
- ✅ 多群组支持（通过不同Sheet管理）

[完整功能列表](docs/features.md)
### 自动化流程
- **智能题目推送**  
  ⏰ 每日定时通过微信服务号推送当日任务
- **LeetCode验证打卡**  
  ✅ 自动验证用户LeetCode提交记录，杜绝虚假打卡
- **数据中枢同步**  
  🔄 Google Sheets实时同步全平台数据

### 协作管理
- **可视化看板**  
  📊 自动生成个人/群组刷题进度报表
- **智能提醒系统**  
  🔔 未完成成员定向提醒（支持微信/邮件）
- **弹性规则配置**  
  ⚙️ 自定义题目分类、推送时间、积分规则


## 🚀 简易版五分钟快速部署
1. 复制[此Google表格模板](examples/sample-sheet.csv)
2. 注册[WxPusher](https://wxpusher.com)获取AppToken
3. 部署脚本：[配置教程](docs/setup-guide/deploy-scripts.md)


## 🚀 完整版快速启动

### 前置需求
- Google账号（用于Sheets API）
- 微信服务号（订阅消息）或企业微信
- 服务器/VPS（推荐1核1G+）

### 部署步骤
```bash
# 克隆仓库
git clone https://github.com/Angellow/DailyCodeBot
cd DailyCodeBot

# 安装依赖
pip install -r requirements.txt
npm install

# 复制配置文件
cp config_template.env .env
