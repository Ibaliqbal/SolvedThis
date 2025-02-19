"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  AlignJustify,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { limitContent } from "@/config/thread";

const editorStyles = `
  .ProseMirror {
    @apply text-foreground max-h-full overflow-y-auto;
  }
  .ProseMirror pre {
    @apply bg-muted text-muted-foreground p-4 rounded-md font-mono;
  }
  .dark .ProseMirror pre {
    @apply bg-gray-800;
  }
  
  .prose ul {
    list-style-type: disc;
    padding-left: 1.5em;
  }

  .prose ol {
    list-style-type: decimal;
    padding-left: 1.5em;
  }

  .prose ul li {
    display: list-item;
  }

  .prose ol li {
    display: list-item;
  }
`;

export default function TextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {
          depth: 10,
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
      Underline,
      FontFamily,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount.configure({
        limit: limitContent,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <style jsx global>
        {editorStyles}
      </style>
      <div
        className={cn(
          "border rounded-md overflow-hidden max-h-[20rem] pb-6 custom-vertical-scroll"
        )}
      >
        <div className="bg-muted p-2 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "bg-muted-foreground/20" : ""
            }
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline") ? "bg-muted-foreground/20" : ""
            }
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" })
                ? "bg-muted-foreground/20"
                : ""
            }
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" })
                ? "bg-muted-foreground/20"
                : ""
            }
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" })
                ? "bg-muted-foreground/20"
                : ""
            }
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" })
                ? "bg-muted-foreground/20"
                : ""
            }
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList") ? "bg-muted-foreground/20" : ""
            }
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList") ? "bg-muted-foreground/20" : ""
            }
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-full p-4">
          <EditorContent
            editor={editor}
            className="prose dark:prose-invert bg-background p-2 outline-none"
          />
        </div>
      </div>
      <div>
        <p className="text-xs mt-3">
          {editor.storage.characterCount.characters()} / {limitContent}{" "}
          characters
        </p>
      </div>
    </div>
  );
}
