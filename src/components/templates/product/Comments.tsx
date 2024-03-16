import CommentComponent from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";
import { FC } from "react";
import { IComment } from "../../../../models/Comment";
interface IComments extends IComment {
  _id: string;
}

interface CommentsProps {
  comments: IComments[];
  productID: string;
}

const Comments: FC<CommentsProps> = ({ comments, productID }) => {
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
            {comments.map(
              (comment) =>
                comment.isAccept && (
                  <CommentComponent {...comment} key={comment._id} />
                )
            )}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productID={productID} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
