import { Icon } from "../../shared/UI/Icon/Icon";
import "./upload.css";
import { ImageCard } from "./components/ImageCard";
import { useTranslation } from "react-i18next";
import { usePhotoUpload } from "./hooks/usePhotoUpload";

export function UploadView() {
  const { t } = useTranslation();
  
  const { updatePicList, imagesList, deleteImage } = usePhotoUpload();



  return (
    <section className="upload-view">
      {imagesList.length > 0 ? (
        <div className="upload-view--image-list">
          <h1>{t("uploadView.title")}</h1>
          <div className="upload-view--preview-image">
            {imagesList.map((file: File, index) => {
              return (
                <ImageCard
                  key={`${index}-${file.lastModified}`}
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
