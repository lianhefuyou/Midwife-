import React from 'react';
import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrap} id="footer-copyright-credits">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-3">
          <Heart size={28} fill="#c96d42" className="text-[#c96d42]/70 animate-pulse" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-1.5 md:gap-2.5 font-bold text-xs sm:text-sm md:text-[0.95rem] tracking-wide mb-3">
          <span className="text-[#c96d42]">臺北市立聯合醫院婦幼院區 護理科產房</span>
          <span className="text-gray-500 font-extrabold my-1 md:my-0 select-none">✕</span>
          <span className="text-[#b38a57]">國立臺灣師範大學 健康促進與衛生教育學系</span>
        </div>

        <p className={styles.copyrightText}>
          © 2026 國立臺灣師範大學健康促進與衛生教育學系 & 臺北市立聯合醫院婦幼院區護理科產房. 
          本站僅供衛教介入計畫與自主決策效能評估之用，詳細醫療決策請與專業醫事人員溝通。
        </p>
      </div>
    </footer>
  );
}
