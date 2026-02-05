import type { Photo } from "@/types/Photo";
import "./imageModal.css";
import { getPhotoById } from "@services/galleryService";
import { useEffect } from "react";
import { Icon } from "@shared/UI/Icon/Icon";
import {useImageModal} from "@shared/UI/Gallery/components/imageModal/hook/useImageModal.tsx";

type ImageModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  photoId: Photo["id"];
};
export function ImageModal({ isOpen, toggleModal, photoId }: ImageModalProps) {
  const { renderPopover, TOOLBAR, photo, setPhoto } = useImageModal(toggleModal);

  useEffect(() => {
    const fetchPhoto = async () => {
      return await getPhotoById(photoId);
    };

    fetchPhoto().then(photoInfo => {
        setPhoto(photoInfo);
    })
        .catch((e: Error) => {
            console.error("Error fetching photo details:", e.message);
        });
  }, [photoId, setPhoto]);


  return (
    isOpen && (
      <div className="modal-container">
        <div className="modal-content">
          <div className="tools-bar">
            <button onClick={TOOLBAR[0].action}>
              <Icon name={TOOLBAR[0].icon} size="large" />
            </button>
            <div className="left-tools">
              {TOOLBAR.slice(1, 3).map((item) => (
                <button key={item.name} onClick={item.action}>
                  <Icon name={item.icon} size="large" />
                </button>
              ))}
            </div>
          </div>
          {photo && (
            <img src={photo.url} alt="gallery item" className="modal-image" />
          )}
        </div>
        {renderPopover()}
      </div>
    )
  );
}
