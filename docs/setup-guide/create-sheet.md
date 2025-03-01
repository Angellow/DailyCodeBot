## 步骤1：创建Google表格
1. 点击[模板表格](https://docs.google.com/spreadsheets/d/xxx) → 创建副本
2. 按需修改列：
   | 列名       | 必填 | 说明                 |
   |------------|------|----------------------|
   | 日期       | 是   | 格式：月-日（如2-3） |
   | 分类       | 是   | 算法分类英文名       |
   | 必做题目   | 是   | 用逗号分隔题号       |

3. 开启表格API：
   - 菜单：扩展程序 → Apps Script → 粘贴[此代码](scripts/google-sheets/daily-push.js)