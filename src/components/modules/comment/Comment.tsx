import { FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
import { FC } from "react";
import { Comment } from "../../../../models/Comment";

const Comment: FC<Comment> = ({
  body,
  date,
  email,
  productID,
  score,
  username,
}) => {
  return (
    <section className={styles.comment}>
      <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{username}</strong>
            <p>{date.toLocaleDateString()}</p>
          </div>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} color={index < score ? "gold" : "gray"} />
            ))}
          </div>
        </div>
        <p>{body}</p>
      </div>
    </section>
  );
};

export default Comment;
