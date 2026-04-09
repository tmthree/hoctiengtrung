// HSK level definitions with display colors and word counts
export const hskLevels = [
  { level: 1, label: "HSK 1", labelVi: "Sơ cấp 1", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-500", wordCount: 150 },
  { level: 2, label: "HSK 2", labelVi: "Sơ cấp 2", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-500", wordCount: 300 },
  { level: 3, label: "HSK 3", labelVi: "Trung cấp 1", color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-500", wordCount: 600 },
  { level: 4, label: "HSK 4", labelVi: "Trung cấp 2", color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-500", wordCount: 1200 },
  { level: 5, label: "HSK 5", labelVi: "Cao cấp 1", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-500", wordCount: 2500 },
  { level: 6, label: "HSK 6", labelVi: "Cao cấp 2", color: "text-rose-600", bgColor: "bg-rose-50", borderColor: "border-rose-500", wordCount: 5000 },
  { level: 7, label: "HSK 7", labelVi: "Nâng cao 1", color: "text-indigo-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-500", wordCount: 7000 },
  { level: 8, label: "HSK 8", labelVi: "Nâng cao 2", color: "text-teal-600", bgColor: "bg-teal-50", borderColor: "border-teal-500", wordCount: 9000 },
  { level: 9, label: "HSK 9", labelVi: "Bậc thầy", color: "text-amber-600", bgColor: "bg-amber-50", borderColor: "border-amber-500", wordCount: 11000 },
] as const;

export function getHskLevel(level: number) {
  return hskLevels.find((h) => h.level === level) ?? hskLevels[0];
}
