function checkVacancy() {
    // 获取当前电子表格
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  console.log("当前表格名称：", spreadsheet.getName()); // 调试输出

  // 获取指定工作表
  const sheet = spreadsheet.getSheetByName("题解交流计划表");
  if (!sheet) {
    console.error("错误：未找到工作表 '题解交流计划表'，请检查名称！");
    return;
  }
  console.log("工作表名称：", sheet.getName()); // 调试输出

  // 获取数据范围（假设数据从第2行开始）
  const lastRow = sheet.getLastRow();
  console.log("最后数据行：", lastRow); // 调试输出
  if (lastRow < 2) {
    console.error("错误：无有效数据行！");
    return;
  }
  const dataRange = sheet.getRange("A2:F" + lastRow);
  const data = dataRange.getValues();

  let message = "📢【刷题群待认领提醒】\n\n";
  const now = new Date();

  data.forEach((row, index) => {
    const date = row[0];      // A列：日期（如2-3）
    const weekday = row[1];   // B列：星期（如周一）
    const category = row[2];  // C列：分类（如binary search）
    const problems = row[3];  // D列：必做题目（如1482，1283，69）
    const person = row[4];    // E列：讲解人
    const status = row[5];    // F列：状态（如🔴待认领）

    // 检查状态为待认领且讲解人为空
    if ((status === "🔴 待认领" || status === "🔴 周五自愿") && !person) {
      message += `📅 ${date}（${weekday}）\n🔸 分类：${category}\n🔸 题目：${problems}\n🔸 状态：${status}\n\n`;
      // 记录最后提醒时间（可选）
      sheet.getRange(index + 2, 7).setValue(now.toLocaleString()); // 新增G列记录时间
    }
  });

  if (message !== "📢【刷题群待认领提醒】\n\n") {
    const appToken = "aaaa"; // 替换为实际Token
    const webhookUrl = "https://wxpusher.zjiecode.com/api/send/message";
    try {
      const response = UrlFetchApp.fetch(webhookUrl, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        payload: JSON.stringify({
          appToken: appToken,
          content: message,
          contentType: 1, // 1表示文字
          uids: [""] // 如需群发，填["ALL"]；定向推送填具体UID
        })
      });
      Logger.log("发送成功：" + response.getContentText());
    } catch (e) {
      Logger.log("发送失败：" + e.message);
    }
  }
}