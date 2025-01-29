"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "./Auth";

const Hero = () => {
  const user = localStorage.getItem("user");
  const router = useRouter();
  const [showModal] = useState(user?false:true);

  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-[92vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center z-10 px-6 md:px-12">
          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Your Academic Journey Starts Here
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            View and track your progress easily with personalized report cards.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
          {
            showModal?
              <AuthModal />
              :
              <button
                onClick={()=>router.push('get-started')}
                    className="px-6 py-3 text-white bg-blue-600 border border-blue-600 dark:hover:bg-gray-800 rounded-lg text-lg transition"
                  >
                    Get Started
                  </button>
                  }
          <Link
            href="/learn-more"
            className="px-6 py-3 text-blue-600 border border-blue-600 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-lg text-lg transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

