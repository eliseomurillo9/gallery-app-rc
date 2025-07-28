import './ImgElement.css';
export function ImgElement(ImgSrc: string, altText: string) {
  return (
    <div className="img-element">
      <img src={ImgSrc} alt={altText} className='img-element--img'/>
    </div>
  );
}