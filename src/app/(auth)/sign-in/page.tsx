"use client";

import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import {useSession} from "next-auth/react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {data: session} = useSession();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      console.log("awaiting google")
      await signIn("google");
      console.log("google window should have got popped")
    } catch (error) {
      console.log("There was an error")
    } finally {
      console.log("You were logged in");
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div>You are {session?.user.email}</div>
      <div>Your name {session?.user.name}</div>

      <button   
        type="button"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >Google</button>
    </div>
  );
};

export default UserAuthForm;
