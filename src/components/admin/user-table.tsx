"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserRole, updateUserPlan } from "@/lib/actions/admin-user-actions";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  planExpiresAt: Date | null;
  createdAt: Date;
}

interface Props {
  users: User[];
  total: number;
  totalPages: number;
  page: number;
  search?: string;
}

export function UserTable({ users, total, totalPages, page, search = "" }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [searchVal, setSearchVal] = useState(search);

  function applyFilter(newSearch?: string) {
    const params = new URLSearchParams();
    const s = newSearch ?? searchVal;
    if (s) params.set("search", s);
    params.set("page", "1");
    router.push(`/admin/users?${params.toString()}`);
  }

  function changePage(p: number) {
    const params = new URLSearchParams();
    if (searchVal) params.set("search", searchVal);
    params.set("page", String(p));
    router.push(`/admin/users?${params.toString()}`);
  }

  function handleRoleChange(userId: string, role: "LEARNER" | "ADMIN") {
    startTransition(async () => { await updateUserRole(userId, role); });
  }

  function handlePlanChange(userId: string, plan: "FREE" | "PREMIUM") {
    // Default to 1 month when upgrading to PREMIUM
    const months = plan === "PREMIUM" ? 1 : undefined;
    startTransition(async () => { await updateUserPlan(userId, plan, months); });
  }

  function formatExpiry(date: Date | null) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("vi-VN");
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Tìm theo tên hoặc email..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilter()}
          className="max-w-xs"
        />
        <Button variant="outline" onClick={() => applyFilter()}>Tìm</Button>
      </div>

      <p className="text-sm text-muted-foreground">Tổng: {total} người dùng</p>

      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Họ tên</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Vai trò</th>
              <th className="text-left px-4 py-3 font-medium">Gói</th>
              <th className="text-left px-4 py-3 font-medium">Hết hạn</th>
              <th className="text-left px-4 py-3 font-medium">Ngày tạo</th>
              <th className="text-right px-4 py-3 font-medium">Thay đổi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-muted-foreground">
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={user.plan === "PREMIUM" ? "default" : "outline"}
                    className={
                      user.plan === "PREMIUM"
                        ? "bg-amber-500 text-white border-amber-500"
                        : ""
                    }
                  >
                    {user.plan}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatExpiry(user.planExpiresAt)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Select
                      defaultValue={user.role}
                      onValueChange={(v) => handleRoleChange(user.id, v as "LEARNER" | "ADMIN")}
                    >
                      <SelectTrigger className="w-28 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LEARNER">LEARNER</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      defaultValue={user.plan}
                      onValueChange={(v) => handlePlanChange(user.id, v as "FREE" | "PREMIUM")}
                    >
                      <SelectTrigger className="w-28 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FREE">FREE</SelectItem>
                        <SelectItem value="PREMIUM">PREMIUM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => changePage(page - 1)}
          >
            Trước
          </Button>
          <span className="flex items-center text-sm px-2">{page} / {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => changePage(page + 1)}
          >
            Sau
          </Button>
        </div>
      )}
    </div>
  );
}
