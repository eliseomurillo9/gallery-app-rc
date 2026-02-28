import {Popover} from "@shared/UI/Popover/Popover.tsx";
import {t} from "i18next";
import {Button} from "@shared/UI/Button/Button.tsx";
import {useEffect, useState} from "react";
import type {Album, UserAlbum} from "@/types/Album.ts";
import type {Photo} from "@/types/Photo.ts";
import {addPhotoToAlbum, getUserAlbums} from "@services/albumService.ts";
import {userStore} from "@/store/user.ts";
import {getPhotoById} from "@services/galleryService.ts";

type useImageModalProps = {
    toggleModal: () => void;
    photoId: Photo['id'];
    onDelete: (photoId: Photo['id']) => Promise<boolean>
}
export const useImageModal = (props: useImageModalProps) => {
    const {toggleModal, photoId, onDelete} = props;
    const [modalType, setModalType] = useState<
        "addToAlbum" | "deletePhoto" | null
    >(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [albumsList, setAlbumsList] = useState<UserAlbum[]>();
    const [photo, setPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            const {success, data, error} = await getPhotoById(photoId);
            console.log(success);
            if (!success) {
                console.error('Photo not found for id:', error);
            }
            setPhoto(data);
        };

        fetchPhoto();
    }, [photoId, setPhoto]);

    const addPhotoAlbum = async (
        albumId: Album["id"],
        photoId: Photo["id"],
        url: Photo["url"],
    ) => {
        try {
            await addPhotoToAlbum({
                albumId,
                photo: {id: photoId, url},
            });

            setOpenMenu(false);
        } catch (error) {
            console.error("Error adding photo to album:", error);
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
                                    onClick={() => addPhotoAlbum(album.id, photo.id, photo.url)}
                                >
                                    <img src={album.portrait} alt="album portrait"/>{" "}
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
                                action={() => deletePhoto(photo?.id)}
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
        const getAlbumsList = await getUserAlbums(userStore.getUser().id);
        setAlbumsList(getAlbumsList);
    };

    const TOOLBAR = [
        {
            name: "back",
            icon: "back" as const,
            action: () => {
                toggleModal();
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

    const deletePhoto = async (photoId: Photo['id']) => {
        const deleteRequest = await onDelete(photoId);
        if (!deleteRequest) {
          return;
        }
            setOpenMenu(false);
            toggleModal();
    }

    return {renderPopover, TOOLBAR, photo, setPhoto, deletePhoto}
}