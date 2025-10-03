"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type BossDeleteConfirmProps = {
  onConfirm: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export function BossDeleteConfirm({
  onConfirm,
  disabled,
  children,
}: BossDeleteConfirmProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" title="刪除" disabled={disabled}>
          {children}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>確定要刪除嗎？</AlertDialogTitle>
          <AlertDialogDescription>
            此操作無法復原，該Boss資料將永久刪除。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false); // 自行關閉
            }}
          >
            刪除
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
