import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AuthForm() {
  return (
    <form className="space-y-2">
      <div className="space-y-1">
        <Label>Email</Label>
        <Input id="email" type="email" />
      </div>

      <div className="space-y-1 mb-4 mt-2 ">
        <Label>Password</Label>
        <Input id="password" type="password" />
      </div>

      <Button>Log In</Button>
    </form>
  );
}
