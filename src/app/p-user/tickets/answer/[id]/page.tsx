import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import connectToDB from "@/configs/db";
import TicketModel from "../../../../../../models/Ticket";
import UserModel from "../../../../../../models/User";

const page = async ({ params }: { params: { id: string } }) => {
  const ticketID = params.id;
  connectToDB();
  const ticket = await TicketModel.findOne({ _id: ticketID }).populate({
    path: "user",
    model: UserModel,
    select: "name",
  });
  const AnswerTicket = await TicketModel.findOne({ mainTicket: ticket?._id });

  console.log(ticket);
  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>تیکت تستی</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>
        <div>
          <Answer
            type="user"
            username={ticket.user.name}
            body={ticket.body}
            date={ticket.createdAt}
          />
          {AnswerTicket && (
            <Answer
              type="admin"
              username={ticket.user.name}
              body={ticket.body}
              date={ticket.createdAt}
            />
          )}
          {!AnswerTicket && (
            <div className={styles.empty}>
              <p>هنوز پاسخی دریافت نکردید</p>
            </div>
          )}{" "}
        </div>
      </main>
    </Layout>
  );
};

export default page;
