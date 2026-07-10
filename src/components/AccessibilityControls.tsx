import React from 'react';
import { Type, HelpCircle, Heart } from 'lucide-react';
import styles from './AccessibilityControls.module.css';
import { FontSize } from '../types';

interface AccessibilityControlsProps {
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
}

export default function AccessibilityControls({
  fontSize,
  onFontSizeChange,
}: AccessibilityControlsProps) {
  return (
    <div className={styles.controlPanel} id="accessibility-toolbar">
      <div className={styles.introCompact}>
        <div className={styles.iconCircle}>
          <Heart size={14} fill="currentColor" />
        </div>
        <div>
          <span className="font-medium text-gray-800 text-sm">親愛的媽咪，歡迎來到微學習網站！</span>
          <p className="text-xs text-gray-500 m-0">此計畫旨在提升您對助產照護的信任與自主決策信心</p>
        </div>
      </div>
      
      <div className={styles.controlsGroup}>
        <div className="flex items-center gap-1">
          <Type size={16} className="text-gray-600" />
          <span className={styles.controlLabel}>全站字體大小：</span>
        </div>
        <div className={styles.btnGroup}>
          <button
            type="button"
            onClick={() => onFontSizeChange('standard')}
            className={`${styles.sizeBtn} ${fontSize === 'standard' ? styles.activeSizeBtn : ''}`}
            title="標準字體大小"
            id="font-standard-btn"
          >
            標準
          </button>
          <button
            type="button"
            onClick={() => onFontSizeChange('medium')}
            className={`${styles.sizeBtn} ${fontSize === 'medium' ? styles.activeSizeBtn : ''}`}
            title="加大中字體"
            id="font-medium-btn"
          >
            中型
          </button>
          <button
            type="button"
            onClick={() => onFontSizeChange('large')}
            className={`${styles.sizeBtn} ${fontSize === 'large' ? styles.activeSizeBtn : ''}`}
            title="特大字體適於閱讀"
            id="font-large-btn"
          >
            大字
          </button>
        </div>
        <div className={styles.pulseIndicator} title="無障礙輔助閱讀中" />
      </div>
    </div>
  );
}
