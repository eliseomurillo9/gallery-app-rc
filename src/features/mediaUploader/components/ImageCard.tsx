import { Button } from '../../../shared/UI/Button/Button';
import './imageCard.css';
type ImageCardProps = {
  file: File;
  onDelete?: () => void;
}
export function ImageCard({ file, onDelete }: Readonly<ImageCardProps>) {
  return (
    <div className="image-card">
      <div className='image-card__img-wrapper'>
      <img src={URL.createObjectURL(file)} alt={file.name} />
      </div>
      <div className='image-card__img-info'>
        <h3>{file.name.split('.')[0]}</h3>
        <p>{(file.size / 1024).toFixed(2)} KB</p>
        <p>{file.type}</p>
      </div>
      <div className='image-card__action'>
      <Button variant='danger' placeholder='Delete' size='large' />
      </div>
    </div>
  );
}