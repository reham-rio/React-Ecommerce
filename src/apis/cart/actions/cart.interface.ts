import { productInterface } from "@/interfaces/products.interface";

export interface CartRes {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: productType[];
    totalCartPrice: string;
  };
}

export interface productType {
  product: productInterface;
  count: number;
  price: number;
  _id: string;
}
