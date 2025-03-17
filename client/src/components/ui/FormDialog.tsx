import { Button } from "@/components/ui/button";
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
  buttonText: JSX.Element | string;
  title?: string;
};

export function FormDialog({ children, buttonText, title }: FormDialogProps) {
  return (
    <Dialog>
      <DialogDescription className="sr-only">Form dialog</DialogDescription>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[20rem] md:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
