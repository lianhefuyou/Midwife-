import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import styles from './HeaderBanner.module.css';

export default function HeaderBanner() {
  const [bannerSrc, setBannerSrc] = useState('images/banner.jpg');
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (bannerSrc === 'images/banner.jpg') {
      setBannerSrc('images/banner.png');
    } else if (bannerSrc === 'images/banner.png') {
      setBannerSrc('images/banner.jpeg');
    } else {
      setImageError(true);
    }
  };

  return (
    <header className={styles.heroContainer} id="header-banner">
      {/* Absolute inset shadow overlay to give smooth vignette and paper depthing */}
      <div className={styles.innerShadowOverlay} />
      
      <div className={styles.heroContent}>
        {!imageError ? (
          <img
            src={bannerSrc}
            alt="孕產照護與自主決策衛教"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className={styles.bannerFrame}
            id="banner-image"
          />
        ) : (
          /* High-quality styled placeholder banner if image.jpg is missing */
          <div className={`${styles.placeholderFrame} flex flex-col justify-center items-center p-8 text-center bg-gradient-to-r from-[#FBC4AB]/40 via-[#FFF8EE]/65 to-[#FBC4AB]/25`}>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#c96d42] mb-3 shadow-md">
              <ImageIcon size={22} className="text-[#c96d42] animate-pulse" />
            </div>
            <h3 className="text-md md:text-lg font-extrabold text-[#c96d42] mb-1 font-sans">
              衛教網站主要橫幅圖片
            </h3>
            <p className="text-xs text-[#7D6F6D] max-w-md mb-2 font-sans">
              [ 已配置圖片路徑：images/banner.jpg ]
            </p>
            <div className="text-[10px] md:text-xs text-[#b38a57] font-semibold bg-white/95 border border-orange-100/50 px-3.5 py-1.5 rounded-full shadow-sm max-w-sm">
              建議上傳尺寸：1200 × 400 像素以取得最精湛版面效果
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
