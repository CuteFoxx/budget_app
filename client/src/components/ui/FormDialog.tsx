import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { JSX } from "react";

type FormDialogProps = {
  children: React.ReactNode;
  triggerButton: JSX.Element | string;
  title?: string;
};

export function FormDialog({
  children,
  triggerButton,
  title,
}: FormDialogProps) {
  return (
    <Dialog>
      <DialogDescription className="sr-only">Form dialog</DialogDescription>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent forceMount className="sm:max-w-[20rem] md:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
