import {Popover} from "@shared/UI/Popover/Popover.tsx";
import {t} from "i18next";
import {Button} from "@shared/UI/Button/Button.tsx";
import {useState} from "react";
import type {Album, UserAlbum} from "@/types/Album.ts";
import type {Photo} from "@/types/Photo.ts";
import {addPhotoToAlbum, getUserAlbums} from "@services/albumService.ts";

export const useImageModal = (toggleModal: (open: boolean) => void) => {
    const [modalType, setModalType] = useState<
        "addToAlbum" | "deletePhoto" | null
    >(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [albumsList, setAlbumsList] = useState<UserAlbum[]>();
    const [photo, setPhoto] = useState<Photo|null>(null);

    const addPhoto = async (
        albumId: Album["id"],
        photoId: Photo["id"],
        url: Photo["url"],
    ) => {
        const addToAlbum = await addPhotoToAlbum({
            albumId,
            photo: { id: photoId, url },
        });

        if (addToAlbum) {
            setOpenMenu(false);
        }
    };

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

    const openAlbumList = async () => {
        setModalType("addToAlbum");
        setOpenMenu(!openMenu);
        const getAlbumsList = await getUserAlbums();
        setAlbumsList(getAlbumsList);
    };

    const TOOLBAR = [
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

    return {renderPopover, TOOLBAR, photo, setPhoto}
}