import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  addCartItem,
  createCart,
  getCart,
  getCheckoutURL,
  updateCartItem,
} from "../utils/shopify";

const CartContext = createContext({});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [ID, setID] = useLocalStorage("MASAHIROLAMARSH_SHOPIFY_CARTID", null);
  const [data, setData] = useState({});
  const [panelOpen, setPanelOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const router = useRouter();

  // Load cart into state
  useEffect(() => {
    async function fetchCart() {
      if (ID) {
        let cartData = await getCart({ cartId: ID });
        setData(cartData);
      }
    }
    fetchCart();
  }, [ID]);

  // TODO: delete me
  // useEffect(() => {
  //   console.log(data.lines.edges);
  // }, [data]);

  async function newCart(cartInput = {}) {
    let cartData = await createCart(cartInput);
    setData(cartData);
    setID(cartData.id);
  }

  function productVariantInCart(merchandiseId) {
    let ret = false;
    data?.lines?.edges.forEach((edge) => {
      if (edge?.node?.merchandise?.id === merchandiseId) {
        ret = { id: edge.node.id, quantity: edge.node.quantity };
      }
    });
    return ret;
  }

  async function addItem({ merchandiseId, quantity = 1 }) {
    const cartInput = {
      lines: [
        {
          quantity,
          merchandiseId,
        },
      ],
    };

    if (ID) {
      let itemData = productVariantInCart(merchandiseId);
      if (itemData) {
        let variables = {
          cartId: ID,
          lines: { id: itemData.id, quantity: itemData.quantity + quantity },
        };
        let ret = await updateCartItem(variables);
        setData(ret);
      } else {
        let ret = await addCartItem({ cartId: ID, lines: cartInput.lines });
        setData(ret);
      }
    } else {
      await newCart(cartInput);
    }
    setPanelOpen(true);
  }

  async function checkout() {
    let URL = await getCheckoutURL({ cartId: ID });
    router.push(URL);
  }

  async function removeItem(lineItemID) {
    let variables = {
      cartId: ID,
      lines: {
        id: lineItemID,
        quantity: 0,
      },
    };
    let ret = await updateCartItem(variables);
    setData(ret);
  }

  const value = {
    ID,
    setID,
    addItem,
    checkout,
    data,
    removeItem,
    panelOpen,
    setPanelOpen,
    checkoutLoading,
    setCheckoutLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
