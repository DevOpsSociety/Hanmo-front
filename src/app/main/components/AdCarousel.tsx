import { FC } from "react";
import Slider from "react-slick"; 
import styles from "./AdCarousel.module.css";

interface AdCarouselProps {
  images?: string[];
}

const AdCarousel: FC<AdCarouselProps> = ({ images = [] }) => {
  const settings = {
    dots: true,          
    infinite: true,      
    speed: 500,            
    slidesToShow: 1,        
    slidesToScroll: 1,      
    autoplay: true,        
    autoplaySpeed: 3000,    // 자동 재생 시 슬라이드 간 전환 간격 (밀리초 단위)
    arrows: true,           
    centerMode: false, // 양옆 이미지 일부 보이게
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <Slider {...settings}>
        {images.map((url, idx) => (
          <div key={idx} className={styles.slide}>
            <img src={url} alt={`slide-${idx}`} className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdCarousel;
