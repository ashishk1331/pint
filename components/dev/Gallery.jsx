"use client";
import { useState, useEffect } from "react";
import { storage,account,databases } from "@/appwrite/appwriteconfig";
import { variables } from "@/appwrite/variables";
import { useStore } from "@/lib/useStore";
import { Lock } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DownloadSimple,X } from "phosphor-react";
function Card({id, gradient, imageURI, shadow, frameGap, radius }) {
  const gallery = useStore((state) => state.gallery);
  const setGallery = useStore((state) => state.setGallery);
    const router=useRouter();
    return (
        <div
            className="w-full  relative group  aspect-video rounded-md flex p-4 bg-primary/25"
            style={typeof gradient === 'string' ? JSON.parse(gradient) : gradient}
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
            {/* <div className="w-full  gap-5 group-hover:flex hidden justify-center items-center  trasition transform duration-300 bg-black bg-opacity-70 h-full absolute top-0 left-0">
            <DownloadSimple className="border-2 cursor-pointer border-gray-300 rounded-md p-1" size={42} fill="#ffffff" weight="bold" />
            <X size={42} onClick={() =>{      
                const promise1 = databases.deleteDocument(variables.APPWRITE_DATABASEID, variables.APPWRITE_COLLECTIONID, id);
                promise1.then(function (response) {
                    const y=gallery.filter(item => item.id!=id)
                    console.log(typeof(gallery))
                    console.log(typeof(y))
                    for (let z in gallery)
                    {
                        console.log(gallery)
                    }
                    setGallery({y})
                    const x=imageURI.pathname;
                    const val=x.slice(x.indexOf("files")+6,x.indexOf("preview")-1)
                    const promise = storage.deleteFile(variables.APPWRITE_BUCKETID, val);
                    router.refresh();
                }, function (error) {
                    console.log(error); // Failure
                });
                
            }} className="border-2 cursor-pointer border-gray-300 rounded-md p-1" fill="#ffffff" weight="bold" />

            </div> */}
        </div>
    );
}
export default function Gallery() {
    const user = useStore((state) => state.user);
    const gallery = useStore((state) => state.gallery);
    const [disable,setDisable]=useState();
    const router=useRouter();
    const auth0Login=() =>
    {
      setDisable(true)
      try{
        const promise=account.createOAuth2Session(
          "auth0",
          "http://localhost:3000/",
          "http://localhost:3000/login"
        );
        promise.then(function(response){
          console.log(response)
        },function(error){
          setDisable(false)
          console.log(error)
        });
      }catch(err)
      {
         console.log("oauth err",err)
      }  
    }

    return user ? (
        <ul className="flex justify-center p-2 items-center xl:h-[420px]  md:h-[420px] scrollbar overflow-auto gap-4 flex-wrap">
            {
                gallery.length==0?<div className="w-full text-center">No items in gallery...</div>:(gallery.map((item) => (
                    <Card key={item.imageId} {...item} />
                )))
            }
           
        </ul>
    ) : (
        <div className="flex flex-col gap-2 justify-center items-center bg-gray-800 rounded-md p-4">
            <Lock size={30} fill="#dddddd" weight="bold" />
            <h3>Sign in to access your gallery</h3>
            <button
                onClick={() => router.push("/login")}
                disabled={disable}
                className={`px-3 py-2 ${disable
                ? "bg-gray-200 opacity-30"
                : "bg-primary"} bg-primary text-black rounded-md font-semibold`}
            >
                Sign in
            </button>
        </div>
    );
}
