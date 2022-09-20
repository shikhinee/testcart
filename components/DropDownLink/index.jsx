//Next, React (core node_modules) imports must be placed here
import Link from "next/link";
//import STORE from '@/store'

const DropDownLink = ({ href, children, ...rest }) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default DropDownLink;
