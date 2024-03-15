import CommentComponent from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";
import { FC } from "react";
import { Comment } from "../../../../models/Comment";
interface IComments extends Comment {
  _id: string;
}

interface CommentsProps {
  comments: IComments[];
}

const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <div>
      <p>نظرات ({comments.length}) :</p>
      <hr />
      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {comments.length} دیدگاه برای کپسول قهوه SETPRESSO سازگار با دستگاه
            نسپرسو ( GOLD ) ده -10- عددی
          </p>
          <div>
            {comments.map((comment: IComments) => (
              <CommentComponent {...comment} key={comment._id} />
            ))}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm />
        </div>
      </main>
    </div>
  );
};

export default Comments;
