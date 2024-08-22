"use client";

import { StrapiAuthContext } from "@/provider/StrapiAuth";
import { FC, useContext, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { Comment } from "./CommentSection";

type Props = {
  photoId: number;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

const CommentFormSection: FC<Props> = ({ photoId, comments, setComments }) => {
  const commnetRef = useRef<HTMLInputElement>(null);
  const { user } = useContext(StrapiAuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = commnetRef.current?.value;
    if (comment?.length === 0) {
      return;
    }

    const response = await fetch(`http://localhost:3000/api/photos/${photoId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          comment,
        },
      }),
    });
    if (response.status === 200) {
      commnetRef.current!.value = "";
      const { data } = await response.json();
      const newComment: Comment = {
        id: data.id,
        attributes: {
          ...data.attributes,
          user: { data: { id: 0, attributes: { username: user?.username } } },
        },
      };
      setComments([...comments, newComment]);
    }
  };

  return (
    <>
      <h3>コメント投稿</h3>
      <form className="flex flex-row h-10" onSubmit={handleSubmit}>
        <div className="grow">
          <label htmlFor="comment" className="sr-only">
            コメント
          </label>
          <Input
            type="text"
            placeholder="コメントを入力してください"
            id="comment"
            className="rounded-r-none h-full"
            ref={commnetRef}
          />
        </div>
        <div className="flex-none">
          <Button type="submit" size={"sm"} className="rounded-l-none h-full">
            <SendIcon size={24} />
          </Button>
        </div>
      </form>
    </>
  );
};

export default CommentFormSection;
