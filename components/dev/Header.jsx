import { Atom, DownloadSimple, ArrowClockwise } from "@phosphor-icons/react";
import satori from "satori";
import Image from "next/image";
import { useStore } from "../../lib/useStore.js";
import { useScreenshot,createFileName } from "use-react-screenshot";
import { forwardRef } from "react";
export default forwardRef(function (props,ref) {
  const gradient = useStore((state) => state.gradient);
  const shadow = useStore((state) => state.shadow);
  const frameGap = useStore((state) => state.frameGap);
  const radius = useStore((state) => state.radius);
  const imageURI = useStore((state) => state.imageURI);
  const setURI = useStore((state) => state.setURI);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });


  // Function to create svg of the element 
  async function svgCreator() {
    try {
      const svg = await satori(
        <div
          className="w-full aspect-video rounded-md flex p-4 bg-primary/25"
          style={{ display: "flex" }}
        >
          <img
            src={imageURI}
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
      console.log(svg);
    } catch (error) {
      console.log(error);
    }
  }

  // function to download 
  
  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  }; 
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

   // function to download using OG terminology
  function triggerDownload() {
    var evt = new MouseEvent("click", {
      view: window,
      bubbles: false,
      cancelable: true,
    });
    var a = document.createElement("a");
    a.setAttribute("download", "Image.png");
    a.setAttribute(
      "href",
      `http://localhost:3000/api/og?shadow=${shadow}&framegap=${frameGap}&radius=${radius}&gradient=${gradient}&imageURI=${imageURI}`
    );
    a.setAttribute("target", "_blank");
    a.dispatchEvent(evt);
  }

  return (
    <header className="w-full flex flex-wrap items-center gap-4 p-4 px-0">
      <div className="p-2 rounded-full bg-primary">
        <Atom className="text-secondary" size={32} />
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Pint
      </h1>

      <div className="ml-auto flex justify-between items-center gap-4 mt-2 lg:mt-0 w-full lg:w-fit">
        <button
          className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md flex items-center gap-2"
          onClick={(e) => setURI(null)}
        >
          <ArrowClockwise weight="fill" className="text-secondary" size={22} />
          Restart
        </button>

        <button
          onClick={downloadScreenshot}
          className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md flex items-center gap-2"
        >
          <DownloadSimple weight="fill" className="text-secondary" size={22} />
          Download
        </button>
      </div>
    </header>
  );
});
