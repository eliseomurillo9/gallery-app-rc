import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/UI/Button/Button';
import './imageCard.css';
type ImageCardProps = {
  file: File;
  imageDelete?: () => void;
}
export function ImageCard({ file, imageDelete }: Readonly<ImageCardProps>) {
   const { t } = useTranslation();
  const fileName = file.name.split('.')[0];
  return (
    <div className="image-card card-animation">
      <div className='image-card__img-wrapper'>
      <img src={URL.createObjectURL(file)} alt={file.name} />
      </div>
      <div className='image-card__img-info'>
        <h3>{fileName.length > 15 ? fileName.slice(0, 15) + '...' : fileName}</h3>
        <p>{(file.size / 1024).toFixed(2)} KB</p>
        <p>{file.type}</p>
      </div>
      <div className='image-card__action'>
      <Button variant='danger' placeholder={t('base.delete')} size='large' action={imageDelete} />
      </div>
    </div>
  );
}