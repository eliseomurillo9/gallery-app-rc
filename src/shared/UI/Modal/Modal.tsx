import { useEffect, useRef, type ReactNode } from "react";
import "./modal.css";
interface ModalProps {
  isOpen: boolean;
  children?: ReactNode;
}

export function Modal({ isOpen, children }: Readonly<ModalProps>) {
  const modal = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (modal.current && isOpen) {
      modal.current.showModal();
    }
  }, [isOpen]);
  console.log("Modal render with isOpen:", isOpen);
  if (modal.current && isOpen) {
    console.log("Showing modal");
    modal.current.showModal();
  } else {
    modal.current?.close();
  }
  return (
    <dialog className="modal-container" ref={modal}>
      <div className="modal-content">{children}</div>
    </dialog>
  );
}
