function sendDailyProblems() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("题解交流计划表");
    const today = new Date();
    const timezone = "America/Los_Angeles"; // 设置为加州时区
    const todayMonthDay = Utilities.formatDate(today, timezone, "M-d"); // 获取当前日期（如2-3）
    console.log("当前加州日期（M-d格式）：", todayMonthDay); // 调试输出
  
    // 获取表格数据
    const dataRange = sheet.getRange("A2:H" + sheet.getLastRow());
    const data = dataRange.getValues();
  
    // 查找匹配今日日期的行
    let targetRow = null;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const date = row[0]; // A列：日期（如2-3）
      const pushStatus = row[7]; // H列：推送状态（索引7）
      console.log("检查行：日期=", date, "，推送状态=", pushStatus); // 调试输出
  
      if (date === todayMonthDay && pushStatus !== "✅ 已推送") {
        targetRow = row;
        break;
      }
    }
  
    if (!targetRow) {
      console.log("今日无待推送任务或已推送。");
      return;
    }
  
    // 构建推送消息
    const [date, weekday, category, requiredProblems, , , , ] = targetRow;
    const message = `📅【${date} ${weekday} 必刷题目】\n\n🔸 分类：${category}\n🔸 必做题目：${requiredProblems}\n\n💡 完成记得在群内打卡哦～`;
  
    // 发送消息（使用WxPusher）
    const appToken = "aaaa"; // 替换为实际Token
    const webhookUrl = "https://wxpusher.zjiecode.com/api/send/message";
    try {
      const response = UrlFetchApp.fetch(webhookUrl, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        payload: JSON.stringify({
          appToken: appToken,
          content: message,
          contentType: 1,
          uids: [""] // 如需群发，填["ALL"]；定向推送填具体UID      
          })
      });
      
      // 标记为已推送
      const rowIndex = data.findIndex(row => row[0] === todayMonthDay) + 2; // 数据从第2行开始
      sheet.getRange(rowIndex, 8).setValue("✅ 已推送"); // H列为第8列
      console.log("推送成功：", response.getContentText());
    } catch (e) {
      console.error("推送失败：", e.message);
    }
  }