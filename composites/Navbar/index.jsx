//Next, React (core node_modules) imports must be placed here
import { useContext, useState, useEffect } from "react";
//import STORE from '@/store'
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import DropdownLink from "@/components/DropdownLink";
//import COMPONENT from '@/components'
import Link from "@/components/Link";
import Logo from "@/components/Logo";
import ThemeToggler from "@/components/ThemeToggler";
import { ShoppingCart } from "@styled-icons/material/ShoppingCart";
import { Login } from "@styled-icons/material/Login";
import { Store } from "@/utils/Store";
const Navbar = (props) => {
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
    <header className=" shadow-md z-50 w-full px-4 fixed flex flex-col items-center top-0 left-0 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-900">
      <nav className="w-full max-w-6xl flex justify-between items-center h-20">
        <Link href="/">
          <Logo size={16} />
        </Link>

        <ul className="flex">
          <li>
            <Link
              className="flex px-4 items-center text-slate-700 dark:text-slate-300	 gap-1 hover:text-teal-500 rounded-md shadow-md p-2 bg-teal-50 dark:bg-teal-900 mr-2"
              href="/cart"
            >
              <ShoppingCart className="w-5" />
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block">
                <Menu.Button className="flex px-4 items-center text-slate-700 dark:text-slate-300	 gap-1 hover:text-teal-500 rounded-md shadow-md p-2 bg-teal-50 dark:bg-teal-900 mr-2">
                  {session.user.name}
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                  {session.user.isAdmin && (
                    <Menu.Item>
                      <DropdownLink
                        className="flex p-2 hover:bg-gray-200"
                        href="/admin/dashboard"
                      >
                        Admin Dashboard
                      </DropdownLink>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <a
                      className="flex p-2 hover:bg-gray-200"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link
                className="flex items-center text-slate-700 dark:text-slate-300	 gap-1 hover:text-teal-500 rounded-md shadow-md p-2 bg-teal-50 dark:bg-teal-900 mr-2"
                href="/login"
              >
                <Login className="w-6" />
                Login
              </Link>
            )}
          </li>
          <li>
            <ThemeToggler />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
