import { useState,useEffect } from "react";
import { storage } from "@/appwrite/appwriteconfig";
import { variables } from "@/appwrite/variables";
import { useStore } from "@/lib/useStore";
import { Lock } from "phosphor-react";
function Card({gradient,imageURI,shadow,frameGap})
{
   return(<div
    className="w-full aspect-video rounded-md flex p-4 bg-primary/25"
    style={gradient}
    ref={ref}
  >
    <Image
      src={imageURI}
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
  </div>)
}
export default function Gallery()
{
   const user=useStore(state => state.user)
	
	
	

	return(
		<>
      {
         user?(
         <div>Gallery to implemented here</div>
         ):(
         <div className="flex flex-col gap-2 justify-center items-center bg-gray-800 rounded-md p-4">
                <Lock size={30} fill="#dddddd" weight="bold"/>
                <h3>Sign in to access your gallery</h3>
                <a href="/login" className="px-3 py-2 bg-primary text-black rounded-md font-semibold">Sign in</a>
         </div>)
      }
		
		</>
	)
}


