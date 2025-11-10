import type { Photo } from "@/types/Photo";
import { Icon } from "../../../../shared/UI/Icon/Icon";
import "./imageModal.css";
type ImageModalProps = {
  isOpen: boolean;
  toggleModal: (open: boolean) => void;
  image: Photo["id"];
};

export function ImageModal({ isOpen, toggleModal, image }: ImageModalProps) {
  console.log(image);
  const toolBar = [
    { name: "back", icon: "back", action: () => toggleModal(false) },
    {
      name: "trash",
      icon: "trash",
      action: () => console.log("Trash clicked"),
    },
    { name: "add", icon: "plus", action: () => console.log("More clicked") },
  ];
  return (
    isOpen && (
      <div className="modal-container">
        <div className="modal-content">
          <div className="tools-bar">
            <button onClick={toolBar[0].action}>
              <Icon name={toolBar[0].icon} size="large" />
            </button>
            <div className="left-tools">
              {toolBar.slice(1, 3).map((item) => (
                <button key={item.name} onClick={item.action}>
                  <Icon name={item.icon} size="large" />
                </button>
              ))}
            </div>
          </div>
          <img src="http://localhost:5173/public/images/20250320_164613.webp" alt="user photo" className="modal-image" />
        </div>
      </div>
    )
  );
}
