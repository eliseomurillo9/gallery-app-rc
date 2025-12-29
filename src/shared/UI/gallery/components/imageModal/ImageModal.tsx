import type { Photo } from "@/types/Photo";
import "./imageModal.css";
import { getPhotoById } from "@services/galleryService";
import { userStore } from "@/store/user";
import { useState } from "react";
import { Popover } from "@/shared/UI/Popover/Popover";
import type { Album, UserAlbum } from "@/types/Album";
import { addPhotoToAlbum } from "@services/albumService";
import { Icon } from "@shared/UI/Icon/Icon";
type ImageModalProps = {
  isOpen: boolean;
  toggleModal: (open: boolean) => void;
  image: Photo["id"];
};
export function ImageModal({ isOpen, toggleModal, image }: ImageModalProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [albumsList, setAlbumsList] = useState<UserAlbum[]>();
  const photo = getPhotoById(image);

  const addPhoto = (albumId: Album['id'], photoid: Photo['id'], url: Photo['url']) => {
    const addToAlbum = addPhotoToAlbum({albumId, photo: {id: photoid, url}})

    if(addToAlbum) {
      setOpenMenu(false)
    }
  }
  const openAlbumList = () => {
    setOpenMenu(!openMenu);
    const getAlbumsList = userStore.getUserAlbums();
    setAlbumsList(getAlbumsList);
  };

  const toolBar = [
    { name: "back", icon: "back" as const, action: () => toggleModal(false) },
    {
      name: "trash",
      icon: "trash" as const,
      action: () => {
        userStore.deletePhoto(image).finally(() => toggleModal(false));
      },
    },
    {
      name: "add",
      icon: "plus" as const,
      action: () => openAlbumList(),
    },
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
          {photo && (
            <img src={photo.url} alt="user photo" className="modal-image" />
          )}
        </div>
        <Popover isOpen={openMenu} title="hello moto">
          <div>
            <ul className="menu-list">
              {albumsList &&
                albumsList.map((album) => (
                  <li
                    key={album.id}
                    onClick={() => addPhoto(album.id, photo.id, photo.url)}
                  >
                    <img src={album.portrait} alt="album portrait" />{" "}
                    <span>{album.title}</span>
                  </li>
                ))}
            </ul>
          </div>
        </Popover>
      </div>
    )
  );
}
