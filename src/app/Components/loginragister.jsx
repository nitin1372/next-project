import Link from "next/link";

export default function LoginRegister() {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-3">
        <Link href="/auth/login" className="hover:text-primary">
          Login
        </Link>
        <span>|</span>
        <Link href="/auth/signup" className="hover:text-primary">
          Register
        </Link>
      </div>
    </div>
  );
}
