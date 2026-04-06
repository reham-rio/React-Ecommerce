"use client";
import { addToCart } from "@/apis/cart/actions/addCart.action";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { toast } from "sonner";

interface pageProps {
  children: ReactNode;
  cls: string;
  id: string;
}
export default function ButtonCom({ children, cls, id }: pageProps) {
  const queryClient = useQueryClient();
  const { data, mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast("product add successfully", { position: "top-right" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast("Login First");
    },
  });
  async function handleAddToCart() {
    mutate(id);
  }

  return (
    <div>
      <Button onClick={handleAddToCart} className={cls}>
        {children}
      </Button>
    </div>
  );
}
