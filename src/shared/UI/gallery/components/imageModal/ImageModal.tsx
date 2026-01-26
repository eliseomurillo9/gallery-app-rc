import type { Photo } from "@/types/Photo";
import "./imageModal.css";
import { getPhotoById } from "@services/galleryService";
import { useEffect, useState } from "react";
import { Popover } from "@/shared/UI/Popover/Popover";
import type { Album, UserAlbum } from "@/types/Album";
import { addPhotoToAlbum, getUserAlbums } from "@services/albumService";
import { Icon } from "@shared/UI/Icon/Icon";
import { t } from "i18next";
import { Button } from "@shared/UI/Button/Button";
type ImageModalProps = {
  isOpen: boolean;
  toggleModal: (open: boolean) => void;
  photoId: Photo["id"];
};
export function ImageModal({ isOpen, toggleModal, photoId }: ImageModalProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [albumsList, setAlbumsList] = useState<UserAlbum[]>();
  const [photo, setPhoto] = useState<Photo>();
  const [modalType, setModalType] = useState<
    "addToAlbum" | "deletePhoto" | null
  >(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const photo = await getPhotoById(photoId);
      setPhoto(photo);
    };

    fetchPhoto();
  }, [photoId]);

  const addPhoto = async (
    albumId: Album["id"],
    photoid: Photo["id"],
    url: Photo["url"],
  ) => {
    const addToAlbum = await addPhotoToAlbum({
      albumId,
      photo: { id: photoid, url },
    });

    if (addToAlbum) {
      setOpenMenu(false);
    }
  };
  const openAlbumList = async () => {
    setModalType("addToAlbum");
    setOpenMenu(!openMenu);
    const getAlbumsList = await getUserAlbums();
    setAlbumsList(getAlbumsList);
  };

  const toolBar = [
    {
      name: "back",
      icon: "back" as const,
      action: () => {
        toggleModal(false);
        setOpenMenu(false);
      },
    },
    {
      name: "trash",
      icon: "trash" as const,
      action: () => {
        setModalType("deletePhoto");
        setOpenMenu(true);
      },
    },
    {
      name: "add",
      icon: "plus" as const,
      action: openAlbumList,
    },
  ];

  // TODO: Move to hook
  const renderPopover = () => {
    if (modalType === "addToAlbum") {
      return (
        <Popover
          isOpen={openMenu}
          title={t("imageModalMenu.saveToAlbum")}
          close={() => setOpenMenu(false)}
        >
          <div className="menu-list">
            {albumsList && photo ? (
              albumsList.map((album) => (
                <button
                  key={album.id}
                  onClick={() => addPhoto(album.id, photo.id, photo.url)}
                >
                  <img src={album.portrait} alt="album portrait" />{" "}
                  <span>{album.title}</span>
                </button>
              ))
            ) : (
              <h2>no albums</h2>
            )}
          </div>
        </Popover>
      );
    }
    if (modalType === "deletePhoto") {
      return (
        <Popover
          isOpen={openMenu}
          title={t("imageModalMenu.deletePhoto")}
          close={() => setOpenMenu(false)}
        >
          <div className="delete-photo-popover--container">
            <p>Are you sure you want to delete the image</p>
            <div className="delete-photo-popover--actions">
              <Button
                placeholder="Accept"
                variant="primary"
                size="large"
                //TODO: crate delete action
                action={() => console.log("coucou")}
              />
              <Button
                placeholder="Cancel"
                variant="danger"
                size="large"
                action={() => setOpenMenu(false)}
              />
            </div>
          </div>
        </Popover>
      );
    }

    return null;
  };

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
          {photo && (
            <img src={photo.url} alt="gallery item" className="modal-image" />
          )}
        </div>
        {renderPopover()}
      </div>
    )
  );
}
