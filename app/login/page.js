"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Eye, Atom } from "phosphor-react";
import Loader from "@/components/dev/loader";
import { verifyEmail, verifyPassword } from "@/helper/helper";
import { Toaster, toast } from "react-hot-toast";
import { account } from "@/appwrite/appwriteconfig";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/useStore";
import { ID } from "appwrite";
export default function login() {
  const router = useRouter();
  const [toggleEye, setToggleEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState(true);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const handleLogin = async () => {
    setDisable(true);
    setLoading(true);
    try {
      const promise = await account.createEmailSession(email, password);
      const session = await account.get();
      setUser({ id: session.$id, name: session.name, email: session.email });
    } catch (err) {
      toast.error("error logging in");
      setDisable(false);
      setLoading(false);
      console.log(err);
    }
  };
  const handleSignUp = async () => {
    setLoading(false);
    try {
      setDisable(true);
      if (verifyEmail(email) && verifyPassword(password)) {
        const res = await account.create(ID.unique(), email, password, name);
        const res2 = await account.createEmailSession(email, password);
        const session = await account.get();
        setUser({ id: session.$id, name: session.name, email: session.email });
      }
    } catch (err) {
      toast.error("Error Signing Up");
      setLoading(false);
      setDisable(false);
      console.log(err);
    }
  };
  const auth0Login = () => {
    setDisable(true);
    try {
      const promise = account.createOAuth2Session(
        "github",
        window.location.href,
        window.location.href + "/login"
      );
      promise.then(
        function (response) {
          console.log("loggedin successfully");
        },
        function (error) {
          setDisable(false);
          console.log(error);
        }
      );
    } catch (err) {
      console.log("oauth err", err);
    }
  };
  return (
    <main className="flex min-h-[90vh] text-black  flex-col items-center justify-center md:p-20   ">
      <Toaster position="top-center" reverseOrder />
      <div className="w-[350px]  text-center mx-auto bg-white flex flex-col p-5 border border-gray-300 shadow-sm rounded-md">
        <div>
          <h2 className="text-3xl text-blue-800 font-extrabold">
            {login ? "Sign In" : "Sign Up"}
          </h2>
          <div className="flex gap-2 justify-center items-center mt-1">
            <Atom size={70} fill="#000000" weight="bold" />
          </div>
        </div>
        <button
          onClick={auth0Login}
          disabled={disable}
          className={`mt-6 ${
            !disable ? "bg-black" : "bg-[#dddddd]"
          } rounded-md border-2 border-gray-300  p-2 items-center flex gap-2 text-white justify-center`}
        >
          <Image
            className=""
            src="/github.png"
            alt="Google"
            width={30}
            height={30}
          />
          <span className="font-semibold">
            {login ? "Sign in" : "SignUp"} with Github
          </span>
        </button>
        <div className="mt-4 flex justify-center gap-3 items-center">
          <hr className="bg-yellow-400 rounded-md h-[2px] w-[30%]"></hr>
          <h2 className="font-bold text-xl mt-1">OR</h2>
          <hr className="bg-yellow-400 rounded-md h-[2px] w-[30%]"></hr>
        </div>
        {!login && (
          <div className="mt-3">
            <input
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-2  focus:border-2 focus:rounded-md focus:border-primary outline-none resize-none w-full rounded-md"
              type="text"
              name="name"
              placeholder="Enter Name"
            ></input>
          </div>
        )}
        <div className="mt-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-2  focus:border-2 focus:rounded-md focus:border-primary outline-none resize-none w-full rounded-md"
            type="text"
            name="email"
            placeholder="Enter email"
          ></input>
        </div>

        <div className="mt-3 relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={toggleEye ? "text" : "password"}
            className="p-2 border-2 rounded-md focus:border-2 focus:rounded-md focus:border-primary outline-none resize-none w-full "
            name="password"
            placeholder="Enter password"
          ></input>
          <Eye
            size={25}
            onClick={() => setToggleEye(!toggleEye)}
            className="cursor-pointer absolute right-2 top-2"
            color="#17141a"
            weight="fill"
          />
        </div>
        <div className="mt-5 justify-center flex text-white">
          {!loading ? (
            login ? (
              <button
                disabled={disable}
                onClick={handleLogin}
                className={`${
                  !disable ? "bg-blue-600" : "bg-[#dddddd]"
                } w-full font-bold   p-2 rounded-md`}
                type="submit"
              >
                Login
              </button>
            ) : (
              <button
                disabled={disable}
                onClick={handleSignUp}
                className={`${
                  !disable ? "bg-blue-600" : "bg-[#dddddd]"
                } w-full font-bold   p-2 rounded-md`}
                type="submit"
              >
                Sign Up
              </button>
            )
          ) : (
            <Loader />
          )}
        </div>
        <div className="mt-5">
          {login ? (
            <p>
              Didn't have any account?
              <button
                onClick={() => setLogin(false)}
                className="text-blue-800 underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?
              <button
                onClick={() => setLogin(true)}
                className="text-blue-800 underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
