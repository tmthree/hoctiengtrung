// Seed script — run with: npm run db:seed (uses tsx)
// Uses PrismaClient directly (not db.ts singleton) so it works standalone
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ==================== VOCABULARY DATA ====================

const hsk1Words = [
  { simplified: "你", pinyin: "nǐ", meaning: "bạn", exampleSentence: "你好！", examplePinyin: "Nǐ hǎo!", exampleMeaning: "Xin chào!" },
  { simplified: "好", pinyin: "hǎo", meaning: "tốt, tốt lành", exampleSentence: "他很好。", examplePinyin: "Tā hěn hǎo.", exampleMeaning: "Anh ấy rất tốt." },
  { simplified: "我", pinyin: "wǒ", meaning: "tôi, ta", exampleSentence: "我是学生。", examplePinyin: "Wǒ shì xuéshēng.", exampleMeaning: "Tôi là học sinh." },
  { simplified: "是", pinyin: "shì", meaning: "là (động từ nối)", exampleSentence: "这是书。", examplePinyin: "Zhè shì shū.", exampleMeaning: "Đây là sách." },
  { simplified: "的", pinyin: "de", meaning: "của (trợ từ)", exampleSentence: "我的书", examplePinyin: "wǒ de shū", exampleMeaning: "sách của tôi" },
  { simplified: "不", pinyin: "bù", meaning: "không (phủ định)", exampleSentence: "我不去。", examplePinyin: "Wǒ bù qù.", exampleMeaning: "Tôi không đi." },
  { simplified: "了", pinyin: "le", meaning: "rồi (trợ từ hoàn thành)", exampleSentence: "他来了。", examplePinyin: "Tā lái le.", exampleMeaning: "Anh ấy đến rồi." },
  { simplified: "在", pinyin: "zài", meaning: "ở, đang", exampleSentence: "他在家。", examplePinyin: "Tā zài jiā.", exampleMeaning: "Anh ấy ở nhà." },
  { simplified: "人", pinyin: "rén", meaning: "người", exampleSentence: "他是好人。", examplePinyin: "Tā shì hǎo rén.", exampleMeaning: "Anh ấy là người tốt." },
  { simplified: "有", pinyin: "yǒu", meaning: "có", exampleSentence: "我有书。", examplePinyin: "Wǒ yǒu shū.", exampleMeaning: "Tôi có sách." },
  { simplified: "他", pinyin: "tā", meaning: "anh ấy, ông ấy", exampleSentence: "他是老师。", examplePinyin: "Tā shì lǎoshī.", exampleMeaning: "Anh ấy là giáo viên." },
  { simplified: "这", pinyin: "zhè", meaning: "này, đây", exampleSentence: "这是什么？", examplePinyin: "Zhè shì shénme?", exampleMeaning: "Đây là cái gì?" },
  { simplified: "中", pinyin: "zhōng", meaning: "giữa, Trung (Hoa)", exampleSentence: "中国很大。", examplePinyin: "Zhōngguó hěn dà.", exampleMeaning: "Trung Quốc rất lớn." },
  { simplified: "大", pinyin: "dà", meaning: "lớn, to", exampleSentence: "北京很大。", examplePinyin: "Běijīng hěn dà.", exampleMeaning: "Bắc Kinh rất lớn." },
  { simplified: "来", pinyin: "lái", meaning: "đến, lại", exampleSentence: "请来！", examplePinyin: "Qǐng lái!", exampleMeaning: "Mời bạn đến!" },
  { simplified: "上", pinyin: "shàng", meaning: "trên, lên", exampleSentence: "书在桌上。", examplePinyin: "Shū zài zhuō shàng.", exampleMeaning: "Sách ở trên bàn." },
  { simplified: "国", pinyin: "guó", meaning: "nước, quốc gia", exampleSentence: "中国", examplePinyin: "Zhōngguó", exampleMeaning: "Trung Quốc" },
  { simplified: "个", pinyin: "gè", meaning: "cái (lượng từ chung)", exampleSentence: "一个人", examplePinyin: "yī gè rén", exampleMeaning: "một người" },
  { simplified: "到", pinyin: "dào", meaning: "đến, tới", exampleSentence: "他到了。", examplePinyin: "Tā dào le.", exampleMeaning: "Anh ấy đến rồi." },
  { simplified: "说", pinyin: "shuō", meaning: "nói", exampleSentence: "他说中文。", examplePinyin: "Tā shuō zhōngwén.", exampleMeaning: "Anh ấy nói tiếng Trung." },
  { simplified: "们", pinyin: "men", meaning: "chúng (số nhiều)", exampleSentence: "我们是朋友。", examplePinyin: "Wǒmen shì péngyǒu.", exampleMeaning: "Chúng tôi là bạn bè." },
  { simplified: "为", pinyin: "wèi", meaning: "vì, cho", exampleSentence: "为什么？", examplePinyin: "Wèishénme?", exampleMeaning: "Tại sao?" },
  { simplified: "子", pinyin: "zǐ", meaning: "con, đứa trẻ", exampleSentence: "孩子很好。", examplePinyin: "Háizi hěn hǎo.", exampleMeaning: "Đứa trẻ rất ngoan." },
  { simplified: "和", pinyin: "hé", meaning: "và, cùng với", exampleSentence: "我和你", examplePinyin: "wǒ hé nǐ", exampleMeaning: "tôi và bạn" },
  { simplified: "地", pinyin: "dì", meaning: "đất, mặt đất", exampleSentence: "地很大。", examplePinyin: "Dì hěn dà.", exampleMeaning: "Mặt đất rất rộng." },
  { simplified: "出", pinyin: "chū", meaning: "ra, xuất", exampleSentence: "他出去了。", examplePinyin: "Tā chūqù le.", exampleMeaning: "Anh ấy ra ngoài rồi." },
  { simplified: "会", pinyin: "huì", meaning: "sẽ, có thể, biết", exampleSentence: "我会说中文。", examplePinyin: "Wǒ huì shuō zhōngwén.", exampleMeaning: "Tôi biết nói tiếng Trung." },
  { simplified: "学", pinyin: "xué", meaning: "học", exampleSentence: "我学中文。", examplePinyin: "Wǒ xué zhōngwén.", exampleMeaning: "Tôi học tiếng Trung." },
  { simplified: "家", pinyin: "jiā", meaning: "nhà, gia đình", exampleSentence: "我家很大。", examplePinyin: "Wǒ jiā hěn dà.", exampleMeaning: "Nhà tôi rất lớn." },
  { simplified: "什么", pinyin: "shénme", meaning: "cái gì, gì", exampleSentence: "这是什么？", examplePinyin: "Zhè shì shénme?", exampleMeaning: "Đây là cái gì?" },
];

