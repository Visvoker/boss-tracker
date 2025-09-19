"use client";

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-actions";

export default function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "Success!");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <input
        id="title"
        name="title"
        required
        placeholder="Enter a board"
        className="border-black border p-1"
      />
    </form>
  );
}
