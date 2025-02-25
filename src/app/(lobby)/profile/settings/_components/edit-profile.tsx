"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { updateProfile } from "@/actions/user";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  name: string;
  image: string | null | undefined;
  bio: string;
};

export function EditProfile({ name, image, bio }: Props) {
  const [avatar, setAvatar] = useState(image ?? "");
  const [username, setUsername] = useState(name);
  const [userBio, setUserBio] = useState(bio);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const timestamp = new Date().getTime();
      const newFile = new File([file], `${timestamp}-${file.name}`, {
        type: file.type,
      });
      setAvatarFile(newFile);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
    }
  };

  async function saveChange() {
    setLoading(true);
    const form = new FormData();
    form.append("name", username);
    form.append("bio", userBio);
    if (avatarFile) {
      form.append("file", avatarFile);
    }

    const res = await updateProfile(form);

    if (res.status) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="avatar" className="cursor-pointer">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} alt="Profile picture" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={loading}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("avatar")?.click()}
            >
              Change Avatar
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Username</Label>
            <Input
              disabled={loading}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              disabled={loading}
              id="bio"
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
              className="col-span-3 h-20"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={saveChange} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : null}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
