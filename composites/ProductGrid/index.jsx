//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

//import COMPONENT from '@/components'
import ProductCard from "@/components/ProductCard";
import data from "@/utils/data";
const ProductGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-1 mx-4 md:grid-cols-2 gap-y-6 lg:gap-y-0 xl:grid-cols-3 md:gap-x-4 lg:gap-x-6 xl:gap-y-16 ">
      {data?.products.map((product) => (
        <ProductCard product={product} key={product?.id || index} />
      ))}
    </div>
  );
};

export default ProductGrid;
