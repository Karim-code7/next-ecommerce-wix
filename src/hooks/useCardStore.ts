import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { createClient } from "@wix/sdk";

import { WixClient } from "@/context/WixContext";
type cartState = {
  cart: currentCart.Cart;

  isLoding: boolean;

  counter: number;

  getCart: (wixClient: WixClient) => void;

  addItem: (
    wixClient: WixClient,

    productId: string,

    variantId: string,

    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itmeId: string) => void;
};
export const useCartStore = create<cartState>((set, get) => ({
  cart: [],
  isLoding: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || {},
        isLoding: false,
        counter: cart?.lineItems?.length || 0,
      });
    } catch (error: any) {
      if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
        set({
          cart: {} as currentCart.Cart,
          isLoding: false,
          counter: 0,
        });
      } else {
        console.error("Error fetching cart:", error);
        set({ cart: [] as currentCart.Cart, isLoding: false, counter: 0 });
      }
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoding: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });
    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length || 0,
      isLoding: false,
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoding: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );
    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length || 0,
      isLoding: false,
    });
  },
}));
function get() {
  throw new Error("Function not implemented.");
}
