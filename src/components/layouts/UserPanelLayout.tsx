import React, { ReactNode } from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import authUser from "@/utils/getUserData";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const user = await authUser();

  if (!user?.name) {
    redirect("/login-register");
  }

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar name={user?.name} />
        <div className={styles.contents}>
          <Topbar name={user?.name} role={user?.role} />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
