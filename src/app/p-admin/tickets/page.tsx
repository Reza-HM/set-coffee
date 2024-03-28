import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/tickets/table.module.css";
import Table from "@/components/templates/p-admin/tickets/Table";
import connectToDB from "@/configs/db";
import TicketModel from "../../../../models/Ticket";
import UserModel from "../../../../models/User";
import DepartmentModel from "../../../../models/Department";

const page = async () => {
  connectToDB();
  const tickets = await TicketModel.find({ isItAnswer: false })
    .sort({ _id: -1 })
    .populate({ path: "user", model: UserModel })
    .populate({ path: "department", model: DepartmentModel })
    .lean();

  return (
    <Layout>
      <main>
        {tickets.length === 0 ? (
          <p className={styles.empty}>تیکتی وجود ندارد</p>
        ) : (
          <Table
            tickets={JSON.parse(JSON.stringify(tickets))}
            title="لیست کاربران"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
