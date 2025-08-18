import { useRef, useState } from "react";
import { Icon } from "../../shared/UI/Icon/Icon";
import './upload.css'
import { ImageCard } from "./components/ImageCard";

export function UploadView() {
  const [imagesList, setImagesList] = useState<File[]>([])
  const inputs = useRef<HTMLInputElement>(null)
  function updatePicList(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const files = inputs.current?.files
    if (files) {
      setImagesList((prev) => [...prev, ...Array.from(files)])
    }
  }

  function deleteImage(imageIndex: number) {
    setImagesList(imagesList.filter((_, index) =>  index !== imageIndex))
  }

    return (
    <div className="upload-view">
      {imagesList.length > 0 ? 
      imagesList.map((file, index) => {
        return (
          <ImageCard key={index} file={file} imageDelete={() => deleteImage(index)} />
        )
            }) : (
        <>
        <pre>{imagesList.length}</pre>
        <form action="" className="upload-view--form">
            <input ref={inputs} type="file" multiple accept="image/*" capture="user" onChange={updatePicList}/>
          </form><div className="upload-button">
              <Icon name="upload" size="2xl" color="white" />
            </div><h2>Import your photos</h2><p>Click to choose your photos</p></>

      )}
    </div>
  );
}