const hsk2Words = [
  { simplified: "吃", pinyin: "chī", meaning: "ăn", exampleSentence: "我吃饭。", examplePinyin: "Wǒ chī fàn.", exampleMeaning: "Tôi ăn cơm." },
  { simplified: "喝", pinyin: "hē", meaning: "uống", exampleSentence: "他喝水。", examplePinyin: "Tā hē shuǐ.", exampleMeaning: "Anh ấy uống nước." },
  { simplified: "看", pinyin: "kàn", meaning: "xem, nhìn", exampleSentence: "我看书。", examplePinyin: "Wǒ kàn shū.", exampleMeaning: "Tôi xem sách." },
  { simplified: "听", pinyin: "tīng", meaning: "nghe", exampleSentence: "我听音乐。", examplePinyin: "Wǒ tīng yīnyuè.", exampleMeaning: "Tôi nghe nhạc." },
  { simplified: "写", pinyin: "xiě", meaning: "viết", exampleSentence: "他写汉字。", examplePinyin: "Tā xiě hànzì.", exampleMeaning: "Anh ấy viết chữ Hán." },
  { simplified: "读", pinyin: "dú", meaning: "đọc", exampleSentence: "我读书。", examplePinyin: "Wǒ dú shū.", exampleMeaning: "Tôi đọc sách." },
  { simplified: "工作", pinyin: "gōngzuò", meaning: "làm việc, công việc", exampleSentence: "他工作很努力。", examplePinyin: "Tā gōngzuò hěn nǔlì.", exampleMeaning: "Anh ấy làm việc rất chăm chỉ." },
  { simplified: "学习", pinyin: "xuéxí", meaning: "học tập", exampleSentence: "我学习中文。", examplePinyin: "Wǒ xuéxí zhōngwén.", exampleMeaning: "Tôi học tiếng Trung." },
  { simplified: "老师", pinyin: "lǎoshī", meaning: "giáo viên, thầy cô", exampleSentence: "她是好老师。", examplePinyin: "Tā shì hǎo lǎoshī.", exampleMeaning: "Cô ấy là giáo viên tốt." },
  { simplified: "学生", pinyin: "xuéshēng", meaning: "học sinh", exampleSentence: "他是学生。", examplePinyin: "Tā shì xuéshēng.", exampleMeaning: "Anh ấy là học sinh." },
  { simplified: "朋友", pinyin: "péngyǒu", meaning: "bạn bè", exampleSentence: "他是我的朋友。", examplePinyin: "Tā shì wǒ de péngyǒu.", exampleMeaning: "Anh ấy là bạn của tôi." },
  { simplified: "医生", pinyin: "yīshēng", meaning: "bác sĩ", exampleSentence: "她是医生。", examplePinyin: "Tā shì yīshēng.", exampleMeaning: "Cô ấy là bác sĩ." },
  { simplified: "先生", pinyin: "xiānshēng", meaning: "ông, thầy", exampleSentence: "王先生好！", examplePinyin: "Wáng xiānshēng hǎo!", exampleMeaning: "Ông Vương, xin chào!" },
  { simplified: "小姐", pinyin: "xiǎojiě", meaning: "cô, tiểu thư", exampleSentence: "请问小姐贵姓？", examplePinyin: "Qǐngwèn xiǎojiě guì xìng?", exampleMeaning: "Xin hỏi cô quý danh là gì?" },
  { simplified: "时候", pinyin: "shíhou", meaning: "lúc, thời điểm", exampleSentence: "什么时候？", examplePinyin: "Shénme shíhou?", exampleMeaning: "Khi nào?" },
  { simplified: "现在", pinyin: "xiànzài", meaning: "bây giờ, hiện tại", exampleSentence: "现在几点？", examplePinyin: "Xiànzài jǐ diǎn?", exampleMeaning: "Bây giờ mấy giờ?" },
  { simplified: "昨天", pinyin: "zuótiān", meaning: "hôm qua", exampleSentence: "昨天天气很好。", examplePinyin: "Zuótiān tiānqì hěn hǎo.", exampleMeaning: "Hôm qua thời tiết rất đẹp." },
  { simplified: "今天", pinyin: "jīntiān", meaning: "hôm nay", exampleSentence: "今天几号？", examplePinyin: "Jīntiān jǐ hào?", exampleMeaning: "Hôm nay ngày mấy?" },
  { simplified: "明天", pinyin: "míngtiān", meaning: "ngày mai", exampleSentence: "明天见！", examplePinyin: "Míngtiān jiàn!", exampleMeaning: "Hẹn gặp ngày mai!" },
  { simplified: "高兴", pinyin: "gāoxìng", meaning: "vui, vui mừng", exampleSentence: "我很高兴。", examplePinyin: "Wǒ hěn gāoxìng.", exampleMeaning: "Tôi rất vui." },
];

