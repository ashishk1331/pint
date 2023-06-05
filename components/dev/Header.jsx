import { Atom, DownloadSimple } from "@phosphor-icons/react";
import satori from "satori";
import imageUrl from "../../images/family-tree.png";
import Image from "next/image";
import { useStore } from "../../lib/useStore.js";
import { twMerge } from "tailwind-merge";
import downloader from "@/satori/downloader";
export default function (props) 
{
  const gradient = useStore((state) => state.gradient);
  const shadow = useStore((state) => state.shadow);
  const frameGap = useStore((state) => state.frameGap);
  const radius = useStore((state) => state.radius);
  // downloader();
// SVg Creator
  async function downloader() {
    try {
      const svg = await satori(
        <div
          className="w-full aspect-video rounded-md flex p-4 bg-primary/25"
          style={{ display: "flex" }}
        >
          <img
            src="https://picsum.photos/200/300"
            width={420}
            height={420}
            priority={true}
            alt="family tree"
            className={`mx-auto rounded-md ${shadow === "sm" && "shadow-sm"} 
          ${shadow === "md" && "shadow-md"} 
          ${shadow === "lg" && "shadow-lg"} 
          ${shadow === "xl" && "shadow-xl"} 
          ${shadow === "2xl" && "shadow-2xl"}`}
            style={{
              width: "80%",
              borderRadius: "10px",
            }}
          />
        </div>,
        { width: 600, height: 600, fonts: [] }
      );
      // console.log(svg);
    } catch (error) {
      console.log(error);
    }
  }


  function triggerDownload() {
    var evt = new MouseEvent("click", {
      view: window,
      bubbles: false,
      cancelable: true,
    });
    var a = document.createElement("a");
    a.setAttribute("download", "Image.png");
    a.setAttribute("href", `http://localhost:3000/api/og?shadow=${shadow}&framegap=${frameGap}&radius=${radius}&gradient=${gradient}`);
    a.setAttribute("target", "_blank");
    a.dispatchEvent(evt);
  }

  return (
    <header className="w-full flex items-center gap-4 p-4 px-0">
      <div className="p-2 rounded-full bg-primary">
        <Atom className="text-secondary" size={32} />
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Pint
      </h1>

      <button
        onClick={triggerDownload}
        className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md ml-auto flex items-center gap-2"
      >
        <DownloadSimple className="text-secondary" size={22} />
        Download
      </button>
    </header>
  );
}
