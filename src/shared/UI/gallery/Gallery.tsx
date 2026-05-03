import {Fragment} from "react/jsx-runtime";
import "./Gallery.css";
import {lazy, useCallback, useState} from "react";
import type {AlbumPhoto, Photo} from "@/types/Photo"
import {ImgElement} from "@shared/UI/Gallery/components/imgElement/ImgElement.tsx";
import {getPhotoById} from "@services/galleryService.ts";

interface GalleryProps {
    photos: Photo[] | AlbumPhoto[];
    onPhotoDelete: (photoId: Photo['id']) => Promise<boolean>
}

const ImageModal = lazy(() => import("./components/imageModal/ImageModal").then(module => ({default: module.ImageModal})));

export function Gallery({photos, onPhotoDelete}: Readonly<GalleryProps>) {
    const [photoToOpen, setphotoToOpen] = useState<Photo | null>(null);

    const handlePhotoDelete = useCallback(async (photoId: Photo['id']) => {
        return onPhotoDelete(photoId);
    }, [onPhotoDelete]);

    const handleClick = useCallback(async (photoIdentifier?: Photo["id"]) => {
        if (photoIdentifier) {
            const {success, data, error} = await getPhotoById(photoIdentifier);
            if (!success) {
                console.error('Photo not found for id:', error);
                return;
            }
            setphotoToOpen(data);
            return;
        }

        setphotoToOpen(null);
    }, []);

    return (
        <div className="gallery">
            {photos && photos.length !== 0 ? (
                photos.map((photo: Photo | AlbumPhoto) => {
                    return (
                        <Fragment key={photo.id}>
                            <ImgElement
                                ImgSrc={photo.url}
                                altText="Image from user album"
                                action={() => handleClick(photo.id)}
                            />
                        </Fragment>
                    );
                })
            ) : (
                <pre>No photos</pre>
            )}
            {!!(photoToOpen?.id) && (
                <ImageModal isOpen={true} toggleModal={handleClick} photo={photoToOpen} onDelete={handlePhotoDelete}/>
            )}
        </div>
    );
}
