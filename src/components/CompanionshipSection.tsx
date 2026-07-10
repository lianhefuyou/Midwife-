import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  RotateCcw, 
  Calendar, 
  Clock, 
  Baby, 
  Smile, 
  CheckCircle2, 
  Compass
} from 'lucide-react';

interface Stage {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgLight: string;
  borderAccent: string;
  textAccent: string;
  points: string[];
  image?: string;
}

const STAGES: Stage[] = [
  {
    title: '第一孕期',
    subtitle: '未滿13週',
    icon: <Calendar className="w-6 h-6" />,
    color: '#f2867e',
    bgLight: 'bg-rose-50/60',
    borderAccent: 'border-rose-100',
    textAccent: 'text-rose-600',
    points: [
      '轉介個案管理師─提供友善生產流程說明',
      '轉介助產師諮詢─提供客製化孕期照護計劃',
      '鼓勵伴侶參與產檢─提供孕期護理指導',
      '24小時專線諮詢即時解答'
    ],
    image: 'images/com1.jpg'
  },
  {
    title: '第二孕期',
    subtitle: '13-29週',
    icon: <Clock className="w-6 h-6" />,
    color: '#f4a261',
    bgLight: 'bg-amber-50/60',
    borderAccent: 'border-amber-100',
    textAccent: 'text-amber-600',
    points: [
      '與醫師及助產師共同討論生產計畫',
      '高危險妊娠追蹤及轉介服務',
      '提供哺乳計畫相關諮詢',
      '辦理產前教育多元化學習課程',
      '創新分娩計劃工作坊'
    ],
    image: 'images/com2.jpg'
  },
  {
    title: '第三孕期',
    subtitle: '29週以上',
    icon: <Compass className="w-6 h-6" />,
    color: '#2a9d8f',
    bgLight: 'bg-teal-50/60',
    borderAccent: 'border-teal-100',
    textAccent: 'text-teal-600',
    points: [
      '與醫師及助產師共同擬定生產計畫',
      '安排參觀產房',
      '分娩技巧指導（生產球使用、會陰按摩、產前運動、待產姿勢、生產用力等技巧）'
    ],
    image: 'images/com3.jpg'
  },
  {
    title: '待產期',
    subtitle: '',
    icon: <Baby className="w-6 h-6" />,
    color: '#e76f51',
    bgLight: 'bg-orange-50/60',
    borderAccent: 'border-orange-100',
    textAccent: 'text-orange-600',
    points: [
      '提供家庭化產房 具有舒適的待產空間',
      '助產師或資深護理師全程陪伴與諮詢',
      '伴侶陪伴和支持',
      '客製化的生產放鬆與紓壓技巧'
    ],
    image: 'images/com4.jpg'
  },
  {
    title: '產後期',
    subtitle: '',
    icon: <Smile className="w-6 h-6" />,
    color: '#e07a5f',
    bgLight: 'bg-rose-50/50',
    borderAccent: 'border-orange-100',
    textAccent: 'text-[#c96d42]',
    points: [
      '每日專業產後評估',
      '母乳哺餵諮詢指導',
      '檢測情緒及健康狀況',
      '居家持續追蹤與關懷'
    ]
  }
];

