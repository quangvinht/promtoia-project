"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/Logo.svg"
          loading="lazy"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex agp-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <div className="flex sm:flex-col md:flex-row">
            {/* {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className={` mx-1 ${session ? "hidden" : "black_btn"} `}
                  >
                    Sign In with {provider.name}
                  </button>
                );
              })} */}
            {providers?.facebook && (
              <button
                type="button"
                onClick={() => {
                  signIn("facebook");
                }}
                className={` mx-1  flex items-center black_btn  `}
              >
                Sign In with
                <Image
                  src="assets/icons/facebook.svg"
                  width={20}
                  height={20}
                  alt="loader"
                  className="object-contain ml-1"
                />
              </button>
            )}
            {providers?.google && (
              <button
                type="button"
                onClick={() => {
                  signIn("google");
                }}
                className={` mx-1  flex items-center black_btn  `}
              >
                Sign In with
                <Image
                  src="assets/icons/google.svg"
                  width={20}
                  height={20}
                  alt="loader"
                  className="object-contain ml-1"
                />
              </button>
            )}
          </div>
        )}
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setToggleDropDown((prevState) => !prevState);
              }}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn my-1 md:my-0"
                  >
                    Sign In with {provider.name}
                  </button>
                );
              })} */}
            {providers?.facebook && (
              <button
                type="button"
                onClick={() => {
                  signIn("facebook");
                }}
                className={` mx-1 mb-2  flex items-center black_btn  `}
              >
                Sign In with
                <Image
                  src="assets/icons/facebook.svg"
                  width={20}
                  height={20}
                  alt="loader"
                  className="object-contain ml-1"
                />
              </button>
            )}
            {providers?.google && (
              <button
                type="button"
                onClick={() => {
                  signIn("google");
                }}
                className={` mx-1  flex items-center black_btn  `}
              >
                Sign In with
                <Image
                  src="assets/icons/google.svg"
                  width={20}
                  height={20}
                  alt="loader"
                  className="object-contain ml-1"
                />
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
