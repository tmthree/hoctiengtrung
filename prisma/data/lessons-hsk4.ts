// HSK 4 Lessons — 5 brand new lessons
// Topics: Business, Education & Career, Media & Social Media, Debate & Discussion, Complex Grammar

import type { LessonData } from "./lessons";

export const lessonsHsk4: LessonData[] = [
  // ─── LESSON 1: Thế giới kinh doanh ──────────────────────────
  {
    title: "Thế giới kinh doanh",
    description: "Học từ vựng kinh doanh và cách diễn đạt trong môi trường thương mại chuyên nghiệp",
    hskLevel: 4,
    type: "CONVERSATION",
    order: 21,
    content: [
      {
        type: "text",
        content:
          "Tiếng Trung kinh doanh (商务汉语) ngày càng quan trọng trong môi trường quốc tế. Bài học này giới thiệu các thuật ngữ kinh doanh cốt lõi và cách sử dụng chúng trong các tình huống thực tế.",
      },
      { type: "vocabulary", simplified: "公司", pinyin: "gōngsī", meaning: "công ty" },
      { type: "vocabulary", simplified: "利润", pinyin: "lìrùn", meaning: "lợi nhuận" },
      { type: "vocabulary", simplified: "投资", pinyin: "tóuzī", meaning: "đầu tư" },
      { type: "vocabulary", simplified: "竞争", pinyin: "jìngzhēng", meaning: "cạnh tranh" },
      {
        type: "grammar",
        title: "Diễn đạt trong môi trường kinh doanh",
        explanation:
          "Tiếng Trung kinh doanh thường dùng ngôn ngữ trang trọng và chính xác hơn tiếng Trung thông thường.",
        examples: [
          "贵公司的产品质量非常好。— Sản phẩm của quý công ty chất lượng rất tốt.",
          "我们希望与您建立长期合作关系。— Chúng tôi mong muốn xây dựng mối quan hệ hợp tác lâu dài với quý vị.",
          "这个项目的投资风险较高。— Rủi ro đầu tư của dự án này khá cao.",
          "市场竞争越来越激烈。— Cạnh tranh thị trường ngày càng gay gắt.",
        ],
      },
      { type: "vocabulary", simplified: "市场", pinyin: "shìchǎng", meaning: "thị trường" },
      { type: "vocabulary", simplified: "客户", pinyin: "kèhù", meaning: "khách hàng" },
      { type: "vocabulary", simplified: "品牌", pinyin: "pǐnpái", meaning: "thương hiệu" },
      { type: "vocabulary", simplified: "合作", pinyin: "hézuò", meaning: "hợp tác" },
      {
        type: "grammar",
        title: "Cấu trúc 不仅...而且... trong kinh doanh",
        explanation:
          "不仅...而且... = không chỉ...mà còn... — Dùng để nhấn mạnh nhiều ưu điểm hoặc vấn đề.",
        examples: [
          "我们的产品不仅质量好，而且价格合理。— Sản phẩm của chúng tôi không chỉ chất lượng tốt mà còn giá hợp lý.",
          "这家公司不仅在国内有名，而且在国际上也有很高的声誉。— Công ty này không chỉ nổi tiếng trong nước mà còn có tiếng tăm cao trên quốc tế.",
        ],
      },
    ],
    vocabularyKeys: [
      "公司", "利润", "投资", "竞争", "市场", "客户", "合作", "品牌", "广告", "成功", "失败", "风险",
    ],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "利润 (lìrùn) có nghĩa là gì?",
          options: ["Chi phí", "Lợi nhuận", "Doanh thu", "Đầu tư"],
        },
        answer: { correct: 1 },
        explanation: "利润 (lìrùn) = lợi nhuận. 利 = lợi ích, 润 = nhuận, lãi. Đây là thuật ngữ kinh doanh quan trọng.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 3,
        question: {
          text: "我们公司始终把___的需求放在第一位。(Công ty chúng tôi luôn đặt nhu cầu khách hàng lên hàng đầu.)",
          hint: "Người mua hàng hoặc sử dụng dịch vụ",
        },
        answer: { correct: "客户" },
        explanation: "客户 (kèhù) = khách hàng. Trong kinh doanh, khách hàng luôn là ưu tiên hàng đầu.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 3,
        question: {
          text: "建立一个强大的___需要多年的积累和持续的努力。",
          options: ["客户", "市场", "品牌", "利润"],
        },
        answer: { correct: 2 },
        explanation: "品牌 (pǐnpái) = thương hiệu. Xây dựng thương hiệu mạnh cần thời gian dài và nỗ lực không ngừng.",
      },
      {
        type: "TONE",
        order: 4,
        difficulty: 3,
        question: {
          character: "竞",
          options: ["jīng", "jíng", "jǐng", "jìng"],
        },
        answer: { correct: 3 },
        explanation: "竞争 (jìngzhēng) — 竞 đọc thanh thứ tư. Nghĩa: cạnh tranh.",
      },
      {
        type: "MATCHING",
        order: 5,
        difficulty: 3,
        question: {
          pairs: [
            { left: "投资", right: "Đầu tư" },
            { left: "竞争", right: "Cạnh tranh" },
            { left: "合作", right: "Hợp tác" },
            { left: "风险", right: "Rủi ro" },
            { left: "广告", right: "Quảng cáo" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Từ vựng kinh doanh quan trọng ở cấp độ HSK 4.",
      },
      {
        type: "FILL_BLANK",
        order: 6,
        difficulty: 4,
        question: {
          text: "我们的产品不仅质量好，___价格合理，深受消费者欢迎。",
          hint: "Từ dùng trong cặp 不仅...___...",
        },
        answer: { correct: "而且" },
        explanation: "不仅...而且... = không chỉ...mà còn... Đây là cặp liên từ quan trọng ở HSK 4.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 4,
        question: {
          text: "创业是有___的，即使做好了准备，也可能遇到意想不到的困难。",
          options: ["利润", "品牌", "风险", "客户"],
        },
        answer: { correct: 2 },
        explanation: "风险 (fēngxiǎn) = rủi ro. Khởi nghiệp luôn có rủi ro, dù chuẩn bị kỹ đến đâu.",
      },
    ],
  },

  // ─── LESSON 2: Giáo dục và sự nghiệp ────────────────────────
  {
    title: "Giáo dục và sự nghiệp",
    description: "Học cách nói về đại học, chuyên ngành, nghề nghiệp và kế hoạch tương lai bằng tiếng Trung",
    hskLevel: 4,
    type: "CONVERSATION",
    order: 22,
    content: [
      {
        type: "text",
        content:
          "Giáo dục và sự nghiệp là những chủ đề thường xuyên được thảo luận trong xã hội Trung Quốc hiện đại. Áp lực thi cử và cạnh tranh vào đại học là một phần thực tế của cuộc sống sinh viên Trung Quốc.",
      },
      { type: "vocabulary", simplified: "大学", pinyin: "dàxué", meaning: "đại học" },
      { type: "vocabulary", simplified: "专业", pinyin: "zhuānyè", meaning: "chuyên ngành" },
      { type: "vocabulary", simplified: "毕业", pinyin: "bìyè", meaning: "tốt nghiệp" },
      { type: "vocabulary", simplified: "奖学金", pinyin: "jiǎngxuéjīn", meaning: "học bổng" },
      {
        type: "grammar",
        title: "Nói về kế hoạch học tập",
        explanation:
          "Sử dụng 打算 (dǎsuàn = dự định) và 计划 (jìhuà = kế hoạch) khi nói về tương lai.",
        examples: [
          "我打算报考北京大学的中文专业。— Tôi dự định thi vào chuyên ngành Trung văn của Đại học Bắc Kinh.",
          "毕业后，我计划先工作两年再继续深造。— Sau khi tốt nghiệp, tôi dự định làm việc hai năm rồi tiếp tục học lên.",
          "她获得了全额奖学金，可以免费留学。— Cô ấy nhận học bổng toàn phần, có thể du học miễn phí.",
        ],
      },
      { type: "vocabulary", simplified: "教授", pinyin: "jiàoshòu", meaning: "giáo sư" },
      { type: "vocabulary", simplified: "论文", pinyin: "lùnwén", meaning: "luận văn" },
      { type: "vocabulary", simplified: "研究", pinyin: "yánjiū", meaning: "nghiên cứu" },
      { type: "vocabulary", simplified: "能力", pinyin: "nénglì", meaning: "năng lực" },
      {
        type: "grammar",
        title: "Cấu trúc 之所以...是因为... (Sở dĩ...là vì...)",
        explanation:
          "之所以...是因为... giải thích lý do của một sự việc đã xảy ra. Đây là cấu trúc nâng cao, thường dùng trong văn viết và diễn đạt trang trọng.",
        examples: [
          "之所以选择这个专业，是因为我对它充满兴趣。— Sở dĩ chọn chuyên ngành này là vì tôi đầy hứng thú với nó.",
          "之所以能获得奖学金，是因为他一直刻苦努力。— Sở dĩ nhận được học bổng là vì anh ấy luôn học hành chăm chỉ.",
        ],
      },
    ],
    vocabularyKeys: [
      "大学", "专业", "毕业", "论文", "奖学金", "教授", "研究", "实验", "知识", "能力",
    ],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "奖学金 (jiǎngxuéjīn) có nghĩa là gì?",
          options: ["Học phí", "Học bổng", "Tiền lương", "Tiền thưởng"],
        },
        answer: { correct: 1 },
        explanation: "奖学金 (jiǎngxuéjīn) = học bổng. 奖 = thưởng, 学 = học, 金 = tiền/vàng.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 3,
        question: {
          text: "选择一个适合自己的___，对未来的职业发展非常重要。",
          hint: "Lĩnh vực học tập chuyên sâu ở đại học",
        },
        answer: { correct: "专业" },
        explanation: "专业 (zhuānyè) = chuyên ngành. Chọn chuyên ngành phù hợp ảnh hưởng lớn đến sự nghiệp tương lai.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 3,
        question: {
          text: "他大学___之后，选择继续读研究生。",
          options: ["入学", "毕业", "考试", "研究"],
        },
        answer: { correct: 1 },
        explanation: "毕业 (bìyè) = tốt nghiệp. Sau khi tốt nghiệp đại học nhiều người chọn học tiếp lên cao học.",
      },
      {
        type: "TONE",
        order: 4,
        difficulty: 3,
        question: {
          character: "论",
          options: ["lūn", "lún", "lǔn", "lùn"],
        },
        answer: { correct: 3 },
        explanation: "论文 (lùnwén) — 论 đọc thanh thứ tư. Nghĩa: luận, bàn luận. 论文 = luận văn.",
      },
      {
        type: "MATCHING",
        order: 5,
        difficulty: 3,
        question: {
          pairs: [
            { left: "大学", right: "Đại học" },
            { left: "专业", right: "Chuyên ngành" },
            { left: "教授", right: "Giáo sư" },
            { left: "研究", right: "Nghiên cứu" },
            { left: "知识", right: "Kiến thức" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Từ vựng về giáo dục đại học và nghiên cứu học thuật.",
      },
      {
        type: "FILL_BLANK",
        order: 6,
        difficulty: 4,
        question: {
          text: "___选择来这里工作，是因为我对这个城市充满热爱。",
          hint: "Sở dĩ... (lý do tại sao)",
        },
        answer: { correct: "之所以" },
        explanation: "之所以...是因为... = Sở dĩ...là vì... Đây là cấu trúc giải thích nguyên nhân trang trọng.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 4,
        question: {
          text: "解决问题的___比死记硬背的知识更重要，这是现代教育的核心理念。",
          options: ["态度", "方法", "能力", "经验"],
        },
        answer: { correct: 2 },
        explanation: "能力 (nénglì) = năng lực, khả năng. Năng lực giải quyết vấn đề quan trọng hơn việc học thuộc lòng.",
      },
    ],
  },

  // ─── LESSON 3: Truyền thông và mạng xã hội ──────────────────
  {
    title: "Truyền thông và mạng xã hội",
    description: "Học từ vựng về truyền thông, báo chí và tác động của mạng xã hội trong xã hội hiện đại",
    hskLevel: 4,
    type: "READING",
    order: 23,
    content: [
      {
        type: "text",
        content:
          "Truyền thông (媒体) đóng vai trò quan trọng trong xã hội hiện đại. Từ báo giấy truyền thống đến mạng xã hội (社交媒体), cách người ta tiếp nhận thông tin đã thay đổi hoàn toàn trong vài thập kỷ qua.",
      },
      { type: "vocabulary", simplified: "新闻", pinyin: "xīnwén", meaning: "tin tức" },
      { type: "vocabulary", simplified: "记者", pinyin: "jìzhě", meaning: "phóng viên" },
      { type: "vocabulary", simplified: "采访", pinyin: "cǎifǎng", meaning: "phỏng vấn (báo chí)" },
      { type: "vocabulary", simplified: "发表", pinyin: "fābiǎo", meaning: "phát biểu, đăng tải" },
      {
        type: "grammar",
        title: "Nói về truyền thông",
        explanation:
          "Khi nói về tin tức và truyền thông, dùng các cấu trúc thụ động và cách diễn đạt trang trọng.",
        examples: [
          "这条新闻被很多媒体报道了。— Tin này được nhiều hãng truyền thông đưa tin.",
          "记者对事故进行了深入采访。— Phóng viên đã thực hiện cuộc phỏng vấn sâu về vụ tai nạn.",
          "她在学术期刊上发表了重要论文。— Cô ấy đã đăng bài báo quan trọng trên tạp chí học thuật.",
        ],
      },
      { type: "vocabulary", simplified: "信息", pinyin: "xìnxī", meaning: "thông tin" },
      { type: "vocabulary", simplified: "网站", pinyin: "wǎngzhàn", meaning: "website" },
      { type: "vocabulary", simplified: "社交媒体", pinyin: "shèjiāo méitǐ", meaning: "mạng xã hội" },
      {
        type: "grammar",
        title: "Cấu trúc 即使...也... (Dù...vẫn...)",
        explanation:
          "即使...也... = dù cho...vẫn... Nhấn mạnh rằng kết quả không thay đổi dù điều kiện thay đổi. Khác với 虽然...但是 ở chỗ 即使 thường dùng cho giả định chưa xảy ra.",
        examples: [
          "即使在互联网时代，读书的重要性也没有减少。— Dù trong thời đại internet, tầm quan trọng của việc đọc sách vẫn không giảm.",
          "即使有了社交媒体，面对面交流仍然是最重要的。— Dù đã có mạng xã hội, giao tiếp trực tiếp vẫn là quan trọng nhất.",
        ],
      },
    ],
    vocabularyKeys: [
      "新闻", "报纸", "杂志", "记者", "采访", "发表", "消息", "信息", "网站", "社交媒体",
    ],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "记者 (jìzhě) có nghĩa là gì?",
          options: ["Biên tập viên", "Phóng viên", "Nhà xuất bản", "Độc giả"],
        },
        answer: { correct: 1 },
        explanation: "记者 (jìzhě) = phóng viên, nhà báo. 记 = ghi chép, 者 = người làm việc gì đó.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 3,
        question: {
          text: "在___爆炸的时代，学会筛选有价值的信息是重要技能。",
          hint: "Dữ liệu, tin tức được truyền đi",
        },
        answer: { correct: "信息" },
        explanation: "信息 (xìnxī) = thông tin. Trong thời đại bùng nổ thông tin, kỹ năng lọc thông tin rất quan trọng.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 3,
        question: {
          text: "___的出现改变了人们的沟通方式，但也带来了新的社会问题。",
          options: ["报纸", "社交媒体", "杂志", "新闻"],
        },
        answer: { correct: 1 },
        explanation: "社交媒体 (shèjiāo méitǐ) = mạng xã hội. Mạng xã hội thay đổi cách giao tiếp nhưng cũng mang lại vấn đề mới.",
      },
      {
        type: "PINYIN",
        order: 4,
        difficulty: 3,
        question: {
          character: "采访",
          hint: "hoạt động phóng viên thực hiện khi thu thập tin tức",
        },
        answer: { correct: "cǎifǎng" },
        explanation: "采访 (cǎifǎng) — 采 thanh 3, 访 thanh 3. Nghĩa: phỏng vấn (báo chí), đi thu thập tin tức.",
      },
      {
        type: "MATCHING",
        order: 5,
        difficulty: 3,
        question: {
          pairs: [
            { left: "新闻", right: "Tin tức" },
            { left: "记者", right: "Phóng viên" },
            { left: "报纸", right: "Báo in" },
            { left: "网站", right: "Website" },
            { left: "信息", right: "Thông tin" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Từ vựng về truyền thông và báo chí.",
      },
      {
        type: "FILL_BLANK",
        order: 6,
        difficulty: 4,
        question: {
          text: "___在互联网时代，读书的重要性也没有减少。",
          hint: "Dù cho... (giả định)",
        },
        answer: { correct: "即使" },
        explanation: "即使...也... = dù cho...vẫn... Dùng cho giả định hoặc điều kiện cực đoan.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 4,
        question: {
          text: "她在国际学术期刊上___了多篇重要论文，引起学界广泛关注。",
          options: ["采访", "报道", "发表", "讨论"],
        },
        answer: { correct: 2 },
        explanation: "发表 (fābiǎo) = phát biểu, đăng tải (bài viết). Thường dùng với 论文 (luận văn) hoặc 文章 (bài viết).",
      },
    ],
  },

  // ─── LESSON 4: Tranh luận và thảo luận ──────────────────────
  {
    title: "Tranh luận và thảo luận",
    description: "Học cách bày tỏ quan điểm, đồng ý, phản đối và tranh luận bằng tiếng Trung chuẩn xác",
    hskLevel: 4,
    type: "CONVERSATION",
    order: 24,
    content: [
      {
        type: "text",
        content:
          "Khả năng trình bày quan điểm và tranh luận là kỹ năng ngôn ngữ nâng cao. Bài học này dạy bạn cách bày tỏ ý kiến, đồng ý, phản đối một cách lịch sự và thuyết phục bằng tiếng Trung.",
      },
      { type: "vocabulary", simplified: "支持", pinyin: "zhīchí", meaning: "ủng hộ, hỗ trợ" },
      { type: "vocabulary", simplified: "反对", pinyin: "fǎnduì", meaning: "phản đối" },
      { type: "vocabulary", simplified: "建议", pinyin: "jiànyì", meaning: "đề xuất, gợi ý" },
      { type: "vocabulary", simplified: "讨论", pinyin: "tǎolùn", meaning: "thảo luận" },
      {
        type: "grammar",
        title: "Bày tỏ quan điểm",
        explanation:
          "Các cụm từ quan trọng khi bày tỏ quan điểm trong tiếng Trung trang trọng.",
        examples: [
          "我认为... — Tôi cho rằng...",
          "依我看来... — Theo quan điểm của tôi...",
          "我赞成这个观点。— Tôi tán thành quan điểm này.",
          "我不同意这种说法。— Tôi không đồng ý với cách nói này.",
          "这个问题值得深入讨论。— Vấn đề này đáng được thảo luận sâu.",
        ],
      },
      { type: "vocabulary", simplified: "责任", pinyin: "zérèn", meaning: "trách nhiệm" },
      { type: "vocabulary", simplified: "价值", pinyin: "jiàzhí", meaning: "giá trị" },
      { type: "vocabulary", simplified: "道理", pinyin: "dàolǐ", meaning: "lẽ phải, đạo lý" },
      {
        type: "grammar",
        title: "Cấu trúc 与其...不如... (Thay vì...tốt hơn hãy...)",
        explanation:
          "与其 A 不如 B = Thay vì A, tốt hơn là B. Dùng để so sánh hai lựa chọn và đề xuất lựa chọn tốt hơn.",
        examples: [
          "与其抱怨，不如想办法解决问题。— Thay vì than thở, tốt hơn hãy nghĩ cách giải quyết vấn đề.",
          "与其浪费时间，不如做一些有意义的事。— Thay vì lãng phí thời gian, tốt hơn hãy làm việc gì có ý nghĩa.",
        ],
      },
      {
        type: "grammar",
        title: "Cấu trúc 无论...都... (Dù thế nào vẫn...)",
        explanation:
          "无论...都... = dù thế nào, bất luận. Tương tự 不管...都... nhưng thường dùng trong văn viết trang trọng hơn.",
        examples: [
          "无论遇到什么困难，我都不会放弃。— Dù gặp khó khăn gì, tôi cũng sẽ không bỏ cuộc.",
          "无论你做什么决定，我都支持你。— Dù bạn quyết định gì, tôi cũng ủng hộ bạn.",
        ],
      },
    ],
    vocabularyKeys: [
      "解决", "改变", "提高", "支持", "反对", "建议", "讨论", "责任", "价值", "道理", "意义", "公平",
    ],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 3,
        question: {
          text: "反对 (fǎnduì) có nghĩa là gì?",
          options: ["Ủng hộ", "Đồng ý", "Phản đối", "Thảo luận"],
        },
        answer: { correct: 2 },
        explanation: "反对 (fǎnduì) = phản đối. 反 = ngược lại, 对 = đúng/đối với. 反对 = chống lại, không đồng ý.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 3,
        question: {
          text: "经过三小时的认真___，团队终于达成了一致意见。",
          hint: "Nói chuyện để giải quyết vấn đề",
        },
        answer: { correct: "讨论" },
        explanation: "讨论 (tǎolùn) = thảo luận, bàn bạc. Sau nhiều giờ thảo luận mọi người mới đồng thuận.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 4,
        question: {
          text: "与其在那里担心，___马上采取行动去解决问题。Chọn từ đúng:",
          options: ["也", "还是", "不如", "就"],
        },
        answer: { correct: 2 },
        explanation: "与其...不如... là cặp cố định. Nghĩa: Thay vì lo lắng, tốt hơn hãy hành động ngay.",
      },
      {
        type: "TONE",
        order: 4,
        difficulty: 3,
        question: {
          character: "议",
          options: ["yī", "yí", "yǐ", "yì"],
        },
        answer: { correct: 3 },
        explanation: "建议 (jiànyì) — 议 đọc thanh thứ tư. Nghĩa: đề xuất, gợi ý, bàn bạc.",
      },
      {
        type: "MATCHING",
        order: 5,
        difficulty: 3,
        question: {
          pairs: [
            { left: "支持", right: "Ủng hộ" },
            { left: "反对", right: "Phản đối" },
            { left: "建议", right: "Đề xuất" },
            { left: "责任", right: "Trách nhiệm" },
            { left: "公平", right: "Công bằng" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Từ vựng quan trọng khi tranh luận và bày tỏ quan điểm.",
      },
      {
        type: "FILL_BLANK",
        order: 6,
        difficulty: 4,
        question: {
          text: "___遇到什么困难，我都不会放弃自己的梦想。",
          hint: "Dù thế nào... (trang trọng hơn 不管)",
        },
        answer: { correct: "无论" },
        explanation: "无论...都... = dù thế nào vẫn... Trang trọng hơn 不管, thường dùng trong văn viết.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 4,
        question: {
          text: "在最困难的时候，家人和朋友的___是我坚持下去的最大动力。",
          options: ["反对", "建议", "支持", "讨论"],
        },
        answer: { correct: 2 },
        explanation: "支持 (zhīchí) = ủng hộ, hỗ trợ. Sự ủng hộ của gia đình và bạn bè là động lực quan trọng.",
      },
    ],
  },

  // ─── LESSON 5: Ngữ pháp phức hợp ────────────────────────────
  {
    title: "Ngữ pháp phức hợp",
    description: "Nắm vững các mẫu câu phức hợp và cấu trúc ngữ pháp nâng cao ở trình độ HSK 4",
    hskLevel: 4,
    type: "GRAMMAR",
    order: 25,
    content: [
      {
        type: "text",
        content:
          "Ở trình độ HSK 4, bạn cần thành thạo các cấu trúc ngữ pháp phức hợp. Những cấu trúc này giúp diễn đạt ý tưởng phức tạp, trừu tượng và thể hiện trình độ tiếng Trung cao cấp.",
      },
      {
        type: "grammar",
        title: "不仅...而且... (Không chỉ...mà còn...)",
        explanation:
          "不仅...而且... nhấn mạnh rằng không chỉ A mà còn cả B. Cả hai vế đều xảy ra, nhưng B càng nhấn mạnh hơn.",
        examples: [
          "学外语不仅能找好工作，而且能了解不同文化。— Học ngoại ngữ không chỉ giúp tìm việc tốt mà còn hiểu văn hóa.",
          "这个项目不仅耗时，而且耗费大量资金。— Dự án này không chỉ tốn thời gian mà còn tốn nhiều tiền.",
        ],
      },
      {
        type: "grammar",
        title: "即使...也... vs 虽然...但是...",
        explanation:
          "Hai cấu trúc nhượng bộ quan trọng:\n• 虽然...但是... = Mặc dù...nhưng... (sự việc đã xảy ra)\n• 即使...也... = Dù cho...vẫn... (giả định hoặc điều kiện cực đoan)",
        examples: [
          "虽然很难，但是我们还是做到了。— Mặc dù khó, nhưng chúng tôi vẫn làm được.",
          "即使再难，我也不会放弃。— Dù cho khó đến đâu, tôi vẫn sẽ không bỏ cuộc.",
        ],
      },
      {
        type: "grammar",
        title: "与其...不如... (Thay vì...tốt hơn...)",
        explanation:
          "与其 A 不如 B: So sánh A và B, đề xuất B tốt hơn A. Thường dùng để khuyên nhủ hoặc đề xuất phương án tốt hơn.",
        examples: [
          "与其浪费时间，不如用来学习。— Thay vì lãng phí thời gian, tốt hơn hãy dùng để học.",
          "与其一个人努力，不如大家合作。— Thay vì một mình nỗ lực, tốt hơn là mọi người cùng hợp tác.",
        ],
      },
      {
        type: "grammar",
        title: "无论...都... và 之所以...是因为...",
        explanation:
          "无论...都...: Dù điều kiện thế nào, kết quả vẫn vậy.\n之所以...是因为...: Giải thích lý do/nguyên nhân của sự việc đã xảy ra.",
        examples: [
          "无论如何，我们都要坚持到底。— Dù thế nào, chúng ta cũng phải kiên trì đến cùng.",
          "之所以成功，是因为从不放弃。— Sở dĩ thành công là vì không bao giờ từ bỏ.",
        ],
      },
      {
        type: "text",
        content:
          "Lưu ý: Các cấu trúc HSK 4 thường xuất hiện trong văn viết và hội thoại chính thức. Luyện tập bằng cách đọc báo (报纸), tạp chí (杂志) và xem tin tức (新闻) bằng tiếng Trung.",
      },
    ],
    vocabularyKeys: [
      "不仅", "与其", "即使", "无论", "之所以", "改变", "提高", "降低", "增加", "减少", "复杂", "必要",
    ],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 4,
        question: {
          text: "学汉语不仅能帮你找工作，___能让你了解中国文化。Chọn từ đúng:",
          options: ["但是", "虽然", "而且", "即使"],
        },
        answer: { correct: 2 },
        explanation: "不仅...而且... là cặp cố định. Vế sau 不仅 phải là 而且, không phải 但是 hay 虽然.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 4,
        question: {
          text: "___遇到再大的困难，我___不会放弃自己的梦想。",
          hint: "Điền vào hai chỗ trống: Dù cho...vẫn...",
        },
        answer: { correct: "即使...也" },
        explanation: "即使...也... = Dù cho...vẫn... Nhấn mạnh kết quả không thay đổi dù điều kiện có cực đoan đến đâu.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 4,
        question: {
          text: "___抱怨问题，不如积极去解决它。Cấu trúc nào phù hợp?",
          options: ["虽然", "即使", "与其", "不仅"],
        },
        answer: { correct: 2 },
        explanation: "与其...不如... = Thay vì...tốt hơn... Câu này nghĩa: Thay vì than thở về vấn đề, tốt hơn là tích cực đi giải quyết.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 4,
        question: {
          text: "___面对什么样的挑战，只要我们团结，___能找到解决方法。",
          options: ["虽然...但是", "不仅...而且", "无论...都", "即使...也"],
        },
        answer: { correct: 2 },
        explanation: "无论...都... = Dù thế nào...vẫn... Câu này nghĩa: Dù đối mặt với thách thức gì, miễn đoàn kết vẫn tìm ra cách giải quyết.",
      },
      {
        type: "FILL_BLANK",
        order: 5,
        difficulty: 4,
        question: {
          text: "___选择这个专业，是因为我对它充满热爱。",
          hint: "Sở dĩ...là vì...",
        },
        answer: { correct: "之所以" },
        explanation: "之所以...是因为... = Sở dĩ...là vì... Giải thích nguyên nhân của sự việc đã xảy ra.",
      },
      {
        type: "MATCHING",
        order: 6,
        difficulty: 4,
        question: {
          pairs: [
            { left: "不仅...而且", right: "Không chỉ...mà còn" },
            { left: "即使...也", right: "Dù cho...vẫn" },
            { left: "与其...不如", right: "Thay vì...tốt hơn" },
            { left: "无论...都", right: "Dù thế nào...vẫn" },
            { left: "之所以...是因为", right: "Sở dĩ...là vì" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Năm cấu trúc ngữ pháp phức hợp quan trọng nhất ở HSK 4.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 4,
        question: {
          text: "Câu nào dùng đúng cấu trúc 不仅...而且...?",
          options: [
            "不仅天气不好，而且我不去。",
            "他不仅学习好，而且体育也很棒。",
            "不仅我喜欢，而且也不行。",
            "我不仅，而且学习很努力。",
          ],
        },
        answer: { correct: 1 },
        explanation: "不仅...而且... cần hai vế có nội dung tích cực bổ sung nhau. 他不仅学习好，而且体育也很棒 = Anh ấy không chỉ học giỏi mà thể thao cũng rất tốt.",
      },
    ],
  },
];
