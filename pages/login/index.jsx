//Next, React (core node_modules) imports must be placed here
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import DefaultLayout from "@/layouts/Default";
//import STORE from '@/store'

//import LAYOUT from '@/layouts'

//import VIEWS from '@/views'

//import useFETCHER from '@/tools'

//import COMPOSITES from '@/composites'

//import COMPONENT from '@/components'

const LoginPage = (props) => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <form
      className=" mx-auto max-w-screen-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="mb-4 text-xl">Login</h1>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Please enter email",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "Please enter valid email",
            },
          })}
          className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring;"
          id="email"
          autoFocus
        ></input>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Please enter password",
            minLength: { value: 6, message: "password is more than 5 chars" },
          })}
          className="w-full rounded border p-2  outline-none ring-indigo-300  focus:ring;"
          id="password"
          autoFocus
        ></input>
        {errors.password && (
          <div className="text-red-500 ">{errors.password.message}</div>
        )}
      </div>
      <div className="mb-4 ">
        <button className="rounded bg-gray-800 py-2 px-4 shadow outline-none hover:bg-gray-500  active:bg-gray-600  text-gray-100 w-full">
          Login
        </button>
      </div>
      <div className="mb-4 ">
        Don&apos;t have an account? &nbsp;
        <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
      </div>
    </form>
  );
};
LoginPage.Layout = DefaultLayout;
export default LoginPage;
