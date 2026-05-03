import type { Photo } from "@/types/Photo";
import "./imageModal.css";
import { Icon } from "@shared/UI/Icon/Icon";
import {useImageModal} from "@shared/UI/Gallery/components/imageModal/hook/useImageModal.tsx";
import {memo} from "react";

type ImageModalProps = {
  isOpen?: boolean;
  toggleModal: () => void;
  photo: Photo;
  onDelete: (photoId: Photo['id']) => Promise<boolean>
};
export const ImageModal = memo((props: ImageModalProps)=>  {
  console.log("Render ImageModal");
  const { isOpen,photo, toggleModal, onDelete } = props;
  const { renderPopover, TOOLBAR } = useImageModal({toggleModal, photo, onDelete});

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
})

