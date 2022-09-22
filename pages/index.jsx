import Head from "next/head";
import DefaultLayout from "@/layouts/Default";
import db from "@/utils/db";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import ProductCard from "@/components/ProductCard";
import Product from "@/models/Product";
import { Store } from "@/utils/Store";
const RootPage = ({ products }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };
  //console.log(products)
  return (
    <main className=" absolute w-full h-full pt-16 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-900">
      <Head>
        {/* TITLE */}
        <title>Test Cart</title>
        <meta property="og:title" content="Solid Project 2.5" key="title" />
      </Head>

      <h1 className="font-semibold text-4xl dark:text-slate-300	 text-slate-700 mb-4 sm:text-6xl">
        My Logitech Keyboard Store
      </h1>
      <div className="grid grid-cols-1 mx-4 md:grid-cols-2 gap-y-6 lg:gap-y-0 xl:grid-cols-3 md:gap-x-4 lg:gap-x-6 xl:gap-y-16 ">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </main>
  );
};

// LAYOUT DECLARATION
RootPage.Layout = DefaultLayout;

export default RootPage;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
