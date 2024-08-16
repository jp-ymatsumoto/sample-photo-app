"use client";
import Link from "next/link";
import { HouseIcon, ImageIcon, SquareUserIcon } from "lucide-react";
import { useState } from "react";
import CreatePhotoDialog from "./dialog/CreatePhotoDialog";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 border-r-2 py-2">
        <div className="flex justify-center items-center p-1">
          <Link href="/">
            <div className="flex flex-col justify-center items-center">
              <HouseIcon size={32} />
              <div className="text-xs">Home</div>
            </div>
          </Link>
        </div>
        <div className="flex justify-center items-center p-1">
          <Link href="/categories">
            <div className="flex flex-col justify-center items-center">
              <ImageIcon size={32} />
              <div className="text-xs">Category</div>
            </div>
          </Link>
        </div>
        <div className="flex justify-center items-center p-1">
          <Link href="/profile">
            <div className="flex flex-col justify-center items-center">
              <SquareUserIcon size={32} />
              <div className="text-xs">Profile</div>
            </div>
          </Link>
        </div>
        <div className="flex justify-center items-center p-1">
          <div className="flex flex-col justify-center items-center" onClick={() => setOpen(true)}>
            <ImageIcon size={32} />
            <div className="text-xs">open</div>
          </div>
        </div>
      </div>

      <CreatePhotoDialog open={open} close={() => setOpen(false)} />
    </>
  );
};

export default Sidebar;
