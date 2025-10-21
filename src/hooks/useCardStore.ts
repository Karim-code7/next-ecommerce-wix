import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/WixContext";

type ExtendedCart = currentCart.Cart & {
  subtotal?: {
    amount: string;
    convertedAmount?: string;
    formattedAmount?: string;
  };
};

type cartState = {
  cart: ExtendedCart;
  isLoding: boolean;
  counter: number;

  getCart: (wixClient: WixClient) => Promise<void>;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => Promise<void>;
  removeItem: (wixClient: WixClient, itemId: string) => Promise<void>;
  updateItemQuantity: (
    wixClient: WixClient,
    itemId: string,
    quantity: number
  ) => Promise<void>;
};

export const useCartStore = create<cartState>((set) => ({
  cart: {} as ExtendedCart,
  isLoding: false,
  counter: 0,

  getCart: async (wixClient) => {
    set({ isLoding: true });
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || ({} as ExtendedCart),
        isLoding: false,
        counter: cart?.lineItems?.length || 0,
      });
    } catch (error: any) {
      if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
        set({ cart: {} as ExtendedCart, isLoding: false, counter: 0 });
      } else {
        console.error("Error fetching cart:", error);
        set({ cart: {} as ExtendedCart, isLoding: false, counter: 0 });
      }
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set({ isLoding: true });
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity,
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
    set({ isLoding: true });
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );
    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length || 0,
      isLoding: false,
    });
  },

  updateItemQuantity: async (wixClient, itemId, quantity) => {
    set({ isLoding: true });
    const response = await (
      wixClient.currentCart.updateCurrentCartLineItemQuantity as any
    )([{ id: itemId, quantity }]);
    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length || 0,
      isLoding: false,
    });
  },
}));
