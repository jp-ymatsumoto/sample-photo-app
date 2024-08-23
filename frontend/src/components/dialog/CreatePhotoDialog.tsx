"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCategories } from "@/lib/strapi";
import { PhotoCategory } from "@/types";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

type Props = {
  open: boolean;
  close: () => void;
};

const CreatePhotoDialog: FC<Props> = ({ open, close }) => {
  const [categories, setCategories] = useState<PhotoCategory[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const categoriesData = await getCategories();
      if (categoriesData) {
        setCategories(categoriesData.data);
        if (categoryRef.current) {
          categoryRef.current.value = categoriesData.data[0].id.toString();
        }
      }
    })();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(imageRef.current?.files);
    // console.log(titleRef.current?.value);
    // console.log(descriptionRef.current?.value);
    // console.log(categoryRef.current?.value);

    // 画像ファイルがundefinedまたはファイルが選択されていない場合は処理を中断する
    if (!imageRef.current?.files?.length) {
      return;
    }
    // // タイトルと説明文がundefinedまたはファイルが選択されていない場合は処理を中断する
    if (!titleRef.current?.value || !descriptionRef.current?.value) {
      return;
    }
    // カテゴリがundefinedまたはファイルが選択されていない場合は処理を中断する
    if (!categoryRef.current?.value) {
      return;
    }

    const formData = new FormData();
    formData.append("files", imageRef.current.files[0]);
    formData.append(
      "data",
      JSON.stringify({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        category: Number(categoryRef.current.value),
      })
    );

    try {
      const response = await fetch("http://localhost:3000/api/photos", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200 || response.status === 201) {
        close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>写真投稿</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="flex flex-row">
            <div className="">
              <div>
                <label htmlFor="" className="sr-only">
                  画像
                </label>
                <input type="file" name="" id="" className="" ref={imageRef} />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <label htmlFor="title">タイトル</label>
                <input type="text" name="title" id="title" ref={titleRef} />
              </div>
              <div className="flex flex-col">
                {/* カテゴリ */}
                <label htmlFor="categoryId">カテゴリ</label>
                <select name="categoryId" id="category" ref={categoryRef}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.attributes.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description">説明文</label>
                <input type="text" name="description" id="description" ref={descriptionRef} />
              </div>
              <div>
                <Button variant="default" className="w-full" type="submit">
                  投稿
                </Button>
              </div>
            </div>
          </div>
        </form>

        <Button variant="default" className="w-full" type="button" onClick={() => close()}>
          キャンセル
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePhotoDialog;
