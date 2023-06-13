import {
  Atom,
  DownloadSimple,
  ArrowClockwise,
  Images,
} from "@phosphor-icons/react";
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
  const [disable, setDisable] = useState(false);
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
  const setGallery = useStore((state) => state.setGallery);
  const gallery = useStore((state) => state.gallery);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  // function to download

  const download = (image, { name = "Pint", extension = "png" } = {}) => {
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

  function saveEditorDetails(gradient, shadow, radius, frameGap, image) {
    try {
      console.log("Saving Editors Info");
      console.log(image);
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
          imageId: image.$id,
        }
      );
      promise.then(
        function (response) {
          const result = storage.getFilePreview(
            `${variables.APPWRITE_BUCKETID}`,
            `${image.$id}`
          );
          console.log("Saved Editors Info");
          setLoading(false);
          setGallery({
            frameGap,
            radius,
            shadow,
            gradient: gradient,
            imageId: image.$id,
            imageURI: result,
            id: response.$id,
          });
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
            console.log("Image Uploaded Successfully");
            saveEditorDetails(gradient, shadow, radius, frameGap, response);
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

  const auth0Login = () => {
    setDisable(true);
    try {
      const promise = account.createOAuth2Session(
        "auth0",
        window.location.href,
        window.location.href+"/login"
      );
      promise.then(
        function (response) {
          console.log(response);
        },
        function (error) {
          setDisable(false);
          console.log(error);
        }
      );
    } catch (err) {
      console.log("oauth err", err);
    }
  };

  const handleLogout = async () => {
    if (user) {
      try {
        const promise = account.deleteSession("current");
        promise.then(
          () => {
            setUser();
            toast.loading("Logging Out...", { duration: 1000 });
            router.refresh();
          },
          (err) => {
            toast.error("failed to logout...");
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else console.log("No active session");
  };
  return (
    <header className="w-full flex flex-wrap items-center gap-4 p-4 px-0">
      <Toaster position="top-center" reverseOrder />
      <div className="p-2 rounded-full bg-primary">
        <Atom className="text-secondary" size={32} />
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Pint
      </h1>

      <div className="ml-auto flex  flex-wrap justify-center items-center gap-4 mt-2 lg:mt-0 w-full lg:w-fit">
        <button
          className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md flex items-center gap-2"
          onClick={(e) => {
            setURI(null);
            setFile(null);
          }}
        >
          <ArrowClockwise weight="fill" className="text-secondary" size={22} />
          Reset
        </button>

        <button
          onClick={triggerDownload}
          className="text-md font-semibold bg-primary text-secondary p-2 px-4 rounded-md flex items-center gap-2"
        >
          <DownloadSimple weight="fill" className="text-secondary" size={22} />
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
              ? "bg-gray-200 opacity-80"
              : "bg-primary"
          } text-secondary p-2 px-4 rounded-md flex items-center gap-2`}
        >
          <Images weight="fill" className="text-secondary" size={22} />
          Save to gallery
        </button>
      </div>
    </header>
  );
});
