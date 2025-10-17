import { Icon } from "../../../../shared/UI/Icon/Icon";
import "./imageModal.css";
type ImageModalProps = {
  isOpen: boolean;
  toggleModal: (open: boolean) => void;
  image: { src: string; alt: string };
};

export function ImageModal({ isOpen, toggleModal, image }: ImageModalProps) {
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
          <img src={image.src} alt={image.alt} className="modal-image" />
        </div>
      </div>
    )
  );
}
