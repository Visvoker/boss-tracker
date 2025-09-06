"use client";

import { useAuth, UserButton, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { userId } = useAuth();
  const { user } = useUser();

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-red-100">
      HomePage
      <div>userId:{userId}</div>
      <div>{user?.fullName}</div>
      <UserButton />
    </main>
  );
}
