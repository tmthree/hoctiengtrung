// HSK 6 Lessons — 5 lessons (Mastery level)
// Topics: Chinese Philosophy, Politics & Diplomacy, Literature & Rhetoric, Natural Science, Traditional Culture

import type { LessonData } from "./lessons";

export const lessonsHsk6: LessonData[] = [
  // ─── LESSON 1: Triết học Trung Hoa ──────────────────────────
  {
    title: "Triết học Trung Hoa",
    description: "Khám phá các tư tưởng triết học cốt lõi của Trung Quốc: Nho giáo, Đạo giáo và các khái niệm triết học sâu sắc",
    hskLevel: 6,
    type: "CULTURE",
    order: 31,
    content: [
      {
        type: "text",
        content:
          "Triết học Trung Hoa (中国哲学 Zhōngguó zhéxué) là một trong những di sản văn hóa vĩ đại nhất của nhân loại, với chiều sâu tư tưởng trải dài hơn 2500 năm. Bài học này giới thiệu những khái niệm triết học then chốt.",
      },
      { type: "vocabulary", simplified: "哲学", pinyin: "zhéxué", meaning: "triết học" },
      { type: "vocabulary", simplified: "智慧", pinyin: "zhìhuì", meaning: "trí tuệ, trí khôn" },
      { type: "vocabulary", simplified: "道德", pinyin: "dàodé", meaning: "đạo đức" },
      { type: "vocabulary", simplified: "伦理", pinyin: "lúnlǐ", meaning: "đạo lý, luân lý" },
      { type: "vocabulary", simplified: "真理", pinyin: "zhēnlǐ", meaning: "chân lý" },
      {
        type: "grammar",
        title: "Tư tưởng Nho gia — 仁义礼智信 (Nhân Nghĩa Lễ Trí Tín)",
        explanation:
          "Năm đức tính cốt lõi của Nho giáo: 仁 (rén) = nhân ái, 义 (yì) = nghĩa khí, 礼 (lǐ) = lễ nghi, 智 (zhì) = trí tuệ, 信 (xìn) = thành tín. Đây là nền tảng đạo đức Nho gia.",
        examples: [
          "孔子认为\"仁\"是最高的道德品质。— Khổng Tử cho rằng 'nhân' là phẩm chất đạo đức cao nhất.",
          "礼是社会秩序的基础。— Lễ là nền tảng của trật tự xã hội.",
          "以诚信立身是做人的根本。— Lấy thành tín lập thân là căn bản làm người.",
        ],
      },
      { type: "vocabulary", simplified: "存在", pinyin: "cúnzài", meaning: "tồn tại" },
      { type: "vocabulary", simplified: "本质", pinyin: "běnzhì", meaning: "bản chất" },
      { type: "vocabulary", simplified: "意识", pinyin: "yìshi", meaning: "ý thức" },
      { type: "vocabulary", simplified: "灵魂", pinyin: "línghún", meaning: "linh hồn" },
      { type: "vocabulary", simplified: "命运", pinyin: "mìngyùn", meaning: "số phận, vận mệnh" },
      {
        type: "grammar",
        title: "Tư tưởng Đạo gia — 无为而治 (Vô vi nhi trị)",
        explanation:
          "道家 (Dàojiā) chủ trương thuận theo tự nhiên, không cưỡng ép. 无为 (wúwéi) = không hành động cưỡng bức; 而治 (ér zhì) = mà vẫn trị vì được. Đây là nguyên lý cai trị theo Đạo.",
        examples: [
          "老子曰：\"为学日益，为道日损。\"— Lão Tử nói: \"Học thì mỗi ngày thêm; đạo thì mỗi ngày bớt.\"",
          "道家崇尚自然无为的生活方式。— Đạo gia tôn thờ lối sống tự nhiên vô vi.",
          "顺应自然是道家哲学的核心。— Thuận theo tự nhiên là cốt lõi của triết học Đạo gia.",
        ],
      },
    ],
    vocabularyKeys: ["哲学", "智慧", "道德", "伦理", "真理", "存在", "本质", "意识", "灵魂", "命运"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 5,
        question: {
          text: "伦理 (lúnlǐ) có nghĩa là gì?",
          options: ["Triết học", "Đạo đức (đạo lý)", "Chân lý", "Ý thức"],
        },
        answer: { correct: 1 },
        explanation: "伦理 (lúnlǐ) = đạo lý, luân lý. 伦 = thứ bậc, quan hệ; 理 = lý lẽ. Đây là nguyên tắc đạo đức điều chỉnh quan hệ xã hội.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 5,
        question: {
          text: "Nối khái niệm triết học với nghĩa:",
          pairs: [
            { left: "真理", right: "chân lý" },
            { left: "本质", right: "bản chất" },
            { left: "灵魂", right: "linh hồn" },
            { left: "命运", right: "số phận" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn khái niệm triết học: 真理 (chân lý), 本质 (bản chất), 灵魂 (linh hồn), 命运 (số phận).",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 5,
        question: {
          text: "Theo Nho giáo, 仁义礼智信 gồm mấy đức tính?",
          options: ["3", "4", "5", "6"],
        },
        answer: { correct: 2 },
        explanation: "仁义礼智信 = năm (5) đức tính cốt lõi của Nho giáo: Nhân (仁), Nghĩa (义), Lễ (礼), Trí (智), Tín (信).",
      },
      {
        type: "FILL_BLANK",
        order: 4,
        difficulty: 5,
        question: {
          text: "___规范是社会秩序的基石，一个缺乏___约束的社会必然走向混乱。(Chuẩn mực đạo đức là nền tảng trật tự xã hội, xã hội thiếu ràng buộc đạo đức tất yếu dẫn đến hỗn loạn.)",
          hint: "Cùng một từ điền vào cả hai chỗ trống",
        },
        answer: { correct: "道德" },
        explanation: "道德 (dàodé) = đạo đức. 道 = đạo, con đường; 德 = đức, phẩm chất. Đây là hệ thống giá trị điều chỉnh hành vi con người.",
      },
      {
        type: "READING",
        order: 5,
        difficulty: 6,
        question: {
          text: "Đọc đoạn sau:\n\n儒家思想以仁、义、礼、智、信为核心价值，影响中国两千年。道家哲学崇尚自然无为，与儒家的积极入世形成对比。两种思想在中国历史发展中相互补充，共同构成了中华文化的精神基础。\n\nTheo đoạn văn, sự khác biệt chính giữa Nho gia và Đạo gia là gì?",
          options: [
            "Nho gia trọng lễ nghi, Đạo gia trọng tri thức",
            "Nho gia tích cực tham gia xã hội, Đạo gia thuận theo tự nhiên vô vi",
            "Nho gia thờ thiên nhiên, Đạo gia thờ tổ tiên",
            "Nho gia nghiên cứu khoa học, Đạo gia nghiên cứu văn học",
          ],
        },
        answer: { correct: 1 },
        explanation: "Đoạn văn nêu: 儒家积极入世 (Nho gia tích cực nhập thế); 道家崇尚自然无为 (Đạo gia tôn thờ tự nhiên vô vi). Hai triết học này tương phản và bổ trợ nhau.",
      },
      {
        type: "LISTENING",
        order: 6,
        difficulty: 5,
        question: {
          text: "Nhìn vào chữ này và chọn đúng nghĩa:\n\n智慧",
          options: ["Chân lý", "Trí tuệ", "Đạo đức", "Ý thức"],
        },
        answer: { correct: 1 },
        explanation: "智慧 (zhìhuì) = trí tuệ, trí khôn. 智 = thông minh; 慧 = sáng suốt. Trí tuệ là khả năng hiểu sâu và phán đoán đúng.",
      },
      {
        type: "FILL_BLANK",
        order: 7,
        difficulty: 6,
        question: {
          text: "与其相信___的安排，不如通过自己的努力来掌握人生的方向。(Thay vì tin vào sự sắp đặt của số phận, hãy nắm giữ hướng đi cuộc đời qua nỗ lực bản thân.)",
          hint: "Điều người ta cho là tiền định, không thể thay đổi",
        },
        answer: { correct: "命运" },
        explanation: "命运 (mìngyùn) = số phận, vận mệnh. 命 = mệnh trời; 运 = vận. Triết học hiện đại khuyến khích chủ động tạo ra vận mệnh của mình.",
      },
    ],
  },

  // ─── LESSON 2: Chính trị và ngoại giao ──────────────────────────
  {
    title: "Chính trị và ngoại giao",
    description: "Học từ vựng chính trị, ngoại giao và thảo luận về quan hệ quốc tế, hòa bình và xung đột",
    hskLevel: 6,
    type: "CONVERSATION",
    order: 32,
    content: [
      {
        type: "text",
        content:
          "Trong thời đại toàn cầu hóa, hiểu biết về chính trị (政治 zhèngzhì) và ngoại giao (外交 wàijiāo) trở nên quan trọng hơn bao giờ hết. Bài học này cung cấp từ vựng cấp độ HSK 6 về lĩnh vực này.",
      },
      { type: "vocabulary", simplified: "外交", pinyin: "wàijiāo", meaning: "ngoại giao" },
      { type: "vocabulary", simplified: "国际", pinyin: "guójì", meaning: "quốc tế" },
      { type: "vocabulary", simplified: "战略", pinyin: "zhànlüè", meaning: "chiến lược" },
      { type: "vocabulary", simplified: "政策", pinyin: "zhèngcè", meaning: "chính sách" },
      { type: "vocabulary", simplified: "改革", pinyin: "gǎigé", meaning: "cải cách" },
      {
        type: "grammar",
        title: "Cấu trúc 固然...但... (Tuy nhiên...nhưng...)",
        explanation:
          "固然 (gùrán) + [điều nhượng bộ], 但/但是 (dàn) + [điều phản biện]. Cấu trúc trang trọng hơn 虽然...但是, thường dùng trong văn viết chính thức và học thuật.",
        examples: [
          "经济发展固然重要，但环境保护同样不可忽视。— Phát triển kinh tế tuy nhiên quan trọng, nhưng bảo vệ môi trường cũng không thể bỏ qua.",
          "武力手段固然有效，但外交途径更能实现持久和平。— Biện pháp vũ lực tuy nhiên có hiệu quả, nhưng con đường ngoại giao có thể thực hiện hòa bình lâu dài hơn.",
          "改革固然面临阻力，但不改革则无法进步。— Cải cách tuy nhiên đối mặt với sức cản, nhưng không cải cách thì không thể tiến bộ.",
        ],
      },
      { type: "vocabulary", simplified: "领导", pinyin: "lǐngdǎo", meaning: "lãnh đạo" },
      { type: "vocabulary", simplified: "权力", pinyin: "quánlì", meaning: "quyền lực" },
      { type: "vocabulary", simplified: "和平", pinyin: "hépíng", meaning: "hòa bình" },
      { type: "vocabulary", simplified: "冲突", pinyin: "chōngtū", meaning: "xung đột" },
      { type: "vocabulary", simplified: "谈判", pinyin: "tánpàn", meaning: "đàm phán" },
      {
        type: "grammar",
        title: "Cấu trúc 鉴于...决定... (Xét rằng...quyết định...)",
        explanation:
          "鉴于 (jiànyú) + [lý do/hoàn cảnh], [chủ thể] + 决定/决议 + [hành động]. Đây là cấu trúc rất trang trọng, thường dùng trong văn bản chính thức, nghị quyết, thông cáo.",
        examples: [
          "鉴于当前严峻形势，会议决定推迟举行。— Xét rằng tình hình hiện tại nghiêm trọng, hội nghị quyết định hoãn lại.",
          "鉴于双方立场差距较大，谈判将继续进行。— Xét rằng lập trường hai bên còn khoảng cách lớn, đàm phán sẽ tiếp tục.",
        ],
      },
    ],
    vocabularyKeys: ["外交", "国际", "战略", "政策", "改革", "领导", "权力", "和平", "冲突", "谈判"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 5,
        question: {
          text: "谈判 (tánpàn) có nghĩa là gì?",
          options: ["Xung đột", "Cải cách", "Đàm phán", "Lãnh đạo"],
        },
        answer: { correct: 2 },
        explanation: "谈判 (tánpàn) = đàm phán. 谈 = nói chuyện, thảo luận; 判 = phán xét, quyết định. Đàm phán là phương thức hòa bình để giải quyết bất đồng.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 5,
        question: {
          text: "Nối từ chính trị với nghĩa:",
          pairs: [
            { left: "外交", right: "ngoại giao" },
            { left: "战略", right: "chiến lược" },
            { left: "权力", right: "quyền lực" },
            { left: "冲突", right: "xung đột" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ chính trị: 外交 (ngoại giao), 战略 (chiến lược), 权力 (quyền lực), 冲突 (xung đột).",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 5,
        question: {
          text: "___是人类社会最宝贵的财富，维护世界___是每一个国家和人民的共同责任。(Hòa bình là tài sản quý giá nhất của xã hội loài người.)",
          hint: "Cùng một từ điền vào cả hai chỗ trống",
        },
        answer: { correct: "和平" },
        explanation: "和平 (hépíng) = hòa bình. 和 = hài hòa; 平 = bình yên. Hòa bình là nền tảng cho sự phát triển của nhân loại.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 5,
        question: {
          text: "Câu nào dùng 固然...但... ĐÚNG nhất?",
          options: [
            "固然他很聪明，但是。",
            "经济发展固然重要，但环境保护同样不可忽视。",
            "固然很好，但没有。",
            "我固然喜欢，但是你。",
          ],
        },
        answer: { correct: 1 },
        explanation: "经济发展固然重要，但环境保护同样不可忽视 = Phát triển kinh tế tuy quan trọng, nhưng bảo vệ môi trường cũng không thể bỏ qua. Đây là cấu trúc 固然...但... đúng và hoàn chỉnh.",
      },
      {
        type: "READING",
        order: 5,
        difficulty: 6,
        question: {
          text: "Đọc đoạn văn:\n\n在全球化时代，外交手段已成为解决国际争端的首选方式。通过平等对话和谈判解决冲突，有助于维护国际关系的稳定。鉴于气候变化等全球性挑战，各国需要加强合作，共同应对。\n\nTheo đoạn văn, tại sao các quốc gia cần tăng cường hợp tác?",
          options: [
            "Để phát triển kinh tế nhanh hơn",
            "Để đối phó với các thách thức toàn cầu như biến đổi khí hậu",
            "Để mở rộng lãnh thổ",
            "Để thống nhất chính sách ngoại giao",
          ],
        },
        answer: { correct: 1 },
        explanation: "Đoạn văn nêu: 鉴于气候变化等全球性挑战，各国需要加强合作 = Xét rằng có những thách thức toàn cầu như biến đổi khí hậu, các quốc gia cần tăng cường hợp tác.",
      },
      {
        type: "LISTENING",
        order: 6,
        difficulty: 5,
        question: {
          text: "Nhìn vào chữ này và chọn đúng nghĩa:\n\n改革",
          options: ["Chiến lược", "Chính sách", "Cải cách", "Lãnh đạo"],
        },
        answer: { correct: 2 },
        explanation: "改革 (gǎigé) = cải cách. 改 = thay đổi; 革 = đổi mới, cách mạng. Cải cách là quá trình thay đổi hệ thống để phù hợp hơn với thực tế.",
      },
      {
        type: "FILL_BLANK",
        order: 7,
        difficulty: 6,
        question: {
          text: "___当前的严峻形势，委员会决定召开紧急会议，讨论应对方案。(Xét rằng tình hình hiện tại rất nghiêm trọng, ủy ban quyết định triệu tập cuộc họp khẩn cấp.)",
          hint: "Từ trang trọng mang nghĩa 'xét rằng, căn cứ vào'",
        },
        answer: { correct: "鉴于" },
        explanation: "鉴于 (jiànyú) = xét rằng, căn cứ vào. Đây là từ rất trang trọng, thường dùng trong văn bản chính thức để nêu lý do cho một quyết định.",
      },
    ],
  },

  // ─── LESSON 3: Văn học và tu từ ──────────────────────────
  {
    title: "Văn học và tu từ",
    description: "Học về các thể loại văn học Trung Quốc, biện pháp tu từ và phân tích văn học nâng cao",
    hskLevel: 6,
    type: "READING",
    order: 33,
    content: [
      {
        type: "text",
        content:
          "Văn học Trung Quốc (中国文学 Zhōngguó wénxué) có lịch sử phong phú hơn ba nghìn năm. Hiểu biết về các thể loại văn học và biện pháp tu từ giúp đọc và cảm nhận văn học ở mức độ sâu sắc hơn.",
      },
      { type: "vocabulary", simplified: "讽刺", pinyin: "fěngcì", meaning: "châm biếm, mỉa mai" },
      { type: "vocabulary", simplified: "比喻", pinyin: "bǐyù", meaning: "ẩn dụ, so sánh" },
      { type: "vocabulary", simplified: "象征", pinyin: "xiàngzhēng", meaning: "biểu tượng" },
      { type: "vocabulary", simplified: "隐喻", pinyin: "yǐnyù", meaning: "ẩn dụ (tu từ)" },
      { type: "vocabulary", simplified: "修辞", pinyin: "xiūcí", meaning: "tu từ, hoa văn" },
      {
        type: "grammar",
        title: "Phân biệt 比喻 và 隐喻",
        explanation:
          "比喻 (bǐyù) là so sánh rõ ràng, thường dùng 像/如同/好比 (giống như). 隐喻 (yǐnyù) là ẩn dụ — không có từ so sánh, trực tiếp đồng nhất hai sự vật.",
        examples: [
          "比喻: 她的眼睛像星星一样明亮。— So sánh: Mắt cô ấy sáng như sao.",
          "隐喻: 她的眼睛是两颗闪亮的星星。— Ẩn dụ: Mắt cô ấy là hai ngôi sao lấp lánh.",
          "\"时间是金钱\"是隐喻；\"时间如金钱一样宝贵\"是比喻。— Câu trước là ẩn dụ; câu sau là so sánh.",
        ],
      },
      { type: "vocabulary", simplified: "典故", pinyin: "diǎngù", meaning: "điển cố, điển tích" },
      { type: "vocabulary", simplified: "寓言", pinyin: "yùyán", meaning: "ngụ ngôn" },
      { type: "vocabulary", simplified: "散文", pinyin: "sǎnwén", meaning: "tản văn" },
      { type: "vocabulary", simplified: "悲剧", pinyin: "bēijù", meaning: "bi kịch" },
      { type: "vocabulary", simplified: "喜剧", pinyin: "xǐjù", meaning: "hài kịch" },
      {
        type: "grammar",
        title: "Cấu trúc 不言而喻 (Không cần nói cũng hiểu)",
        explanation:
          "不言而喻 (bùyán ér yù) = không cần nói cũng hiểu, hiển nhiên. Cấu trúc tương tự: 不言而喻的是... / 显而易见... Dùng khi điều gì đó quá hiển nhiên không cần giải thích.",
        examples: [
          "教育的重要性是不言而喻的。— Tầm quan trọng của giáo dục là không cần nói cũng hiểu.",
          "文学对人类精神的滋养作用不言而喻。— Vai trò nuôi dưỡng tinh thần của văn học cho con người là không cần nói cũng hiểu.",
          "维护和平对全人类都是不言而喻的利益。— Duy trì hòa bình là lợi ích không cần nói cũng hiểu của toàn nhân loại.",
        ],
      },
    ],
    vocabularyKeys: ["讽刺", "比喻", "象征", "隐喻", "修辞", "典故", "寓言", "散文", "悲剧", "喜剧"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 5,
        question: {
          text: "象征 (xiàngzhēng) có nghĩa là gì?",
          options: ["Châm biếm", "Biểu tượng", "So sánh", "Ẩn dụ"],
        },
        answer: { correct: 1 },
        explanation: "象征 (xiàngzhēng) = biểu tượng. Ví dụ: 鸽子是和平的象征 (Chim bồ câu là biểu tượng của hòa bình).",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 5,
        question: {
          text: "Nối thuật ngữ văn học với nghĩa:",
          pairs: [
            { left: "讽刺", right: "châm biếm" },
            { left: "寓言", right: "ngụ ngôn" },
            { left: "悲剧", right: "bi kịch" },
            { left: "散文", right: "tản văn" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn thể loại văn học và tu từ: 讽刺 (châm biếm), 寓言 (ngụ ngôn), 悲剧 (bi kịch), 散文 (tản văn).",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 5,
        question: {
          text: "Câu nào là ẨN DỤ (隐喻), không phải so sánh (比喻)?",
          options: [
            "她的笑容像阳光一样温暖。",
            "时间是流逝的河流。",
            "他跑得像风一样快。",
            "这朵花如玫瑰般美丽。",
          ],
        },
        answer: { correct: 1 },
        explanation: "时间是流逝的河流 = Thời gian là dòng sông chảy qua — đây là ẩn dụ (隐喻): trực tiếp đồng nhất thời gian = sông. Các câu còn lại dùng 像/如 nên là so sánh (比喻).",
      },
      {
        type: "FILL_BLANK",
        order: 4,
        difficulty: 5,
        question: {
          text: "掌握丰富的___手法能够使语言表达更加生动有力。(Nắm vững các biện pháp tu từ phong phú có thể làm cho biểu đạt ngôn ngữ trở nên sinh động và mạnh mẽ hơn.)",
          hint: "Nghệ thuật sử dụng ngôn ngữ để tăng hiệu quả biểu đạt",
        },
        answer: { correct: "修辞" },
        explanation: "修辞 (xiūcí) = tu từ. 修 = sửa, trau dồi; 辞 = lời nói, câu văn. Tu từ học nghiên cứu các biện pháp làm đẹp và tăng sức mạnh ngôn ngữ.",
      },
      {
        type: "READING",
        order: 5,
        difficulty: 6,
        question: {
          text: "Đọc đoạn văn:\n\n鲁迅是中国现代文学的奠基人，他的作品以犀利的讽刺和深刻的社会批判著称。他的小说《阿Q正传》通过阿Q这个人物，象征了旧中国人民精神上的弱点。优秀的文学作品不言而喻地能够揭示社会现实、启迪人心。\n\nTheo đoạn văn, nhân vật A.Q trong tác phẩm của Lỗ Tấn tượng trưng cho điều gì?",
          options: [
            "Sức mạnh của nhân dân Trung Quốc",
            "Điểm yếu tinh thần của người dân Trung Quốc cũ",
            "Sự phát triển của văn học hiện đại",
            "Tinh thần cải cách xã hội",
          ],
        },
        answer: { correct: 1 },
        explanation: "Đoạn văn nêu: 通过阿Q这个人物，象征了旧中国人民精神上的弱点 = Thông qua nhân vật A.Q, tượng trưng cho điểm yếu tinh thần của người dân Trung Quốc cũ.",
      },
      {
        type: "LISTENING",
        order: 6,
        difficulty: 5,
        question: {
          text: "Nhìn vào chữ này và chọn đúng nghĩa:\n\n典故",
          options: ["Thể loại văn học", "Điển cố, điển tích", "Biểu tượng", "Tu từ"],
        },
        answer: { correct: 1 },
        explanation: "典故 (diǎngù) = điển cố, điển tích. 典 = điển lệ, sách cổ; 故 = câu chuyện cũ. Điển cố là các tham chiếu đến câu chuyện và sự kiện lịch sử.",
      },
      {
        type: "FILL_BLANK",
        order: 7,
        difficulty: 6,
        question: {
          text: "优秀的___不仅能让观众捧腹大笑，还能通过幽默的方式传递深刻的社会批判。(Hài kịch xuất sắc không chỉ khiến khán giả cười nghiêng ngả, còn truyền tải phê phán xã hội sâu sắc.)",
          hint: "Thể loại nghệ thuật biểu diễn hài hước",
        },
        answer: { correct: "喜剧" },
        explanation: "喜剧 (xǐjù) = hài kịch. 喜 = vui mừng; 剧 = kịch. Đối lập với 悲剧 (bēijù) = bi kịch.",
      },
    ],
  },

  // ─── LESSON 4: Khoa học tự nhiên ──────────────────────────
  {
    title: "Khoa học tự nhiên",
    description: "Học từ vựng khoa học tự nhiên: vật lý, hóa học, sinh học và phương pháp nghiên cứu khoa học",
    hskLevel: 6,
    type: "READING",
    order: 34,
    content: [
      {
        type: "text",
        content:
          "Khoa học tự nhiên (自然科学 zìrán kēxué) là nền tảng của nền văn minh hiện đại. Bài học này cung cấp từ vựng khoa học cấp HSK 6 cần thiết để đọc và thảo luận về các chủ đề khoa học.",
      },
      { type: "vocabulary", simplified: "物理", pinyin: "wùlǐ", meaning: "vật lý" },
      { type: "vocabulary", simplified: "化学", pinyin: "huàxué", meaning: "hóa học" },
      { type: "vocabulary", simplified: "生物", pinyin: "shēngwù", meaning: "sinh vật, sinh học" },
      { type: "vocabulary", simplified: "细胞", pinyin: "xìbāo", meaning: "tế bào" },
      { type: "vocabulary", simplified: "基因", pinyin: "jīyīn", meaning: "gen" },
      {
        type: "grammar",
        title: "Cấu trúc 由此可见 (Từ đó có thể thấy rằng)",
        explanation:
          "由此可见 (yóu cǐ kě jiàn) + [kết luận]. Dùng trong văn bản học thuật và khoa học để rút ra kết luận từ các bằng chứng hoặc dữ liệu đã trình bày.",
        examples: [
          "实验数据显示正向结果，由此可见该方案有效。— Dữ liệu thực nghiệm cho thấy kết quả tích cực, từ đó có thể thấy rằng phương án này hiệu quả.",
          "多项研究证实了这一结论，由此可见该理论具有科学依据。— Nhiều nghiên cứu xác nhận kết luận này, từ đó có thể thấy lý thuyết có cơ sở khoa học.",
        ],
      },
      { type: "vocabulary", simplified: "进化", pinyin: "jìnhuà", meaning: "tiến hóa" },
      { type: "vocabulary", simplified: "实验室", pinyin: "shíyànshì", meaning: "phòng thí nghiệm" },
      { type: "vocabulary", simplified: "假设", pinyin: "jiǎshè", meaning: "giả thuyết" },
      { type: "vocabulary", simplified: "变量", pinyin: "biànliàng", meaning: "biến số" },
      { type: "vocabulary", simplified: "结果", pinyin: "jiéguǒ", meaning: "kết quả" },
      {
        type: "grammar",
        title: "Cấu trúc 综上所述 (Tóm lại, dựa trên những gì đã nêu)",
        explanation:
          "综上所述 (zōng shàng suǒ shù) = dựa trên những gì đã trình bày ở trên, tóm lại. Dùng để mở đầu phần kết luận trong văn bản học thuật, báo cáo khoa học.",
        examples: [
          "综上所述，我们可以得出结论：该药物具有显著的治疗效果。— Tóm lại, chúng ta có thể kết luận: loại thuốc này có hiệu quả điều trị đáng kể.",
          "综上所述，环境保护和经济发展必须协调推进。— Dựa trên những gì đã nêu, bảo vệ môi trường và phát triển kinh tế phải được thúc đẩy hài hòa.",
        ],
      },
    ],
    vocabularyKeys: ["物理", "化学", "生物", "细胞", "基因", "进化", "实验室", "假设", "变量", "结果"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 5,
        question: {
          text: "假设 (jiǎshè) trong ngữ cảnh khoa học có nghĩa là gì?",
          options: ["Kết quả", "Giả thuyết", "Thực nghiệm", "Kết luận"],
        },
        answer: { correct: 1 },
        explanation: "假设 (jiǎshè) = giả thuyết. 假 = giả định; 设 = đặt ra. Trong khoa học, giả thuyết là điều ta cho là đúng và cần kiểm chứng.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 5,
        question: {
          text: "Nối từ khoa học với nghĩa:",
          pairs: [
            { left: "细胞", right: "tế bào" },
            { left: "基因", right: "gen" },
            { left: "变量", right: "biến số" },
            { left: "实验室", right: "phòng thí nghiệm" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ khoa học: 细胞 (tế bào), 基因 (gen), 变量 (biến số), 实验室 (phòng thí nghiệm).",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 5,
        question: {
          text: "达尔文的___论揭示了物种起源和生命演化的科学规律。(Thuyết tiến hóa của Darwin đã vạch ra quy luật khoa học của nguồn gốc các loài.)",
          hint: "Sự phát triển và biến đổi của các loài theo thời gian",
        },
        answer: { correct: "进化" },
        explanation: "进化 (jìnhuà) = tiến hóa. 进 = tiến; 化 = biến hóa. Thuyết tiến hóa của Darwin là nền tảng của sinh học hiện đại.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 5,
        question: {
          text: "Câu nào dùng 由此可见 ĐÚNG nhất?",
          options: [
            "由此可见，他来了。",
            "实验结果一致，由此可见该方案有效。",
            "由此可见很重要。",
            "我们研究了，由此可见我喜欢。",
          ],
        },
        answer: { correct: 1 },
        explanation: "实验结果一致，由此可见该方案有效 = Kết quả thực nghiệm nhất quán, từ đó có thể thấy phương án này hiệu quả. 由此可见 phải dẫn vào một kết luận có cơ sở.",
      },
      {
        type: "READING",
        order: 5,
        difficulty: 6,
        question: {
          text: "Đọc đoạn văn:\n\n科学研究通常从提出假设开始，然后通过设计实验来验证假设。在实验中，科学家需要控制无关变量，以确保结果的可靠性。综上所述，严密的科学方法是获得可信研究结果的基础。\n\nTheo đoạn văn, để kết quả thực nghiệm đáng tin cậy, cần làm gì?",
          options: [
            "Đặt ra nhiều giả thuyết khác nhau",
            "Kiểm soát các biến số không liên quan",
            "Sử dụng nhiều thiết bị thực nghiệm",
            "Công bố kết quả ngay lập tức",
          ],
        },
        answer: { correct: 1 },
        explanation: "Đoạn văn nêu: 科学家需要控制无关变量，以确保结果的可靠性 = Nhà khoa học cần kiểm soát các biến số không liên quan để đảm bảo độ tin cậy của kết quả.",
      },
      {
        type: "LISTENING",
        order: 6,
        difficulty: 5,
        question: {
          text: "Nhìn vào chữ và chọn đúng nghĩa:\n\n进化",
          options: ["Phát minh", "Tiến hóa", "Tế bào", "Gen"],
        },
        answer: { correct: 1 },
        explanation: "进化 (jìnhuà) = tiến hóa. Đây là khái niệm trung tâm trong sinh học, mô tả sự thay đổi của các loài qua nhiều thế hệ.",
      },
      {
        type: "FILL_BLANK",
        order: 7,
        difficulty: 6,
        question: {
          text: "___所述，加强国际合作是应对全球性挑战的最有效途径。(Dựa trên những gì đã nêu, tăng cường hợp tác quốc tế là con đường hiệu quả nhất để ứng phó với các thách thức toàn cầu.)",
          hint: "Cụm từ học thuật tổng kết những điều đã nêu trước đó",
        },
        answer: { correct: "综上" },
        explanation: "综上所述 (zōng shàng suǒ shù) = dựa trên những gì đã nêu, tóm lại. Đây là cụm từ kết luận rất thông dụng trong văn bản học thuật và khoa học.",
      },
    ],
  },

  // ─── LESSON 5: Văn hóa truyền thống ──────────────────────────
  {
    title: "Văn hóa truyền thống",
    description: "Khám phá chiều sâu của văn hóa truyền thống Trung Quốc: thư pháp, Đông y, võ thuật, kinh kịch và triết học",
    hskLevel: 6,
    type: "CULTURE",
    order: 35,
    content: [
      {
        type: "text",
        content:
          "Văn hóa truyền thống Trung Quốc (中国传统文化 Zhōngguó chuántǒng wénhuà) là kho tàng tri thức và nghệ thuật vô giá của nhân loại. Bài học cuối HSK 6 này đưa bạn vào chiều sâu của các di sản văn hóa đặc sắc nhất.",
      },
      { type: "vocabulary", simplified: "儒家", pinyin: "Rújiā", meaning: "Nho gia, Nho giáo" },
      { type: "vocabulary", simplified: "道家", pinyin: "Dàojiā", meaning: "Đạo gia, Đạo giáo" },
      { type: "vocabulary", simplified: "佛教", pinyin: "fójiào", meaning: "Phật giáo" },
      { type: "vocabulary", simplified: "阴阳", pinyin: "yīnyáng", meaning: "âm dương" },
      { type: "vocabulary", simplified: "五行", pinyin: "wǔxíng", meaning: "ngũ hành" },
      {
        type: "grammar",
        title: "Cấu trúc 值得一提的是 (Đáng đề cập là)",
        explanation:
          "值得一提的是 (zhídé yī tí de shì) = đáng đề cập là, điều đáng nói là. Dùng để giới thiệu một điểm đặc biệt quan trọng hoặc thú vị mà người đọc cần chú ý.",
        examples: [
          "值得一提的是，书法不仅是艺术，更是文化的载体。— Đáng đề cập là thư pháp không chỉ là nghệ thuật, mà còn là phương tiện truyền tải văn hóa.",
          "值得一提的是，太极拳融合了道家哲学和武术精髓。— Đáng đề cập là thái cực quyền kết hợp tinh hoa triết học Đạo gia và võ thuật.",
          "值得一提的是，中医治病注重整体和谐而非单一症状。— Đáng đề cập là Đông y chữa bệnh chú trọng sự hài hòa tổng thể chứ không chỉ triệu chứng đơn lẻ.",
        ],
      },
      { type: "vocabulary", simplified: "书法", pinyin: "shūfǎ", meaning: "thư pháp" },
      { type: "vocabulary", simplified: "太极", pinyin: "tàijí", meaning: "thái cực" },
      { type: "vocabulary", simplified: "功夫", pinyin: "gōngfu", meaning: "công phu, võ thuật" },
      { type: "vocabulary", simplified: "京剧", pinyin: "jīngjù", meaning: "kinh kịch" },
      { type: "vocabulary", simplified: "中医", pinyin: "zhōngyī", meaning: "Đông y, y học cổ truyền Trung Quốc" },
      {
        type: "grammar",
        title: "Cấu trúc 不可否认 (Không thể phủ nhận)",
        explanation:
          "不可否认 (bùkě fǒurèn) = không thể phủ nhận. Dùng để thừa nhận một thực tế hiển nhiên trước khi đưa ra luận điểm phản biện hoặc bổ sung.",
        examples: [
          "不可否认，中国传统文化对世界文明做出了巨大贡献。— Không thể phủ nhận, văn hóa truyền thống Trung Quốc đã đóng góp to lớn cho văn minh thế giới.",
          "不可否认，现代化进程给传统文化带来了一定的冲击。— Không thể phủ nhận, quá trình hiện đại hóa đã mang lại những tác động nhất định đối với văn hóa truyền thống.",
          "不可否认，传统文化的保护需要全社会的共同努力。— Không thể phủ nhận, việc bảo tồn văn hóa truyền thống cần nỗ lực chung của toàn xã hội.",
        ],
      },
    ],
    vocabularyKeys: ["儒家", "道家", "佛教", "阴阳", "五行", "书法", "太极", "功夫", "京剧", "中医"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 5,
        question: {
          text: "五行 (wǔxíng) gồm những yếu tố nào?",
          options: [
            "Kim, Mộc, Thủy, Hỏa, Thổ",
            "Đông, Tây, Nam, Bắc, Trung",
            "Xuân, Hạ, Thu, Đông, Trung",
            "Nhân, Nghĩa, Lễ, Trí, Tín",
          ],
        },
        answer: { correct: 0 },
        explanation: "五行 = Kim (金), Mộc (木), Thủy (水), Hỏa (火), Thổ (土). Năm yếu tố này được dùng trong y học cổ truyền, phong thủy và triết học Trung Quốc.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 5,
        question: {
          text: "Nối từ văn hóa với nghĩa:",
          pairs: [
            { left: "书法", right: "thư pháp" },
            { left: "京剧", right: "kinh kịch" },
            { left: "中医", right: "Đông y" },
            { left: "功夫", right: "công phu" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn di sản văn hóa truyền thống: 书法 (thư pháp), 京剧 (kinh kịch), 中医 (Đông y), 功夫 (công phu).",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 5,
        question: {
          text: "___是中国独特的艺术形式，将汉字书写提升为一种具有极高审美价值的艺术表达。(Thư pháp là hình thức nghệ thuật độc đáo của Trung Quốc, nâng việc viết chữ Hán thành nghệ thuật.)",
          hint: "Nghệ thuật viết chữ",
        },
        answer: { correct: "书法" },
        explanation: "书法 (shūfǎ) = thư pháp. 书 = viết; 法 = phép, nghệ thuật. Thư pháp Trung Quốc là di sản văn hóa phi vật thể của UNESCO.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 5,
        question: {
          text: "Câu nào dùng 不可否认 ĐÚNG nhất?",
          options: [
            "不可否认，他来了。",
            "不可否认，传统文化对现代社会仍有重要影响。",
            "不可否认很好。",
            "他不可否认很聪明。",
          ],
        },
        answer: { correct: 1 },
        explanation: "不可否认，传统文化对现代社会仍有重要影响 = Không thể phủ nhận, văn hóa truyền thống vẫn có ảnh hưởng quan trọng đối với xã hội hiện đại. Đây là cách dùng chuẩn mực.",
      },
      {
        type: "READING",
        order: 5,
        difficulty: 6,
        question: {
          text: "Đọc đoạn văn:\n\n儒、道、佛三家思想共同构成了中华文化的精神基础。值得一提的是，三种思想并非相互对立，而是在历史发展中相互融合、相互补充。不可否认，这种思想融合赋予了中华文化极强的包容性和生命力。\n\nTheo đoạn văn, ba luồng tư tưởng Nho, Đạo, Phật có đặc điểm gì?",
          options: [
            "Luôn mâu thuẫn và đối lập nhau",
            "Hòa quyện và bổ trợ nhau trong lịch sử",
            "Chỉ xuất hiện trong thời hiện đại",
            "Không ảnh hưởng đến văn hóa Trung Quốc",
          ],
        },
        answer: { correct: 1 },
        explanation: "Đoạn văn nêu: 三种思想并非相互对立，而是在历史发展中相互融合、相互补充 = Ba luồng tư tưởng không đối lập, mà hòa quyện và bổ trợ nhau trong lịch sử.",
      },
      {
        type: "LISTENING",
        order: 6,
        difficulty: 5,
        question: {
          text: "Nhìn vào chữ này và chọn đúng nghĩa:\n\n阴阳",
          options: ["Ngũ hành", "Âm dương", "Thái cực", "Công phu"],
        },
        answer: { correct: 1 },
        explanation: "阴阳 (yīnyáng) = âm dương. 阴 = âm (tối, mềm, âm tính); 阳 = dương (sáng, cứng, dương tính). Đây là khái niệm cơ bản của triết học Trung Quốc.",
      },
      {
        type: "FILL_BLANK",
        order: 7,
        difficulty: 6,
        question: {
          text: "___以整体观念和辨证论治为核心，在几千年的实践中积累了丰富的诊疗经验。(Đông y lấy quan niệm tổng thể và biện chứng luận trị làm cốt lõi, tích lũy kinh nghiệm chẩn trị phong phú.)",
          hint: "Hệ thống y học cổ truyền của Trung Quốc",
        },
        answer: { correct: "中医" },
        explanation: "中医 (zhōngyī) = Đông y, y học cổ truyền Trung Quốc. 中 = Trung Quốc; 医 = y học. Đông y đã được UNESCO công nhận là di sản văn hóa phi vật thể.",
      },
    ],
  },
];
