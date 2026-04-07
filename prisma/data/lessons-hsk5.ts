// HSK 5 Lessons — 5 lessons (Advanced level)
// Topics: Research & Academia, Society & Law, Basic Psychology, Economics & Finance, Chinese Idioms

import type { LessonData } from "./lessons";

export const lessonsHsk5: LessonData[] = [
  // ─── LESSON 1: Nghiên cứu và học thuật ──────────────────────────
  {
    title: "Nghiên cứu và học thuật",
    description: "Học từ vựng học thuật và cách diễn đạt trong môi trường nghiên cứu, đại học chuyên nghiệp",
    hskLevel: 5,
    type: "READING",
    order: 26,
    content: [
      {
        type: "text",
        content:
          "Học thuật (学术 xuéshù) và nghiên cứu khoa học đòi hỏi vốn từ vựng đặc biệt và cách diễn đạt chính xác. Bài học này cung cấp các từ và cấu trúc cần thiết cho môi trường đại học và nghiên cứu.",
      },
      { type: "vocabulary", simplified: "研究", pinyin: "yánjiū", meaning: "nghiên cứu" },
      { type: "vocabulary", simplified: "调查", pinyin: "diàochá", meaning: "điều tra, khảo sát" },
      { type: "vocabulary", simplified: "分析", pinyin: "fēnxī", meaning: "phân tích" },
      { type: "vocabulary", simplified: "结论", pinyin: "jiélùn", meaning: "kết luận" },
      { type: "vocabulary", simplified: "理论", pinyin: "lǐlùn", meaning: "lý luận, lý thuyết" },
      {
        type: "grammar",
        title: "Cấu trúc học thuật: 通过...来... (Thông qua...để...)",
        explanation:
          "通过 (tōngguò) + [phương tiện/cách thức], 来 (lái) + [mục đích/kết quả]. Cấu trúc này thường dùng trong văn viết học thuật để mô tả phương pháp và mục tiêu.",
        examples: [
          "通过大量实验来验证假设。— Thông qua nhiều thí nghiệm để kiểm chứng giả thuyết.",
          "通过调查来了解实际情况。— Thông qua khảo sát để hiểu tình hình thực tế.",
          "通过数据分析来得出结论。— Thông qua phân tích dữ liệu để đưa ra kết luận.",
        ],
      },
      { type: "vocabulary", simplified: "实践", pinyin: "shíjiàn", meaning: "thực tiễn, thực hành" },
      { type: "vocabulary", simplified: "方法", pinyin: "fāngfǎ", meaning: "phương pháp" },
      { type: "vocabulary", simplified: "数据", pinyin: "shùjù", meaning: "dữ liệu" },
      { type: "vocabulary", simplified: "证明", pinyin: "zhèngmíng", meaning: "chứng minh" },
      { type: "vocabulary", simplified: "发现", pinyin: "fāxiàn", meaning: "phát hiện" },
      {
        type: "grammar",
        title: "Cấu trúc 在...的基础上 (Trên cơ sở...)",
        explanation:
          "在 (zài) + [cơ sở/nền tảng] + 的基础上 (de jīchǔ shàng) = Trên cơ sở... Dùng để nói rằng điều gì đó được xây dựng hoặc phát triển từ một nền tảng có sẵn.",
        examples: [
          "在前人研究的基础上，我们提出了新的理论。— Trên cơ sở nghiên cứu của người đi trước, chúng tôi đề xuất lý thuyết mới.",
          "在现有数据的基础上进行深入分析。— Trên cơ sở dữ liệu hiện có để tiến hành phân tích sâu.",
        ],
      },
      { type: "vocabulary", simplified: "观点", pinyin: "guāndiǎn", meaning: "quan điểm" },
      { type: "vocabulary", simplified: "评价", pinyin: "píngjià", meaning: "đánh giá" },
    ],
    vocabularyKeys: ["研究", "调查", "分析", "结论", "理论", "实践", "方法", "数据", "证明", "发现", "观点", "评价"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 4,
        question: {
          text: "结论 (jiélùn) có nghĩa là gì?",
          options: ["Luận điểm", "Kết luận", "Phân tích", "Lý thuyết"],
        },
        answer: { correct: 1 },
        explanation: "结论 (jiélùn) = kết luận. 结 = kết, 论 = luận. Đây là từ quan trọng trong học thuật, dùng để chỉ phán đoán cuối cùng sau khi phân tích.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 4,
        question: {
          text: "在没有充分证据的情况下，不能轻易得出最终的___。(Không có đủ bằng chứng thì không thể dễ dàng đưa ra kết luận cuối cùng.)",
          hint: "Phán đoán cuối cùng của một cuộc nghiên cứu",
        },
        answer: { correct: "结论" },
        explanation: "结论 (jiélùn) = kết luận. Trong học thuật, kết luận phải dựa trên bằng chứng đầy đủ.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 4,
        question: {
          text: "理论与___相结合才能真正掌握一门学问。(Lý thuyết kết hợp với...mới có thể thực sự nắm vững một môn học.)",
          options: ["数据", "实践", "结论", "评价"],
        },
        answer: { correct: 1 },
        explanation: "实践 (shíjiàn) = thực tiễn, thực hành. Câu này thể hiện nguyên tắc quan trọng: lý thuyết phải gắn với thực tiễn.",
      },
      {
        type: "MATCHING",
        order: 4,
        difficulty: 4,
        question: {
          text: "Nối từ tiếng Trung với nghĩa tiếng Việt:",
          pairs: [
            { left: "研究", right: "nghiên cứu" },
            { left: "数据", right: "dữ liệu" },
            { left: "方法", right: "phương pháp" },
            { left: "分析", right: "phân tích" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ học thuật cơ bản: 研究 (nghiên cứu), 数据 (dữ liệu), 方法 (phương pháp), 分析 (phân tích).",
      },
      {
        type: "FILL_BLANK",
        order: 5,
        difficulty: 5,
        question: {
          text: "科学家___了这种新药对癌症的治疗效果。(Nhà khoa học đã chứng minh hiệu quả điều trị ung thư của thuốc mới này.)",
          hint: "Dùng thực nghiệm để xác nhận điều gì đó là đúng",
        },
        answer: { correct: "证明" },
        explanation: "证明 (zhèngmíng) = chứng minh. Đây là từ quan trọng trong nghiên cứu khoa học: chứng minh bằng thực nghiệm.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 4,
        question: {
          text: "Câu nào dùng 通过...来... ĐÚNG nhất?",
          options: [
            "通过努力，来成功。",
            "通过大量实验来验证假设。",
            "通过学习，我来中国。",
            "通过来分析数据。",
          ],
        },
        answer: { correct: 1 },
        explanation: "通过大量实验来验证假设 = Thông qua nhiều thí nghiệm để kiểm chứng giả thuyết. Cấu trúc chuẩn: 通过 + phương tiện + 来 + mục đích.",
      },
      {
        type: "READING",
        order: 7,
        difficulty: 5,
        question: {
          text: "Đọc đoạn văn sau và trả lời câu hỏi:\n\n科学研究是人类认识世界、改造世界的重要手段。一个好的研究项目通常包括以下步骤：首先，明确研究问题；其次，收集相关数据；然后，进行系统分析；最后，得出有依据的结论。理论与实践的结合是科学研究成功的关键。\n\nQuy trình nghiên cứu khoa học gồm mấy bước?",
          options: ["2 bước", "3 bước", "4 bước", "5 bước"],
        },
        answer: { correct: 2 },
        explanation: "Đoạn văn nêu 4 bước: 1) Xác định vấn đề nghiên cứu, 2) Thu thập dữ liệu, 3) Phân tích có hệ thống, 4) Đưa ra kết luận có cơ sở.",
      },
    ],
  },

  // ─── LESSON 2: Xã hội và pháp luật ──────────────────────────
  {
    title: "Xã hội và pháp luật",
    description: "Học từ vựng về xã hội, chính phủ, pháp luật và quyền công dân",
    hskLevel: 5,
    type: "CONVERSATION",
    order: 27,
    content: [
      {
        type: "text",
        content:
          "Hiểu biết về xã hội (社会 shèhuì) và pháp luật (法律 fǎlǜ) rất quan trọng để tham gia vào các cuộc thảo luận về đời sống xã hội. Bài học này giới thiệu từ vựng cấp độ cao liên quan đến cấu trúc xã hội và hệ thống pháp lý.",
      },
      { type: "vocabulary", simplified: "社会", pinyin: "shèhuì", meaning: "xã hội" },
      { type: "vocabulary", simplified: "政府", pinyin: "zhèngfǔ", meaning: "chính phủ" },
      { type: "vocabulary", simplified: "法律", pinyin: "fǎlǜ", meaning: "pháp luật" },
      { type: "vocabulary", simplified: "制度", pinyin: "zhìdù", meaning: "chế độ, thể chế" },
      { type: "vocabulary", simplified: "规定", pinyin: "guīdìng", meaning: "quy định" },
      {
        type: "grammar",
        title: "Cấu trúc 有责任 + V (Có trách nhiệm...)",
        explanation:
          "有责任 (yǒu zérèn) + [động từ] = Có trách nhiệm làm gì. Dùng trong văn phong trang trọng để nói về nghĩa vụ của cá nhân hoặc tổ chức.",
        examples: [
          "政府有责任保护公民的合法权益。— Chính phủ có trách nhiệm bảo vệ quyền và lợi ích hợp pháp của công dân.",
          "每个公民都有责任遵守法律。— Mỗi công dân đều có trách nhiệm tuân thủ pháp luật.",
          "媒体有责任传播真实准确的信息。— Truyền thông có trách nhiệm truyền bá thông tin trung thực và chính xác.",
        ],
      },
      { type: "vocabulary", simplified: "公民", pinyin: "gōngmín", meaning: "công dân" },
      { type: "vocabulary", simplified: "民主", pinyin: "mínzhǔ", meaning: "dân chủ" },
      { type: "vocabulary", simplified: "文化", pinyin: "wénhuà", meaning: "văn hóa" },
      { type: "vocabulary", simplified: "传统", pinyin: "chuántǒng", meaning: "truyền thống" },
      { type: "vocabulary", simplified: "历史", pinyin: "lìshǐ", meaning: "lịch sử" },
      {
        type: "grammar",
        title: "Cấu trúc 法律面前人人平等 — Mọi người đều bình đẳng trước pháp luật",
        explanation:
          "Câu này là nguyên tắc pháp quyền cơ bản. Cấu trúc [địa điểm/hoàn cảnh] + 面前 (miànqián) = Trước [địa điểm/hoàn cảnh].",
        examples: [
          "法律面前人人平等。— Mọi người đều bình đẳng trước pháp luật.",
          "在事实面前，任何谎言都会被揭穿。— Trước sự thật, bất kỳ lời nói dối nào cũng sẽ bị vạch trần.",
          "在困难面前，他表现得非常勇敢。— Trước khó khăn, anh ấy tỏ ra rất dũng cảm.",
        ],
      },
      { type: "vocabulary", simplified: "现代", pinyin: "xiàndài", meaning: "hiện đại" },
    ],
    vocabularyKeys: ["社会", "政府", "法律", "制度", "规定", "公民", "民主", "文化", "传统", "历史", "现代"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 4,
        question: {
          text: "法律 (fǎlǜ) trong câu \"法律面前人人平等\" có nghĩa là gì?",
          options: ["Chính sách", "Pháp luật", "Quy định", "Chế độ"],
        },
        answer: { correct: 1 },
        explanation: "法律 (fǎlǜ) = pháp luật. 法 = pháp, 律 = luật. Đây là hệ thống các quy phạm pháp lý của một quốc gia.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 4,
        question: {
          text: "___制度的核心在于保障每个___的基本权利。(Cốt lõi của chế độ dân chủ là đảm bảo quyền cơ bản của mỗi công dân.)",
          hint: "Điền hai từ: chế độ chính trị và thành viên xã hội",
        },
        answer: { correct: "民主/公民" },
        explanation: "民主 (mínzhǔ) = dân chủ; 公民 (gōngmín) = công dân. Dân chủ và quyền công dân là hai khái niệm gắn liền nhau.",
      },
      {
        type: "MATCHING",
        order: 3,
        difficulty: 4,
        question: {
          text: "Nối từ với nghĩa:",
          pairs: [
            { left: "政府", right: "chính phủ" },
            { left: "传统", right: "truyền thống" },
            { left: "制度", right: "chế độ" },
            { left: "公民", right: "công dân" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ liên quan đến xã hội và nhà nước: 政府 (chính phủ), 传统 (truyền thống), 制度 (chế độ), 公民 (công dân).",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 4,
        question: {
          text: "Từ nào KHÔNG liên quan đến hệ thống pháp luật?",
          options: ["法律", "规定", "制度", "故事"],
        },
        answer: { correct: 3 },
        explanation: "故事 (gùshi) = câu chuyện — không liên quan đến pháp luật. Còn lại: 法律 (pháp luật), 规定 (quy định), 制度 (chế độ) đều thuộc phạm vi pháp lý.",
      },
      {
        type: "FILL_BLANK",
        order: 5,
        difficulty: 5,
        question: {
          text: "了解___不仅能让我们从前人的经验中汲取智慧，还能帮助我们更好地理解当下。(Hiểu lịch sử không chỉ cho phép chúng ta rút ra trí tuệ từ kinh nghiệm người đi trước...)",
          hint: "Môn học về quá khứ",
        },
        answer: { correct: "历史" },
        explanation: "历史 (lìshǐ) = lịch sử. Hiểu lịch sử giúp ta học hỏi từ quá khứ và định hướng tương lai.",
      },
      {
        type: "READING",
        order: 6,
        difficulty: 5,
        question: {
          text: "Đọc đoạn văn và trả lời:\n\n一个公平正义的社会应该为每个公民提供平等的发展机会。政府有责任制定并执行相关法律，以保护公民的合法权益。法律面前人人平等是现代法治社会的基本原则。\n\nTheo đoạn văn, chính phủ có trách nhiệm gì?",
          options: [
            "Quản lý kinh tế",
            "Xây dựng và thực thi pháp luật để bảo vệ quyền công dân",
            "Kiểm soát thông tin",
            "Phát triển văn hóa",
          ],
        },
        answer: { correct: 1 },
        explanation: "Đoạn văn nêu: 政府有责任制定并执行相关法律，以保护公民的合法权益 = Chính phủ có trách nhiệm xây dựng và thực thi pháp luật để bảo vệ quyền công dân.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 5,
        question: {
          text: "Câu nào dùng 有责任 ĐÚNG nhất?",
          options: [
            "我有责任很高兴。",
            "他有责任完成这项工作。",
            "政府有责任很多。",
            "学生有责任学习好。",
          ],
        },
        answer: { correct: 1 },
        explanation: "他有责任完成这项工作 = Anh ta có trách nhiệm hoàn thành công việc này. Cấu trúc: 有责任 + động từ nguyên thể (không có 很 hay 好 sau).",
      },
    ],
  },

  // ─── LESSON 3: Tâm lý học cơ bản ──────────────────────────
  {
    title: "Tâm lý học cơ bản",
    description: "Học từ vựng tâm lý học và cách diễn đạt các trạng thái tinh thần, hành vi con người",
    hskLevel: 5,
    type: "GRAMMAR",
    order: 28,
    content: [
      {
        type: "text",
        content:
          "Tâm lý học (心理学 xīnlǐxué) nghiên cứu hành vi và quá trình tinh thần của con người. Hiểu biết về tâm lý giúp chúng ta giao tiếp hiệu quả hơn và hiểu bản thân cũng như người khác.",
      },
      { type: "vocabulary", simplified: "心理", pinyin: "xīnlǐ", meaning: "tâm lý" },
      { type: "vocabulary", simplified: "压力", pinyin: "yālì", meaning: "áp lực" },
      { type: "vocabulary", simplified: "焦虑", pinyin: "jiāolǜ", meaning: "lo âu" },
      { type: "vocabulary", simplified: "自信", pinyin: "zìxìn", meaning: "tự tin" },
      { type: "vocabulary", simplified: "意志", pinyin: "yìzhì", meaning: "ý chí" },
      {
        type: "grammar",
        title: "Cấu trúc 不在于...而在于... (Không phải ở...mà ở...)",
        explanation:
          "不在于 (bù zàiyú) + [điều sai lầm], 而在于 (ér zàiyú) + [điều đúng đắn]. Dùng để phân biệt bản chất thực sự của điều gì đó.",
        examples: [
          "自信不在于外表，而在于内心。— Tự tin không phải ở ngoại hình, mà ở nội tâm.",
          "成功不在于天赋，而在于努力。— Thành công không phải ở thiên tư, mà ở nỗ lực.",
          "真正的智慧不在于知识的积累，而在于判断力。— Trí tuệ thực sự không ở sự tích lũy kiến thức, mà ở khả năng phán đoán.",
        ],
      },
      { type: "vocabulary", simplified: "态度", pinyin: "tàidu", meaning: "thái độ" },
      { type: "vocabulary", simplified: "习惯", pinyin: "xíguàn", meaning: "thói quen" },
      { type: "vocabulary", simplified: "性格", pinyin: "xìnggé", meaning: "tính cách" },
      { type: "vocabulary", simplified: "思维", pinyin: "sīwéi", meaning: "tư duy" },
      { type: "vocabulary", simplified: "逻辑", pinyin: "luójí", meaning: "logic, lô-gic" },
      {
        type: "grammar",
        title: "Cấu trúc 既...也... (Vừa...vừa...) — Diễn tả tác động kép",
        explanation:
          "既 (jì) + [điều kiện/yếu tố 1], 也 (yě) + [điều kiện/yếu tố 2]. Dùng để chỉ ra rằng một kết quả bị ảnh hưởng bởi cả hai yếu tố.",
        examples: [
          "一个人的性格既受遗传因素的影响，也受成长环境的塑造。— Tính cách vừa chịu ảnh hưởng di truyền, vừa được định hình bởi môi trường.",
          "学好外语既需要坚持，也需要找到正确的方法。— Học tốt ngoại ngữ vừa cần kiên trì, vừa cần tìm đúng phương pháp.",
        ],
      },
    ],
    vocabularyKeys: ["心理", "压力", "焦虑", "自信", "意志", "态度", "习惯", "性格", "思维", "逻辑"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 4,
        question: {
          text: "焦虑 (jiāolǜ) có nghĩa là gì?",
          options: ["Tức giận", "Lo âu", "Tự tin", "Buồn bã"],
        },
        answer: { correct: 1 },
        explanation: "焦虑 (jiāolǜ) = lo âu. 焦 = cháy, lo; 虑 = suy nghĩ, lo lắng. Đây là trạng thái tâm lý phổ biến trong xã hội hiện đại.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 4,
        question: {
          text: "坚强的___力是一个人能够克服重重困难、最终实现目标的关键因素。(Ý chí mạnh mẽ là yếu tố then chốt giúp vượt qua khó khăn.)",
          hint: "Sức mạnh tinh thần, quyết tâm",
        },
        answer: { correct: "意志" },
        explanation: "意志 (yìzhì) = ý chí. 意 = ý, 志 = chí. Ý chí mạnh mẽ là nền tảng của thành công.",
      },
      {
        type: "MATCHING",
        order: 3,
        difficulty: 4,
        question: {
          text: "Nối từ tâm lý học với nghĩa:",
          pairs: [
            { left: "压力", right: "áp lực" },
            { left: "自信", right: "tự tin" },
            { left: "习惯", right: "thói quen" },
            { left: "性格", right: "tính cách" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn từ tâm lý học cơ bản: 压力 (áp lực), 自信 (tự tin), 习惯 (thói quen), 性格 (tính cách).",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 4,
        question: {
          text: "Câu nào có nghĩa: \"Tư duy phản biện là phẩm chất cốt lõi\"?",
          options: [
            "批判性思维能力是每个人都应该培养的核心素养。",
            "思维是人类的基本能力。",
            "逻辑思维很重要。",
            "我们需要学习思考。",
          ],
        },
        answer: { correct: 0 },
        explanation: "批判性思维能力是每个人都应该培养的核心素养 = Năng lực tư duy phản biện là phẩm chất cốt lõi mà mỗi người nên trau dồi.",
      },
      {
        type: "FILL_BLANK",
        order: 5,
        difficulty: 5,
        question: {
          text: "积极的工作___不仅能提高工作效率，还能营造良好的团队氛围。(Thái độ làm việc tích cực không chỉ nâng cao hiệu quả...)",
          hint: "Cách tiếp cận hoặc quan điểm của bạn về điều gì",
        },
        answer: { correct: "态度" },
        explanation: "态度 (tàidu) = thái độ. Thái độ làm việc ảnh hưởng trực tiếp đến hiệu quả và môi trường làm việc.",
      },
      {
        type: "LISTENING",
        order: 6,
        difficulty: 4,
        question: {
          text: "看到下面这个汉字，选择正确的含义：\n\n逻辑",
          options: ["Tư duy", "Logic, lô-gic", "Phân tích", "Phán đoán"],
        },
        answer: { correct: 1 },
        explanation: "逻辑 (luójí) = logic. Đây là từ ngoại lai (phiên âm từ tiếng Anh \"logic\"). Logic là nền tảng của tư duy khoa học.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 5,
        question: {
          text: "Câu nào dùng 既...也... ĐÚNG nhất?",
          options: [
            "他既聪明，也很努力，所以成绩很好。",
            "既然下雨，也要出去。",
            "我既喜欢，也不喜欢。",
            "既高兴，也什么。",
          ],
        },
        answer: { correct: 0 },
        explanation: "他既聪明，也很努力，所以成绩很好 = Anh ấy vừa thông minh vừa chăm chỉ, nên thành tích rất tốt. Cấu trúc 既...也... đúng: hai tính chất song song.",
      },
    ],
  },

  // ─── LESSON 4: Kinh tế và tài chính ──────────────────────────
  {
    title: "Kinh tế và tài chính",
    description: "Học từ vựng kinh tế học và tài chính, thảo luận về thị trường, thương mại và chính sách kinh tế",
    hskLevel: 5,
    type: "BUSINESS",
    order: 29,
    content: [
      {
        type: "text",
        content:
          "Kinh tế (经济 jīngjì) và tài chính là lĩnh vực đòi hỏi vốn từ vựng chuyên ngành. Bài học này cung cấp các thuật ngữ kinh tế quan trọng cấp độ HSK 5.",
      },
      { type: "vocabulary", simplified: "经济", pinyin: "jīngjì", meaning: "kinh tế" },
      { type: "vocabulary", simplified: "贸易", pinyin: "màoyì", meaning: "thương mại, mậu dịch" },
      { type: "vocabulary", simplified: "进口", pinyin: "jìnkǒu", meaning: "nhập khẩu" },
      { type: "vocabulary", simplified: "出口", pinyin: "chūkǒu", meaning: "xuất khẩu" },
      { type: "vocabulary", simplified: "消费", pinyin: "xiāofèi", meaning: "tiêu dùng" },
      {
        type: "grammar",
        title: "Cấu trúc 有助于 (Có lợi cho, giúp ích cho)",
        explanation:
          "有助于 (yǒuzhù yú) + [kết quả tốt] = Có lợi cho / Góp phần vào. Dùng trong văn phong học thuật và kinh tế để nói rằng điều gì đó mang lại hiệu quả tích cực.",
        examples: [
          "自由贸易协定有助于消除贸易壁垒。— Hiệp định thương mại tự do giúp xóa bỏ các rào cản thương mại.",
          "增加投资有助于推动经济增长。— Tăng đầu tư giúp thúc đẩy tăng trưởng kinh tế.",
          "技术创新有助于提高生产效率。— Đổi mới công nghệ giúp nâng cao hiệu quả sản xuất.",
        ],
      },
      { type: "vocabulary", simplified: "收入", pinyin: "shōurù", meaning: "thu nhập" },
      { type: "vocabulary", simplified: "支出", pinyin: "zhīchū", meaning: "chi tiêu, chi phí" },
      { type: "vocabulary", simplified: "税收", pinyin: "shuìshōu", meaning: "thuế, thu thuế" },
      { type: "vocabulary", simplified: "货币", pinyin: "huòbì", meaning: "tiền tệ" },
      { type: "vocabulary", simplified: "通货膨胀", pinyin: "tōnghuò péngzhàng", meaning: "lạm phát" },
      {
        type: "grammar",
        title: "Cấu trúc 不仅...还... (Không chỉ...còn...)",
        explanation:
          "不仅 (bùjǐn) + [đặc điểm 1], 还 (hái) + [đặc điểm 2]. Dùng để nêu thêm một đặc điểm hoặc tác động bổ sung.",
        examples: [
          "通货膨胀不仅降低了货币购买力，还加重了低收入群体的负担。— Lạm phát không chỉ làm giảm sức mua tiền tệ, còn làm nặng thêm gánh nặng cho nhóm thu nhập thấp.",
          "扩大出口不仅能增加外汇收入，还能创造更多就业机会。— Mở rộng xuất khẩu không chỉ tăng thu nhập ngoại tệ, còn tạo ra nhiều cơ hội việc làm.",
        ],
      },
      { type: "vocabulary", simplified: "股票", pinyin: "gǔpiào", meaning: "cổ phiếu" },
      { type: "vocabulary", simplified: "银行", pinyin: "yínháng", meaning: "ngân hàng" },
    ],
    vocabularyKeys: ["经济", "贸易", "进口", "出口", "消费", "收入", "支出", "税收", "货币", "通货膨胀", "股票", "银行"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 4,
        question: {
          text: "通货膨胀 (tōnghuò péngzhàng) có nghĩa là gì?",
          options: ["Tăng trưởng kinh tế", "Lạm phát", "Tiền tệ", "Đầu tư"],
        },
        answer: { correct: 1 },
        explanation: "通货膨胀 (tōnghuò péngzhàng) = lạm phát. 通货 = tiền tệ trong lưu thông; 膨胀 = phồng lên, tăng vọt. Đây là hiện tượng giá cả tăng liên tục.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 4,
        question: {
          text: "扩大___是推动经济增长、增加就业机会的重要途径。(Mở rộng xuất khẩu là con đường quan trọng thúc đẩy tăng trưởng kinh tế.)",
          hint: "Bán hàng hóa ra nước ngoài",
        },
        answer: { correct: "出口" },
        explanation: "出口 (chūkǒu) = xuất khẩu. 出 = ra ngoài, 口 = cửa. Xuất khẩu giúp tăng nguồn thu ngoại tệ và thúc đẩy kinh tế.",
      },
      {
        type: "MATCHING",
        order: 3,
        difficulty: 4,
        question: {
          text: "Nối thuật ngữ kinh tế với nghĩa:",
          pairs: [
            { left: "贸易", right: "thương mại" },
            { left: "收入", right: "thu nhập" },
            { left: "税收", right: "thuế" },
            { left: "货币", right: "tiền tệ" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn thuật ngữ kinh tế quan trọng: 贸易 (thương mại), 收入 (thu nhập), 税收 (thuế), 货币 (tiền tệ).",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 4,
        difficulty: 4,
        question: {
          text: "Từ nào là TRÁI NGHĨA của 出口 (chūkǒu)?",
          options: ["贸易", "进口", "消费", "经济"],
        },
        answer: { correct: 1 },
        explanation: "进口 (jìnkǒu) = nhập khẩu — là từ trái nghĩa của 出口 (xuất khẩu). 进 = vào trong, đối lập với 出 = ra ngoài.",
      },
      {
        type: "FILL_BLANK",
        order: 5,
        difficulty: 5,
        question: {
          text: "合理规划家庭___，量入为出，是保持良好财务状况的基本原则。(Lập kế hoạch chi tiêu hợp lý là nguyên tắc cơ bản để duy trì tình hình tài chính tốt.)",
          hint: "Số tiền bỏ ra, tiêu dùng",
        },
        answer: { correct: "支出" },
        explanation: "支出 (zhīchū) = chi tiêu. 量入为出 (liàng rù wéi chū) = lượng sức mà chi — là thành ngữ chỉ việc chi tiêu dựa theo thu nhập.",
      },
      {
        type: "LISTENING",
        order: 6,
        difficulty: 4,
        question: {
          text: "Nhìn vào chữ này và chọn đúng nghĩa:\n\n股票",
          options: ["Ngân hàng", "Cổ phiếu", "Tiền tệ", "Đầu tư"],
        },
        answer: { correct: 1 },
        explanation: "股票 (gǔpiào) = cổ phiếu. 股 = cổ phần; 票 = phiếu, giấy. Cổ phiếu là chứng chỉ xác nhận quyền sở hữu một phần trong công ty.",
      },
      {
        type: "READING",
        order: 7,
        difficulty: 5,
        question: {
          text: "Đọc đoạn văn sau:\n\n税收是政府财政收入的主要来源，用于提供公共服务和基础设施建设。货币政策是中央银行调控经济运行的重要工具。持续的通货膨胀会降低货币购买力，对低收入群体影响较大。\n\nTheo đoạn văn, thuế được dùng để làm gì?",
          options: [
            "Trả lương cho nhân viên ngân hàng",
            "Cung cấp dịch vụ công cộng và xây dựng cơ sở hạ tầng",
            "Kiểm soát lạm phát",
            "Tăng lương cho người lao động",
          ],
        },
        answer: { correct: 1 },
        explanation: "Đoạn văn nêu rõ: 税收...用于提供公共服务和基础设施建设 = Thuế được dùng để cung cấp dịch vụ công cộng và xây dựng cơ sở hạ tầng.",
      },
    ],
  },

  // ─── LESSON 5: Thành ngữ Trung Quốc ──────────────────────────
  {
    title: "Thành ngữ Trung Quốc",
    description: "Học và hiểu các thành ngữ Trung Quốc (成语 chéngyǔ) phổ biến và cách dùng trong ngữ cảnh",
    hskLevel: 5,
    type: "CULTURE",
    order: 30,
    content: [
      {
        type: "text",
        content:
          "Thành ngữ (成语 chéngyǔ) là những cụm từ cố định, thường gồm 4 chữ, xuất phát từ các câu chuyện hoặc điển cố lịch sử. Nắm vững thành ngữ giúp tiếng Trung trở nên phong phú và địa đạo hơn.",
      },
      { type: "vocabulary", simplified: "一举两得", pinyin: "yī jǔ liǎng dé", meaning: "một công đôi việc" },
      { type: "vocabulary", simplified: "半途而废", pinyin: "bàntú ér fèi", meaning: "bỏ dở giữa chừng" },
      { type: "vocabulary", simplified: "百闻不如一见", pinyin: "bǎi wén bùrú yī jiàn", meaning: "trăm nghe không bằng một thấy" },
      {
        type: "grammar",
        title: "Cách dùng thành ngữ trong câu",
        explanation:
          "Thành ngữ (成语) thường được dùng như tính từ, phó từ hoặc động từ trong câu. Có thể dùng đứng một mình hoặc kết hợp với các từ khác.",
        examples: [
          "骑自行车上班，既省钱又健身，真是一举两得。— Đi làm bằng xe đạp vừa tiết kiệm tiền vừa tốt cho sức khỏe, thật sự là một công đôi việc.",
          "学习要持之以恒，不能半途而废。— Học tập phải kiên trì, không thể bỏ dở giữa chừng.",
          "去中国旅游前读了很多介绍，但百闻不如一见，真实的景色更美。— Trước khi du lịch Trung Quốc đã đọc nhiều giới thiệu, nhưng trăm nghe không bằng một thấy, cảnh thực còn đẹp hơn.",
        ],
      },
      { type: "vocabulary", simplified: "入乡随俗", pinyin: "rù xiāng suí sú", meaning: "nhập gia tùy tục" },
      { type: "vocabulary", simplified: "三思而后行", pinyin: "sān sī ér hòu xíng", meaning: "suy nghĩ kỹ trước khi hành động" },
      { type: "vocabulary", simplified: "自作自受", pinyin: "zì zuò zì shòu", meaning: "tự làm tự chịu" },
      { type: "vocabulary", simplified: "画蛇添足", pinyin: "huà shé tiān zú", meaning: "vẽ rắn thêm chân" },
      { type: "vocabulary", simplified: "对牛弹琴", pinyin: "duì niú tán qín", meaning: "đàn gảy tai trâu" },
      {
        type: "grammar",
        title: "Nguồn gốc thành ngữ",
        explanation:
          "Thành ngữ Trung Quốc thường có xuất xứ từ sách cổ điển, lịch sử và truyện ngụ ngôn. Hiểu xuất xứ giúp nhớ nghĩa và cách dùng dễ hơn.",
        examples: [
          "画蛇添足: Xuất từ chuyện người thi vẽ rắn, người thắng lại vẽ thêm chân — thừa và phản tác dụng.",
          "对牛弹琴: Bắt nguồn từ việc nhạc sĩ đàn cho bò nghe — thứ người ta không hiểu và không trân trọng.",
          "半途而废: 半途 = giữa đường, 废 = từ bỏ — bỏ công việc đang làm dở.",
        ],
      },
    ],
    vocabularyKeys: ["一举两得", "半途而废", "百闻不如一见", "入乡随俗", "三思而后行", "自作自受", "画蛇添足", "对牛弹琴"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 4,
        question: {
          text: "一举两得 (yī jǔ liǎng dé) có nghĩa là gì?",
          options: ["Thất bại hoàn toàn", "Một công đôi việc", "Bỏ dở giữa chừng", "Không có lựa chọn"],
        },
        answer: { correct: 1 },
        explanation: "一举两得 = Một hành động (一举) thu được hai lợi ích (两得). Nghĩa: một công đôi việc, một việc mà đạt được hai điều tốt.",
      },
      {
        type: "MATCHING",
        order: 2,
        difficulty: 4,
        question: {
          text: "Nối thành ngữ với nghĩa:",
          pairs: [
            { left: "半途而废", right: "bỏ dở giữa chừng" },
            { left: "入乡随俗", right: "nhập gia tùy tục" },
            { left: "自作自受", right: "tự làm tự chịu" },
            { left: "三思而后行", right: "suy nghĩ kỹ trước khi hành động" },
          ],
        },
        answer: { pairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        explanation: "Bốn thành ngữ phổ biến: 半途而废 (bỏ dở), 入乡随俗 (tùy tục), 自作自受 (tự chịu), 三思而后行 (cân nhắc kỹ).",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 4,
        question: {
          text: "Tình huống nào phù hợp nhất với thành ngữ \"对牛弹琴\"?",
          options: [
            "Giải thích toán cao cấp cho trẻ 3 tuổi",
            "Chơi đàn trong buổi hòa nhạc",
            "Học nhạc từ đầu",
            "Luyện đàn hàng ngày",
          ],
        },
        answer: { correct: 0 },
        explanation: "对牛弹琴 = đàn gảy tai trâu. Nghĩa bóng: nói chuyện với người không hiểu. Giải thích toán cao cấp cho trẻ 3 tuổi là điển hình nhất.",
      },
      {
        type: "FILL_BLANK",
        order: 4,
        difficulty: 4,
        question: {
          text: "这篇文章本来写得很好，你又添加了那些多余的说明，简直是___。(Bài viết này vốn đã tốt, bạn lại thêm những giải thích thừa, đúng là vẽ rắn thêm chân.)",
          hint: "Thành ngữ chỉ việc làm thừa, phản tác dụng",
        },
        answer: { correct: "画蛇添足" },
        explanation: "画蛇添足 = vẽ rắn thêm chân. Dùng khi ai đó làm thêm một việc không cần thiết, thậm chí phá hoại điều đã tốt.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 5,
        difficulty: 5,
        question: {
          text: "Thành ngữ nào phù hợp nhất với câu: \"Anh ta tự gây ra vấn đề cho bản thân, bây giờ tự gánh hậu quả\"?",
          options: ["一举两得", "自作自受", "百闻不如一见", "入乡随俗"],
        },
        answer: { correct: 1 },
        explanation: "自作自受 = tự làm tự chịu. 自作 = tự mình làm; 自受 = tự mình chịu. Dùng khi hậu quả do chính hành động của người đó gây ra.",
      },
      {
        type: "LISTENING",
        order: 6,
        difficulty: 4,
        question: {
          text: "Nhìn vào thành ngữ này và chọn nghĩa:\n\n百闻不如一见",
          options: ["Trăm nghe không bằng một thấy", "Một công đôi việc", "Nhập gia tùy tục", "Bỏ dở giữa chừng"],
        },
        answer: { correct: 0 },
        explanation: "百闻不如一见 = Trăm nghe (百闻) không bằng (不如) một thấy (一见). Kinh nghiệm trực tiếp quan trọng hơn nghe nói.",
      },
      {
        type: "FILL_BLANK",
        order: 7,
        difficulty: 5,
        question: {
          text: "在做重大决定之前，一定要___，不要因为一时冲动而后悔莫及。(Trước khi quyết định quan trọng, nhất định phải suy nghĩ kỹ.)",
          hint: "Thành ngữ có nghĩa: cân nhắc kỹ trước khi hành động",
        },
        answer: { correct: "三思而后行" },
        explanation: "三思而后行 = Suy nghĩ ba lần rồi mới hành động. Nhấn mạnh tầm quan trọng của việc cân nhắc kỹ trước khi quyết định.",
      },
    ],
  },
];
