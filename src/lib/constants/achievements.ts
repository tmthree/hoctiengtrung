// Achievement definitions for user milestones — evaluated against runtime stats
export interface UserStats {
  lessonsCompleted: number;
  wordsReviewed: number;
  currentStreak: number;
  totalMinutes: number;
}

export interface Achievement {
  id: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  icon: string; // Lucide icon name
  condition: (stats: UserStats) => boolean;
}

export const achievements: Achievement[] = [
  {
    id: "first-lesson",
    titleVi: "Bài học đầu tiên",
    titleEn: "First Lesson",
    descriptionVi: "Hoàn thành bài học đầu tiên",
    descriptionEn: "Complete your first lesson",
    icon: "BookOpen",
    condition: (s) => s.lessonsCompleted >= 1,
  },
  {
    id: "word-collector-10",
    titleVi: "Người sưu tầm",
    titleEn: "Word Collector",
    descriptionVi: "Ôn tập 10 từ vựng",
    descriptionEn: "Review 10 words",
    icon: "Languages",
    condition: (s) => s.wordsReviewed >= 10,
  },
  {
    id: "word-collector-100",
    titleVi: "Bậc thầy từ vựng",
    titleEn: "Word Master",
    descriptionVi: "Ôn tập 100 từ vựng",
    descriptionEn: "Review 100 words",
    icon: "Trophy",
    condition: (s) => s.wordsReviewed >= 100,
  },
  {
    id: "streak-3",
    titleVi: "Kiên trì 3 ngày",
    titleEn: "3-Day Streak",
    descriptionVi: "Học 3 ngày liên tiếp",
    descriptionEn: "Study for 3 consecutive days",
    icon: "Flame",
    condition: (s) => s.currentStreak >= 3,
  },
  {
    id: "streak-7",
    titleVi: "Chiến binh tuần",
    titleEn: "Week Warrior",
    descriptionVi: "Học 7 ngày liên tiếp",
    descriptionEn: "Study for 7 consecutive days",
    icon: "Zap",
    condition: (s) => s.currentStreak >= 7,
  },
  {
    id: "streak-30",
    titleVi: "Không gì cản nổi",
    titleEn: "Unstoppable",
    descriptionVi: "Học 30 ngày liên tiếp",
    descriptionEn: "Study for 30 consecutive days",
    icon: "Crown",
    condition: (s) => s.currentStreak >= 30,
  },
  {
    id: "study-60",
    titleVi: "Giờ đầu tiên",
    titleEn: "First Hour",
    descriptionVi: "Học tổng cộng 60 phút",
    descriptionEn: "Study for 60 minutes total",
    icon: "Clock",
    condition: (s) => s.totalMinutes >= 60,
  },
  {
    id: "lessons-5",
    titleVi: "Chăm chỉ",
    titleEn: "Studious",
    descriptionVi: "Hoàn thành 5 bài học",
    descriptionEn: "Complete 5 lessons",
    icon: "GraduationCap",
    condition: (s) => s.lessonsCompleted >= 5,
  },
];
