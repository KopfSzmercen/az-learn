"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const createBookSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long"
  })
});

export async function createBook(_: unknown, formData: FormData) {
  const formValues = {
    title: formData.get("title") as string
  };

  const { success, error, data } = createBookSchema.safeParse(formValues);

  if (!success) {
    return {
      error: error.flatten().fieldErrors.title,
      values: formValues
    };
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/books", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    return {
      error: "Failed to create book",
      values: formValues
    };
  }

  revalidatePath("/books");

  return { success: true };
}
