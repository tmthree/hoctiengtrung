// Seed script for Course data — run with: npm run db:seed-courses
// Finds first ADMIN user as instructor, upserts courses, links lessons by hskLevel
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set! Check .env.local");
  process.exit(1);
}
console.log("Connecting to:", dbUrl.substring(0, 40) + "...");

const adapter = new PrismaNeon({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

const courseDefinitions = [
  {
    title: "HSK 1 — Tiếng Trung Cơ Bản",
    slug: "hsk-1-co-ban",
    description:
      "Khóa học tiếng Trung cơ bản cho người mới bắt đầu. Học 150 từ vựng, ngữ pháp căn bản và hội thoại đời thường.",
    language: "CHINESE" as const,
    level: 1,
    price: 0,
    isPublished: true,
    isFeatured: true,
  },
  {
    title: "HSK 2 — Giao Tiếp Hàng Ngày",
    slug: "hsk-2-giao-tiep",
    description:
      "Nâng cao khả năng giao tiếp với 300 từ vựng mới, mẫu câu phức tạp hơn và kỹ năng nghe hiểu.",
    language: "CHINESE" as const,
    level: 2,
    price: 199000,
    isPublished: true,
    isFeatured: true,
  },
  {
    title: "HSK 3 — Trung Cấp",
    slug: "hsk-3-trung-cap",
    description:
      "Chinh phục trình độ trung cấp với 600 từ vựng, ngữ pháp nâng cao và bài đọc hiểu thực tế.",
    language: "CHINESE" as const,
    level: 3,
    price: 299000,
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "HSK 4 — Nâng Cao",
    slug: "hsk-4-nang-cao",
    description:
      "Trình độ nâng cao với 1200 từ vựng, thành ngữ và kỹ năng viết luận tiếng Trung.",
    language: "CHINESE" as const,
    level: 4,
    price: 399000,
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "HSK 5 — Thành Thạo",
    slug: "hsk-5-thanh-thao",
    description:
      "Đọc báo, xem phim không phụ đề, viết email chuyên nghiệp bằng tiếng Trung.",
    language: "CHINESE" as const,
    level: 5,
    price: 499000,
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "HSK 6 — Chuyên Gia",
    slug: "hsk-6-chuyen-gia",
    description:
      "Trình độ chuyên gia — đọc hiểu văn bản học thuật, thuyết trình và debate bằng tiếng Trung.",
    language: "CHINESE" as const,
    level: 6,
    price: 599000,
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "Tiếng Trung Thương Mại",
    slug: "tieng-trung-thuong-mai",
    description:
      "Khóa học chuyên biệt cho doanh nhân: từ vựng kinh doanh, email, đàm phán và văn hóa doanh nghiệp Trung Quốc.",
    language: "CHINESE" as const,
    level: 4,
    price: 699000,
    isPublished: true,
    isFeatured: true,
  },
  {
    title: "Luyện Thi HSK — Đề Thi Thử",
    slug: "luyen-thi-hsk",
    description:
      "Bộ đề thi thử HSK 1-6 với giải thích chi tiết. Luyện kỹ năng nghe, đọc, viết theo format đề thi thật.",
    language: "CHINESE" as const,
    level: 3,
    price: 349000,
    isPublished: true,
    isFeatured: false,
  },
];

async function findOrCreateInstructor(): Promise<string> {
  // Prefer an existing ADMIN user
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true, email: true },
  });
  if (admin) {
    console.log(`Using admin instructor: ${admin.email}`);
    return admin.id;
  }

  // Fall back to any INSTRUCTOR role
  const instructor = await prisma.user.findFirst({
    where: { role: "INSTRUCTOR" },
    select: { id: true, email: true },
  });
  if (instructor) {
    console.log(`Using instructor: ${instructor.email}`);
    return instructor.id;
  }

  // Create a system instructor account if none exists
  console.log("No admin/instructor found — creating system instructor...");
  const system = await prisma.user.create({
    data: {
      name: "Hệ Thống",
      email: "system@hoctiengtrung.app",
      emailVerified: true,
      role: "ADMIN",
    },
  });
  console.log(`Created system instructor: ${system.email}`);
  return system.id;
}

async function main() {
  console.log("\n=== Seeding Courses ===\n");

  const instructorId = await findOrCreateInstructor();

  let created = 0;
  let updated = 0;
  let lessonsLinked = 0;

  for (const def of courseDefinitions) {
    const course = await prisma.course.upsert({
      where: { slug: def.slug },
      update: {
        title: def.title,
        description: def.description,
        level: def.level,
        price: def.price,
        isPublished: def.isPublished,
        isFeatured: def.isFeatured,
        instructorId,
      },
      create: {
        ...def,
        instructorId,
        currency: "VND",
      },
    });

    const isNew = course.createdAt.getTime() === course.updatedAt.getTime();
    if (isNew) {
      created++;
    } else {
      updated++;
    }

    // Link published lessons at matching hskLevel that are not yet assigned to a course
    const linkResult = await prisma.lesson.updateMany({
      where: {
        hskLevel: def.level,
        isPublished: true,
        courseId: null,
      },
      data: { courseId: course.id },
    });
    lessonsLinked += linkResult.count;

    console.log(
      `[${isNew ? "CREATED" : "UPDATED"}] ${def.title} — linked ${linkResult.count} lesson(s)`
    );
  }

  console.log("\n=== Summary ===");
  console.log(`Courses created : ${created}`);
  console.log(`Courses updated : ${updated}`);
  console.log(`Lessons linked  : ${lessonsLinked}`);
  console.log("Done.\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
