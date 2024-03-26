import React, { ReactNode } from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbar";
import authUser from "@/utils/getUserData";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await authUser();

  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          <Topbar />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
