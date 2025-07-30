import { useRef, useState } from "react";
import { Icon } from "../../shared/UI/Icon/Icon";
import './upload.css'

export function UploadView() {
  const [updatedFiles, setUpdatedFiles] = useState<File[]>([])
  const inputs = useRef<HTMLInputElement>(null)
  function updatePicList(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    const files = inputs.current?.files
    if (files) {
      setUpdatedFiles((prev) => [...prev, ...Array.from(files)])
    }
  }

    return (
    <div className="upload-view">
      {updatedFiles.length > 0 ? (
        <h2>Here goes the updated photo list</h2>
      ) : (
        <><form action="" className="upload-view--form" onChange={updatePicList}>
            <input ref={inputs} type="file" multiple accept="image/*" capture="user" />
          </form><div className="upload-button">
              <Icon name="upload" size="2xl" color="white" />
            </div><h2>Import your photos</h2><p>Click to choose your photos</p></>

      )}
    </div>
  );
}