"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthStatus = () => {
  const { authDetails, setAuthDetails } = useAuth();
  const router = useRouter();

  const logout = () => {
    setAuthDetails(null);
    router.push("/login");
  };

  return (
    <div>
      {authDetails ? (
        <>
          <span className="mx-2">Hello, {authDetails?.name}</span>
          <span className="mx-1">|</span>
          <a className="cursor-pointer" onClick={logout}>
            Logout
          </a>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default AuthStatus;
