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
import { registerSchema, registerSchemaType } from "../schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFn } from "../actions/register.action";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner"

export default function RegisterForm() {

  const [isLoading, setLoading] = useState(false)

  const router = useRouter();

  const { handleSubmit, control, reset } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

   async function handleRegister(data: registerSchemaType) {
    setLoading(true)
try {
      const isSuccessfulRegister = await registerFn(data);
if (isSuccessfulRegister) {
toast.success("User Created Successfully", {
  position:"top-right"
})

setTimeout(()=>{
 router.push('/login')
}, 300);
reset()
}
} catch (error: any) {
  toast.error(error?.message, {
    position:"top-right"
  })
}
finally{
  setLoading(false)
}
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-2/3 mx-auto my-5"
      >
        <FieldGroup>
          {/* {User Name} */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">User Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please Enter Your Name"
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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

          {/* {User RePassword} */}
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="rePassword">User RePassword</FieldLabel>
                <Input
                  {...field}
                  id="rePassword"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please Enter Your RePassword"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* {User Phone} */}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">User Phone</FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="Please Enter Your Phone"
                  autoComplete="off"
                  type="tel"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="justify-between flex">
          <Button className="my-5">{isLoading?<Spinner></Spinner> : "Register"}</Button>
          <Link href={"/login"} className="text-xl text-sky-800 text-center">
            Already Have Account
          </Link>
        </div>
      </form>
    </>
  );
}
