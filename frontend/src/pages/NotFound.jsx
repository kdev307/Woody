import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowRightAlt, BackHand } from "@mui/icons-material";

function NotFound() {
    return (
        <>
            {/* <Navbar /> */}
            <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div class="text-center">
                    <h2 class="text-2xl font-semibold text-[#560000]">404</h2>
                    <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-[#014210] sm:text-7xl">
                        Page not found
                    </h1>
                    <p class="mt-6 text-pretty text-lg font-medium text-[#560000] sm:text-xl/8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            class="rounded-md border-2 border-[#560000] bg-[#560000] px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-[#014210] hover:[#014210] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Go back home
                        </Link>
                        <Link
                            to="/store"
                            class="rounded-md border-2 border-[#560000] px-3.5 py-2.5 text-base font-semibold text-[#560000] shadow-sm hover:border-[#014210] hover:text-[#014210] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Check out Products <ArrowRightAlt />
                        </Link>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </>
    );
}

export default NotFound;
