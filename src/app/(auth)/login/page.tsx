import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";

export default function LoginPage() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Logo />

      <h1 className="mb-5 text-center text-3xl">Log In</h1>
      <AuthForm />
    </main>
  );
}
