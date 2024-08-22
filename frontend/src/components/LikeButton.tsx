"use client";
import { HeartIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";

type LikeData = {
  id: number;
  liked: boolean;
  count: number;
};

type Props = {
  photoId: number;
};

const LikeButton: FC<Props> = ({ photoId }) => {
  const [likeData, setLikeData] = useState<LikeData>({ id: 0, liked: false, count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 自身のいいねを取得する
    (async () => {
      const meResponse = await fetch(`http://localhost:3000/api/photos/${photoId}/likes/me`);
      if (meResponse.status === 200) {
        const { data } = await meResponse.json();
        if (data.length === 1) {
          setLikeData((prev) => ({ ...prev, liked: true, id: data[0].id }));
        }
      }

      const totalResponse = await fetch(`http://localhost:3000/api/photos/${photoId}/likes`);
      if (totalResponse.status === 200) {
        const { data } = await totalResponse.json();
        setLikeData((prev) => ({ ...prev, count: data.total }));
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLike = async () => {
    if (likeData.id !== 0) {
      return;
    }
    const response = await fetch(`http://localhost:3000/api/photos/${photoId}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const { data } = await response.json();
      setLikeData((prev) => ({ liked: true, id: data.id, count: prev.count + 1 }));
    }
  };

  const handleUnlike = async () => {
    if (likeData.id === 0) {
      return;
    }
    const response = await fetch(`http://localhost:3000/api/likes/${likeData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setLikeData((prev) => ({ ...prev, liked: false, id: 0 }));
    }
  };

  return (
    <>
      {likeData.liked ? (
        <Button variant="ghost" onClick={handleUnlike} size={"sm"}>
          <HeartIcon size={24} className="fill-pink-500 text-pink-500" />
          <span>{likeData.count}</span>
        </Button>
      ) : (
        <Button variant="ghost" onClick={handleLike} size={"sm"}>
          <HeartIcon size={24} />
          <span>{likeData.count}</span>
        </Button>
      )}
    </>
  );
};

export default LikeButton;
