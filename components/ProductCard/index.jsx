//Next, React (core node_modules) imports must be placed here
import Image from "next/image";
import Link from "next/link";
//import STORE from '@/store'
import { Store } from "@/utils/Store";
const ProductCard = ({ product, addToCartHandler }) => {
  return (
    <div className="flex flex-col jusitfy-start items-start dark:bg-slate-700 bg-gray-200 p-4">
      <div className="group cursor-pointer relative w-full ">
        <div className="">
          <img className="w-full" src={product.image} alt="iphone" />
        </div>
        <div className="z-20 absolute top-4 md:right-0 py-1.5 lg:py-2 px-4 bg-gray-800">
          <p className="text-xs leading-3 text-white ">
            {product.countInStock === "0"
              ? "Out of Stock"
              : `${product.countInStock} in stock`}
          </p>
        </div>
        <div className="z-10 trasition duration-300 ease-in-out top-0 absolute w-full h-full bg-opacity-0 group-hover:bg-gray-800 group-hover:bg-opacity-20"></div>
        <button className="z-50 transition px-4 duration-300 ease-in-out opacity-100 xl:opacity-0  group-hover:opacity-100 absolute w-full xl:py-3.5 bg-transparent xl:bg-gray-800 bottom-4 xl:bottom-6 flex justify-end xl:justify-center space-x-2.5 ">
          <div className="hidden xl:block">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_grid_12-svg-3.svg"
              alt="bag"
            />
          </div>
          <div className="xl:hidden">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_grid_12-svg-5.svg"
              alt="bag"
            />
          </div>
          <p
            className="text-xs xl:text-sm leading-3 xl:leading-none text-gray-800 xl:text-white"
            onClick={() => addToCartHandler(product)}
          >
            Add to Cart
          </p>
        </button>
      </div>
      <Link href={`/product/${product.slug}`}>
        <div className="mt-4 flex justify-between items-center w-full cursor-pointer">
          <p className="text-xl font-medium leading-4  dark:text-slate-300	 text-slate-700">
            {product.name}
          </p>
          <p className="text-xl font-medium leading-none  dark:text-slate-300	 text-slate-700">
            ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
