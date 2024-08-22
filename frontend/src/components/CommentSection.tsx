"use client";
import { FC, useContext, useEffect, useState } from "react";
import CommentFormSection from "./CommentFormSection";
import CommnetListSection from "./CommentListSection";
import { StrapiAuthContext } from "@/provider/StrapiAuth";

type Props = {
  photoId: number;
};

export type Comment = {
  id: number;
  attributes: {
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: {
      data: {
        id: number;
        attributes: {
          username: string;
        };
      };
    };
  };
};

const CommentSection: FC<Props> = ({ photoId }) => {
  const { user } = useContext(StrapiAuthContext);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/photos/${photoId}/comments`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        const { data } = await res.json();
        console.log(data);
        setComments(data);
      }
    })();
  }, []);

  return (
    <div className="">
      {user !== null && (
        <CommentFormSection
          photoId={Number(photoId)}
          comments={comments}
          setComments={setComments}
        />
      )}
      <CommnetListSection comments={comments} setComments={setComments} />
    </div>
  );
};

export default CommentSection;
