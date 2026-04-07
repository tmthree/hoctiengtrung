// HSK 3 Expanded Lessons — 5 new lessons
// Topics: Office, Doctor, Nature/Environment, Social Interactions, Advanced Connectors

import type { LessonData } from "./lessons";

export const lessonsHsk3Expanded: LessonData[] = [
  // ─── LESSON 1: Trong văn phòng ───────────────────────────────
  {
    title: "Trong văn phòng",
    description: "Học từ vựng và cách diễn đạt trong môi trường văn phòng và công sở",
    hskLevel: 3,
    type: "CONVERSATION",
    order: 16,
    content: [
      {
        type: "text",
        content:
          "Môi trường làm việc văn phòng đòi hỏi bạn biết nhiều từ vựng chuyên biệt. Trong bài này, bạn sẽ học cách nói về cuộc họp, báo cáo, đồng nghiệp và các tình huống thường gặp ở công sở.",
      },
      { type: "vocabulary", simplified: "会议", pinyin: "huìyì", meaning: "cuộc họp" },
      { type: "vocabulary", simplified: "报告", pinyin: "bàogào", meaning: "báo cáo" },
      { type: "vocabulary", simplified: "同事", pinyin: "tóngshì", meaning: "đồng nghiệp" },
      { type: "vocabulary", simplified: "老板", pinyin: "lǎobǎn", meaning: "ông chủ, sếp" },
      {
        type: "grammar",
        title: "Diễn đạt trong cuộc họp",
        explanation:
          "Một số câu thường dùng trong cuộc họp và môi trường văn phòng.",
        examples: [
          "我需要参加会议。— Tôi cần tham dự cuộc họp.",
          "请准备好工作报告。— Hãy chuẩn bị báo cáo công việc.",
          "我和同事们的关系很好。— Tôi có quan hệ tốt với các đồng nghiệp.",
          "老板要求我们加班。— Sếp yêu cầu chúng tôi làm thêm giờ.",
        ],
      },
      { type: "vocabulary", simplified: "加班", pinyin: "jiābān", meaning: "làm thêm giờ" },
      { type: "vocabulary", simplified: "工资", pinyin: "gōngzī", meaning: "lương" },
      { type: "vocabulary", simplified: "面试", pinyin: "miànshì", meaning: "phỏng vấn" },
      {
        type: "grammar",
        title: "Hỏi và trả lời về công việc",
        explanation: "Cách hỏi về công việc, lương và môi trường làm việc.",
        examples: [
          "你的工资怎么样？— Lương của bạn thế nào?",
          "明天有面试，你准备好了吗？— Ngày mai có phỏng vấn, bạn đã chuẩn bị chưa?",
          "签合同之前要仔细看清楚。— Trước khi ký hợp đồng phải xem kỹ.",
        ],
      },
    ],
    vocabularyKeys: ["会议", "报告", "加班", "工资", "同事", "老板", "办公室", "简历", "面试", "合同"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "会议 (huìyì) có nghĩa là gì?",
          options: ["Văn phòng", "Cuộc họp", "Đồng nghiệp", "Hợp đồng"],
        },
        answer: { correct: 1 },
        explanation: "会议 (huìyì) = cuộc họp. 会 = hội họp, 议 = bàn luận.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 2,
        difficulty: 2,
        question: {
          text: "Câu nào đúng khi nói về việc làm thêm giờ?",
          options: [
            "我今天有面试。",
            "我每天都要加班到很晚。",
            "我的工资不太高。",
            "我和老板关系不错。",
          ],
        },
        answer: { correct: 1 },
        explanation: "加班 (jiābān) = làm thêm giờ. 我每天都要加班到很晚 = Mỗi ngày tôi đều phải tăng ca đến rất khuya.",
      },
      {
        type: "FILL_BLANK",
        order: 3,
        difficulty: 2,
        question: {
          text: "请把你的___发给我，我帮你看看。(Hãy gửi CV của bạn cho tôi, tôi giúp bạn xem.)",
          hint: "Tài liệu giới thiệu bản thân khi xin việc",
        },
        answer: { correct: "简历" },
        explanation: "简历 (jiǎnlì) = CV, sơ yếu lý lịch. Đây là tài liệu quan trọng khi xin việc.",
      },
      {
        type: "TONE",
        order: 4,
        difficulty: 2,
        question: {
          character: "资",
          options: ["zī", "zí", "zǐ", "zì"],
        },
        answer: { correct: 0 },
        explanation: "工资 (gōngzī) — 资 đọc thanh thứ nhất (bằng phẳng cao). Nghĩa: tiền lương.",
      },
      {
        type: "MATCHING",
        order: 5,
        difficulty: 2,
        question: {
          pairs: [
            { left: "会议", right: "Cuộc họp" },
            { left: "加班", right: "Làm thêm giờ" },
            { left: "同事", right: "Đồng nghiệp" },
            { left: "合同", right: "Hợp đồng" },
            { left: "面试", right: "Phỏng vấn" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Các từ vựng quan trọng trong môi trường văn phòng.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 6,
        difficulty: 3,
        question: {
          text: "签___之前，一定要仔细阅读每一条款。",
          options: ["简历", "工资", "合同", "报告"],
        },
        answer: { correct: 2 },
        explanation: "签合同 (qiān hétóng) = ký hợp đồng. Trước khi ký hợp đồng phải đọc kỹ từng điều khoản.",
      },
      {
        type: "FILL_BLANK",
        order: 7,
        difficulty: 3,
        question: {
          text: "今天下午三点有一个重要的___，请大家准时参加。",
          hint: "Cuộc họp",
        },
        answer: { correct: "会议" },
        explanation: "会议 = cuộc họp. Câu này nghĩa: Chiều nay lúc ba giờ có cuộc họp quan trọng, xin mọi người đến đúng giờ.",
      },
    ],
  },

  // ─── LESSON 2: Khám bệnh ─────────────────────────────────────
  {
    title: "Khám bệnh",
    description: "Học cách mô tả triệu chứng bệnh và giao tiếp với bác sĩ bằng tiếng Trung",
    hskLevel: 3,
    type: "CONVERSATION",
    order: 17,
    content: [
      {
        type: "text",
        content:
          "Khi bị bệnh ở nước ngoài, bạn cần biết cách mô tả triệu chứng và giao tiếp với bác sĩ. Đây là những từ vựng và câu nói thiết yếu khi đến bệnh viện.",
      },
      { type: "vocabulary", simplified: "感冒", pinyin: "gǎnmào", meaning: "cảm cúm" },
      { type: "vocabulary", simplified: "发烧", pinyin: "fāshāo", meaning: "sốt" },
      { type: "vocabulary", simplified: "头疼", pinyin: "tóuténg", meaning: "đau đầu" },
      { type: "vocabulary", simplified: "肚子疼", pinyin: "dùzi téng", meaning: "đau bụng" },
      {
        type: "grammar",
        title: "Mô tả triệu chứng bệnh",
        explanation:
          "Cấu trúc: [Bộ phận cơ thể] + 疼/痛 (đau). Hoặc dùng trực tiếp: 我感冒了 / 我发烧了.",
        examples: [
          "我感冒了，头很疼。— Tôi bị cảm, đầu rất đau.",
          "我发烧了，体温三十八度。— Tôi bị sốt, nhiệt độ 38 độ.",
          "我肚子疼，吃不下饭。— Tôi đau bụng, không ăn được.",
          "我咳嗽了好几天了。— Tôi bị ho đã mấy ngày rồi.",
        ],
      },
      { type: "vocabulary", simplified: "药", pinyin: "yào", meaning: "thuốc" },
      { type: "vocabulary", simplified: "检查", pinyin: "jiǎnchá", meaning: "kiểm tra, khám" },
      { type: "vocabulary", simplified: "休息", pinyin: "xiūxi", meaning: "nghỉ ngơi" },
      {
        type: "grammar",
        title: "Hội thoại với bác sĩ",
        explanation: "Các câu quan trọng khi gặp bác sĩ hoặc tại bệnh viện.",
        examples: [
          "医生，我哪里不舒服应该怎么办？— Bác sĩ, tôi không khỏe phải làm thế nào?",
          "请你检查一下。— Nhờ bác sĩ kiểm tra giúp.",
          "这个药怎么吃？— Thuốc này uống như thế nào?",
          "需要休息几天？— Cần nghỉ mấy ngày?",
        ],
      },
    ],
    vocabularyKeys: ["感冒", "发烧", "咳嗽", "头疼", "肚子疼", "药", "打针", "检查", "休息", "恢复"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "发烧 (fāshāo) có nghĩa là gì?",
          options: ["Đau đầu", "Ho", "Sốt", "Đau bụng"],
        },
        answer: { correct: 2 },
        explanation: "发烧 (fāshāo) = sốt. 发 = phát sinh, 烧 = nóng bỏng.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 2,
        question: {
          text: "我___了，头很疼，浑身无力。(Tôi bị cảm cúm, đầu rất đau, toàn thân mệt mỏi.)",
          hint: "Bệnh thường gặp khi thời tiết thay đổi",
        },
        answer: { correct: "感冒" },
        explanation: "感冒 (gǎnmào) = cảm cúm. Đây là bệnh thường gặp khi thời tiết thay đổi.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 2,
        question: {
          text: "Khi muốn nói 'Tôi đau đầu', chọn câu nào?",
          options: ["我肚子疼。", "我头疼。", "我咳嗽。", "我发烧。"],
        },
        answer: { correct: 1 },
        explanation: "头疼 (tóuténg) = đau đầu. 头 = đầu, 疼 = đau.",
      },
      {
        type: "TONE",
        order: 4,
        difficulty: 2,
        question: {
          character: "药",
          options: ["yāo", "yáo", "yǎo", "yào"],
        },
        answer: { correct: 3 },
        explanation: "药 (yào) đọc thanh thứ tư (giảm nhanh). Nghĩa: thuốc.",
      },
      {
        type: "MATCHING",
        order: 5,
        difficulty: 2,
        question: {
          pairs: [
            { left: "感冒", right: "Cảm cúm" },
            { left: "发烧", right: "Sốt" },
            { left: "咳嗽", right: "Ho" },
            { left: "检查", right: "Kiểm tra" },
            { left: "恢复", right: "Hồi phục" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Các từ vựng quan trọng liên quan đến sức khỏe và khám bệnh.",
      },
      {
        type: "FILL_BLANK",
        order: 6,
        difficulty: 3,
        question: {
          text: "生病的时候，最重要的是好好___，不要太劳累。(Khi bệnh, quan trọng nhất là nghỉ ngơi tốt.)",
          hint: "Nghỉ ngơi",
        },
        answer: { correct: "休息" },
        explanation: "休息 (xiūxi) = nghỉ ngơi. Khi bị bệnh cần nghỉ ngơi đầy đủ để phục hồi.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 3,
        question: {
          text: "经过两周的治疗，他的身体终于___了。",
          options: ["感冒", "发烧", "恢复", "检查"],
        },
        answer: { correct: 2 },
        explanation: "恢复 (huīfù) = hồi phục. Câu này nghĩa: Sau hai tuần điều trị, sức khỏe của anh ấy cuối cùng đã hồi phục.",
      },
    ],
  },

  // ─── LESSON 3: Thiên nhiên và môi trường ─────────────────────
  {
    title: "Thiên nhiên và môi trường",
    description: "Học từ vựng về thiên nhiên, cảnh quan và tầm quan trọng của việc bảo vệ môi trường",
    hskLevel: 3,
    type: "READING",
    order: 18,
    content: [
      {
        type: "text",
        content:
          "Thiên nhiên Trung Quốc rất đa dạng và phong phú, từ núi non hùng vĩ đến biển cả bao la. Trong bài này, chúng ta sẽ học từ vựng về thiên nhiên và thảo luận về tầm quan trọng của việc bảo vệ môi trường.",
      },
      { type: "vocabulary", simplified: "山", pinyin: "shān", meaning: "núi" },
      { type: "vocabulary", simplified: "河", pinyin: "hé", meaning: "sông" },
      { type: "vocabulary", simplified: "海", pinyin: "hǎi", meaning: "biển" },
      { type: "vocabulary", simplified: "空气", pinyin: "kōngqì", meaning: "không khí" },
      {
        type: "grammar",
        title: "Mô tả thiên nhiên",
        explanation:
          "Dùng 又...又... (vừa...vừa...) để mô tả hai đặc điểm cùng lúc. Dùng 比 để so sánh.",
        examples: [
          "这座山又高又美。— Ngọn núi này vừa cao vừa đẹp.",
          "农村的空气比城市新鲜多了。— Không khí nông thôn trong lành hơn thành phố nhiều.",
          "夏天去海边游泳很舒服。— Mùa hè đến biển bơi rất dễ chịu.",
          "保护环境是每个人的责任。— Bảo vệ môi trường là trách nhiệm của mỗi người.",
        ],
      },
      { type: "vocabulary", simplified: "天空", pinyin: "tiānkōng", meaning: "bầu trời" },
      { type: "vocabulary", simplified: "星星", pinyin: "xīngxing", meaning: "ngôi sao" },
      { type: "vocabulary", simplified: "月亮", pinyin: "yuèliang", meaning: "mặt trăng" },
      {
        type: "text",
        content:
          "Bảo vệ môi trường (保护环境) đang trở thành vấn đề cấp thiết. Ô nhiễm không khí (空气污染) ở các thành phố lớn của Trung Quốc là thách thức lớn. Mỗi người cần có ý thức bảo vệ thiên nhiên.",
      },
    ],
    vocabularyKeys: ["山", "河", "海", "树", "花", "草", "空气", "环境", "天空", "星星", "月亮"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "空气 (kōngqì) có nghĩa là gì?",
          options: ["Bầu trời", "Không khí", "Thời tiết", "Gió"],
        },
        answer: { correct: 1 },
        explanation: "空气 (kōngqì) = không khí. 空 = không gian, rỗng; 气 = khí, hơi.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 2,
        question: {
          text: "中秋节的晚上，___又圆又亮，全家人坐在一起赏月。",
          hint: "Thiên thể phát sáng vào ban đêm",
        },
        answer: { correct: "月亮" },
        explanation: "月亮 (yuèliang) = mặt trăng. Tết Trung Thu ngắm trăng tròn là phong tục truyền thống.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 2,
        question: {
          text: "Câu nào mô tả đúng về không khí nông thôn?",
          options: [
            "农村的空气比城市差。",
            "农村的空气和城市一样。",
            "农村的空气比城市新鲜多了。",
            "城市的空气比农村好。",
          ],
        },
        answer: { correct: 2 },
        explanation: "Không khí nông thôn (农村的空气) thường trong lành hơn thành phố. 新鲜 = tươi mát, trong lành.",
      },
      {
        type: "PINYIN",
        order: 4,
        difficulty: 2,
        question: {
          character: "星星",
          hint: "các vật sáng trên bầu trời ban đêm",
        },
        answer: { correct: "xīngxing" },
        explanation: "星星 (xīngxing) — từ láy, âm tiết thứ hai đọc nhẹ. Nghĩa: ngôi sao.",
      },
      {
        type: "MATCHING",
        order: 5,
        difficulty: 2,
        question: {
          pairs: [
            { left: "山", right: "Núi" },
            { left: "河", right: "Sông" },
            { left: "海", right: "Biển" },
            { left: "树", right: "Cây" },
            { left: "草", right: "Cỏ" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Từ vựng về các yếu tố thiên nhiên cơ bản.",
      },
      {
        type: "FILL_BLANK",
        order: 6,
        difficulty: 3,
        question: {
          text: "保护___是每个人的责任，我们应该减少污染。",
          hint: "Môi trường sống xung quanh chúng ta",
        },
        answer: { correct: "环境" },
        explanation: "环境 (huánjìng) = môi trường. Bảo vệ môi trường là trách nhiệm của mỗi người.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 3,
        question: {
          text: "在农村的晚上，天空中有很多___，比城市里看到的多得多。",
          options: ["月亮", "太阳", "星星", "云彩"],
        },
        answer: { correct: 2 },
        explanation: "星星 (xīngxing) = ngôi sao. Ở nông thôn nhìn thấy nhiều sao hơn thành phố vì ít ô nhiễm ánh sáng.",
      },
    ],
  },

  // ─── LESSON 4: Giao tiếp xã hội ─────────────────────────────
  {
    title: "Giao tiếp xã hội",
    description: "Học cách mời, từ chối, xin lỗi và tha thứ trong các tình huống xã hội bằng tiếng Trung",
    hskLevel: 3,
    type: "CONVERSATION",
    order: 19,
    content: [
      {
        type: "text",
        content:
          "Giao tiếp xã hội là kỹ năng quan trọng trong cuộc sống hàng ngày. Biết cách mời người khác, từ chối lịch sự, xin lỗi và tha thứ sẽ giúp bạn xây dựng mối quan hệ tốt đẹp.",
      },
      { type: "vocabulary", simplified: "邀请", pinyin: "yāoqǐng", meaning: "mời, lời mời" },
      { type: "vocabulary", simplified: "拒绝", pinyin: "jùjué", meaning: "từ chối" },
      {
        type: "grammar",
        title: "Cách mời và từ chối lịch sự",
        explanation:
          "Khi mời ai đó, dùng: 我想邀请你... / 你有空吗？. Khi từ chối lịch sự, dùng: 不好意思，我... / 很抱歉，我...",
        examples: [
          "我想邀请你来参加我的生日晚会。— Tôi muốn mời bạn đến dự tiệc sinh nhật của tôi.",
          "很抱歉，我那天有其他安排。— Rất tiếc, hôm đó tôi có việc khác.",
          "下次有机会一定来。— Có dịp khác nhất định sẽ đến.",
        ],
      },
      { type: "vocabulary", simplified: "道歉", pinyin: "dàoqiàn", meaning: "xin lỗi, tạ lỗi" },
      { type: "vocabulary", simplified: "原谅", pinyin: "yuánliàng", meaning: "tha thứ" },
      { type: "vocabulary", simplified: "误会", pinyin: "wùhuì", meaning: "hiểu lầm" },
      { type: "vocabulary", simplified: "尊重", pinyin: "zūnzhòng", meaning: "tôn trọng" },
      {
        type: "grammar",
        title: "Xin lỗi và tha thứ",
        explanation:
          "Xin lỗi có nhiều mức độ: 不好意思 (không hay lắm, xin lỗi nhẹ) → 对不起 (xin lỗi) → 我非常抱歉 (tôi vô cùng xin lỗi). Khi tha thứ: 没关系 / 我原谅你了.",
        examples: [
          "我非常抱歉，这完全是我的错。— Tôi vô cùng xin lỗi, đây hoàn toàn là lỗi của tôi.",
          "这只是个误会，没关系。— Đây chỉ là hiểu lầm, không sao.",
          "我决定原谅你，我们重归于好吧。— Tôi quyết định tha thứ cho bạn, hãy làm hòa nhé.",
        ],
      },
    ],
    vocabularyKeys: ["邀请", "拒绝", "约会", "聚会", "道歉", "原谅", "误会", "关系", "尊重"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "邀请 (yāoqǐng) có nghĩa là gì?",
          options: ["Từ chối", "Mời", "Xin lỗi", "Tha thứ"],
        },
        answer: { correct: 1 },
        explanation: "邀请 (yāoqǐng) = mời, lời mời. 邀 = mời, 请 = mời/làm ơn.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 2,
        question: {
          text: "我很抱歉，因为有其他安排，不得不___你的邀请。(Rất tiếc, vì có việc khác, đành phải từ chối lời mời của bạn.)",
          hint: "Không chấp nhận",
        },
        answer: { correct: "拒绝" },
        explanation: "拒绝 (jùjué) = từ chối. Khi từ chối cần lịch sự và giải thích lý do.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 2,
        question: {
          text: "Khi muốn tha thứ cho ai đó, dùng câu nào?",
          options: [
            "我非常抱歉。",
            "这是你的错。",
            "我决定原谅你。",
            "我不想见你。",
          ],
        },
        answer: { correct: 2 },
        explanation: "原谅 (yuánliàng) = tha thứ. 我决定原谅你 = Tôi quyết định tha thứ cho bạn.",
      },
      {
        type: "TONE",
        order: 4,
        difficulty: 3,
        question: {
          character: "谅",
          options: ["liāng", "liáng", "liǎng", "liàng"],
        },
        answer: { correct: 3 },
        explanation: "原谅 (yuánliàng) — 谅 đọc thanh thứ tư. Nghĩa: tha thứ, thông cảm.",
      },
      {
        type: "MATCHING",
        order: 5,
        difficulty: 2,
        question: {
          pairs: [
            { left: "邀请", right: "Mời" },
            { left: "拒绝", right: "Từ chối" },
            { left: "道歉", right: "Xin lỗi" },
            { left: "原谅", right: "Tha thứ" },
            { left: "误会", right: "Hiểu lầm" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Các từ vựng quan trọng trong giao tiếp xã hội và xây dựng mối quan hệ.",
      },
      {
        type: "FILL_BLANK",
        order: 6,
        difficulty: 3,
        question: {
          text: "我们之间只是个___，解释清楚之后，大家都放心了。",
          hint: "Sự không hiểu đúng",
        },
        answer: { correct: "误会" },
        explanation: "误会 (wùhuì) = hiểu lầm. Sau khi giải thích rõ ràng mọi hiểu lầm đều được giải quyết.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 3,
        question: {
          text: "在多元文化社会里，互相___彼此的文化和习惯非常重要。",
          options: ["误会", "拒绝", "尊重", "道歉"],
        },
        answer: { correct: 2 },
        explanation: "尊重 (zūnzhòng) = tôn trọng. Tôn trọng lẫn nhau là nền tảng của mối quan hệ xã hội tốt đẹp.",
      },
    ],
  },

  // ─── LESSON 5: Liên từ nâng cao ──────────────────────────────
  {
    title: "Liên từ nâng cao",
    description: "Học các mẫu liên từ phức tạp để diễn đạt ý tưởng phức tạp hơn bằng tiếng Trung",
    hskLevel: 3,
    type: "GRAMMAR",
    order: 20,
    content: [
      {
        type: "text",
        content:
          "Liên từ (连词) giúp kết nối các câu và ý tưởng, làm cho bài nói và bài viết trở nên mạch lạc hơn. Ở trình độ HSK 3, bạn cần nắm vững các cặp liên từ thường dùng.",
      },
      {
        type: "grammar",
        title: "不管...都... (Dù...vẫn...)",
        explanation:
          "Cấu trúc: 不管 + [điều kiện], + [chủ ngữ] + 都 + [kết quả]. Diễn đạt: dù hoàn cảnh nào thì kết quả vẫn vậy.",
        examples: [
          "不管天气怎么样，我都会来。— Dù thời tiết thế nào, tôi vẫn sẽ đến.",
          "不管多难，他都不放弃。— Dù khó đến đâu, anh ấy vẫn không bỏ cuộc.",
        ],
      },
      {
        type: "grammar",
        title: "只要...就... (Chỉ cần...thì...)",
        explanation:
          "Cấu trúc: 只要 + [điều kiện], + [chủ ngữ] + 就 + [kết quả]. Diễn đạt: chỉ cần điều kiện A thì kết quả B sẽ xảy ra.",
        examples: [
          "只要努力，就会成功。— Chỉ cần cố gắng, sẽ thành công.",
          "只要你来，我就高兴。— Chỉ cần bạn đến, tôi đã vui rồi.",
        ],
      },
      {
        type: "grammar",
        title: "除了...以外 (Ngoài...ra)",
        explanation:
          "Cấu trúc: 除了 + [ngoại lệ] + 以外, + [chủ ngữ] + 还/都 + [động từ]. Hai nghĩa: 1) Trừ cái đó ra (phủ định), 2) Ngoài cái đó ra còn có (bổ sung).",
        examples: [
          "除了他以外，大家都来了。— Ngoại trừ anh ấy, mọi người đều đến.",
          "除了汉语，她还会说日语。— Ngoài tiếng Trung, cô ấy còn biết tiếng Nhật.",
        ],
      },
      {
        type: "grammar",
        title: "越来越... (Ngày càng...)",
        explanation:
          "Cấu trúc: 越来越 + [tính từ/động từ]. Diễn đạt sự thay đổi theo chiều hướng tăng dần theo thời gian.",
        examples: [
          "我的汉语越来越好了。— Tiếng Trung của tôi ngày càng tốt hơn.",
          "天气越来越冷了。— Thời tiết ngày càng lạnh hơn.",
          "他越来越忙了。— Anh ấy ngày càng bận hơn.",
        ],
      },
      {
        type: "grammar",
        title: "终于 / 突然 / 几乎 / 甚至 (Phó từ quan trọng)",
        explanation:
          "终于 (zhōngyú) = cuối cùng | 突然 (tūrán) = đột nhiên | 几乎 (jīhū) = hầu như | 甚至 (shènzhì) = thậm chí",
        examples: [
          "他终于通过了考试。— Anh ấy cuối cùng đã vượt qua kỳ thi.",
          "突然下雨了。— Đột nhiên trời mưa.",
          "他几乎每天都加班。— Anh ấy hầu như mỗi ngày đều tăng ca.",
          "她甚至比老师还厉害。— Cô ấy thậm chí còn giỏi hơn cả giáo viên.",
        ],
      },
    ],
    vocabularyKeys: ["不管", "除了", "终于", "突然", "几乎", "甚至", "尤其", "越来越"],
    exercises: [
      {
        type: "MULTIPLE_CHOICE",
        order: 1,
        difficulty: 2,
        question: {
          text: "不管天气怎么样，我___会去锻炼。Chọn từ đúng để điền vào chỗ trống:",
          options: ["也", "都", "还", "就"],
        },
        answer: { correct: 1 },
        explanation: "不管...都... là cặp cố định. 都 (dōu) = đều, vẫn — dùng trong kết cục của cấu trúc 不管.",
      },
      {
        type: "FILL_BLANK",
        order: 2,
        difficulty: 2,
        question: {
          text: "只要你努力，___会成功。",
          hint: "Từ dùng trong cặp 只要...___...",
        },
        answer: { correct: "就" },
        explanation: "只要...就... là cặp cố định. Nghĩa: Chỉ cần bạn cố gắng, sẽ thành công.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 3,
        difficulty: 2,
        question: {
          text: "___汉语以外，他还会说英语和法语。 Từ nào phù hợp?",
          options: ["不管", "只要", "除了", "虽然"],
        },
        answer: { correct: 2 },
        explanation: "除了...以外 = ngoài...ra. Câu này nghĩa: Ngoài tiếng Trung ra, anh ấy còn biết tiếng Anh và tiếng Pháp.",
      },
      {
        type: "FILL_BLANK",
        order: 4,
        difficulty: 3,
        question: {
          text: "他的汉语___越好了，现在说得很流利。(Tiếng Trung của anh ấy ngày càng tốt hơn.)",
          hint: "Cấu trúc diễn tả sự thay đổi tăng dần",
        },
        answer: { correct: "越来越" },
        explanation: "越来越 (yuè lái yuè) = ngày càng. Dùng trước tính từ hoặc động từ để diễn đạt sự thay đổi tăng dần.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 5,
        difficulty: 2,
        question: {
          text: "经过三年的努力，他___通过了HSK六级考试。",
          options: ["突然", "终于", "几乎", "甚至"],
        },
        answer: { correct: 1 },
        explanation: "终于 (zhōngyú) = cuối cùng, rốt cuộc — dùng khi nói về kết quả đạt được sau một quá trình dài.",
      },
      {
        type: "MATCHING",
        order: 6,
        difficulty: 3,
        question: {
          pairs: [
            { left: "不管...都", right: "Dù...vẫn" },
            { left: "只要...就", right: "Chỉ cần...thì" },
            { left: "除了...以外", right: "Ngoài...ra" },
            { left: "越来越", right: "Ngày càng" },
            { left: "终于", right: "Cuối cùng" },
          ],
        },
        answer: { pairs: [0, 1, 2, 3, 4] },
        explanation: "Các cấu trúc liên từ quan trọng ở HSK 3.",
      },
      {
        type: "MULTIPLE_CHOICE",
        order: 7,
        difficulty: 3,
        question: {
          text: "我们正在开会，___停电了，大家都很惊讶。 Từ nào phù hợp?",
          options: ["终于", "几乎", "突然", "甚至"],
        },
        answer: { correct: 2 },
        explanation: "突然 (tūrán) = đột nhiên, bất ngờ — dùng khi sự kiện xảy ra bất ngờ không báo trước.",
      },
    ],
  },
];
