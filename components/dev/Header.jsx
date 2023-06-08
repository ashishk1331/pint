import {
    Atom,
    DownloadSimple,
    ArrowClockwise,
    Images,
} from "@phosphor-icons/react";
import satori from "satori";
import Image from "next/image";
import { useStore } from "../../lib/useStore.js";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { forwardRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { storage, databases, account } from "@/appwrite/appwriteconfig.js";
import { ID } from "appwrite";
import { variables } from "@/appwrite/variables.js";
import { freeze } from "@/lib/freezeStore.js";
import { useRouter } from "next/navigation";
export default forwardRef(function (props, ref) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const gradient = useStore((state) => state.gradient);
    const shadow = useStore((state) => state.shadow);
    const frameGap = useStore((state) => state.frameGap);
    const radius = useStore((state) => state.radius);
    const imageURI = useStore((state) => state.imageURI);
    const setURI = useStore((state) => state.setURI);
    const file = useStore((state) => state.file);
    const setFile = useStore((state) => state.setFile);
    const freezeStore = freeze((state) => state);
    const [image, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0,
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
                        className={`mx-auto rounded-md ${
                            shadow === "sm" && "shadow-sm"
                        } 
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
    function triggerDownload() {
        if (imageURI != null) {
            downloadScreenshot();
        } else {
            toast.error("Upload Image first");
        }
    }

    function saveEditorDetails(gradient, shadow, radius, frameGap, imageId) {
        try {
            console.log("Saving Editors Info");
            const promise = databases.createDocument(
                `${variables.APPWRITE_DATABASEID}`,
                `${variables.APPWRITE_COLLECTIONID}`,
                ID.unique(),
                {
                    frameGap,
                    radius,
                    shadow,
                    gradient: JSON.stringify(gradient),
                    userId: user.id,
                    imageId,
                }
            );
            promise.then(
                function (response) {
                    // console.log(response);
                    console.log("Saved Editors Info");
                    setLoading(false);
                    toast.success("Added Edit to Galley");
                },
                function (error) {
                    setLoading(false);
                    toast.error("Failed to add edit to gallery");
                    console.log("Error Saving Editors Info", error);
                }
            );
        } catch (error) {
            toast.error("Failed to add edit to gallery");
            console.log(err);
        }
    }

    function uploadImage(freezeStore) {
        try {
            if (user) {
                setLoading(true);
                console.log("Uploading Image");
                const promise = storage.createFile(
                    variables.APPWRITE_BUCKETID,
                    ID.unique(),
                    file
                );
                promise.then(
                    function (response) {
                        // console.log(response);
                        console.log("Image Uploaded Successfully");
                        saveEditorDetails(
                            gradient,
                            shadow,
                            radius,
                            frameGap,
                            response.$id
                        );
                    },
                    function (error) {
                        setLoading(false);
                        toast.error("Failed to add edit to gallery");
                        console.log("Error uploading Image", error);
                    }
                );
            } else {
                router.push("/login");
            }
        } catch (error) {
            toast.error("Failed to add edit to gallery");
            console.log(err);
        }
    }

    const handleLogout = async () => {
        if (user) {
            try {
                const promise = await account.deleteSession("current");
                setUser();
                router.refresh();
            } catch (err) {
                console.log(err);
            }
        } else console.log("No active session");
    };

    // function to download using OG terminology
    function triggerOGDownload() {
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
            <Toaster position="top-center" reverseOrder />
            <div className="p-2 rounded-full bg-primary">
                <Atom className="text-secondary" size={32} />
            </div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Pint
            </h1>

            <div className="ml-auto flex flex-wrap justify-between items-center gap-4 mt-2 lg:mt-0 w-full lg:w-fit">
                <button
                    className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md flex items-center gap-2"
                    onClick={(e) => {
                        setURI(null);
                        setFile(null);
                    }}
                >
                    <ArrowClockwise
                        weight="fill"
                        className="text-secondary"
                        size={22}
                    />
                    Reset
                </button>

                <button
                    onClick={triggerDownload}
                    className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md flex items-center gap-2"
                >
                    <DownloadSimple
                        weight="fill"
                        className="text-secondary"
                        size={22}
                    />
                    Download
                </button>
                {user && (
                    <button
                        onClick={handleLogout}
                        className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md flex items-center gap-2"
                    >
                        <DownloadSimple
                            weight="fill"
                            className="text-secondary"
                            size={22}
                        />
                        Logout
                    </button>
                )}

                <button
                    disabled={loading || imageURI == null ? true : false}
                    onClick={(e) => uploadImage(e, freezeStore)}
                    className={`text-md font-semibold ${
                        loading || imageURI == null
                            ? "bg-gray-200 opacity-30"
                            : "bg-primary"
                    } text-secondary p-2 px-4 rounded-md flex items-center gap-2`}
                >
                    <Images
                        weight="fill"
                        className="text-secondary"
                        size={22}
                    />
                    Save to gallery
                </button>
            </div>
        </header>
    );
});
