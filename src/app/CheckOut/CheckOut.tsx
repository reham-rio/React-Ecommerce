"use client";
import { onlinePayment } from "@/apis/payment/checkout.api";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function CheckOut({ cartId }: { cartId: string }) {
  interface formData {
    details: string;
    city: string;
    phone: string;
    postalCode: string;
  }

  const { register, handleSubmit } = useForm<formData>();

  async function handleCheckOut(data: formData) {
    const res = await onlinePayment(cartId, data);
    console.log("res", res);
    if (res.status === "success") window.location.href = res.session.url;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleCheckOut)}
        className="w-1/2 mx-auto my-7"
      >
        <input
          {...register("details")}
          className="w-full my-2 border border-gray-500 p-3 rounded-2xl"
          placeholder="details"
        />
        <input
          {...register("phone")}
          className="w-full my-2 border border-gray-500 p-3 rounded-2xl"
          placeholder="phone"
          type="tel"
        />
        <input
          {...register("city")}
          className="w-full my-2 border border-gray-500 p-3 rounded-2xl"
          placeholder="city"
        />
        <input
          {...register("postalCode")}
          className="w-full my-2 border border-gray-500 p-3 rounded-2xl"
          placeholder="postalCode"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
