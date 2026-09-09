import React, { useState, useRef } from 'react';
import { ExternalLink, Compass, Shield, Heart, BookOpen, Layers, Users, Video, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface WebsiteItem {
  id: string;
  name: string;
  url: string;
  hashtags: string[];
  description: string;
  icon: React.ReactNode;
  badgeColor: string;
  buttonLabel?: string;
}

const WEBSITES: WebsiteItem[] = [
  {
    id: 'site-2',
    name: '臺北市立聯合醫院-和平婦幼院區 母嬰親善專區',
    url: 'https://muyimg.webnode.tw/',
    hashtags: ['母嬰親善', '醫助共照', '溫柔生產'],
    description: '整合聯合醫院婦幼院區的母嬰親善資源與「醫助共照」服務。透過常見問答、多媒體衛教及陪產指南，全方位支持產婦與伴侶。讓您在專業醫療後盾下，安心體驗溫柔生產。',
    icon: <Heart size={24} className="text-[#b38a57]" />,
    badgeColor: 'bg-orange-50 text-[#c96d42] border-orange-100'
  },
  {
    id: 'site-3',
    name: '聯合醫院婦幼院區產科手術資訊',
    url: 'https://drive.google.com/file/d/1PUEmhz5zzQyaulnWe_zmUL_gPCXdNc0p/view',
    hashtags: ['產科手術過程', '手術環境', '手術注意事項'],
    description: '專為產婦設計「剖腹產手術與產後護理」視覺化衛教指南。分別介紹手術前中後的注意事項及醫院手術室環境，完整圖解術前準備、手術室環境與麻醉流程，並詳細說明產後傷口護理、飲食須知及母嬰照護細節，幫助媽咪消除未知恐懼，安心迎接新生命。',
    icon: <Layers size={24} className="text-[#b38a57]" />,
    badgeColor: 'bg-amber-50 text-[#b38a57] border-amber-100'
  },
  {
    id: 'site-line-official',
    name: '國民健康署孕產兒關懷LINE官方帳號',
    url: 'https://share.google/yoURTOWjH9XRMKoCe',
    hashtags: ['孕產照護', '衛教資訊', '個人化推薦'],
    description: '（ID：@mammy870870） 提供新手爸媽個人化的「媽媽／寶寶週報」訂閱、孕產育兒衛教圖文以及哺集乳室地圖等實用資訊。',
    icon: <Users size={24} className="text-[#b38a57]" />,
    badgeColor: 'bg-orange-50 text-[#c96d42] border-orange-100',
    buttonLabel: '加入好友'
  },
  {
    id: 'site-4',
    name: '國民健康署 健康九九網站（孕產婦專區）',
    url: 'https://health99.hpa.gov.tw/health99/ContentSection?siteId=1&nodeId=617',
    hashtags: ['孕產知識', '國健署', '母嬰健康'],
    description: '由衛福部國健署建置的官方健康知識網站。有非常豐富的孕期營養、產前檢查及母嬰照護衛教文章與手冊電子檔，是新手爸媽最安心、最具權威性的資訊來源。',
    icon: <Compass size={24} className="text-[#b38a57]" />,
    badgeColor: 'bg-orange-50 text-[#c96d42] border-orange-100'
  },
  {
    id: 'site-5',
    name: '國民健康署 孕產婦關懷網站',
    url: 'https://mammy.hpa.gov.tw/',
    hashtags: ['孕產知識', '國健署', '母嬰健康'],
    description: '提供從孕前、孕期到產後的官方衛教資訊，包含孕期營養、產前檢查及母乳哺育教學，是新手爸媽最安心、最具權威性的健康知識寶庫。',
    icon: <Shield size={24} className="text-[#b38a57]" />,
    badgeColor: 'bg-amber-50 text-[#b38a57] border-amber-100'
  },
  {
    id: 'site-6',
    name: '國民健康署 健康手冊專區-孕產婦健康',
    url: 'https://www.hpa.gov.tw/Pages/EBookList.aspx?nodeid=53&c=5086602728391767171',
    hashtags: ['衛教電子書', '孕婦手冊', '產前準備'],
    description: '匯集國健署官方發行的各類衛教電子書，包含孕婦健康及衛教手冊。媽咪可隨時透過手機查閱產檢時程、孕期照護與待產須知，是孕期與產後必備的數位知識寶庫。',
    icon: <BookOpen size={24} className="text-[#b38a57]" />,
    badgeColor: 'bg-orange-50 text-[#c96d42] border-orange-100'
  }
];

interface VideoItem {
  title: string;
  embedUrl: string;
  hashtags: string[];
}

const VIDEOS: VideoItem[] = [
  {
    title: '產後肌膚接觸',
    embedUrl: 'https://www.youtube.com/embed/-16PX_kmBdU',
    hashtags: ['#新手媽媽必看', '#skin to skin', '#母嬰科普']
  },
  {
    title: '產後出血',
    embedUrl: 'https://www.youtube.com/embed/5jWuZs9R9Qw',
    hashtags: ['#大出血表徵', '#怎麼預防', '#守護媽媽']
  },
  {
    title: '產後照顧',
    embedUrl: 'https://www.youtube.com/embed/2v6ekep2g1U',
    hashtags: ['#飲食須知', '#按摩技巧', '#產後照護']
  }
];

function VideoCarouselCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = () => {
    if (activeIndex < VIDEOS.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

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
    <div className="bg-[#FFFDFB] border-2 border-orange-100 rounded-3xl p-5 md:p-6 shadow-md mb-8" id="video-carousel-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-start gap-3.5 text-left">
          <div className="p-3 bg-amber-50 rounded-full shrink-0 border border-amber-100">
            <Video size={24} className="text-[#b38a57]" />
          </div>
          <div>
            <h3 className="font-extrabold text-base md:text-lg text-gray-800 leading-snug">
              迎接新生命—產房照護與衛教影片
            </h3>
          </div>
        </div>
      </div>

      {/* Slide Container Viewport with p-0 to make the video truly flush/full-width */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-orange-50/5 border border-orange-100/30 p-0">
        
        {/* Swipe Area */}
        <div
          className="w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
              transition: dragOffset !== 0 ? 'none' : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {VIDEOS.map((video, idx) => (
              <div key={idx} className="w-full shrink-0 flex flex-col items-center">
                
                {/* 16:9 Video Embed Container - truly flush full-width with rounded-t-2xl */}
                <div className="w-full aspect-video bg-black relative z-10">
                  <iframe
                    src={`${video.embedUrl}?modestbranding=1&rel=0`}
                    title={video.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>

                {/* Video Info Detail */}
                <div className="w-full px-4 pt-4 pb-1 text-center">
                  <h4 className="font-extrabold text-sm sm:text-base text-gray-800">
                    {video.title}
                  </h4>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Bottom controls: Navigation Buttons paired with Pagination Dots underneath the video */}
        <div className="flex items-center justify-center gap-5 mt-2 pb-5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-9 h-9 rounded-full bg-white text-[#c96d42] border border-orange-100 shadow-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed focus:outline-none"
            title="上一個影片"
          >
            <ChevronLeft size={18} className="stroke-[2.5]" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2">
            {VIDEOS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-[#c96d42] w-6 shadow-sm'
                    : 'bg-orange-200/50 hover:bg-orange-300'
                }`}
                title={`切換到第 ${idx + 1} 個影片`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === VIDEOS.length - 1}
            className="w-9 h-9 rounded-full bg-white text-[#c96d42] border border-orange-100 shadow-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed focus:outline-none"
            title="下一個影片"
          >
            <ChevronRight size={18} className="stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default function RecommendSection() {
  const canvaUrl = 'https://www.canva.com/design/DAGJ8q1R6d0/FydjvKVSAqzAp2HAmZEI0Q/view?embed';
  const rawCanvaUrl = 'https://www.canva.com/design/DAGJ8q1R6d0/FydjvKVSAqzAp2HAmZEI0Q/view?utm_content=DAGJ8q1R6d0&utm_campaign=designshare&utm_medium=link&utm_source=editor';

  return (
    <section className="pt-2 pb-10 px-4 max-w-6xl mx-auto" id="recommend-section">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-800">
          衛教資源推介
        </h2>
      </div>

      {/* Featured Interactive Iframe: 伴侶陪伴孕產圖 */}
      <div className="bg-[#FFFDFB] border-2 border-orange-100 rounded-3xl p-5 md:p-6 shadow-md mb-8" id="featured-canva-section">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-amber-50 rounded-full shrink-0 border border-amber-100">
              <Users size={24} className="text-[#b38a57]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg text-gray-800 leading-snug">
                伴侶陪伴孕產圖
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-amber-50 text-[#b38a57] border-amber-100">
                  #待產注意事項
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-amber-50 text-[#b38a57] border-amber-100">
                  #神隊友
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-amber-50 text-[#b38a57] border-amber-100">
                  #孕產陪伴
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Canva Inline Embed Frame */}
        <div 
          className="w-full max-w-[450px] mx-auto rounded-2xl overflow-hidden border border-orange-100/50 bg-[#FFFDFB] shadow-md relative"
          style={{ aspectRatio: '5 / 8' }}
        >
          <iframe
            src={canvaUrl}
            className="w-full h-full border-0 absolute inset-0 bg-transparent"
            style={{ transform: 'scale(1.06)', transformOrigin: 'center' }}
            title="伴侶陪伴孕產圖"
            allowFullScreen
            loading="lazy"
          >
            載入中...
          </iframe>
        </div>

        {/* Visit direct button moved to the bottom, matching color and style of other cards */}
        <div className="pt-4 max-w-[450px] mx-auto">
          <a
            href={rawCanvaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#b38a57] hover:bg-[#9c7344] text-white font-extrabold text-xs rounded-xl shadow-sm hover:scale-[1.01] active:scale-95 duration-150 transition-all cursor-pointer"
            id="recommend-btn-canva"
          >
            <span>在新分頁打開</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Featured Video Playlist Section: 迎接新生命—產房照護與衛教影片 */}
      <VideoCarouselCard />

      {/* Grid of other 5 website resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="recommend-sites-grid">
        {WEBSITES.map((site) => (
          <div 
            key={site.id} 
            className="bg-[#FFFDFB] border border-orange-100/60 shadow-md hover:shadow-lg rounded-3xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            id={`recommend-site-card-${site.id}`}
          >
            <div>
              <div className="flex items-start gap-3.5 mb-3">
                <div className="p-3 bg-orange-50/50 rounded-full shrink-0 border border-orange-100/30">
                  {site.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-sm md:text-base text-gray-800 leading-snug break-words">
                    {site.name}
                  </h3>
                  <a 
                    href={site.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-[#b38a57] hover:text-[#9c7344] hover:underline inline-flex items-center gap-0.5 mt-1 max-w-full min-w-0"
                    title={`連結至 ${site.name}`}
                  >
                    <span className="truncate flex-1 min-w-0">{site.url}</span>
                    <ExternalLink size={11} className="shrink-0" />
                  </a>
                </div>
              </div>

              {/* Hashtag List */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {site.hashtags.map((tag) => (
                  <span 
                    key={tag} 
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${site.badgeColor}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed bg-amber-50/20 p-3 rounded-2xl border border-amber-100/20 mb-4 select-text">
                {site.description}
              </p>
            </div>

            {/* Visit direct button */}
            <div className="pt-2">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#b38a57] hover:bg-[#9c7344] text-white font-extrabold text-xs rounded-xl shadow-sm hover:scale-[1.01] active:scale-95 duration-150 transition-all cursor-pointer"
                id={`recommend-btn-${site.id}`}
              >
                <span>{site.buttonLabel || '前往此網站'}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
