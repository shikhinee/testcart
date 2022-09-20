//Next, React (core node_modules) imports must be placed here

//import STORE from '@/store'

const Logo = ({ size, ...props }) => {
  return (
    <div className="flex dark:text-slate-300	 text-slate-800 hover:text-teal-500">
      <span className="w-2 mr-1 bg-current"></span>
      <div className="font-mono flex flex-col uppercase font-semibold leading-4">
        <span>Test</span>
        <span>Cart</span>
      </div>
    </div>
  );
};

export default Logo;
