//Next, React (core node_modules) imports must be placed here
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "@/utils/Store";
import DropdownLink from "@/components/DropdownLink";

//import COMPOSITES from '@/composites'
import Navbar from "@/composites/Navbar";

//import COMPONENT from '@/components'

const DefaultLayout = ({ title, children, ...props }) => {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };
  return (
    <div className="relative w-full h-full px-4 flex flex-col items-center min-h-screen dark:bg-slate-900 bg-slate-50 pt-64">
      <ToastContainer position="bottom-center" limit={1} />
      <Navbar />
      {children}
    </div>
  );
};

export default DefaultLayout;
