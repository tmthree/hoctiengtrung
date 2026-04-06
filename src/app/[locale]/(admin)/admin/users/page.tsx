import { getAllUsers } from "@/lib/queries/admin";
import { UserTable } from "@/components/admin/user-table";

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.search ?? "";

  const { users, total, totalPages } = await getAllUsers({ page, search });

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      <UserTable
        users={users}
        total={total}
        totalPages={totalPages}
        page={page}
        search={search}
      />
    </div>
  );
}
