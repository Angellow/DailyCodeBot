# scripts/wxpusher/callback.py
@app.route('/checkin', methods=['POST'])
def handle_checkin():
    user_id = request.json.get('uid')
    problem_id = extract_problem_id(request.json.get('content'))  # 解析消息如"打卡 206"
    
    # 更新Google表格
    sheet = gc.open_by_key(SHEET_ID).worksheet("打卡记录")
    sheet.append_row([datetime.now(), user_id, problem_id])
    
    return jsonify({"code": 0, "msg": "打卡成功"})