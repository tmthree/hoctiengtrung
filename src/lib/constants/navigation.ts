import {
  LayoutDashboard,
  BookOpen,
  Languages,
  Dumbbell,
  User,
  Users,
  BarChart3,
  GraduationCap,
  ShoppingBag,
  PenTool,
} from "lucide-react";

export const appNavItems = [
  { labelKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "courses", href: "/courses", icon: GraduationCap },
  { labelKey: "lessons", href: "/lessons", icon: BookOpen },
  { labelKey: "vocabulary", href: "/vocabulary", icon: Languages },
  { labelKey: "practice", href: "/practice", icon: Dumbbell },
  { labelKey: "orders", href: "/orders", icon: ShoppingBag },
  { labelKey: "profile", href: "/profile", icon: User },
];

export const adminNavItems = [
  { labelKey: "adminDashboard", href: "/admin", icon: BarChart3 },
  { labelKey: "adminLessons", href: "/admin/lessons", icon: BookOpen },
  { labelKey: "adminVocabulary", href: "/admin/vocabulary", icon: Languages },
  { labelKey: "adminUsers", href: "/admin/users", icon: Users },
];

// Visible only to INSTRUCTOR and ADMIN roles
export const instructorNavItems = [
  { labelKey: "instructorDashboard", href: "/instructor", icon: PenTool },
];
