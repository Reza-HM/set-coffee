import styles from "./answer.module.css";

type AnswerProps = {
  type: string;
  body: string;
  username: string;
  date: Date;
};

const Answer = ({ type, body, username, date }: AnswerProps) => {

  console.log(date);
  return (
    <section
      className={type == "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(date).toLocaleTimeString("fa-IR")}</p>
        <p>{new Date(date).toLocaleDateString("fa-IR")}</p>
        <div>
          <div>
            <p>{username}</p>
            <span>{type == "user" ? "کاربر" : "مدیر"}</span>
          </div>
          <img src="/images/shahin.jpg" alt="" />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{body}</p>
      </div>
    </section>
  );
};

export default Answer;