export default function CompanionshipSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Monitor screen width to responsive format our slide dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (activeIndex < STAGES.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const selectStage = (index: number) => {
    setActiveIndex(index);
  };

  // Touch Swipe Gesture Helpers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const currentX = e.targetTouches[0].clientX;
      touchEndX.current = currentX;
      setDragOffset(currentX - touchStartX.current);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    if (distance > swipeThreshold) {
      handleNext();
    } else if (distance < -swipeThreshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setDragOffset(0);
  };

  // Mouse Drag Gesture Helpers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchEndX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartX.current !== null) {
      const currentX = e.clientX;
      touchEndX.current = currentX;
      setDragOffset(currentX - touchStartX.current);
    }
  };

  const handleMouseUp = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    if (distance > swipeThreshold) {
      handleNext();
    } else if (distance < -swipeThreshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setDragOffset(0);
  };

  return (
    <section className="pt-4 pb-10 max-w-4xl mx-auto px-4 overflow-hidden" id="companionship-section">
      {/* Title & Introduction Block */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-800">
          助產師陪伴流程
        </h2>
        
        {/* Intro text directly under the title */}
        <p className="text-[#c96d42] text-xs md:text-sm max-w-2xl mx-auto mt-2 leading-relaxed font-bold">
          您可左右滑動卡牌，或點擊下方切換不同階段。
        </p>
      </div>

      {/* Top stage selectors */}
      <div className="grid grid-cols-5 gap-1 md:gap-2 w-full max-w-md mx-auto mb-6" id="companionship-stage-tabs">
        {STAGES.map((stage, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={stage.title}
              type="button"
              onClick={() => selectStage(idx)}
              className={`py-1.5 px-0.5 rounded-lg text-[10px] md:text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center text-center select-none w-full shrink-0 ${
                isSelected 
                  ? 'bg-[#c96d42] text-white shadow-md font-extrabold scale-102'
                  : 'bg-orange-50/50 hover:bg-orange-50 text-gray-600 hover:text-gray-800'
              }`}
            >
              <span>{stage.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main card viewport frame */}
      <div className="relative flex items-center justify-center w-full overflow-visible py-4 min-h-[360px] sm:min-h-[400px] md:min-h-[450px]">
        
        {/* Arrow Buttons - Absolutely Positioned at both sides, vertically centered */}
        {activeIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-1 xs:left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#c96d42] border border-orange-100/80 shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-150 cursor-pointer hover:bg-orange-50/50 focus:outline-none"
            title="上一張"
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>
        )}

        {activeIndex < STAGES.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 xs:right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#c96d42] border border-orange-100/80 shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-150 cursor-pointer hover:bg-orange-50/50 focus:outline-none"
            title="下一張"
          >
            <ChevronRight size={20} className="stroke-[2.5]" />
          </button>
        )}

        {/* Carousel slide box container */}
        <div 
          className="w-full overflow-hidden py-2"
          id="companionship-slide-box"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Slider track container holding multiple independent card views side-by-side */}
          <div 
            className="flex gap-3 sm:gap-6 items-center"
            style={{
              transform: isMobile 
                ? `translateX(calc(50% - 39% - ${activeIndex} * (78% + 12px) + ${dragOffset}px))`
                : `translateX(calc(50% - 230px - ${activeIndex} * (460px + 24px) + ${dragOffset}px))`,
              transition: dragOffset !== 0 ? 'none' : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {STAGES.map((stage, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={idx}
                  className={`transition-all duration-500 ease-out flex flex-col justify-between shrink-0 bg-white border border-orange-100/60 rounded-3xl p-4 sm:p-5 md:p-6 shadow-md ${
                    isMobile ? 'w-[78%] gap-3' : 'w-[460px] gap-6'
                  } ${
                    isSelected 
                      ? 'opacity-100 scale-100 shadow-xl border-orange-200/80 pointer-events-auto'
                      : 'opacity-30 scale-90 blur-[0.4px] shadow-sm pointer-events-none select-none'
                  }`}
                  style={{
                    height: isMobile ? '350px' : '420px',
                  }}
                >
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      {/* Card Header area */}
                      <div className="flex items-center justify-center gap-3 mb-2.5 border-b border-orange-50 pb-2">
                        <div className={`p-1.5 rounded-xl ${stage.bgLight} ${stage.textAccent} border ${stage.borderAccent} shrink-0`}>
                          {stage.icon}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-gray-800 leading-snug flex flex-wrap items-center gap-1.5">
                            <span>{stage.title}</span>
                            {stage.subtitle && (
                              <span className={`text-xs sm:text-sm font-bold ${stage.textAccent}`}>（{stage.subtitle}）</span>
                            )}
                          </h3>
                        </div>
                      </div>

                      {/* Bullet points area */}
                      <div className="flex justify-center w-full">
                        <ul className="space-y-1.5 text-left w-full">
                          {stage.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-1.5 py-0.5 px-2 bg-orange-50/10 hover:bg-orange-50/25 rounded-lg border border-orange-100/5 text-xs text-gray-700 leading-normal transition-colors duration-150">
                              <CheckCircle2 size={13} className={`mt-0.5 shrink-0 ${stage.textAccent}`} />
                              <span className="font-medium text-[11px] sm:text-xs text-gray-600">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Image or Welcome back / Blessing block */}
                    {stage.image ? (
                      <div className="mt-auto w-full flex justify-center items-center">
                        <div className="relative w-full aspect-[16/9] max-h-[110px] sm:max-h-[135px] md:max-h-[155px] rounded-2xl overflow-hidden border border-orange-100/40 shadow-sm bg-orange-50/20 flex items-center justify-center shrink-0">
                          <img
                            src={stage.image}
                            alt={stage.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent) {
                                const existing = parent.querySelector('.img-placeholder');
                                if (!existing) {
                                  const placeholder = document.createElement('div');
                                  placeholder.className = 'img-placeholder absolute inset-0 bg-gradient-to-br from-orange-50/40 to-amber-50/30 flex flex-col items-center justify-center text-gray-400 gap-1 p-2 text-center';
                                  placeholder.innerHTML = `
                                    <svg class="w-6 h-6 md:w-8 md:h-8 text-[#c96d42]/60 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <span class="text-[9px] md:text-[10px] font-extrabold text-[#c96d42]/85 tracking-wide mt-1">
                                      ${stage.title} 陪伴指引
                                    </span>
                                  `;
                                  parent.appendChild(placeholder);
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      /* Final stage warm blessing block */
                      <div className="mt-auto pt-2 border-t border-dashed border-orange-200 text-left w-full">
                        <p className="text-[10px] sm:text-[11px] md:text-xs text-[#c96d42] font-semibold leading-normal flex items-start gap-1 mb-1.5">
                          <Heart size={11} className="mt-0.5 shrink-0 text-[#c96d42]" fill="#c96d42" />
                          <span>聯合醫院婦幼院區誠摯祝福每一位媽媽。我們將與您同行，給您與寶寶最溫馨、安心、自主的溫柔順產回憶。</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => selectStage(0)}
                          className="w-full py-1.5 bg-[#c96d42] hover:bg-[#b05a30] text-white font-bold text-[11px] rounded-lg transition-all duration-150 flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                        >
                          <RotateCcw size={11} />
                          <span>看完囉！重回第一孕期</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Indicators Row replacing static text */}
      <div className="flex justify-between items-center max-w-md mx-auto gap-4 mt-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`py-1.5 px-3 rounded-lg border border-orange-100/60 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all ${
            activeIndex === 0
              ? 'opacity-30 pointer-events-none'
              : 'bg-white hover:bg-orange-50 text-gray-700 active:scale-95'
          }`}
          title="上一張"
        >
          <ChevronLeft size={13} />
          <span>上一張</span>
        </button>

        {/* 5 dots progress indicators replacing "第 1 / 5 階段" */}
        <div className="flex items-center justify-center gap-2.5 py-1" id="companionship-pagination-dots">
          {STAGES.map((_, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => selectStage(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm ${
                  isSelected 
                    ? 'w-6 bg-[#c96d42] border border-[#b05a30]/30' 
                    : 'w-2.5 bg-orange-200 hover:bg-orange-300 border border-orange-300/60'
                }`}
                title={`切換到階段 ${idx + 1}`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === STAGES.length - 1}
          className={`py-1.5 px-3 rounded-lg border border-orange-100/60 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all ${
            activeIndex === STAGES.length - 1
              ? 'opacity-30 pointer-events-none'
              : 'bg-white hover:bg-orange-50 text-gray-700 active:scale-95'
          }`}
          title="下一張"
        >
          <span>下一張</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </section>
  );
}
