"use client";
import { useStore } from "@/lib/useStore";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { account, databases, storage } from "@/appwrite/appwriteconfig";
import { variables } from "../appwrite/variables";
import { Query } from "appwrite";
const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setGallery = useStore((state) => state.setGallery);
  const globalLoading = useStore((state) => state.globalLoading);
  const setGlobalLoading = useStore((state) => state.setGlobalLoading);
  useEffect(() => {
    (async function () {
      try {
        setGlobalLoading(true);
        const session = await account.get();
        setUser({
          id: session.$id,
          name: session.name,
          email: session.email,
        });
        setGlobalLoading(false);
        const response = await databases.listDocuments(
          variables.APPWRITE_DATABASEID,
          variables.APPWRITE_COLLECTIONID,
          [Query.equal("userId", [session.$id])]
        );
        for (let i of response.documents) {
          previewImage(i);
        }

        function previewImage(i) {
          const result = storage.getFilePreview(
            `${variables.APPWRITE_BUCKETID}`,
            `${i.imageId}`
          );
          setGallery({
            gradient: i.gradient,
            framGap: i.framGap,
            radius: i.radius,
            shadow: i.shadow,
            imageId: i.imageId,
            imageURI: result,
            id: i.$id,
          });
        }
      } catch (err) {
        setGlobalLoading(false);
        console.log(err);
      }
    })();
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/pint.png" />
        <title>Pint</title>
      </head>
      <body className={inter.className + " bg-secondary text-white"}>
        {children}
      </body>
    </html>
  );
}
