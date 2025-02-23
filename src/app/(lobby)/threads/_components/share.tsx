"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Facebook, Twitter, Linkedin, Copy, Phone, Share2 } from "lucide-react";

const shareOptions = (url: string) => {
  return [
    {
      name: "Facebook",
      icon: Facebook,
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        ),
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-background",
    },
    {
      name: "WhatsApp",
      icon: Phone,
      action: () =>
        window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank"),
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-background",
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Check this out!")}`,
          "_blank"
        ),
      color: "text-sky-500 dark:text-sky-400",
      bgColor: "bg-background",
    },
    {
      name: "Telegram",
      icon: Phone,
      action: () =>
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Check this out!")}`,
          "_blank"
        ),
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-background",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        ),
      color: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-background",
    },
  ];
};

const Share = ({ id }: { id: string }) => {
  const [copiedAlert, setCopiedAlert] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/threads/${id}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedAlert(true);
      setTimeout(() => setCopiedAlert(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Share this page
          </DialogTitle>
        </DialogHeader>

        {copiedAlert && (
          <Alert className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
            <AlertDescription>Link copied to clipboard!</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center space-x-2 mt-4">
          <Input value={url} readOnly className="flex-1 bg-muted" />
          <Button variant="secondary" size="icon" onClick={copyToClipboard}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Share via
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {shareOptions(url).map((option) => (
              <Button
                key={option.name}
                variant="outline"
                className={`flex flex-col items-center justify-center gap-2 p-4 h-auto transition-colors ${option.bgColor} hover:bg-opacity-80`}
                onClick={option.action}
              >
                <option.icon className={`w-6 h-6 ${option.color}`} />
                <span className="text-xs font-medium">{option.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Share;
