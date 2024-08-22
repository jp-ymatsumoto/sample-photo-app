"use client";
import { FC, MouseEvent, useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { StrapiAuthContext } from "@/provider/StrapiAuth";
import { Comment } from "./CommentSection";

type Props = {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

const CommnetListSection: FC<Props> = ({ comments, setComments }) => {
  const { user } = useContext(StrapiAuthContext);

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    // data-uuid属性からuuidを取得する
    const commentId = e.currentTarget.dataset.uuid;
    const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setComments(comments.filter((c) => c.id !== Number(commentId)));
    }
  };

  return (
    <>
      <h3 className="text-lg font-bold">コメント一覧</h3>
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <div className="flex flex-row justify-between items-center" key={comment.id}>
              <div className="flex flex-row gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="">{comment.attributes.user.data.attributes.username}</div>
                <div className="">{comment.attributes.comment}</div>
              </div>

              <div className="">
                {user?.username === comment.attributes.user.data.attributes.username ? (
                  <Button
                    variant={"default"}
                    size={"sm"}
                    onClick={handleDelete}
                    data-uuid={comment.id}
                  >
                    <TrashIcon size={24} />
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>コメントはありません</div>
      )}
    </>
  );
};

export default CommnetListSection;
