import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { FC, MouseEvent, useState } from "react";
import { showSwal } from "@/utils/helpers";

type CommentFormProps = {
  productID: string;
};

const CommentForm: FC<CommentFormProps> = ({ productID }) => {
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(5);

  const setCommentScore = (score: number): void => {
    setScore(score);
    showSwal("امتیاز شما با موفقیت ثبت شد!", "success", [
      "بستن",
      "ادامه ثبت کامنت",
    ]);
  };

  const submitComment = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const comment = { username, email, body, score, productID };

    const res = await fetch(`/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    if (res.status === 201) {
      showSwal("کامنت مورد نظر با موفقیت ثبت شد.", "success", ["بستن", "عالی"]);
      setUsername("");
      setEmail("");
      setScore(5);
      setBody("");
    }
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <IoMdStar onClick={() => setCommentScore(1)} />
          <IoMdStar onClick={() => setCommentScore(2)} />
          <IoMdStar onClick={() => setCommentScore(3)} />
          <IoMdStar onClick={() => setCommentScore(4)} />
          <IoMdStar onClick={() => setCommentScore(5)} />
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          placeholder=""
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" name="" id="" />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={submitComment}>ثبت</button>
    </div>
  );
};

export default CommentForm;
