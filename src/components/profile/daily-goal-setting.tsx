"use client";
// Client Component — slider to configure daily study goal in minutes
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updateDailyGoal } from "@/lib/actions/profile-actions";

interface DailyGoalSettingProps {
  initialGoal: number;
}

export function DailyGoalSetting({ initialGoal }: DailyGoalSettingProps) {
  const [goal, setGoal] = useState(initialGoal);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    const result = await updateDailyGoal(goal);
    setSaving(false);
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(result.error ?? "Lỗi không xác định");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Mục tiêu hàng ngày</CardTitle>
        <CardDescription>Đặt mục tiêu học tập mỗi ngày (phút)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">5 phút</span>
            <span className="font-semibold text-foreground">{goal} phút/ngày</span>
            <span className="text-muted-foreground">120 phút</span>
          </div>
          <Slider
            min={5}
            max={120}
            step={5}
            value={goal}
            onValueChange={(val) => setGoal(typeof val === "number" ? val : goal)}
            className="w-full"
          />
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <Button onClick={handleSave} disabled={saving} size="sm">
          {saving ? "Đang lưu..." : saved ? "Đã lưu!" : "Lưu mục tiêu"}
        </Button>
      </CardContent>
    </Card>
  );
}
