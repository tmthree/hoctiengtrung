// Thematic seed — adds 10 real-life scenario lessons (cross-level topic collections)
// Additive: does NOT delete existing data — uses findOrCreate pattern
// Run with: npx tsx prisma/seed-thematic.ts

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { thematicLessons } from "./data/thematic-lessons";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set! Check .env.local");
  process.exit(1);
}
console.log("Connecting to:", dbUrl.substring(0, 40) + "...");

const adapter = new PrismaNeon({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

// ==================== VOCABULARY DATA ====================
// All new words used in thematic lessons, not yet in DB

const thematicVocabulary = [
  // ── Lesson 1: Gọi món tại nhà hàng (HSK 2) ──
  {
    simplified: "菜单",
    pinyin: "càidān",
    meaning: "thực đơn",
    exampleSentence: "请给我看一下菜单。",
    examplePinyin: "Qǐng gěi wǒ kàn yīxià càidān.",
    exampleMeaning: "Xin cho tôi xem thực đơn.",
    hskLevel: 2,
    category: "restaurant",
  },
  {
    simplified: "点菜",
    pinyin: "diǎn cài",
    meaning: "gọi món",
    exampleSentence: "服务员，我们可以点菜了。",
    examplePinyin: "Fúwùyuán, wǒmen kěyǐ diǎn cài le.",
    exampleMeaning: "Phục vụ ơi, chúng tôi có thể gọi món rồi.",
    hskLevel: 2,
    category: "restaurant",
  },
  {
    simplified: "服务员",
    pinyin: "fúwùyuán",
    meaning: "nhân viên phục vụ",
    exampleSentence: "服务员，请来一下！",
    examplePinyin: "Fúwùyuán, qǐng lái yīxià!",
    exampleMeaning: "Phục vụ ơi, xin đến đây!",
    hskLevel: 2,
    category: "restaurant",
  },
  {
    simplified: "买单",
    pinyin: "mǎidān",
    meaning: "tính tiền / thanh toán",
    exampleSentence: "服务员，买单！",
    examplePinyin: "Fúwùyuán, mǎidān!",
    exampleMeaning: "Phục vụ ơi, tính tiền!",
    hskLevel: 2,
    category: "restaurant",
  },
  {
    simplified: "辣",
    pinyin: "là",
    meaning: "cay",
    exampleSentence: "这道菜很辣，你能吃辣吗？",
    examplePinyin: "Zhè dào cài hěn là, nǐ néng chī là ma?",
    exampleMeaning: "Món này rất cay, bạn ăn được cay không?",
    hskLevel: 2,
    category: "food",
  },
  {
    simplified: "甜",
    pinyin: "tián",
    meaning: "ngọt",
    exampleSentence: "这个蛋糕很甜。",
    examplePinyin: "Zhège dàngāo hěn tián.",
    exampleMeaning: "Cái bánh này rất ngọt.",
    hskLevel: 2,
    category: "food",
  },
  {
    simplified: "酸",
    pinyin: "suān",
    meaning: "chua",
    exampleSentence: "柠檬很酸。",
    examplePinyin: "Níngméng hěn suān.",
    exampleMeaning: "Chanh rất chua.",
    hskLevel: 2,
    category: "food",
  },
  {
    simplified: "咸",
    pinyin: "xián",
    meaning: "mặn",
    exampleSentence: "这个汤太咸了。",
    examplePinyin: "Zhège tāng tài xián le.",
    exampleMeaning: "Món canh này quá mặn.",
    hskLevel: 2,
    category: "food",
  },
  {
    simplified: "清淡",
    pinyin: "qīngdàn",
    meaning: "nhạt / ít dầu mỡ",
    exampleSentence: "我喜欢吃清淡的食物。",
    examplePinyin: "Wǒ xǐhuān chī qīngdàn de shíwù.",
    exampleMeaning: "Tôi thích ăn đồ ăn nhạt.",
    hskLevel: 2,
    category: "food",
  },
  {
    simplified: "饱",
    pinyin: "bǎo",
    meaning: "no",
    exampleSentence: "我吃饱了，不想再吃了。",
    examplePinyin: "Wǒ chī bǎo le, bù xiǎng zài chī le.",
    exampleMeaning: "Tôi ăn no rồi, không muốn ăn thêm nữa.",
    hskLevel: 2,
    category: "food",
  },
  {
    simplified: "饿",
    pinyin: "è",
    meaning: "đói",
    exampleSentence: "我很饿，快去吃饭吧！",
    examplePinyin: "Wǒ hěn è, kuài qù chīfàn ba!",
    exampleMeaning: "Tôi rất đói, nhanh đi ăn cơm thôi!",
    hskLevel: 2,
    category: "food",
  },
  {
    simplified: "好吃",
    pinyin: "hǎochī",
    meaning: "ngon",
    exampleSentence: "这个菜真好吃！",
    examplePinyin: "Zhège cài zhēn hǎochī!",
    exampleMeaning: "Món này thật ngon!",
    hskLevel: 2,
    category: "food",
  },

  // ── Lesson 2: Ở sân bay (HSK 3) ──
  {
    simplified: "登机牌",
    pinyin: "dēngjīpái",
    meaning: "thẻ lên máy bay / boarding pass",
    exampleSentence: "请出示您的登机牌。",
    examplePinyin: "Qǐng chūshì nín de dēngjīpái.",
    exampleMeaning: "Xin xuất trình thẻ lên máy bay của bạn.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "安检",
    pinyin: "ānjiǎn",
    meaning: "kiểm tra an ninh",
    exampleSentence: "过安检的时候要把手机拿出来。",
    examplePinyin: "Guò ānjiǎn de shíhou yào bǎ shǒujī ná chūlái.",
    exampleMeaning: "Khi qua kiểm tra an ninh phải lấy điện thoại ra.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "登机口",
    pinyin: "dēngjīkǒu",
    meaning: "cổng lên máy bay / gate",
    exampleSentence: "您的登机口是B12。",
    examplePinyin: "Nín de dēngjīkǒu shì B12.",
    exampleMeaning: "Cổng lên máy bay của bạn là B12.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "起飞",
    pinyin: "qǐfēi",
    meaning: "cất cánh",
    exampleSentence: "飞机十点起飞，请提前到达。",
    examplePinyin: "Fēijī shí diǎn qǐfēi, qǐng tíqián dàodá.",
    exampleMeaning: "Máy bay cất cánh lúc 10 giờ, xin hãy đến sớm.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "降落",
    pinyin: "jiàngluo",
    meaning: "hạ cánh",
    exampleSentence: "飞机已经安全降落了。",
    examplePinyin: "Fēijī yǐjīng ānquán jiàngluo le.",
    exampleMeaning: "Máy bay đã hạ cánh an toàn.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "行李",
    pinyin: "xíngli",
    meaning: "hành lý",
    exampleSentence: "我的行李找不到了。",
    examplePinyin: "Wǒ de xíngli zhǎo bù dào le.",
    exampleMeaning: "Tôi không tìm được hành lý của mình.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "转机",
    pinyin: "zhuǎnjī",
    meaning: "đổi máy bay / quá cảnh",
    exampleSentence: "我需要在北京转机去上海。",
    examplePinyin: "Wǒ xūyào zài Běijīng zhuǎnjī qù Shànghǎi.",
    exampleMeaning: "Tôi cần quá cảnh ở Bắc Kinh để đến Thượng Hải.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "延误",
    pinyin: "yánwù",
    meaning: "chậm trễ / delay",
    exampleSentence: "航班延误了两个小时。",
    examplePinyin: "Hángbān yánwù le liǎng gè xiǎoshí.",
    exampleMeaning: "Chuyến bay bị delay hai tiếng.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "广播",
    pinyin: "guǎngbō",
    meaning: "thông báo / phát thanh",
    exampleSentence: "广播说飞机要开始登机了。",
    examplePinyin: "Guǎngbō shuō fēijī yào kāishǐ dēngjī le.",
    exampleMeaning: "Thông báo nói máy bay sắp bắt đầu lên.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "座位",
    pinyin: "zuòwèi",
    meaning: "chỗ ngồi / ghế",
    exampleSentence: "我的座位在靠窗的位置。",
    examplePinyin: "Wǒ de zuòwèi zài kào chuāng de wèizhi.",
    exampleMeaning: "Chỗ ngồi của tôi ở vị trí cạnh cửa sổ.",
    hskLevel: 3,
    category: "travel",
  },

  // ── Lesson 3: Nhận phòng khách sạn (HSK 2) ──
  {
    simplified: "预订",
    pinyin: "yùdìng",
    meaning: "đặt trước / đặt phòng",
    exampleSentence: "我提前预订了一间房间。",
    examplePinyin: "Wǒ tíqián yùdìng le yī jiān fángjiān.",
    exampleMeaning: "Tôi đã đặt phòng trước.",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "入住",
    pinyin: "rùzhù",
    meaning: "nhận phòng / check-in",
    exampleSentence: "入住时间是下午两点以后。",
    examplePinyin: "Rùzhù shíjiān shì xiàwǔ liǎng diǎn yǐhòu.",
    exampleMeaning: "Giờ nhận phòng là sau 2 giờ chiều.",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "退房",
    pinyin: "tuìfáng",
    meaning: "trả phòng / check-out",
    exampleSentence: "退房时间是中午十二点之前。",
    examplePinyin: "Tuìfáng shíjiān shì zhōngwǔ shí'èr diǎn zhīqián.",
    exampleMeaning: "Giờ trả phòng là trước 12 giờ trưa.",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "房间",
    pinyin: "fángjiān",
    meaning: "phòng",
    exampleSentence: "请问房间里有WiFi吗？",
    examplePinyin: "Qǐngwèn fángjiān lǐ yǒu WiFi ma?",
    exampleMeaning: "Xin hỏi trong phòng có WiFi không?",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "钥匙",
    pinyin: "yàoshi",
    meaning: "chìa khóa",
    exampleSentence: "我的房间钥匙丢了。",
    examplePinyin: "Wǒ de fángjiān yàoshi diū le.",
    exampleMeaning: "Chìa khóa phòng của tôi bị mất rồi.",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "空调",
    pinyin: "kōngtiáo",
    meaning: "máy lạnh / điều hòa",
    exampleSentence: "空调坏了，请派人来修一下。",
    examplePinyin: "Kōngtiáo huài le, qǐng pài rén lái xiū yīxià.",
    exampleMeaning: "Điều hòa hỏng rồi, xin cử người đến sửa.",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "热水",
    pinyin: "rèshuǐ",
    meaning: "nước nóng",
    exampleSentence: "房间里没有热水，怎么办？",
    examplePinyin: "Fángjiān lǐ méiyǒu rèshuǐ, zěnme bàn?",
    exampleMeaning: "Phòng không có nước nóng, phải làm sao?",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "早餐",
    pinyin: "zǎocān",
    meaning: "bữa sáng",
    exampleSentence: "早餐在几楼？几点开始？",
    examplePinyin: "Zǎocān zài jǐ lóu? Jǐ diǎn kāishǐ?",
    exampleMeaning: "Bữa sáng ở tầng mấy? Mấy giờ bắt đầu?",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "前台",
    pinyin: "qiántái",
    meaning: "lễ tân",
    exampleSentence: "有问题可以打电话给前台。",
    examplePinyin: "Yǒu wèntí kěyǐ dǎ diànhuà gěi qiántái.",
    exampleMeaning: "Có vấn đề gì có thể gọi điện cho lễ tân.",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "楼层",
    pinyin: "lóucéng",
    meaning: "tầng (lầu)",
    exampleSentence: "您的房间在八楼，楼层比较高。",
    examplePinyin: "Nín de fángjiān zài bā lóu, lóucéng bǐjiào gāo.",
    exampleMeaning: "Phòng của bạn ở tầng 8, tầng khá cao.",
    hskLevel: 2,
    category: "hotel",
  },
  {
    simplified: "电梯",
    pinyin: "diàntī",
    meaning: "thang máy",
    exampleSentence: "电梯在走廊的尽头。",
    examplePinyin: "Diàntī zài zǒuláng de jìntóu.",
    exampleMeaning: "Thang máy ở cuối hành lang.",
    hskLevel: 2,
    category: "hotel",
  },

  // ── Lesson 4: Đi taxi (HSK 2) ──
  {
    simplified: "打车",
    pinyin: "dǎchē",
    meaning: "bắt taxi / gọi taxi",
    exampleSentence: "我们打车去吧，走路太远了。",
    examplePinyin: "Wǒmen dǎchē qù ba, zǒulù tài yuǎn le.",
    exampleMeaning: "Chúng ta đi taxi đi, đi bộ xa quá.",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "目的地",
    pinyin: "mùdìdì",
    meaning: "điểm đến / đích đến",
    exampleSentence: "请输入您的目的地。",
    examplePinyin: "Qǐng shūrù nín de mùdìdì.",
    exampleMeaning: "Xin nhập điểm đến của bạn.",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "左转",
    pinyin: "zuǒzhuǎn",
    meaning: "rẽ trái",
    exampleSentence: "在红绿灯那里左转。",
    examplePinyin: "Zài hónglǜdēng nàlǐ zuǒzhuǎn.",
    exampleMeaning: "Ở chỗ đèn đỏ rẽ trái.",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "右转",
    pinyin: "yòuzhuǎn",
    meaning: "rẽ phải",
    exampleSentence: "前面右转就是超市。",
    examplePinyin: "Qiánmiàn yòuzhuǎn jiùshì chāoshì.",
    exampleMeaning: "Phía trước rẽ phải là siêu thị.",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "直走",
    pinyin: "zhízǒu",
    meaning: "đi thẳng",
    exampleSentence: "沿着这条路直走五分钟。",
    examplePinyin: "Yánzhe zhè tiáo lù zhízǒu wǔ fēnzhōng.",
    exampleMeaning: "Đi thẳng theo con đường này năm phút.",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "停",
    pinyin: "tíng",
    meaning: "dừng lại",
    exampleSentence: "师傅，在这里停一下。",
    examplePinyin: "Shīfu, zài zhèlǐ tíng yīxià.",
    exampleMeaning: "Tài xế ơi, dừng ở đây.",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "多少钱",
    pinyin: "duōshao qián",
    meaning: "bao nhiêu tiền?",
    exampleSentence: "从这里到机场多少钱？",
    examplePinyin: "Cóng zhèlǐ dào jīchǎng duōshao qián?",
    exampleMeaning: "Từ đây đến sân bay bao nhiêu tiền?",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "找零",
    pinyin: "zhǎolíng",
    meaning: "thối tiền lẻ",
    exampleSentence: "给你一百块，找零给我。",
    examplePinyin: "Gěi nǐ yī bǎi kuài, zhǎolíng gěi wǒ.",
    exampleMeaning: "Cho bạn 100 tệ, thối tiền lại cho tôi.",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "堵车",
    pinyin: "dǔchē",
    meaning: "tắc đường",
    exampleSentence: "现在堵车很严重，可能要晚一点到。",
    examplePinyin: "Xiànzài dǔchē hěn yánzhòng, kěnéng yào wǎn yīdiǎn dào.",
    exampleMeaning: "Bây giờ tắc đường rất nặng, có thể đến muộn hơn.",
    hskLevel: 2,
    category: "transportation",
  },
  {
    simplified: "快到了",
    pinyin: "kuài dào le",
    meaning: "sắp đến nơi rồi",
    exampleSentence: "快到了，还有两分钟。",
    examplePinyin: "Kuài dào le, hái yǒu liǎng fēnzhōng.",
    exampleMeaning: "Sắp đến rồi, còn hai phút nữa.",
    hskLevel: 2,
    category: "transportation",
  },

  // ── Lesson 5: Đi khám bệnh (HSK 3) ──
  {
    simplified: "挂号",
    pinyin: "guàhào",
    meaning: "đăng ký khám bệnh",
    exampleSentence: "请先去挂号，然后等候叫号。",
    examplePinyin: "Qǐng xiān qù guàhào, ránhòu děnghòu jiàohào.",
    exampleMeaning: "Xin hãy đăng ký khám trước, rồi chờ gọi số.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "症状",
    pinyin: "zhèngzhuàng",
    meaning: "triệu chứng",
    exampleSentence: "请描述一下您的症状。",
    examplePinyin: "Qǐng miáoshù yīxià nín de zhèngzhuàng.",
    exampleMeaning: "Xin hãy mô tả triệu chứng của bạn.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "发烧",
    pinyin: "fāshāo",
    meaning: "sốt",
    exampleSentence: "我发烧三十八度五。",
    examplePinyin: "Wǒ fāshāo sānshíbā dù wǔ.",
    exampleMeaning: "Tôi sốt 38 độ 5.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "咳嗽",
    pinyin: "késou",
    meaning: "ho",
    exampleSentence: "他咳嗽了好几天了。",
    examplePinyin: "Tā késou le hǎo jǐ tiān le.",
    exampleMeaning: "Anh ấy ho mấy ngày rồi.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "过敏",
    pinyin: "guòmǐn",
    meaning: "dị ứng",
    exampleSentence: "我对花粉过敏。",
    examplePinyin: "Wǒ duì huāfěn guòmǐn.",
    exampleMeaning: "Tôi bị dị ứng với phấn hoa.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "处方",
    pinyin: "chǔfāng",
    meaning: "đơn thuốc",
    exampleSentence: "医生给我开了处方。",
    examplePinyin: "Yīshēng gěi wǒ kāi le chǔfāng.",
    exampleMeaning: "Bác sĩ đã kê đơn thuốc cho tôi.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "药房",
    pinyin: "yàofáng",
    meaning: "nhà thuốc",
    exampleSentence: "药房在一楼的右边。",
    examplePinyin: "Yàofáng zài yī lóu de yòubiān.",
    exampleMeaning: "Nhà thuốc ở phía phải tầng một.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "吃药",
    pinyin: "chīyào",
    meaning: "uống thuốc",
    exampleSentence: "这个药一天吃三次，饭后吃。",
    examplePinyin: "Zhège yào yītiān chī sān cì, fànhòu chī.",
    exampleMeaning: "Thuốc này uống ba lần một ngày, uống sau khi ăn.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "注意休息",
    pinyin: "zhùyì xiūxi",
    meaning: "chú ý nghỉ ngơi",
    exampleSentence: "医生说要注意休息，不能太累。",
    examplePinyin: "Yīshēng shuō yào zhùyì xiūxi, bù néng tài lèi.",
    exampleMeaning: "Bác sĩ nói phải chú ý nghỉ ngơi, không được quá mệt.",
    hskLevel: 3,
    category: "health",
  },
  {
    simplified: "复查",
    pinyin: "fùchá",
    meaning: "tái khám",
    exampleSentence: "一周后记得来复查。",
    examplePinyin: "Yī zhōu hòu jìdé lái fùchá.",
    exampleMeaning: "Một tuần sau nhớ đến tái khám.",
    hskLevel: 3,
    category: "health",
  },

  // ── Lesson 6: Phỏng vấn xin việc (HSK 4) ──
  {
    simplified: "自我介绍",
    pinyin: "zìwǒ jièshào",
    meaning: "tự giới thiệu bản thân",
    exampleSentence: "请先做一下自我介绍。",
    examplePinyin: "Qǐng xiān zuò yīxià zìwǒ jièshào.",
    exampleMeaning: "Xin hãy tự giới thiệu trước.",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "优点",
    pinyin: "yōudiǎn",
    meaning: "ưu điểm / điểm mạnh",
    exampleSentence: "你觉得你最大的优点是什么？",
    examplePinyin: "Nǐ juéde nǐ zuì dà de yōudiǎn shì shénme?",
    exampleMeaning: "Bạn nghĩ điểm mạnh lớn nhất của bạn là gì?",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "缺点",
    pinyin: "quēdiǎn",
    meaning: "nhược điểm / điểm yếu",
    exampleSentence: "我的缺点是有时候太完美主义。",
    examplePinyin: "Wǒ de quēdiǎn shì yǒu shíhou tài wánměi zhǔyì.",
    exampleMeaning: "Nhược điểm của tôi là đôi khi quá cầu toàn.",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "经验",
    pinyin: "jīngyàn",
    meaning: "kinh nghiệm",
    exampleSentence: "我有五年的销售工作经验。",
    examplePinyin: "Wǒ yǒu wǔ nián de xiāoshòu gōngzuò jīngyàn.",
    exampleMeaning: "Tôi có 5 năm kinh nghiệm bán hàng.",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "薪水",
    pinyin: "xīnshuǐ",
    meaning: "lương",
    exampleSentence: "请问这个职位的薪水是多少？",
    examplePinyin: "Qǐngwèn zhège zhíwèi de xīnshuǐ shì duōshao?",
    exampleMeaning: "Xin hỏi mức lương của vị trí này là bao nhiêu?",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "福利",
    pinyin: "fúlì",
    meaning: "phúc lợi / đãi ngộ",
    exampleSentence: "公司的福利包括五险一金和年假。",
    examplePinyin: "Gōngsī de fúlì bāokuò wǔ xiǎn yī jīn hé niánjià.",
    exampleMeaning: "Phúc lợi công ty bao gồm bảo hiểm và nghỉ phép năm.",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "加班",
    pinyin: "jiābān",
    meaning: "làm thêm giờ / tăng ca",
    exampleSentence: "这个工作经常需要加班。",
    examplePinyin: "Zhège gōngzuò jīngcháng xūyào jiābān.",
    exampleMeaning: "Công việc này thường xuyên cần làm thêm giờ.",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "团队",
    pinyin: "tuánduì",
    meaning: "đội nhóm / team",
    exampleSentence: "我们是一个优秀的团队。",
    examplePinyin: "Wǒmen shì yīgè yōuxiù de tuánduì.",
    exampleMeaning: "Chúng tôi là một đội ngũ xuất sắc.",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "目标",
    pinyin: "mùbiāo",
    meaning: "mục tiêu",
    exampleSentence: "你的职业目标是什么？",
    examplePinyin: "Nǐ de zhíyè mùbiāo shì shénme?",
    exampleMeaning: "Mục tiêu nghề nghiệp của bạn là gì?",
    hskLevel: 4,
    category: "work",
  },
  {
    simplified: "发展",
    pinyin: "fāzhǎn",
    meaning: "phát triển",
    exampleSentence: "我希望在这家公司得到发展的机会。",
    examplePinyin: "Wǒ xīwàng zài zhè jiā gōngsī dédào fāzhǎn de jīhuì.",
    exampleMeaning: "Tôi hy vọng có cơ hội phát triển tại công ty này.",
    hskLevel: 4,
    category: "work",
  },

  // ── Lesson 7: Thuê nhà (HSK 3) ──
  {
    simplified: "租房",
    pinyin: "zū fáng",
    meaning: "thuê nhà",
    exampleSentence: "我在找租房，有没有推荐？",
    examplePinyin: "Wǒ zài zhǎo zū fáng, yǒu méiyǒu tuījiàn?",
    exampleMeaning: "Tôi đang tìm thuê nhà, có gợi ý không?",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "房租",
    pinyin: "fángzū",
    meaning: "tiền thuê nhà",
    exampleSentence: "这里的房租每月多少钱？",
    examplePinyin: "Zhèlǐ de fángzū měi yuè duōshao qián?",
    exampleMeaning: "Tiền thuê ở đây mỗi tháng bao nhiêu?",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "押金",
    pinyin: "yājīn",
    meaning: "tiền đặt cọc",
    exampleSentence: "押金需要交两个月的房租。",
    examplePinyin: "Yājīn xūyào jiāo liǎng gè yuè de fángzū.",
    exampleMeaning: "Tiền đặt cọc cần đóng 2 tháng tiền thuê.",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "合同",
    pinyin: "hétong",
    meaning: "hợp đồng",
    exampleSentence: "请仔细阅读合同再签字。",
    examplePinyin: "Qǐng zǐxì yuèdú hétong zài qiānzì.",
    exampleMeaning: "Xin hãy đọc kỹ hợp đồng trước khi ký.",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "家具",
    pinyin: "jiājù",
    meaning: "đồ nội thất",
    exampleSentence: "房间里有全套家具，不需要自己买。",
    examplePinyin: "Fángjiān lǐ yǒu quántào jiājù, bù xūyào zìjǐ mǎi.",
    exampleMeaning: "Phòng có đầy đủ nội thất, không cần tự mua.",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "水电费",
    pinyin: "shuǐdiànfèi",
    meaning: "tiền điện nước",
    exampleSentence: "水电费每个月大概两百块左右。",
    examplePinyin: "Shuǐdiànfèi měi gè yuè dàgài liǎng bǎi kuài zuǒyòu.",
    exampleMeaning: "Tiền điện nước mỗi tháng khoảng 200 tệ.",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "搬家",
    pinyin: "bānjiā",
    meaning: "chuyển nhà",
    exampleSentence: "下个月我们要搬家了。",
    examplePinyin: "Xià gè yuè wǒmen yào bānjiā le.",
    exampleMeaning: "Tháng sau chúng tôi chuyển nhà.",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "邻居",
    pinyin: "línjū",
    meaning: "hàng xóm",
    exampleSentence: "我们的邻居非常友善。",
    examplePinyin: "Wǒmen de línjū fēicháng yǒushàn.",
    exampleMeaning: "Hàng xóm của chúng tôi rất thân thiện.",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "小区",
    pinyin: "xiǎoqū",
    meaning: "khu dân cư / chung cư",
    exampleSentence: "这个小区环境很好，有停车场和花园。",
    examplePinyin: "Zhège xiǎoqū huánjìng hěn hǎo, yǒu tíngchēchǎng hé huāyuán.",
    exampleMeaning: "Khu dân cư này môi trường rất tốt, có bãi đậu xe và vườn.",
    hskLevel: 3,
    category: "housing",
  },
  {
    simplified: "装修",
    pinyin: "zhuāngxiū",
    meaning: "trang trí / sửa nhà",
    exampleSentence: "这套房子刚装修好，很新。",
    examplePinyin: "Zhè tào fángzi gāng zhuāngxiū hǎo, hěn xīn.",
    exampleMeaning: "Căn nhà này vừa mới trang trí xong, rất mới.",
    hskLevel: 3,
    category: "housing",
  },

  // ── Lesson 8: Hẹn hò (HSK 2) ──
  {
    simplified: "约会",
    pinyin: "yuēhuì",
    meaning: "hẹn hò",
    exampleSentence: "今天是我们第一次约会。",
    examplePinyin: "Jīntiān shì wǒmen dì yī cì yuēhuì.",
    exampleMeaning: "Hôm nay là lần hẹn hò đầu tiên của chúng ta.",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "电影院",
    pinyin: "diànyǐngyuàn",
    meaning: "rạp chiếu phim",
    exampleSentence: "我们去电影院看新上映的电影吧。",
    examplePinyin: "Wǒmen qù diànyǐngyuàn kàn xīn shàngyìng de diànyǐng ba.",
    exampleMeaning: "Chúng ta đến rạp chiếu phim xem phim mới chiếu nhé.",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "咖啡厅",
    pinyin: "kāfēitīng",
    meaning: "quán cà phê",
    exampleSentence: "那家咖啡厅的环境很浪漫。",
    examplePinyin: "Nà jiā kāfēitīng de huánjìng hěn làngmàn.",
    exampleMeaning: "Quán cà phê đó không khí rất lãng mạn.",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "散步",
    pinyin: "sànbù",
    meaning: "đi dạo",
    exampleSentence: "吃完饭我们去公园散步吧。",
    examplePinyin: "Chī wán fàn wǒmen qù gōngyuán sànbù ba.",
    exampleMeaning: "Ăn xong chúng ta đi dạo ở công viên nhé.",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "礼物",
    pinyin: "lǐwù",
    meaning: "quà tặng",
    exampleSentence: "这是我给你的礼物，希望你喜欢。",
    examplePinyin: "Zhè shì wǒ gěi nǐ de lǐwù, xīwàng nǐ xǐhuān.",
    exampleMeaning: "Đây là quà tôi tặng bạn, hy vọng bạn thích.",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "喜欢",
    pinyin: "xǐhuān",
    meaning: "thích / yêu thích",
    exampleSentence: "我很喜欢你笑的样子。",
    examplePinyin: "Wǒ hěn xǐhuān nǐ xiào de yàngzi.",
    exampleMeaning: "Tôi rất thích nụ cười của bạn.",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "帅",
    pinyin: "shuài",
    meaning: "đẹp trai / phong độ",
    exampleSentence: "你今天穿这件衣服真帅！",
    examplePinyin: "Nǐ jīntiān chuān zhè jiàn yīfu zhēn shuài!",
    exampleMeaning: "Hôm nay bạn mặc áo này trông thật đẹp trai!",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "美丽",
    pinyin: "měilì",
    meaning: "xinh đẹp / tuyệt vời",
    exampleSentence: "你真美丽，像春天里的花。",
    examplePinyin: "Nǐ zhēn měilì, xiàng chūntiān lǐ de huā.",
    exampleMeaning: "Bạn thật xinh đẹp, như hoa mùa xuân.",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "浪漫",
    pinyin: "làngmàn",
    meaning: "lãng mạn",
    exampleSentence: "烛光晚餐真的很浪漫。",
    examplePinyin: "Zhúguāng wǎncān zhēn de hěn làngmàn.",
    exampleMeaning: "Bữa tối ánh nến thật sự rất lãng mạn.",
    hskLevel: 2,
    category: "social",
  },
  {
    simplified: "表白",
    pinyin: "biǎobái",
    meaning: "tỏ tình / thú nhận tình cảm",
    exampleSentence: "他终于鼓起勇气向她表白了。",
    examplePinyin: "Tā zhōngyú gǔqǐ yǒngqì xiàng tā biǎobái le.",
    exampleMeaning: "Anh ấy cuối cùng đã dũng cảm tỏ tình với cô ấy.",
    hskLevel: 2,
    category: "social",
  },

  // ── Lesson 9: Mua sắm online (HSK 3) ──
  {
    simplified: "网购",
    pinyin: "wǎnggòu",
    meaning: "mua sắm online",
    exampleSentence: "现在很多人喜欢网购，方便又便宜。",
    examplePinyin: "Xiànzài hěn duō rén xǐhuān wǎnggòu, fāngbiàn yòu piányí.",
    exampleMeaning: "Bây giờ nhiều người thích mua online, vừa tiện vừa rẻ.",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "下单",
    pinyin: "xià dān",
    meaning: "đặt hàng",
    exampleSentence: "我刚下单了，等货到就行了。",
    examplePinyin: "Wǒ gāng xià dān le, děng huò dào jiù xíng le.",
    exampleMeaning: "Tôi vừa đặt hàng xong, đợi hàng đến là được.",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "付款",
    pinyin: "fùkuǎn",
    meaning: "thanh toán",
    exampleSentence: "请选择付款方式：微信支付还是支付宝？",
    examplePinyin: "Qǐng xuǎnzé fùkuǎn fāngshì: Wēixìn zhīfù háishi Zhīfùbǎo?",
    exampleMeaning: "Xin chọn phương thức thanh toán: WeChat Pay hay Alipay?",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "快递",
    pinyin: "kuàidì",
    meaning: "chuyển phát nhanh / courier",
    exampleSentence: "你的快递已经到了，在门口。",
    examplePinyin: "Nǐ de kuàidì yǐjīng dào le, zài ménkǒu.",
    exampleMeaning: "Hàng của bạn đã đến rồi, ở cửa.",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "发货",
    pinyin: "fāhuò",
    meaning: "giao hàng / ship hàng",
    exampleSentence: "卖家说明天就会发货。",
    examplePinyin: "Mài jiā shuō míngtiān jiù huì fāhuò.",
    exampleMeaning: "Người bán nói ngày mai sẽ ship hàng.",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "收货",
    pinyin: "shōuhuò",
    meaning: "nhận hàng",
    exampleSentence: "请在收货后确认订单。",
    examplePinyin: "Qǐng zài shōuhuò hòu quèrèn dìngdān.",
    exampleMeaning: "Xin xác nhận đơn hàng sau khi nhận hàng.",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "评价",
    pinyin: "píngjià",
    meaning: "đánh giá / review",
    exampleSentence: "请给这个商品写一个评价。",
    examplePinyin: "Qǐng gěi zhège shāngpǐn xiě yīgè píngjià.",
    exampleMeaning: "Xin hãy viết một đánh giá cho sản phẩm này.",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "退货",
    pinyin: "tuìhuò",
    meaning: "trả hàng / hoàn hàng",
    exampleSentence: "这件衣服尺码不对，我想退货。",
    examplePinyin: "Zhè jiàn yīfu chǐmǎ bù duì, wǒ xiǎng tuìhuò.",
    exampleMeaning: "Áo này sai size, tôi muốn trả hàng.",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "优惠券",
    pinyin: "yōuhuìquàn",
    meaning: "phiếu giảm giá / coupon",
    exampleSentence: "我有一张一百元的优惠券，可以用吗？",
    examplePinyin: "Wǒ yǒu yī zhāng yī bǎi yuán de yōuhuìquàn, kěyǐ yòng ma?",
    exampleMeaning: "Tôi có một phiếu giảm giá 100 tệ, dùng được không?",
    hskLevel: 3,
    category: "shopping",
  },
  {
    simplified: "包邮",
    pinyin: "bāoyóu",
    meaning: "miễn phí vận chuyển",
    exampleSentence: "购物满两百元包邮。",
    examplePinyin: "Gòuwù mǎn liǎng bǎi yuán bāoyóu.",
    exampleMeaning: "Mua hàng từ 200 tệ trở lên miễn phí vận chuyển.",
    hskLevel: 3,
    category: "shopping",
  },

  // ── Lesson 10: Đi du lịch Trung Quốc (HSK 3) ──
  {
    simplified: "旅行社",
    pinyin: "lǚxíngshè",
    meaning: "công ty du lịch / travel agency",
    exampleSentence: "我通过旅行社订了北京三日游。",
    examplePinyin: "Wǒ tōngguò lǚxíngshè dìng le Běijīng sān rì yóu.",
    exampleMeaning: "Tôi đặt tour Bắc Kinh 3 ngày qua công ty du lịch.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "导游",
    pinyin: "dǎoyóu",
    meaning: "hướng dẫn viên du lịch",
    exampleSentence: "导游带我们参观了故宫和长城。",
    examplePinyin: "Dǎoyóu dài wǒmen cānguān le Gùgōng hé Chángchéng.",
    exampleMeaning: "Hướng dẫn viên đưa chúng tôi tham quan Tử Cấm Thành và Vạn Lý Trường Thành.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "景点",
    pinyin: "jǐngdiǎn",
    meaning: "điểm tham quan / danh thắng",
    exampleSentence: "这里有很多著名景点，值得去看看。",
    examplePinyin: "Zhèlǐ yǒu hěn duō zhùmíng jǐngdiǎn, zhídé qù kànkan.",
    exampleMeaning: "Ở đây có nhiều danh thắng nổi tiếng, đáng đến xem.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "门票",
    pinyin: "ménpiào",
    meaning: "vé vào cửa",
    exampleSentence: "故宫的门票是六十元一张。",
    examplePinyin: "Gùgōng de ménpiào shì liùshí yuán yī zhāng.",
    exampleMeaning: "Vé vào Tử Cấm Thành là 60 tệ một tờ.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "照相",
    pinyin: "zhàoxiàng",
    meaning: "chụp ảnh",
    exampleSentence: "在这里可以照相，但请不要开闪光灯。",
    examplePinyin: "Zài zhèlǐ kěyǐ zhàoxiàng, dàn qǐng bùyào kāi shǎnguāngdēng.",
    exampleMeaning: "Ở đây có thể chụp ảnh, nhưng vui lòng không bật đèn flash.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "纪念品",
    pinyin: "jìniànpǐn",
    meaning: "đồ lưu niệm / quà tặng",
    exampleSentence: "我买了一些纪念品送给朋友。",
    examplePinyin: "Wǒ mǎi le yīxiē jìniànpǐn sòng gěi péngyou.",
    exampleMeaning: "Tôi mua một số đồ lưu niệm tặng cho bạn bè.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "特产",
    pinyin: "tèchǎn",
    meaning: "đặc sản địa phương",
    exampleSentence: "北京的特产有烤鸭和果脯。",
    examplePinyin: "Běijīng de tèchǎn yǒu kǎoyā hé guǒfǔ.",
    exampleMeaning: "Đặc sản Bắc Kinh có vịt quay và mứt hoa quả.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "美食",
    pinyin: "měishí",
    meaning: "ẩm thực / món ăn ngon",
    exampleSentence: "中国各地都有独特的美食。",
    examplePinyin: "Zhōngguó gèdì dōu yǒu dútè de měishí.",
    exampleMeaning: "Khắp nơi Trung Quốc đều có ẩm thực đặc sắc riêng.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "地图",
    pinyin: "dìtú",
    meaning: "bản đồ",
    exampleSentence: "请给我一张景区地图，谢谢。",
    examplePinyin: "Qǐng gěi wǒ yī zhāng jǐngqū dìtú, xièxie.",
    exampleMeaning: "Vui lòng cho tôi một tờ bản đồ khu du lịch, cảm ơn.",
    hskLevel: 3,
    category: "travel",
  },
  {
    simplified: "迷路",
    pinyin: "mílù",
    meaning: "bị lạc đường",
    exampleSentence: "我在古城里迷路了，不知道怎么回去。",
    examplePinyin: "Wǒ zài gǔchéng lǐ mílù le, bù zhīdào zěnme huíqù.",
    exampleMeaning: "Tôi bị lạc trong phố cổ, không biết đường về.",
    hskLevel: 3,
    category: "travel",
  },
];

// ==================== HELPERS ====================

async function findOrCreateVocab(word: (typeof thematicVocabulary)[0]): Promise<string> {
  const existing = await prisma.vocabulary.findFirst({
    where: { simplified: word.simplified, hskLevel: word.hskLevel },
  });
  if (existing) {
    return existing.id;
  }
  const v = await prisma.vocabulary.create({
    data: {
      simplified: word.simplified,
      pinyin: word.pinyin,
      meaning: word.meaning,
      exampleSentence: word.exampleSentence,
      examplePinyin: word.examplePinyin,
      exampleMeaning: word.exampleMeaning,
      hskLevel: word.hskLevel,
      category: word.category,
    },
  });
  return v.id;
}

// ==================== MAIN ====================

async function main() {
  console.log("Starting thematic seed (additive — no data deletion)...\n");

  // ── Step 1: Create all thematic vocabulary ──
  const vocabMap: Record<string, string> = {};
  let newCount = 0;
  let skipCount = 0;

  for (const word of thematicVocabulary) {
    const existing = await prisma.vocabulary.findFirst({
      where: { simplified: word.simplified, hskLevel: word.hskLevel },
    });
    if (existing) {
      vocabMap[word.simplified] = existing.id;
      skipCount++;
    } else {
      const id = await findOrCreateVocab(word);
      vocabMap[word.simplified] = id;
      newCount++;
    }
  }

  console.log(`Vocabulary: ${newCount} created, ${skipCount} already existed.`);

  // ── Step 2: Create thematic lessons ──
  let lessonsCreated = 0;
  let lessonsSkipped = 0;
  let totalExercises = 0;

  for (const ld of thematicLessons) {
    // Skip if lesson already exists by title + hskLevel
    const existing = await prisma.lesson.findFirst({
      where: { title: ld.title, hskLevel: ld.hskLevel },
    });
    if (existing) {
      console.log(`  Skipping existing lesson: "${ld.title}"`);
      lessonsSkipped++;
      continue;
    }

    const { vocabularyKeys, exercises: exerciseData, ...lessonFields } = ld;

    const lesson = await prisma.lesson.create({
      data: {
        ...lessonFields,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: lessonFields.content as any,
        isPublished: true,
      },
    });

    // Link vocabulary to lesson
    let vocabOrder = 0;
    for (const key of vocabularyKeys) {
      let vocabId = vocabMap[key];
      if (!vocabId) {
        // Fall back to any matching simplified in DB
        const dbVocab = await prisma.vocabulary.findFirst({ where: { simplified: key } });
        if (dbVocab) vocabId = dbVocab.id;
      }
      if (vocabId) {
        await prisma.lessonVocabulary.create({
          data: { lessonId: lesson.id, vocabularyId: vocabId, order: vocabOrder++ },
        }).catch(() => {
          // Skip duplicate lessonVocabulary links silently
        });
      } else {
        console.warn(`  Warning: vocab key "${key}" not found in DB`);
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          question: ex.question as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          answer: ex.answer as any,
          explanation: ex.explanation,
        },
      });
      totalExercises++;
    }

    lessonsCreated++;
    console.log(`  Created lesson: "${ld.title}" (HSK${ld.hskLevel}) — ${exerciseData.length} exercises`);
  }

  console.log(`\nThematic seed complete!`);
  console.log(`  Lessons created: ${lessonsCreated}`);
  console.log(`  Lessons skipped: ${lessonsSkipped}`);
  console.log(`  Exercises created: ${totalExercises}`);
  console.log(`  Vocabulary: ${newCount} new, ${skipCount} existing`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
