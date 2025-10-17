import { useState } from "react";
import { Icon } from "../../shared/UI/Icon/Icon";
import "./upload.css";
import { ImageCard } from "./components/ImageCard";
import { useTranslation } from "react-i18next";

export function UploadView() {
  const { t } = useTranslation();
  const [imagesList, setImagesList] = useState<File[]>([]);
  function updatePicList(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;
    if (files.length > 10 || imagesList.length + files.length > 10) {
      alert(t("uploadView.alert"));
      const imagesQuantityToLimit = 10 - imagesList.length;
      setImagesList((prev) => [
        ...prev,
        ...files.slice(0, imagesQuantityToLimit),
      ]);
      return;
    }
    setImagesList((prev) => [...prev, ...files]);
  }

  function deleteImage(imageIndex: number) {
    setImagesList(imagesList.filter((_, index) => index !== imageIndex));
  }

  return (
    <section className="upload-view">
      {imagesList.length > 0 ? (
        <div className="upload-view--image-list">
          <h1>{t("uploadView.title")}</h1>
          <div className="upload-view--preview-image">
            {imagesList.map((file, index) => {
              return (
                <ImageCard
                  key={index}
                  file={file}
                  imageDelete={() => deleteImage(index)}
                />
              );
            })}
            <div className="upload-view--add-more">
              <form action="" className="upload-view--form">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  capture="user"
                  onChange={updatePicList}
                />
              </form>
              <div className="upload-button">
                <Icon name="plus" size="base" color="white" />
              </div>
              <h2>{t("uploadView.addMore")}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="upload-view--no-images">
          <form action="" className="upload-view--form">
            <input
              type="file"
              multiple
              accept="image/*"
              capture="user"
              onChange={updatePicList}
            />
          </form>
          <div className="upload-button">
            <Icon name="upload" size="2xl" color="white" />
          </div>
          <h2>{t("uploadView.title")}</h2>
          <p>{t("uploadView.dropzone")}</p>
        </div>
      )}
    </section>
  );
}
