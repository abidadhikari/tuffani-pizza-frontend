import Link from "next/link";

export default function InvalidAuthFlow() {
  return (
    <div className="text-center space-y-2">
      <h1 className="font-bold text-xl">Invalid Access</h1>
      <p>Please access this page through the correct flow.</p>
      <Link href="/login" className="text-brand">
        Go to Login
      </Link>
    </div>
  );
}
