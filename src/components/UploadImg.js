import { useRef, useState, useEffect } from "react";
// import styles from "../styles/Home.module.css";
import user from '../assist/user.png'
export default function UploadPhoto() {
  const [image, setImage] = useState ();
  const [preview, setPreview] = useState ();
  const fileInputRef = useRef ();
 
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result );
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <div  >
      <form>
        {preview ? (
          <img
            src={preview}
            style={{ objectFit: "cover",borderRadius:"50%",cursor:"pointer" }}
            onClick={() => {
              // setImage(null);
            }}
            alt='pro'
            height='150px' weight='150px'
            className='profile-image'
           />
        ) : (
          <button
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
          >
            <img src ={user} alt='user-profile' height='150px' weight='150px' />

           </button>
        )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
      </form>
    </div>
  );
}