import {
  LayoutDashboard,
  BookOpen,
  Languages,
  Dumbbell,
  User,
  Users,
  BarChart3,
} from "lucide-react";

export const appNavItems = [
  { labelKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "lessons", href: "/lessons", icon: BookOpen },
  { labelKey: "vocabulary", href: "/vocabulary", icon: Languages },
  { labelKey: "practice", href: "/practice", icon: Dumbbell },
  { labelKey: "profile", href: "/profile", icon: User },
];

export const adminNavItems = [
  { labelKey: "adminDashboard", href: "/admin", icon: BarChart3 },
  { labelKey: "adminLessons", href: "/admin/lessons", icon: BookOpen },
  { labelKey: "adminVocabulary", href: "/admin/vocabulary", icon: Languages },
  { labelKey: "adminUsers", href: "/admin/users", icon: Users },
];
