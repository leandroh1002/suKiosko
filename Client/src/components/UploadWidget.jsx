import { useEffect, useRef } from "react";

const UploadWidget = ({ setPublicId }) => {

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {// revisar https://demo.cloudinary.com/uw/#/ para cambiar las paletas de colores o otras cosas
        cloudName: 'dn3kedyer',
        uploadPreset: 'p7bxy5ug',
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        sources: ["local", "url"], // restrict the upload sources to URL and local files
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#A64208",
            tabIcon: "#730707",
            menuIcons: "#730707",
            textDark: "#260303",
            textLight: "#FFFFFF",
            link: "#730707",
            action: "#A64208",
            inactiveTabIcon: "#808080",
            error: "#D95555",
            inProgress: "#A64208",
            complete: "#22B573",
            sourceBg: "#FFFFFF"
          },
          fonts: {
            default: null,
            "sans-serif": {
              url: null,
              active: true
            }
          }
        }
      },
      async function (error, result) {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.url;
          console.log(imageUrl)
          setPublicId(imageUrl); 
        }
      }
    );
  }, []);
  return (
    <div >
      <button 
      onClick={() => widgetRef.current.open()}>Subir Archivo</button>
    </div>
  );
};

export default UploadWidget;