// ==================== LESSON DATA ====================

const lessonData = [
  {
    title: "Chào hỏi cơ bản",
    description: "Học cách chào hỏi và giới thiệu bản thân bằng tiếng Trung",
    hskLevel: 1,
    type: "CONVERSATION" as const,
    order: 1,
    content: [
      { type: "text", content: "Trong bài học này, bạn sẽ học cách chào hỏi người khác bằng tiếng Trung. Đây là những câu cơ bản nhất mà mọi người học tiếng Trung đều cần biết." },
      { type: "vocabulary", simplified: "你好", pinyin: "nǐ hǎo", meaning: "xin chào" },
      { type: "text", content: "Câu chào hỏi phổ biến nhất là 你好 (nǐ hǎo). Khi gặp người lớn tuổi hoặc cần lịch sự hơn, bạn dùng 您好 (nín hǎo)." },
      { type: "grammar", title: "Cấu trúc câu chào hỏi", explanation: "Tiếng Trung sử dụng 你好 để chào hỏi. 你 là 'bạn', 好 là 'tốt'. Nghĩa đen là 'bạn tốt'.", examples: ["你好！Xin chào!", "老师好！Kính chào thầy/cô!", "大家好！Xin chào tất cả mọi người!"] },
      { type: "text", content: "Khi giới thiệu bản thân, bạn dùng cấu trúc: 我是... (wǒ shì...) = Tôi là..." },
    ],
    vocabularyKeys: ["你", "好", "我", "是"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 1,
        difficulty: 1,
        question: { text: "你好 có nghĩa là gì?", options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"] },
        answer: { correct: 0 },
        explanation: "你好 (nǐ hǎo) là câu chào hỏi cơ bản nhất trong tiếng Trung, nghĩa là 'xin chào'.",
      },
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 2,
        difficulty: 1,
        question: { text: "我是 có nghĩa là gì?", options: ["Tôi có", "Tôi là", "Tôi đi", "Tôi học"] },
        answer: { correct: 1 },
        explanation: "我 (wǒ) = tôi, 是 (shì) = là. Kết hợp lại: 我是 = tôi là.",
      },
      {
        type: "FILL_BLANK" as const,
        order: 3,
        difficulty: 1,
        question: { text: "Điền vào chỗ trống: ___好！ (Xin chào!)", hint: "Đại từ nhân xưng ngôi thứ hai" },
        answer: { correct: "你" },
        explanation: "你 (nǐ) = bạn. 你好 = Xin chào!",
      },
    ],
  },
  {
    title: "Số đếm và ngày tháng",
    description: "Học các con số từ 1-10 và cách nói ngày tháng trong tiếng Trung",
    hskLevel: 1,
    type: "GRAMMAR" as const,
    order: 2,
    content: [
      { type: "text", content: "Hệ thống số đếm trong tiếng Trung rất logic và dễ học. Khi bạn học được số 1-10, bạn có thể đếm đến 99!" },
      { type: "vocabulary", simplified: "一", pinyin: "yī", meaning: "một" },
      { type: "vocabulary", simplified: "二", pinyin: "èr", meaning: "hai" },
      { type: "vocabulary", simplified: "三", pinyin: "sān", meaning: "ba" },
      { type: "grammar", title: "Cách đếm số trong tiếng Trung", explanation: "Số 11-19: thêm 十 (shí) trước. Số 21-99: số hàng chục + 十 + số hàng đơn vị.", examples: ["十一 (shíyī) = 11", "二十 (èrshí) = 20", "三十五 (sānshíwǔ) = 35"] },
      { type: "text", content: "Để hỏi ngày tháng, dùng: 今天几号？(Jīntiān jǐ hào?) = Hôm nay ngày mấy?" },
    ],
    vocabularyKeys: ["今天", "昨天", "明天"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 1,
        difficulty: 1,
        question: { text: "今天 có nghĩa là gì?", options: ["Hôm qua", "Hôm nay", "Ngày mai", "Tuần sau"] },
        answer: { correct: 1 },
        explanation: "今天 (jīntiān) = hôm nay.",
      },
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 2,
        difficulty: 1,
        question: { text: "明天 có nghĩa là gì?", options: ["Hôm qua", "Hôm nay", "Ngày mai", "Tuần trước"] },
        answer: { correct: 2 },
        explanation: "明天 (míngtiān) = ngày mai.",
      },
      {
        type: "FILL_BLANK" as const,
        order: 3,
        difficulty: 1,
        question: { text: "___ 天气很好。(Hôm qua thời tiết rất đẹp.)", hint: "Từ chỉ hôm qua" },
        answer: { correct: "昨天" },
        explanation: "昨天 (zuótiān) = hôm qua.",
      },
    ],
  },
  {
    title: "Gia đình và người thân",
    description: "Học cách nói về các thành viên trong gia đình bằng tiếng Trung",
    hskLevel: 1,
    type: "CONVERSATION" as const,
    order: 3,
    content: [
      { type: "text", content: "Gia đình là chủ đề rất quan trọng trong tiếng Trung. Người Trung Quốc rất coi trọng gia đình và thường hỏi về gia đình khi gặp nhau." },
      { type: "vocabulary", simplified: "家", pinyin: "jiā", meaning: "nhà, gia đình" },
      { type: "vocabulary", simplified: "人", pinyin: "rén", meaning: "người" },
      { type: "grammar", title: "Giới thiệu về gia đình", explanation: "Để nói số người trong gia đình, dùng: 我家有...个人 (wǒ jiā yǒu...gè rén) = Gia đình tôi có...người.", examples: ["我家有四个人。= Gia đình tôi có 4 người.", "我有一个弟弟。= Tôi có một em trai.", "她有两个姐姐。= Cô ấy có hai chị gái."] },
    ],
    vocabularyKeys: ["家", "人", "有", "和"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 1,
        difficulty: 1,
        question: { text: "家 có nghĩa là gì?", options: ["Trường học", "Nhà, gia đình", "Công ty", "Bệnh viện"] },
        answer: { correct: 1 },
        explanation: "家 (jiā) = nhà, gia đình.",
      },
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 2,
        difficulty: 1,
        question: { text: "我家有四个人 có nghĩa là gì?", options: ["Tôi có 4 người bạn", "Gia đình tôi có 4 người", "Nhà tôi có 4 phòng", "Tôi ở với 4 người"] },
        answer: { correct: 1 },
        explanation: "我家 = gia đình tôi, 有 = có, 四个人 = 4 người.",
      },
    ],
  },
  {
    title: "Ăn uống và đồ ăn",
    description: "Học từ vựng về ăn uống và cách gọi món ăn bằng tiếng Trung",
    hskLevel: 2,
    type: "CONVERSATION" as const,
    order: 1,
    content: [
      { type: "text", content: "Ẩm thực là một phần quan trọng của văn hoá Trung Quốc. Trong bài này, bạn sẽ học cách nói về đồ ăn và gọi món tại nhà hàng." },
      { type: "vocabulary", simplified: "吃", pinyin: "chī", meaning: "ăn" },
      { type: "vocabulary", simplified: "喝", pinyin: "hē", meaning: "uống" },
      { type: "grammar", title: "Hỏi về sở thích ăn uống", explanation: "Dùng 你喜欢吃什么？(Nǐ xǐhuān chī shénme?) để hỏi 'Bạn thích ăn gì?'", examples: ["你喜欢吃什么？= Bạn thích ăn gì?", "我喜欢吃米饭。= Tôi thích ăn cơm.", "你要喝什么？= Bạn muốn uống gì?"] },
      { type: "text", content: "Khi ăn cùng nhau, người Trung Quốc thường nói 吃吧！(Chī ba!) = Ăn đi! để mời người khác ăn." },
    ],
    vocabularyKeys: ["吃", "喝", "看", "高兴"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 1,
        difficulty: 1,
        question: { text: "吃饭 có nghĩa là gì?", options: ["Uống nước", "Ăn cơm", "Nấu ăn", "Mua đồ ăn"] },
        answer: { correct: 1 },
        explanation: "吃 (chī) = ăn, 饭 (fàn) = cơm. 吃饭 = ăn cơm.",
      },
      {
        type: "FILL_BLANK" as const,
        order: 2,
        difficulty: 1,
        question: { text: "我___水。(Tôi uống nước.)", hint: "Động từ 'uống'" },
        answer: { correct: "喝" },
        explanation: "喝 (hē) = uống. 我喝水 = Tôi uống nước.",
      },
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 3,
        difficulty: 2,
        question: { text: "你喜欢吃什么？có nghĩa là gì?", options: ["Bạn đã ăn chưa?", "Bạn thích ăn gì?", "Bạn muốn ăn không?", "Bạn ăn ở đâu?"] },
        answer: { correct: 1 },
        explanation: "喜欢 = thích, 吃 = ăn, 什么 = gì. Câu hỏi về sở thích ăn uống.",
      },
    ],
  },
  {
    title: "Công việc và nghề nghiệp",
    description: "Học từ vựng về các nghề nghiệp và cách nói về công việc",
    hskLevel: 2,
    type: "CONVERSATION" as const,
    order: 2,
    content: [
      { type: "text", content: "Khi gặp người mới, người Trung Quốc thường hỏi về nghề nghiệp. Bài học này giúp bạn học từ vựng về các nghề nghiệp phổ biến." },
      { type: "vocabulary", simplified: "老师", pinyin: "lǎoshī", meaning: "giáo viên" },
      { type: "vocabulary", simplified: "医生", pinyin: "yīshēng", meaning: "bác sĩ" },
      { type: "vocabulary", simplified: "工作", pinyin: "gōngzuò", meaning: "làm việc" },
      { type: "grammar", title: "Hỏi về nghề nghiệp", explanation: "Dùng 你做什么工作？(Nǐ zuò shénme gōngzuò?) để hỏi 'Bạn làm nghề gì?'", examples: ["你做什么工作？= Bạn làm nghề gì?", "我是老师。= Tôi là giáo viên.", "他在医院工作。= Anh ấy làm việc ở bệnh viện."] },
    ],
    vocabularyKeys: ["老师", "学生", "医生", "工作", "学习"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 1,
        difficulty: 1,
        question: { text: "老师 có nghĩa là gì?", options: ["Học sinh", "Giáo viên", "Bác sĩ", "Kỹ sư"] },
        answer: { correct: 1 },
        explanation: "老师 (lǎoshī) = giáo viên, thầy cô.",
      },
      {
        type: "MULTIPLE_CHOICE" as const,
        order: 2,
        difficulty: 1,
        question: { text: "医生 có nghĩa là gì?", options: ["Y tá", "Bác sĩ", "Dược sĩ", "Bệnh nhân"] },
        answer: { correct: 1 },
        explanation: "医生 (yīshēng) = bác sĩ.",
      },
      {
        type: "FILL_BLANK" as const,
        order: 3,
        difficulty: 2,
        question: { text: "他在医院___。(Anh ấy làm việc ở bệnh viện.)", hint: "Động từ 'làm việc'" },
        answer: { correct: "工作" },
        explanation: "工作 (gōngzuò) = làm việc.",
      },
    ],
  },
];

