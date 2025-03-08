"use client";

import { Loader2, Plus } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useActionState, startTransition } from "react";
import { createBook } from "@/actions/createBook.action";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long"
  })
});

export function AddBookDialog() {
  const [state, action, isPending] = useActionState(createBook, null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: ""
    },
    values: state?.values
  });

  const onSubmitForm: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data
  ) => {
    const formData = new FormData();
    formData.append("title", data.title);
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Book</DialogTitle>
          <DialogDescription>Add book to catalog</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)}>
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} name="title" />
                    </FormControl>
                    <FormDescription>This is the title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-start pt-5">
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Create
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isPending}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
