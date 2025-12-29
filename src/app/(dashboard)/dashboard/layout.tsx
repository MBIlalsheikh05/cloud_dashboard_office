import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Protect dashboard pages: redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }

  // Dashboard shell: preserves existing UI design (Sidebar + Header)
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <div className="max-w-full mx-auto w-full">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
