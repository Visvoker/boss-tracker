import { db } from "@/lib/db";

export default function OrganizationIdPage() {
  async function create(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;

    await db.board.create({
      data: {
        title,
      },
    });
  }

  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board"
          className="border-black border p-1"
        />
      </form>
    </div>
  );
}
