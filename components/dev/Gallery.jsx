"use client";
import { useState, useEffect } from "react";
import { storage } from "@/appwrite/appwriteconfig";
import { variables } from "@/appwrite/variables";
import { useStore } from "@/lib/useStore";
import { Lock } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

function Card({ gradient, imageURI, shadow, frameGap, radius }) {
    return (
        <div
            className="w-full aspect-video rounded-md flex p-4 bg-primary/25"
            style={typeof gradient === 'string' ? JSON.parse(gradient) : gradient}
            // ref={ref}
        >
            <Image
                src={imageURI.href}
                width={420}
                height={420}
                priority={true}
                alt="family tree"
                className={twMerge(
                    "m-auto rounded-md shadow-md",
                    shadow === "sm" && "shadow-sm",
                    shadow === "md" && "shadow-md",
                    shadow === "lg" && "shadow-lg",
                    shadow === "xl" && "shadow-xl",
                    shadow === "2xl" && "shadow-2xl"
                )}
                style={{
                    width: 100 - frameGap + "%",
                    borderRadius: radius + "px",
                }}
            />
        </div>
    );
}
export default function Gallery() {
    const user = useStore((state) => state.user);
    const gallery = useStore((state) => state.gallery);

    console.log(gallery);

    return user ? (
        <ul className="flex items-center gap-4 flex-wrap">
            {gallery.map((item) => (
                <Card {...item} />
            ))}
        </ul>
    ) : (
        <div className="flex flex-col gap-2 justify-center items-center bg-gray-800 rounded-md p-4">
            <Lock size={30} fill="#dddddd" weight="bold" />
            <h3>Sign in to access your gallery</h3>
            <a
                href="/login"
                className="px-3 py-2 bg-primary text-black rounded-md font-semibold"
            >
                Sign in
            </a>
        </div>
    );
}
