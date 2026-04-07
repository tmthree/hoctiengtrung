// Thematic Lessons — 10 real-life scenario mini-lessons
// Cross-level topic collections: restaurant, airport, hotel, taxi, doctor, job, rent, dating, shopping, travel

import type { LessonData } from "./lessons";

export const thematicLessons: LessonData[] = [
  // ─── 1. GỌI MÓN TẠI NHÀ HÀNG ───────────────────────────────────
  {
    title: "Gọi món tại nhà hàng",
    description: "Học cách gọi món, hỏi gợi ý và thanh toán tại nhà hàng Trung Quốc",
    hskLevel: 2,
    type: "CONVERSATION",
    order: 51,
    content: [
      {
        type: "text",
        content:
          "Đến nhà hàng Trung Quốc, bạn cần biết gọi món, hỏi về khẩu vị và yêu cầu tính tiền. Bài này giúp bạn tự tin giao tiếp trong nhà hàng!",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\n服务员: 您好！请问几位？\nA: 两位。\n服务员: 好的，这是菜单，请看一看。\nA: 谢谢。我想点这个，辣的可以吗？\n服务员: 可以，您喜欢多辣？\nA: 不太辣，清淡一点。\n服务员: 好的，还要别的吗？\nA: 再来一碗汤。我已经很饱了，不用太多。\n服务员: 好的，稍等。\nA: 买单！谢谢！\n服务员: 好的，一共八十八元。",
      },
      { type: "vocabulary", simplified: "菜单", pinyin: "càidān", meaning: "thực đơn" },
      { type: "vocabulary", simplified: "点菜", pinyin: "diǎn cài", meaning: "gọi món" },
      { type: "vocabulary", simplified: "服务员", pinyin: "fúwùyuán", meaning: "nhân viên phục vụ" },
      { type: "vocabulary", simplified: "买单", pinyin: "mǎidān", meaning: "tính tiền / thanh toán" },
      { type: "vocabulary", simplified: "辣", pinyin: "là", meaning: "cay" },
      { type: "vocabulary", simplified: "甜", pinyin: "tián", meaning: "ngọt" },
      { type: "vocabulary", simplified: "酸", pinyin: "suān", meaning: "chua" },
      { type: "vocabulary", simplified: "咸", pinyin: "xián", meaning: "mặn" },
      { type: "vocabulary", simplified: "清淡", pinyin: "qīngdàn", meaning: "nhạt / ít dầu mỡ" },
      { type: "vocabulary", simplified: "饱", pinyin: "bǎo", meaning: "no" },
      { type: "vocabulary", simplified: "饿", pinyin: "è", meaning: "đói" },
      { type: "vocabulary", simplified: "好吃", pinyin: "hǎochī", meaning: "ngon" },
      {
        type: "grammar",
        title: "Các câu cần nhớ trong nhà hàng",
        explanation: "Những mẫu câu thực dụng khi gọi món và thanh toán.",
        examples: [
          "我想点菜。— Tôi muốn gọi món.",
          "这个好吃吗？— Món này có ngon không?",
          "不要太辣。— Đừng cho quá cay.",
          "买单！— Tính tiền!",
          "一共多少钱？— Tổng cộng bao nhiêu tiền?",
          "我吃饱了。— Tôi ăn no rồi.",
        ],
      },
    ],
    vocabularyKeys: ["菜单", "点菜", "服务员", "买单", "辣", "甜", "酸", "咸", "清淡", "饱", "饿", "好吃"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "Khi muốn gọi món, bạn nói gì?",
          options: ["我想买单", "我想点菜", "我很饱了", "菜单好吃"],
        },
        answer: { correct: 1 },
        explanation: "我想点菜 (Wǒ xiǎng diǎn cài) = Tôi muốn gọi món.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 2,
        difficulty: 2,
        question: {
          text: "服务员 (fúwùyuán) nghĩa là gì?",
          options: ["Thực đơn", "Món ăn ngon", "Nhân viên phục vụ", "Thanh toán"],
        },
        answer: { correct: 2 },
        explanation: "服务员 = nhân viên phục vụ. 服务 (fúwù) = phục vụ, 员 (yuán) = nhân viên.",
      },
      {
        type: "MATCHING",
        order: 3,
        difficulty: 2,
        question: {
          text: "Nối từ với nghĩa tương ứng:",
          pairs: [
            { chinese: "辣", vietnamese: "cay" },
            { chinese: "甜", vietnamese: "ngọt" },
            { chinese: "酸", vietnamese: "chua" },
            { chinese: "咸", vietnamese: "mặn" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn vị cơ bản: 辣 cay, 甜 ngọt, 酸 chua, 咸 mặn. Thêm 清淡 (nhạt) cho người ăn nhẹ.",
      },
      {
        type: "FILL_BLANK",
        order: 4,
        difficulty: 2,
        question: { text: "___！(Tính tiền!)", hint: "Hai chữ, dùng khi muốn thanh toán" },
        answer: { correct: "买单" },
        explanation: "买单 (mǎidān) = tính tiền / thanh toán. Cũng có thể nói 结账 (jiézhàng).",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 5,
        difficulty: 2,
        question: {
          text: "Làm thế nào để hỏi món ăn có ngon không?",
          options: ["这个辣吗？", "这个好吃吗？", "这个买单吗？", "这个饱吗？"],
        },
        answer: { correct: 1 },
        explanation: "这个好吃吗？(Zhège hǎochī ma?) = Món này có ngon không? 好吃 = ngon.",
      },
      {
        type: "PINYIN",
        order: 6,
        difficulty: 2,
        question: { text: "Nhập pinyin của từ: 清淡", hint: "Nghĩa: nhạt, ít dầu mỡ" },
        answer: { correct: "qīngdàn" },
        explanation: "清淡 (qīngdàn) = nhạt, ít gia vị. Thanh 1 + thanh 4.",
      },
    ],
  },

  // ─── 2. Ở SÂN BAY ────────────────────────────────────────────────
  {
    title: "Ở sân bay",
    description: "Học từ vựng và hội thoại tại sân bay: check-in, an ninh, lên máy bay",
    hskLevel: 3,
    type: "CONVERSATION",
    order: 52,
    content: [
      {
        type: "text",
        content:
          "Đi du lịch Trung Quốc, bạn cần biết các từ liên quan đến sân bay. Từ check-in đến lên máy bay, bài này chuẩn bị đầy đủ cho bạn!",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\n工作人员: 您好，请出示护照和机票。\nA: 好的，这是我的护照。\n工作人员: 您有几件行李要托运？\nA: 一件。请问我的座位在哪里？\n工作人员: 靠窗的23A。请问您需要换座位吗？\nA: 不用了，谢谢。登机口在哪儿？\n工作人员: 在B区，安检之后往右走。飞机在下午三点起飞。\nA: 好的。请问有没有延误？\n工作人员: 没有，准时起飞。",
      },
      { type: "vocabulary", simplified: "登机牌", pinyin: "dēngjīpái", meaning: "thẻ lên máy bay / boarding pass" },
      { type: "vocabulary", simplified: "安检", pinyin: "ānjiǎn", meaning: "kiểm tra an ninh" },
      { type: "vocabulary", simplified: "登机口", pinyin: "dēngjīkǒu", meaning: "cổng lên máy bay / gate" },
      { type: "vocabulary", simplified: "起飞", pinyin: "qǐfēi", meaning: "cất cánh / khởi hành (máy bay)" },
      { type: "vocabulary", simplified: "降落", pinyin: "jiàngluo", meaning: "hạ cánh" },
      { type: "vocabulary", simplified: "行李", pinyin: "xíngli", meaning: "hành lý" },
      { type: "vocabulary", simplified: "转机", pinyin: "zhuǎnjī", meaning: "đổi máy bay / quá cảnh" },
      { type: "vocabulary", simplified: "延误", pinyin: "yánwù", meaning: "chậm trễ / delay" },
      { type: "vocabulary", simplified: "广播", pinyin: "guǎngbō", meaning: "thông báo / phát thanh" },
      { type: "vocabulary", simplified: "座位", pinyin: "zuòwèi", meaning: "chỗ ngồi / ghế" },
      {
        type: "grammar",
        title: "Câu hỏi và yêu cầu tại sân bay",
        explanation: "Những mẫu câu cần thiết khi di chuyển trong sân bay.",
        examples: [
          "登机口在哪里？— Cổng lên máy bay ở đâu?",
          "飞机几点起飞？— Máy bay mấy giờ cất cánh?",
          "有没有延误？— Có bị delay không?",
          "我需要转机。— Tôi cần đổi máy bay.",
          "我的行李在哪里？— Hành lý của tôi ở đâu?",
        ],
      },
    ],
    vocabularyKeys: ["登机牌", "安检", "登机口", "起飞", "降落", "行李", "转机", "延误", "广播", "座位"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "延误 (yánwù) có nghĩa là gì?",
          options: ["Cất cánh", "Hạ cánh", "Chậm trễ / delay", "Hành lý"],
        },
        answer: { correct: 2 },
        explanation: "延误 (yánwù) = chậm trễ, delay. VD: 航班延误了两小时 = Chuyến bay bị delay 2 tiếng.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 2,
        difficulty: 3,
        question: {
          text: "Bạn hỏi cổng lên máy bay ở đâu như thế nào?",
          options: ["行李在哪里？", "座位在哪里？", "登机口在哪里？", "安检在哪里？"],
        },
        answer: { correct: 2 },
        explanation: "登机口在哪里？(Dēngjīkǒu zài nǎlǐ?) = Cổng lên máy bay ở đâu?",
      },
      {
        type: "MATCHING",
        order: 3,
        difficulty: 3,
        question: {
          text: "Nối từ với nghĩa:",
          pairs: [
            { chinese: "起飞", vietnamese: "cất cánh" },
            { chinese: "降落", vietnamese: "hạ cánh" },
            { chinese: "转机", vietnamese: "quá cảnh" },
            { chinese: "行李", vietnamese: "hành lý" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ quan trọng: 起飞 cất cánh, 降落 hạ cánh, 转机 quá cảnh, 行李 hành lý.",
      },
      {
        type: "FILL_BLANK",
        order: 4,
        difficulty: 3,
        question: { text: "飞机几点___？(Máy bay mấy giờ cất cánh?)", hint: "Động từ chỉ việc máy bay rời mặt đất" },
        answer: { correct: "起飞" },
        explanation: "起飞 (qǐfēi) = cất cánh. 飞机几点起飞？= Máy bay cất cánh lúc mấy giờ?",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 3,
        question: { text: "Nhập pinyin: 登机牌", hint: "Boarding pass" },
        answer: { correct: "dēngjīpái" },
        explanation: "登机牌 (dēngjīpái) = boarding pass. 登机 = lên máy bay, 牌 = thẻ.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 3,
        question: {
          text: "广播 (guǎngbō) nghĩa là gì?",
          options: ["Vé máy bay", "Ghế ngồi", "Thông báo qua loa", "Hành lý"],
        },
        answer: { correct: 2 },
        explanation: "广播 (guǎngbō) = thông báo qua loa / phát thanh. Tại sân bay thường có 广播通知.",
      },
    ],
  },

  // ─── 3. NHẬN PHÒNG KHÁCH SẠN ─────────────────────────────────────
  {
    title: "Nhận phòng khách sạn",
    description: "Học cách đặt phòng, nhận phòng, hỏi về tiện nghi và trả phòng khách sạn",
    hskLevel: 2,
    type: "CONVERSATION",
    order: 53,
    content: [
      {
        type: "text",
        content:
          "Khi đến khách sạn ở Trung Quốc, bạn cần biết cách xác nhận đặt phòng, nhận chìa khóa và hỏi về các tiện nghi trong phòng.",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\n前台: 您好，欢迎光临！请问有预订吗？\nA: 有，我的名字是阮明，预订了一间双人间。\n前台: 好的，找到了。请问您住几晚？\nA: 两晚。请问房间在几楼？\n前台: 在八楼，这是您的钥匙。房间里有空调和热水。早餐在一楼，从七点开始。\nA: 好的，电梯在哪里？\n前台: 在左边。祝您住得愉快！\n\n(退房时)\nA: 我要退房了，这是钥匙。\n前台: 好的，请稍等，我帮您结账。",
      },
      { type: "vocabulary", simplified: "预订", pinyin: "yùdìng", meaning: "đặt trước / đặt phòng" },
      { type: "vocabulary", simplified: "入住", pinyin: "rùzhù", meaning: "nhận phòng / check-in" },
      { type: "vocabulary", simplified: "退房", pinyin: "tuìfáng", meaning: "trả phòng / check-out" },
      { type: "vocabulary", simplified: "房间", pinyin: "fángjiān", meaning: "phòng" },
      { type: "vocabulary", simplified: "钥匙", pinyin: "yàoshi", meaning: "chìa khóa" },
      { type: "vocabulary", simplified: "空调", pinyin: "kōngtiáo", meaning: "máy lạnh / điều hòa" },
      { type: "vocabulary", simplified: "热水", pinyin: "rèshuǐ", meaning: "nước nóng" },
      { type: "vocabulary", simplified: "早餐", pinyin: "zǎocān", meaning: "bữa sáng" },
      { type: "vocabulary", simplified: "前台", pinyin: "qiántái", meaning: "lễ tân" },
      { type: "vocabulary", simplified: "楼层", pinyin: "lóucéng", meaning: "tầng (lầu)" },
      { type: "vocabulary", simplified: "电梯", pinyin: "diàntī", meaning: "thang máy" },
      {
        type: "grammar",
        title: "Câu hỏi tại khách sạn",
        explanation: "Mẫu câu check-in, hỏi tiện nghi và check-out.",
        examples: [
          "我有预订。— Tôi có đặt phòng trước.",
          "房间在几楼？— Phòng ở tầng mấy?",
          "有没有空调？— Có điều hòa không?",
          "早餐包括吗？— Bữa sáng có bao gồm không?",
          "我要退房。— Tôi muốn trả phòng.",
        ],
      },
    ],
    vocabularyKeys: ["预订", "入住", "退房", "房间", "钥匙", "空调", "热水", "早餐", "前台", "楼层", "电梯"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "Khi đến khách sạn, bạn nói gì để xác nhận đặt phòng?",
          options: ["我要退房", "我有预订", "请给我钥匙", "早餐在哪里"],
        },
        answer: { correct: 1 },
        explanation: "我有预订 (Wǒ yǒu yùdìng) = Tôi có đặt phòng. Sau đó cung cấp tên và số đặt phòng.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 2,
        difficulty: 2,
        question: {
          text: "退房 (tuìfáng) nghĩa là gì?",
          options: ["Nhận phòng", "Đặt phòng", "Trả phòng", "Phòng trống"],
        },
        answer: { correct: 2 },
        explanation: "退房 (tuìfáng) = trả phòng / check-out. 入住 (rùzhù) = nhận phòng / check-in.",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 2,
        question: { text: "房间在几___？(Phòng ở tầng mấy?)", hint: "Từ chỉ tầng lầu" },
        answer: { correct: "楼" },
        explanation: "楼 (lóu) = tầng / lầu. Có thể dùng 楼层 (lóucéng) chính thức hơn.",
      },
      {
        type: "MATCHING",
        order: 4,
        difficulty: 2,
        question: {
          text: "Nối từ với nghĩa:",
          pairs: [
            { chinese: "钥匙", vietnamese: "chìa khóa" },
            { chinese: "空调", vietnamese: "điều hòa" },
            { chinese: "电梯", vietnamese: "thang máy" },
            { chinese: "早餐", vietnamese: "bữa sáng" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ thiết yếu trong khách sạn: 钥匙 chìa khóa, 空调 điều hòa, 电梯 thang máy, 早餐 bữa sáng.",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 2,
        question: { text: "Nhập pinyin: 预订", hint: "Nghĩa: đặt trước" },
        answer: { correct: "yùdìng" },
        explanation: "预订 (yùdìng) = đặt trước. Thanh 4 + thanh 4.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 2,
        question: {
          text: "前台 (qiántái) nghĩa là gì?",
          options: ["Bữa sáng", "Lễ tân", "Chìa khóa", "Thang máy"],
        },
        answer: { correct: 1 },
        explanation: "前台 (qiántái) = lễ tân / reception. 前 = trước, 台 = bàn/quầy.",
      },
    ],
  },

  // ─── 4. ĐI TAXI ──────────────────────────────────────────────────
  {
    title: "Đi taxi",
    description: "Học cách bắt taxi, chỉ đường và thanh toán khi đi taxi ở Trung Quốc",
    hskLevel: 2,
    type: "CONVERSATION",
    order: 54,
    content: [
      {
        type: "text",
        content:
          "Taxi ở Trung Quốc rất phổ biến. Bạn cần biết cách gọi taxi, nói địa điểm cần đến, chỉ đường và trả tiền. DiDi (滴滴) là ứng dụng gọi xe phổ biến nhất.",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\nA: 师傅，去北京饭店，知道吗？\n司机: 知道，上车吧。\nA: 大概要多长时间？\n司机: 堵车的话要半个小时。\nA: 好的。到了吗？\n司机: 快到了，前面左转就到了。\nA: 好，在这里停吧。多少钱？\n司机: 三十五块。\nA: 给你四十，不用找零了。\n司机: 谢谢！",
      },
      { type: "vocabulary", simplified: "打车", pinyin: "dǎchē", meaning: "bắt taxi / gọi taxi" },
      { type: "vocabulary", simplified: "目的地", pinyin: "mùdìdì", meaning: "điểm đến / đích đến" },
      { type: "vocabulary", simplified: "左转", pinyin: "zuǒzhuǎn", meaning: "rẽ trái" },
      { type: "vocabulary", simplified: "右转", pinyin: "yòuzhuǎn", meaning: "rẽ phải" },
      { type: "vocabulary", simplified: "直走", pinyin: "zhízǒu", meaning: "đi thẳng" },
      { type: "vocabulary", simplified: "停", pinyin: "tíng", meaning: "dừng lại" },
      { type: "vocabulary", simplified: "多少钱", pinyin: "duōshao qián", meaning: "bao nhiêu tiền?" },
      { type: "vocabulary", simplified: "找零", pinyin: "zhǎolíng", meaning: "thối tiền lẻ" },
      { type: "vocabulary", simplified: "堵车", pinyin: "dǔchē", meaning: "tắc đường" },
      { type: "vocabulary", simplified: "快到了", pinyin: "kuài dào le", meaning: "sắp đến nơi rồi" },
      {
        type: "grammar",
        title: "Chỉ đường trong taxi",
        explanation: "Các mẫu câu chỉ đường và hỏi khi đi taxi.",
        examples: [
          "去___，知道吗？— Đi đến ___, anh biết không?",
          "在这里停。— Dừng ở đây.",
          "前面右转。— Phía trước rẽ phải.",
          "堵车了。— Tắc đường rồi.",
          "不用找零。— Không cần thối tiền.",
        ],
      },
    ],
    vocabularyKeys: ["打车", "目的地", "左转", "右转", "直走", "停", "多少钱", "找零", "堵车", "快到了"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "堵车 (dǔchē) nghĩa là gì?",
          options: ["Đi taxi", "Tắc đường", "Trả tiền", "Rẽ phải"],
        },
        answer: { correct: 1 },
        explanation: "堵车 (dǔchē) = tắc đường. 堵 = bị chặn, 车 = xe. Rất phổ biến ở các thành phố lớn Trung Quốc.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 2,
        question: {
          text: "Nối hướng với nghĩa:",
          pairs: [
            { chinese: "左转", vietnamese: "rẽ trái" },
            { chinese: "右转", vietnamese: "rẽ phải" },
            { chinese: "直走", vietnamese: "đi thẳng" },
            { chinese: "停", vietnamese: "dừng lại" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ chỉ hướng và lệnh: 左转 trái, 右转 phải, 直走 thẳng, 停 dừng.",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 2,
        question: { text: "在这里___吧！(Dừng ở đây!)", hint: "Động từ chỉ việc dừng lại" },
        answer: { correct: "停" },
        explanation: "停 (tíng) = dừng. 在这里停 = dừng ở đây.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 2,
        question: {
          text: "Làm thế nào để nói 'Không cần thối tiền'?",
          options: ["多少钱？", "不用找零。", "打车去吗？", "快到了吗？"],
        },
        answer: { correct: 1 },
        explanation: "不用找零 (Bùyòng zhǎolíng) = không cần thối tiền. 不用 = không cần, 找零 = thối tiền lẻ.",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 2,
        question: { text: "Nhập pinyin: 目的地", hint: "Nghĩa: điểm đến" },
        answer: { correct: "mùdìdì" },
        explanation: "目的地 (mùdìdì) = điểm đến / đích đến. Thanh 4 + thanh 4 + thanh 4.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 2,
        question: {
          text: "快到了 (kuài dào le) nghĩa là gì?",
          options: ["Đi nhanh lên", "Sắp đến nơi rồi", "Tắc đường rồi", "Dừng ở đây"],
        },
        answer: { correct: 1 },
        explanation: "快到了 (kuài dào le) = sắp đến nơi rồi. 快 = sắp/nhanh, 到 = đến, 了 = rồi.",
      },
    ],
  },

  // ─── 5. ĐI KHÁM BỆNH ─────────────────────────────────────────────
  {
    title: "Đi khám bệnh",
    description: "Học cách mô tả triệu chứng, hiểu lời khuyên của bác sĩ và mua thuốc tại nhà thuốc",
    hskLevel: 3,
    type: "CONVERSATION",
    order: 55,
    content: [
      {
        type: "text",
        content:
          "Khi cần đi khám bệnh ở Trung Quốc, bạn cần biết cách đăng ký khám, mô tả triệu chứng và hiểu lời khuyên của bác sĩ. Đây là những từ cực kỳ quan trọng!",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\nA: 你好，我要挂号。\n护士: 您哪里不舒服？\nA: 我发烧，还有点咳嗽。\n护士: 好的，请等一下。\n\n(在诊室)\n医生: 你有什么症状？\nA: 我发烧三十八度，咳嗽了两天，还有点头疼。\n医生: 你对什么药过敏吗？\nA: 不过敏。\n医生: 好，我给你开处方，去药房取药。注意休息，多喝水。一周后来复查。\nA: 谢谢医生！",
      },
      { type: "vocabulary", simplified: "挂号", pinyin: "guàhào", meaning: "đăng ký khám bệnh" },
      { type: "vocabulary", simplified: "症状", pinyin: "zhèngzhuàng", meaning: "triệu chứng" },
      { type: "vocabulary", simplified: "发烧", pinyin: "fāshāo", meaning: "sốt" },
      { type: "vocabulary", simplified: "咳嗽", pinyin: "késou", meaning: "ho" },
      { type: "vocabulary", simplified: "过敏", pinyin: "guòmǐn", meaning: "dị ứng" },
      { type: "vocabulary", simplified: "处方", pinyin: "chǔfāng", meaning: "đơn thuốc" },
      { type: "vocabulary", simplified: "药房", pinyin: "yàofáng", meaning: "nhà thuốc" },
      { type: "vocabulary", simplified: "吃药", pinyin: "chīyào", meaning: "uống thuốc" },
      { type: "vocabulary", simplified: "注意休息", pinyin: "zhùyì xiūxi", meaning: "chú ý nghỉ ngơi" },
      { type: "vocabulary", simplified: "复查", pinyin: "fùchá", meaning: "tái khám" },
      {
        type: "grammar",
        title: "Mô tả triệu chứng bệnh",
        explanation: "Mẫu câu để nói về tình trạng sức khỏe.",
        examples: [
          "我发烧了。— Tôi bị sốt rồi.",
          "我哪里不舒服。— Tôi không thoải mái ở chỗ này.",
          "我对青霉素过敏。— Tôi dị ứng với penicillin.",
          "一天吃几次药？— Uống thuốc mấy lần một ngày?",
          "我要挂号。— Tôi muốn đăng ký khám.",
        ],
      },
    ],
    vocabularyKeys: ["挂号", "症状", "发烧", "咳嗽", "过敏", "处方", "药房", "吃药", "注意休息", "复查"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "挂号 (guàhào) có nghĩa là gì?",
          options: ["Uống thuốc", "Tái khám", "Đăng ký khám bệnh", "Đơn thuốc"],
        },
        answer: { correct: 2 },
        explanation: "挂号 (guàhào) = đăng ký khám bệnh. Đây là bước đầu tiên khi đến bệnh viện ở Trung Quốc.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 3,
        question: {
          text: "Nối từ y tế với nghĩa:",
          pairs: [
            { chinese: "发烧", vietnamese: "sốt" },
            { chinese: "咳嗽", vietnamese: "ho" },
            { chinese: "过敏", vietnamese: "dị ứng" },
            { chinese: "处方", vietnamese: "đơn thuốc" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ y tế cơ bản: 发烧 sốt, 咳嗽 ho, 过敏 dị ứng, 处方 đơn thuốc.",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 3,
        question: { text: "请___，多喝水。(Xin hãy chú ý nghỉ ngơi, uống nhiều nước.)", hint: "Hai từ chỉ việc nghỉ ngơi cẩn thận" },
        answer: { correct: "注意休息" },
        explanation: "注意休息 (zhùyì xiūxi) = chú ý nghỉ ngơi. Bác sĩ thường nói câu này.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 3,
        question: {
          text: "Sau khi có đơn thuốc (处方), bạn đi đâu?",
          options: ["去挂号", "去药房", "去复查", "去注射"],
        },
        answer: { correct: 1 },
        explanation: "去药房 (qù yàofáng) = đến nhà thuốc. 药房 = nhà thuốc / pharmacy.",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 3,
        question: { text: "Nhập pinyin: 症状", hint: "Nghĩa: triệu chứng" },
        answer: { correct: "zhèngzhuàng" },
        explanation: "症状 (zhèngzhuàng) = triệu chứng. Thanh 4 + thanh 4.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 3,
        question: {
          text: "复查 (fùchá) nghĩa là gì?",
          options: ["Xét nghiệm", "Tái khám", "Cấp cứu", "Phẫu thuật"],
        },
        answer: { correct: 1 },
        explanation: "复查 (fùchá) = tái khám. 复 = lại/lần nữa, 查 = kiểm tra.",
      },
    ],
  },

  // ─── 6. PHỎNG VẤN XIN VIỆC ───────────────────────────────────────
  {
    title: "Phỏng vấn xin việc",
    description: "Học cách tự giới thiệu, trả lời câu hỏi phỏng vấn và hỏi về lương thưởng bằng tiếng Trung",
    hskLevel: 4,
    type: "CONVERSATION",
    order: 56,
    content: [
      {
        type: "text",
        content:
          "Phỏng vấn xin việc bằng tiếng Trung đòi hỏi từ vựng chuyên nghiệp. Bài này giúp bạn chuẩn bị cho buổi phỏng vấn với những câu hỏi thường gặp nhất.",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\n面试官: 请先做一下自我介绍。\nA: 您好，我叫阮明，毕业于河内大学，专业是计算机。我有三年的工作经验，主要做软件开发。我的优点是认真负责，善于团队合作。\n面试官: 你的缺点是什么？\nA: 有时候要求完美，不过我在努力改进。\n面试官: 你对薪水有什么要求？\nA: 请问贵公司的薪水范围是多少？我希望能有发展的机会。\n面试官: 你有什么问题要问吗？\nA: 请问公司有哪些福利？加班情况多吗？",
      },
      { type: "vocabulary", simplified: "自我介绍", pinyin: "zìwǒ jièshào", meaning: "tự giới thiệu bản thân" },
      { type: "vocabulary", simplified: "优点", pinyin: "yōudiǎn", meaning: "ưu điểm / điểm mạnh" },
      { type: "vocabulary", simplified: "缺点", pinyin: "quēdiǎn", meaning: "nhược điểm / điểm yếu" },
      { type: "vocabulary", simplified: "经验", pinyin: "jīngyàn", meaning: "kinh nghiệm" },
      { type: "vocabulary", simplified: "薪水", pinyin: "xīnshuǐ", meaning: "lương" },
      { type: "vocabulary", simplified: "福利", pinyin: "fúlì", meaning: "phúc lợi / đãi ngộ" },
      { type: "vocabulary", simplified: "加班", pinyin: "jiābān", meaning: "làm thêm giờ / tăng ca" },
      { type: "vocabulary", simplified: "团队", pinyin: "tuánduì", meaning: "đội nhóm / team" },
      { type: "vocabulary", simplified: "目标", pinyin: "mùbiāo", meaning: "mục tiêu" },
      { type: "vocabulary", simplified: "发展", pinyin: "fāzhǎn", meaning: "phát triển" },
      {
        type: "grammar",
        title: "Mẫu câu trong phỏng vấn",
        explanation: "Câu trả lời chuyên nghiệp cho các câu hỏi phỏng vấn thường gặp.",
        examples: [
          "我有___年的工作经验。— Tôi có ___ năm kinh nghiệm làm việc.",
          "我的优点是认真负责。— Điểm mạnh của tôi là cẩn thận và có trách nhiệm.",
          "我对薪水的要求是___。— Yêu cầu lương của tôi là ___.",
          "我希望在贵公司发展。— Tôi mong muốn phát triển tại công ty.",
          "请问有哪些福利？— Xin hỏi có những phúc lợi gì?",
        ],
      },
    ],
    vocabularyKeys: ["自我介绍", "优点", "缺点", "经验", "薪水", "福利", "加班", "团队", "目标", "发展"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 4,
        question: {
          text: "自我介绍 (zìwǒ jièshào) nghĩa là gì?",
          options: ["Kinh nghiệm làm việc", "Tự giới thiệu bản thân", "Phúc lợi công ty", "Mục tiêu nghề nghiệp"],
        },
        answer: { correct: 1 },
        explanation: "自我介绍 = tự giới thiệu bản thân. 自我 = bản thân, 介绍 = giới thiệu.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 4,
        question: {
          text: "Nối từ HR với nghĩa:",
          pairs: [
            { chinese: "优点", vietnamese: "điểm mạnh" },
            { chinese: "缺点", vietnamese: "điểm yếu" },
            { chinese: "薪水", vietnamese: "lương" },
            { chinese: "福利", vietnamese: "phúc lợi" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ quan trọng: 优点 điểm mạnh, 缺点 điểm yếu, 薪水 lương, 福利 phúc lợi.",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 4,
        question: { text: "我有三年的工作___。(Tôi có 3 năm kinh nghiệm làm việc.)", hint: "Từ chỉ kinh nghiệm" },
        answer: { correct: "经验" },
        explanation: "经验 (jīngyàn) = kinh nghiệm. 有经验 = có kinh nghiệm.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 4,
        question: {
          text: "加班 (jiābān) nghĩa là gì?",
          options: ["Tăng lương", "Nghỉ phép", "Làm thêm giờ", "Đào tạo"],
        },
        answer: { correct: 2 },
        explanation: "加班 (jiābān) = làm thêm giờ / tăng ca. 加 = thêm, 班 = ca làm việc.",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 4,
        question: { text: "Nhập pinyin: 团队", hint: "Nghĩa: đội nhóm" },
        answer: { correct: "tuánduì" },
        explanation: "团队 (tuánduì) = đội nhóm / team. Thanh 2 + thanh 4.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 4,
        question: {
          text: "Bạn nói gì để hỏi về phúc lợi công ty?",
          options: ["加班多吗？", "请问有哪些福利？", "薪水多少？", "几点上班？"],
        },
        answer: { correct: 1 },
        explanation: "请问有哪些福利？(Qǐngwèn yǒu nǎxiē fúlì?) = Xin hỏi có những phúc lợi gì?",
      },
    ],
  },

  // ─── 7. THUÊ NHÀ ─────────────────────────────────────────────────
  {
    title: "Thuê nhà",
    description: "Học cách hỏi thuê nhà, thương lượng giá thuê và ký hợp đồng bằng tiếng Trung",
    hskLevel: 3,
    type: "CONVERSATION",
    order: 57,
    content: [
      {
        type: "text",
        content:
          "Thuê nhà ở Trung Quốc thường cần đặt cọc (押金) và ký hợp đồng (合同). Biết các từ này giúp bạn tự tin giao dịch với chủ nhà.",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\nA: 你好，我是来看房子的。\n房东: 欢迎！请进，这是客厅，厨房在右边，卧室在里面。\nA: 房间有家具吗？\n房东: 有，床、桌子和衣柜都有。空调也有。\nA: 请问房租是多少？\n房东: 一个月三千五，押金交两个月。水电费另算。\nA: 太贵了，能便宜一点吗？三千可以吗？\n房东: 最低三千二，合同签一年。\nA: 好的，那我们签合同吧。这个小区怎么样？\n房东: 环境很好，邻居也很友善。",
      },
      { type: "vocabulary", simplified: "租房", pinyin: "zū fáng", meaning: "thuê nhà" },
      { type: "vocabulary", simplified: "房租", pinyin: "fángzū", meaning: "tiền thuê nhà" },
      { type: "vocabulary", simplified: "押金", pinyin: "yājīn", meaning: "tiền đặt cọc" },
      { type: "vocabulary", simplified: "合同", pinyin: "hétong", meaning: "hợp đồng" },
      { type: "vocabulary", simplified: "家具", pinyin: "jiājù", meaning: "đồ nội thất" },
      { type: "vocabulary", simplified: "水电费", pinyin: "shuǐdiànfèi", meaning: "tiền điện nước" },
      { type: "vocabulary", simplified: "搬家", pinyin: "bānjiā", meaning: "chuyển nhà" },
      { type: "vocabulary", simplified: "邻居", pinyin: "línjū", meaning: "hàng xóm" },
      { type: "vocabulary", simplified: "小区", pinyin: "xiǎoqū", meaning: "khu dân cư / chung cư" },
      { type: "vocabulary", simplified: "装修", pinyin: "zhuāngxiū", meaning: "trang trí / sửa nhà" },
      {
        type: "grammar",
        title: "Thương lượng giá thuê nhà",
        explanation: "Cách thương lượng giá và hỏi về điều khoản thuê.",
        examples: [
          "房租是多少？— Tiền thuê là bao nhiêu?",
          "押金交几个月？— Đặt cọc mấy tháng?",
          "能便宜一点吗？— Có thể rẻ hơn không?",
          "水电费包括吗？— Tiền điện nước có bao gồm không?",
          "合同签多长时间？— Hợp đồng ký bao lâu?",
        ],
      },
    ],
    vocabularyKeys: ["租房", "房租", "押金", "合同", "家具", "水电费", "搬家", "邻居", "小区", "装修"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "押金 (yājīn) nghĩa là gì?",
          options: ["Tiền thuê hàng tháng", "Tiền điện nước", "Tiền đặt cọc", "Tiền hợp đồng"],
        },
        answer: { correct: 2 },
        explanation: "押金 (yājīn) = tiền đặt cọc / deposit. Thường phải đặt cọc 1-3 tháng tiền thuê.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 3,
        question: { text: "___包括吗？(Tiền điện nước có bao gồm không?)", hint: "Ba chữ: nước + điện + phí" },
        answer: { correct: "水电费" },
        explanation: "水电费 (shuǐdiànfèi) = tiền điện nước. 水 = nước, 电 = điện, 费 = phí.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 3,
        question: {
          text: "Làm thế nào để thương lượng giá thuê?",
          options: ["合同在哪里？", "能便宜一点吗？", "押金多少？", "家具有吗？"],
        },
        answer: { correct: 1 },
        explanation: "能便宜一点吗？(Néng piányí yīdiǎn ma?) = Có thể rẻ hơn một chút không?",
      },
      {
        type: "MATCHING",
        order: 4,
        difficulty: 3,
        question: {
          text: "Nối từ thuê nhà với nghĩa:",
          pairs: [
            { chinese: "合同", vietnamese: "hợp đồng" },
            { chinese: "家具", vietnamese: "nội thất" },
            { chinese: "邻居", vietnamese: "hàng xóm" },
            { chinese: "小区", vietnamese: "khu dân cư" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ thuê nhà: 合同 hợp đồng, 家具 nội thất, 邻居 hàng xóm, 小区 khu dân cư.",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 3,
        question: { text: "Nhập pinyin: 装修", hint: "Nghĩa: trang trí / sửa nhà" },
        answer: { correct: "zhuāngxiū" },
        explanation: "装修 (zhuāngxiū) = trang trí / sửa chữa nhà. Thanh 1 + thanh 1.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 3,
        question: {
          text: "搬家 (bānjiā) nghĩa là gì?",
          options: ["Thuê nhà", "Mua nhà", "Chuyển nhà", "Sửa nhà"],
        },
        answer: { correct: 2 },
        explanation: "搬家 (bānjiā) = chuyển nhà / dọn nhà. 搬 = di chuyển/vác, 家 = nhà.",
      },
    ],
  },

  // ─── 8. HẸN HÒ ───────────────────────────────────────────────────
  {
    title: "Hẹn hò",
    description: "Học cách rủ đi hẹn hò, tặng lời khen và thể hiện tình cảm bằng tiếng Trung",
    hskLevel: 2,
    type: "CONVERSATION",
    order: 58,
    content: [
      {
        type: "text",
        content:
          "Tiếng Trung có nhiều cách thể hiện tình cảm lãng mạn. Từ việc rủ đi xem phim đến tỏ tình, bài này giúp bạn nói chuyện tự nhiên trong các tình huống hẹn hò.",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\nA: 你好！你今天真漂亮。\nB: 谢谢你！你也很帅。\nA: 这个周末你有空吗？我想请你去看电影。\nB: 好啊！什么电影？\nA: 新上映的浪漫爱情片，怎么样？\nB: 听起来不错！电影院在哪里？\nA: 在市中心的咖啡厅旁边，我们先去喝咖啡，然后再看电影。\nB: 好的，我很期待！\nA: 我也是。其实……我很喜欢你。\nB: 我也喜欢你！",
      },
      { type: "vocabulary", simplified: "约会", pinyin: "yuēhuì", meaning: "hẹn hò" },
      { type: "vocabulary", simplified: "电影院", pinyin: "diànyǐngyuàn", meaning: "rạp chiếu phim" },
      { type: "vocabulary", simplified: "咖啡厅", pinyin: "kāfēitīng", meaning: "quán cà phê" },
      { type: "vocabulary", simplified: "散步", pinyin: "sànbù", meaning: "đi dạo" },
      { type: "vocabulary", simplified: "礼物", pinyin: "lǐwù", meaning: "quà tặng" },
      { type: "vocabulary", simplified: "喜欢", pinyin: "xǐhuān", meaning: "thích / yêu thích" },
      { type: "vocabulary", simplified: "帅", pinyin: "shuài", meaning: "đẹp trai / phong độ" },
      { type: "vocabulary", simplified: "美丽", pinyin: "měilì", meaning: "xinh đẹp / tuyệt vời" },
      { type: "vocabulary", simplified: "浪漫", pinyin: "làngmàn", meaning: "lãng mạn" },
      { type: "vocabulary", simplified: "表白", pinyin: "biǎobái", meaning: "tỏ tình / thú nhận tình cảm" },
      {
        type: "grammar",
        title: "Câu nói lãng mạn trong tiếng Trung",
        explanation: "Các mẫu câu hay dùng khi hẹn hò và tỏ tình.",
        examples: [
          "你今天真漂亮！— Hôm nay bạn thật xinh đẹp!",
          "你周末有空吗？— Cuối tuần bạn có rảnh không?",
          "我想请你去吃饭。— Tôi muốn mời bạn đi ăn.",
          "我很喜欢你。— Tôi rất thích bạn.",
          "我们在一起吧！— Chúng ta ở bên nhau nhé!",
        ],
      },
    ],
    vocabularyKeys: ["约会", "电影院", "咖啡厅", "散步", "礼物", "喜欢", "帅", "美丽", "浪漫", "表白"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "表白 (biǎobái) nghĩa là gì?",
          options: ["Đi hẹn hò", "Tỏ tình", "Tặng quà", "Đi dạo"],
        },
        answer: { correct: 1 },
        explanation: "表白 (biǎobái) = tỏ tình / thú nhận tình cảm. Rất quan trọng trong văn hóa hẹn hò Trung Quốc!",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 2,
        difficulty: 2,
        question: {
          text: "Rủ ai đó đi xem phim, bạn nói gì?",
          options: ["你很浪漫！", "你周末有空，我们去电影院吗？", "这是礼物。", "我们散步吧！"],
        },
        answer: { correct: 1 },
        explanation: "你周末有空，我们去电影院吗？= Cuối tuần bạn có rảnh, chúng ta đi rạp chiếu phim không?",
      },
      {
        type: "MATCHING",
        order: 3,
        difficulty: 2,
        question: {
          text: "Nối từ hẹn hò với nghĩa:",
          pairs: [
            { chinese: "帅", vietnamese: "đẹp trai" },
            { chinese: "美丽", vietnamese: "xinh đẹp" },
            { chinese: "浪漫", vietnamese: "lãng mạn" },
            { chinese: "礼物", vietnamese: "quà tặng" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ lãng mạn: 帅 đẹp trai, 美丽 xinh đẹp, 浪漫 lãng mạn, 礼物 quà tặng.",
      },
      {
        type: "FILL_BLANK",
        order: 4,
        difficulty: 2,
        question: { text: "我很___你。(Tôi rất thích bạn.)", hint: "Động từ thể hiện tình cảm" },
        answer: { correct: "喜欢" },
        explanation: "喜欢 (xǐhuān) = thích. 我很喜欢你 = Tôi rất thích bạn. Mạnh hơn có thể dùng 爱 (ài) = yêu.",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 2,
        question: { text: "Nhập pinyin: 约会", hint: "Nghĩa: hẹn hò" },
        answer: { correct: "yuēhuì" },
        explanation: "约会 (yuēhuì) = hẹn hò / date. Thanh 1 + thanh 4.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 2,
        question: {
          text: "散步 (sànbù) nghĩa là gì?",
          options: ["Uống cà phê", "Xem phim", "Đi dạo", "Tặng quà"],
        },
        answer: { correct: 2 },
        explanation: "散步 (sànbù) = đi dạo / tản bộ. 我们一起散步吧 = Chúng ta cùng đi dạo nhé.",
      },
    ],
  },

  // ─── 9. MUA SẮM ONLINE ───────────────────────────────────────────
  {
    title: "Mua sắm online",
    description: "Học từ vựng mua sắm trực tuyến: đặt hàng, thanh toán, theo dõi và đổi trả hàng",
    hskLevel: 3,
    type: "CONVERSATION",
    order: 59,
    content: [
      {
        type: "text",
        content:
          "Trung Quốc là thị trường mua sắm online lớn nhất thế giới với Taobao, JD.com, Pinduoduo. Biết từ vựng này giúp bạn mua sắm dễ dàng và giao tiếp với người bán!",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu (chat với người bán):\n\nA: 你好，这件衣服还有吗？\n卖家: 有的，请问要什么颜色和尺码？\nA: 要蓝色，L码。有优惠券吗？\n卖家: 现在满200减20，还包邮。\nA: 好的，我下单了。什么时候发货？\n卖家: 明天发货，大概三到五天到。\nA: 好的，谢谢！\n\n(三天后)\nA: 我收货了，但是颜色不对，想退货可以吗？\n卖家: 可以，七天内可以退货。请在APP上申请退款。\nA: 好的，我这就去退。谢谢！",
      },
      { type: "vocabulary", simplified: "网购", pinyin: "wǎnggòu", meaning: "mua sắm online" },
      { type: "vocabulary", simplified: "下单", pinyin: "xià dān", meaning: "đặt hàng" },
      { type: "vocabulary", simplified: "付款", pinyin: "fùkuǎn", meaning: "thanh toán" },
      { type: "vocabulary", simplified: "快递", pinyin: "kuàidì", meaning: "chuyển phát nhanh / courier" },
      { type: "vocabulary", simplified: "发货", pinyin: "fāhuò", meaning: "giao hàng / ship hàng" },
      { type: "vocabulary", simplified: "收货", pinyin: "shōuhuò", meaning: "nhận hàng" },
      { type: "vocabulary", simplified: "评价", pinyin: "píngjià", meaning: "đánh giá / review" },
      { type: "vocabulary", simplified: "退货", pinyin: "tuìhuò", meaning: "trả hàng / hoàn hàng" },
      { type: "vocabulary", simplified: "优惠券", pinyin: "yōuhuìquàn", meaning: "phiếu giảm giá / coupon" },
      { type: "vocabulary", simplified: "包邮", pinyin: "bāoyóu", meaning: "miễn phí vận chuyển" },
      {
        type: "grammar",
        title: "Từ ngữ mua sắm online",
        explanation: "Các thuật ngữ thương mại điện tử thông dụng ở Trung Quốc.",
        examples: [
          "这个包邮吗？— Cái này có miễn phí ship không?",
          "我想退货。— Tôi muốn trả hàng.",
          "什么时候发货？— Khi nào giao hàng?",
          "有优惠券吗？— Có phiếu giảm giá không?",
          "请给好评！— Vui lòng đánh giá tốt!",
        ],
      },
    ],
    vocabularyKeys: ["网购", "下单", "付款", "快递", "发货", "收货", "评价", "退货", "优惠券", "包邮"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "包邮 (bāoyóu) nghĩa là gì?",
          options: ["Đặt hàng", "Miễn phí vận chuyển", "Thanh toán online", "Nhận hàng"],
        },
        answer: { correct: 1 },
        explanation: "包邮 (bāoyóu) = miễn phí vận chuyển / free shipping. 包 = bao gồm, 邮 = bưu điện/gửi.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 3,
        question: {
          text: "Nối từ mua sắm với nghĩa:",
          pairs: [
            { chinese: "下单", vietnamese: "đặt hàng" },
            { chinese: "发货", vietnamese: "giao hàng" },
            { chinese: "收货", vietnamese: "nhận hàng" },
            { chinese: "退货", vietnamese: "trả hàng" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Quy trình mua hàng: 下单 đặt → 发货 giao → 收货 nhận → 退货 trả (nếu cần).",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 3,
        question: { text: "我想___，颜色不对。(Tôi muốn trả hàng, màu sắc không đúng.)", hint: "Hai chữ: trả + hàng" },
        answer: { correct: "退货" },
        explanation: "退货 (tuìhuò) = trả hàng / hoàn hàng. 退 = trả lại, 货 = hàng hóa.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 3,
        question: {
          text: "快递 (kuàidì) trong mua sắm online nghĩa là gì?",
          options: ["Thanh toán nhanh", "Chuyển phát nhanh", "Giảm giá nhanh", "Đặt hàng nhanh"],
        },
        answer: { correct: 1 },
        explanation: "快递 (kuàidì) = chuyển phát nhanh / courier. 快 = nhanh, 递 = chuyển giao.",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 3,
        question: { text: "Nhập pinyin: 优惠券", hint: "Nghĩa: phiếu giảm giá" },
        answer: { correct: "yōuhuìquàn" },
        explanation: "优惠券 (yōuhuìquàn) = coupon / phiếu giảm giá. Thanh 1 + thanh 4 + thanh 4.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 3,
        question: {
          text: "Làm thế nào để hỏi khi nào hàng được giao?",
          options: ["什么时候收货？", "什么时候发货？", "什么时候付款？", "什么时候退货？"],
        },
        answer: { correct: 1 },
        explanation: "什么时候发货？(Shénme shíhou fāhuò?) = Khi nào giao hàng? 发货 = phía người bán giao đi.",
      },
    ],
  },

  // ─── 10. ĐI DU LỊCH TRUNG QUỐC ──────────────────────────────────
  {
    title: "Đi du lịch Trung Quốc",
    description: "Học từ vựng du lịch: tham quan danh thắng, hỏi đường, mua đồ lưu niệm và ẩm thực địa phương",
    hskLevel: 3,
    type: "CONVERSATION",
    order: 60,
    content: [
      {
        type: "text",
        content:
          "Trung Quốc có hàng nghìn điểm du lịch hấp dẫn. Từ Vạn Lý Trường Thành đến Thượng Hải hiện đại, bài này giúp bạn khám phá Trung Quốc tự tin hơn!",
      },
      {
        type: "text",
        content:
          "Hội thoại mẫu:\n\nA: 请问，故宫怎么走？\n路人: 往前走五分钟，然后右转就到了。\nA: 门票多少钱？\n路人: 好像是六十块，周一闭馆。\nA: 谢谢！\n\n(在景点)\nA: 导游，这里可以照相吗？\n导游: 可以，不过请不要用闪光灯。\nA: 好的。请问有没有中文讲解？\n导游: 有，这里有语音导览。\n\n(在纪念品店)\nA: 这个特产多少钱？\n老板: 两个一百块，很便宜！\nA: 有点贵，八十行吗？\n老板: 好吧，九十，不能再低了。",
      },
      { type: "vocabulary", simplified: "旅行社", pinyin: "lǚxíngshè", meaning: "công ty du lịch / travel agency" },
      { type: "vocabulary", simplified: "导游", pinyin: "dǎoyóu", meaning: "hướng dẫn viên du lịch" },
      { type: "vocabulary", simplified: "景点", pinyin: "jǐngdiǎn", meaning: "điểm tham quan / danh thắng" },
      { type: "vocabulary", simplified: "门票", pinyin: "ménpiào", meaning: "vé vào cửa" },
      { type: "vocabulary", simplified: "照相", pinyin: "zhàoxiàng", meaning: "chụp ảnh" },
      { type: "vocabulary", simplified: "纪念品", pinyin: "jìniànpǐn", meaning: "đồ lưu niệm / quà tặng" },
      { type: "vocabulary", simplified: "特产", pinyin: "tèchǎn", meaning: "đặc sản địa phương" },
      { type: "vocabulary", simplified: "美食", pinyin: "měishí", meaning: "ẩm thực / món ăn ngon" },
      { type: "vocabulary", simplified: "地图", pinyin: "dìtú", meaning: "bản đồ" },
      { type: "vocabulary", simplified: "迷路", pinyin: "mílù", meaning: "bị lạc đường" },
      {
        type: "grammar",
        title: "Câu hỏi cần thiết khi du lịch",
        explanation: "Hỏi đường, hỏi vé và mặc cả khi du lịch.",
        examples: [
          "___怎么走？— Đi đến ___ bằng cách nào?",
          "门票多少钱？— Vé vào cửa bao nhiêu tiền?",
          "可以照相吗？— Có thể chụp ảnh không?",
          "我迷路了，请帮帮我。— Tôi bị lạc, xin hãy giúp tôi.",
          "有没有中文导游？— Có hướng dẫn viên tiếng Trung không?",
        ],
      },
    ],
    vocabularyKeys: ["旅行社", "导游", "景点", "门票", "照相", "纪念品", "特产", "美食", "地图", "迷路"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "导游 (dǎoyóu) nghĩa là gì?",
          options: ["Bản đồ", "Vé vào cửa", "Hướng dẫn viên du lịch", "Đặc sản"],
        },
        answer: { correct: 2 },
        explanation: "导游 (dǎoyóu) = hướng dẫn viên du lịch. 导 = dẫn đường, 游 = du lịch/đi dạo.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 2,
        difficulty: 3,
        question: {
          text: "Làm thế nào để hỏi giá vé vào cửa?",
          options: ["特产多少钱？", "门票多少钱？", "导游多少钱？", "纪念品多少钱？"],
        },
        answer: { correct: 1 },
        explanation: "门票多少钱？(Ménpiào duōshao qián?) = Vé vào cửa bao nhiêu tiền? 门票 = vé vào cửa.",
      },
      {
        type: "MATCHING",
        order: 3,
        difficulty: 3,
        question: {
          text: "Nối từ du lịch với nghĩa:",
          pairs: [
            { chinese: "景点", vietnamese: "điểm tham quan" },
            { chinese: "纪念品", vietnamese: "đồ lưu niệm" },
            { chinese: "特产", vietnamese: "đặc sản" },
            { chinese: "迷路", vietnamese: "bị lạc" },
          ],
        },
        answer: { correct: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ du lịch: 景点 điểm tham quan, 纪念品 đồ lưu niệm, 特产 đặc sản, 迷路 bị lạc.",
      },
      {
        type: "FILL_BLANK",
        order: 4,
        difficulty: 3,
        question: { text: "我___了，请问故宫怎么走？(Tôi bị lạc rồi, xin hỏi đi đến Tử Cấm Thành như thế nào?)", hint: "Hai chữ: lạc đường" },
        answer: { correct: "迷路" },
        explanation: "迷路 (mílù) = bị lạc đường. 迷 = lạc, 路 = đường.",
      },
      {
        type: "PINYIN",
        order: 5,
        difficulty: 3,
        question: { text: "Nhập pinyin: 纪念品", hint: "Nghĩa: đồ lưu niệm" },
        answer: { correct: "jìniànpǐn" },
        explanation: "纪念品 (jìniànpǐn) = đồ lưu niệm / souvenir. Thanh 4 + thanh 4 + thanh 3.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 3,
        question: {
          text: "照相 (zhàoxiàng) nghĩa là gì?",
          options: ["Xem ảnh", "Chụp ảnh", "In ảnh", "Chia sẻ ảnh"],
        },
        answer: { correct: 1 },
        explanation: "照相 (zhàoxiàng) = chụp ảnh. 照 = chiếu/chụp, 相 = hình ảnh. Cũng có thể nói 拍照 (pāizhào).",
      },
    ],
  },
];