// ==================== MAIN SEED FUNCTION ====================

async function main() {
  console.log("Starting seed...");

  // Clean existing data in dependency order
  await prisma.quizAttempt.deleteMany();
  await prisma.vocabularyReview.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.lessonVocabulary.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.vocabulary.deleteMany();

  console.log("Cleaned existing data.");

  // Insert HSK 1 vocabulary
  const createdVocab: Record<string, string> = {};

  for (const word of hsk1Words) {
    const v = await prisma.vocabulary.create({
      data: {
        simplified: word.simplified,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleSentence: word.exampleSentence,
        examplePinyin: word.examplePinyin,
        exampleMeaning: word.exampleMeaning,
        hskLevel: 1,
      },
    });
    createdVocab[word.simplified] = v.id;
  }

  console.log(`Created ${hsk1Words.length} HSK 1 words.`);

  // Insert HSK 2 vocabulary
  for (const word of hsk2Words) {
    const v = await prisma.vocabulary.create({
      data: {
        simplified: word.simplified,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleSentence: word.exampleSentence,
        examplePinyin: word.examplePinyin,
        exampleMeaning: word.exampleMeaning,
        hskLevel: 2,
      },
    });
    createdVocab[word.simplified] = v.id;
  }

  console.log(`Created ${hsk2Words.length} HSK 2 words.`);

  // Insert lessons with exercises and vocabulary links
  for (const ld of lessonData) {
    const { vocabularyKeys, exercises: exerciseData, ...lessonFields } = ld;

    const lesson = await prisma.lesson.create({
      data: {
        ...lessonFields,
        content: lessonFields.content,
        isPublished: true,
      },
    });

    // Link vocabulary to lesson
    let order = 0;
    for (const key of vocabularyKeys) {
      const vocabId = createdVocab[key];
      if (vocabId) {
        await prisma.lessonVocabulary.create({
          data: { lessonId: lesson.id, vocabularyId: vocabId, order: order++ },
        });
      }
    }

    // Create exercises
    for (const ex of exerciseData) {
      await prisma.exercise.create({
        data: {
          lessonId: lesson.id,
          type: ex.type,
          order: ex.order,
          difficulty: ex.difficulty,
          question: ex.question,
          answer: ex.answer,
          explanation: ex.explanation,
        },
      });
    }

    console.log(`Created lesson: ${lesson.title}`);
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
