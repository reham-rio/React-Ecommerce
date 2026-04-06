"use client";

import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, loginSchemaType } from "../schema/login.schema";
import { loginFn } from "../actions/login.sction";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: loginSchemaType) {
    setLoading(true);
    try {
      const isSuccessfulRegister = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/home",
        ...data,
      });
      //       const isSuccessfulRegister = await loginFn(data);
      if (isSuccessfulRegister) {
        toast.success("User Logged Successfully", {
          position: "top-right",
        });

        setTimeout(() => {
          router.push("/home");
        }, 300);
        reset();
      } else {
        toast.success("incorrect email or password", {
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast.error(error?.message, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="w-2/3 mx-auto my-5">
        <FieldGroup>
          {/* {User Email} */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">User Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please Enter Your Email"
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* {User Password} */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">User Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please Enter Your Password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="justify-between flex">
          <Button className="my-5">
            {isLoading ? <Spinner></Spinner> : "Login"}
          </Button>
          <Link href={"/register"} className="text-xl text-sky-800 text-center">
            I Don't Have an account
          </Link>
        </div>
      </form>
    </>
  );
}
