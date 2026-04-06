"use client";
import { getCart } from "@/apis/cart/cart.api";
import { Button } from "@/components/ui/button";
import { CiTrash } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItemCart } from "@/apis/cart/actions/deleteCart.action";
import { CartRes } from "@/apis/cart/actions/cart.interface";
import { Spinner } from "@/components/ui/spinner";
import Loading from "../_components/Loading/Loading";
import { updateCart } from "@/apis/cart/actions/updateCart.action";
import { clearCart } from "@/apis/cart/actions/clearCart.action";
import Link from "next/link";

export default function Cart() {
  // const data = await getCart();
  // console.log("data", data);

  const { data } = useQuery<CartRes>({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await fetch(`/api/cart`);
      if (!data.ok) throw new Error("failed to fetch cart");
      return data.json();
    },
  });
  console.log(data);

  const queryClient = useQueryClient();
  const {
    mutate: delMutate,
    isPending: delPending,
    data: delData,
  } = useMutation({
    mutationFn: deleteItemCart,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const {
    mutate: updateMutate,
    isPending: updatePending,
    data: updateData,
  } = useMutation({
    mutationFn: updateCart,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  function handleMutateIncrease(productId: string, count: number) {
    updateMutate({ productId, count });
  }

  function handleMutateDecrease(productId: string, count: number) {
    updateMutate({ productId, count });
  }

  if (delPending || updatePending) return <Loading></Loading>;

  const {
    mutate: clearMutate,
    data: clearData,
    isPending: clearPending,
  } = useMutation({
    mutationFn: clearCart,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  function handleClear() {
    clearMutate();
  }
  if (!data?.numOfCartItems) {
    return <h2>Cart is Empty</h2>;
  }

  return (
    <>
      <h1 className="my-2">
        Total CartPrice :{" "}
        <span className="font-bold text-green-500">
          {" "}
          {data?.data?.totalCartPrice} EGP
        </span>
      </h1>
      <h2 className="my-2">
        numOfCartItems : <span> {data?.numOfCartItems}</span>
      </h2>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableHead>ProductName</TableHead>
            <TableHead>ProductImage</TableHead>
            <TableHead>ProductPrice</TableHead>
            <TableHead>ProductCount</TableHead>
            <TableHead>Actions</TableHead>
          </TableHeader>

          <TableBody>
            {data?.data.products.map((prod) => (
              <>
                <TableRow>
                  <TableCell>{prod.product.title}</TableCell>
                  <TableCell>
                    <img
                      src={prod?.product?.imageCover}
                      className="w-[100px]"
                    />
                  </TableCell>
                  <TableCell>{prod?.price} EGP</TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Button
                        onClick={() =>
                          handleMutateIncrease(
                            prod?.product?._id,
                            prod?.count + 1,
                          )
                        }
                      >
                        +
                      </Button>
                      <span>{prod?.count}</span>
                      <Button
                        onClick={() =>
                          handleMutateDecrease(
                            prod?.product?._id,
                            prod?.count - 1,
                          )
                        }
                      >
                        -
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {
                      <CiTrash
                        className="text-lg text-red-500"
                        onClick={() => delMutate(prod?.product?._id)}
                      ></CiTrash>
                    }
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-full my-5 flex justify-end">
        <Button onClick={handleClear}>Clear Cart</Button>
        <Link href={"/checkout/${data?.cartId}"}>
          <Button>Check Out</Button>
        </Link>
      </div>
    </>
  );
}
