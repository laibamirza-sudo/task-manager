"use client";

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ConfirmDialogProps = {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => void;
};

export default function ConfirmDialog({ trigger, title, description, onConfirm }: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span onClick={() => setOpen(true)}>{trigger}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title || "Confirm Delete"}</DialogTitle>
        <DialogDescription>{description || "Are you sure you want to delete this item?"}</DialogDescription>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}