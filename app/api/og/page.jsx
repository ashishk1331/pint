import { ImageResponse } from "next/server";
export const runtime = "edge";
import { generateJSXMeshGradient as grad } from "meshgrad";

const image = fetch(new URL("images/family-tree.png", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export default async function GET(request) {
  const { searchParams } = new URL(request.url);
  const shadow = searchParams.get("shadow") || "sm";
  const frameGap = searchParams.get("framegap") || "20";
  const radius = searchParams.get("radius") || 20;
  const gradient = grad(6);
  const imageData = await image;
  // console.log(gradient.backgroundImage)
  return new ImageResponse(
    (
      <div
        className="w-[100%] aspect-video justify-center items-center rounded-md flex p-4 bg-black bg-primary/25"
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#06da60",
          backgroundImage: 'linear-gradient(to right, #800080, blue)'
        }}
      >
        <img
          // width="600"
          // height="540"
          src={imageData}
          alt="family-tree"
          className={`mx-auto rounded-md ${shadow === "sm" && "shadow-sm"} 
          ${shadow === "md" && "shadow-md"} 
          ${shadow === "lg" && "shadow-lg"} 
          ${shadow === "xl" && "shadow-xl"} 
          ${shadow === "2xl" && "shadow-2xl"}`}
          style={{
            borderRadius: radius + "px",
            width: 100 - frameGap + "%",
          }}
        />
      </div>
    ),
    {
      width:1600 ,
      height:1200,
    }
  );
}
