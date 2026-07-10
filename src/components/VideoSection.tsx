import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Play, ChevronsUp, Menu, X, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoItem } from '../types';

// Default High-Quality Educational YouTube Shorts
const DEFAULT_REELS_VIDEOS: VideoItem[] = [
  {
    id: 'reel-1',
    title: '生產用力方法教學',
    description: '',
    duration: '0:46',
    videoUrl: 'https://youtube.com/shorts/xA5p1oCH7zI?feature=share',
    posterUrl: 'https://img.youtube.com/vi/xA5p1oCH7zI/hqdefault.jpg',
    tags: [],
    captions: []
  },
  {
    id: 'reel-2',
    title: '什麼是醫助共照',
    description: '',
    duration: '0:33',
    videoUrl: 'https://youtube.com/shorts/EWJKeTcC3gY?feature=share',
    posterUrl: 'https://img.youtube.com/vi/EWJKeTcC3gY/hqdefault.jpg',
    tags: [],
    captions: []
  },
  {
    id: 'reel-3',
    title: '助產師可以獨立接生嗎',
    description: '',
    duration: '0:18',
    videoUrl: 'https://youtube.com/shorts/LxSZGeAD4Jc',
    posterUrl: 'https://img.youtube.com/vi/LxSZGeAD4Jc/hqdefault.jpg',
    tags: [],
    captions: []
  },
  {
    id: 'reel-4',
    title: '產婦進到醫院能得到什麼服務2',
    description: '',
    duration: '0:30',
    videoUrl: 'https://youtube.com/shorts/XvqMw8sLDak',
    posterUrl: 'https://img.youtube.com/vi/XvqMw8sLDak/hqdefault.jpg',
    tags: [],
    captions: []
  },
  {
    id: 'reel-5',
    title: '為什麼醫院需要醫助共照',
    description: '',
    duration: '0:25',
    videoUrl: 'https://youtube.com/shorts/-pQZOMLaTwo',
    posterUrl: 'https://img.youtube.com/vi/-pQZOMLaTwo/hqdefault.jpg',
    tags: [],
    captions: []
  },
  {
    id: 'reel-6',
    title: '助產師可以獨立接生嗎2',
    description: '',
    duration: '0:21',
    videoUrl: 'https://youtube.com/shorts/Qcrc6-b3EkQ',
    posterUrl: 'https://img.youtube.com/vi/Qcrc6-b3EkQ/hqdefault.jpg',
    tags: [],
    captions: []
  },
  {
    id: 'reel-7',
    title: '為什麼需要醫助共照2',
    description: '',
    duration: '0:25',
    videoUrl: 'https://youtube.com/shorts/_ja1qDa9giY',
    posterUrl: 'https://img.youtube.com/vi/_ja1qDa9giY/hqdefault.jpg',
    tags: [],
    captions: []
  },
  {
    id: 'reel-8',
    title: '產婦進到醫院能得到什麼服務',
    description: '',
    duration: '0:24',
    videoUrl: 'https://youtube.com/shorts/GoVx1m4dIkw',
    posterUrl: 'https://img.youtube.com/vi/GoVx1m4dIkw/hqdefault.jpg',
    tags: [],
    captions: []
  },
  {
    id: 'reel-9',
    title: '助產師可以獨立接生嗎3',
    description: '',
    duration: '0:26',
    videoUrl: 'https://youtube.com/shorts/ICKtZvkkNhI',
    posterUrl: 'https://img.youtube.com/vi/ICKtZvkkNhI/hqdefault.jpg',
    tags: [],
    captions: []
  }
];

// Helper to extract YouTube video ID from standard or shorts URLs
function getYouTubeId(url: string): string {
  if (!url) return '';
  const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  const trimmed = url.trim();
  if (trimmed.length === 11) return trimmed;
  
  return '';
}

interface ReelVideoProps {
  key?: string;
  video: VideoItem;
  isActive: boolean;
}

function ReelVideo({ video, isActive }: ReelVideoProps) {
  const videoId = getYouTubeId(video.videoUrl);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendPlayerCommand = (func: string, args: any = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args }),
          '*'
        );
      } catch (err) {
        console.error(`Failed to post command ${func} to YouTube iframe:`, err);
      }
    }
  };

  // Play video when active, pause when inactive smoothly
  useEffect(() => {
    if (isActive) {
      sendPlayerCommand('playVideo');
    } else {
      sendPlayerCommand('pauseVideo');
    }
  }, [isActive]);

  return (
    <div 
      className="snap-start h-full w-full relative flex-shrink-0 bg-neutral-950 flex items-center justify-center overflow-hidden"
      id={`reel-slide-${video.id}`}
    >
      {/* Dynamic YouTube Iframe Embed when Active */}
      {isActive && videoId && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-none z-0"
        />
      )}

      {/* Overlay backdrop when inactive */}
      {!isActive && (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-neutral-950/60 backdrop-blur-[2px] z-10 pointer-events-none">
          {video.posterUrl ? (
            <img 
              src={video.posterUrl} 
              alt={video.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-orange-950/40 opacity-50" />
          )}
          
          <div className="relative z-20 flex flex-col items-center gap-4 p-6 text-center select-none">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-xl">
              <Play size={28} className="fill-white ml-1" />
            </div>
            <p className="text-white/80 text-xs font-semibold tracking-wider">滑動至此立即播放</p>
          </div>
        </div>
      )}

      {/* Bottom Info Gradient Shade Overlay (makes text readable, lighter, and completely non-blocking) */}
      <div 
        className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 pointer-events-none"
      />

      {/* Bottom Video Title Panel */}
      <div className="absolute bottom-6 left-0 right-16 px-4 pb-2 z-20 text-white text-left pointer-events-none select-none">
        <h3 className="font-extrabold text-xs sm:text-sm text-white tracking-wide leading-snug drop-shadow-md">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-[10px] sm:text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed drop-shadow-sm font-medium">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function VideoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeGuide, setShowSwipeGuide] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeGuide(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const selectVideo = (index: number) => {
    if (containerRef.current) {
      const height = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: index * height,
        behavior: 'smooth'
      });
      setActiveIndex(index);
      setIsMenuOpen(false);
    }
  };

  // Monitor scroll to update active slide index
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const height = containerRef.current.clientHeight;
      if (height > 0) {
        const index = Math.round(scrollTop / height);
        if (index !== activeIndex && index >= 0 && index < DEFAULT_REELS_VIDEOS.length) {
          setActiveIndex(index);
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diffY = touchStartRef.current - touchEnd; // positive is swipe up, scroll down
    
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const maxScroll = scrollHeight - clientHeight;

      // Swiped UP to go DOWN, and we are at the last video (or extremely close)
      if (diffY > 55 && scrollTop >= maxScroll - 15) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveIndex(0);
      }
      // Swiped DOWN to go UP, and we are at the first video
      else if (diffY < -55 && scrollTop <= 15) {
        containerRef.current.scrollTo({ top: maxScroll, behavior: 'smooth' });
        setActiveIndex(DEFAULT_REELS_VIDEOS.length - 1);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const maxScroll = scrollHeight - clientHeight;

      // scroll down and at the bottom
      if (e.deltaY > 20 && scrollTop >= maxScroll - 15) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveIndex(0);
      }
      // scroll up and at the top
      else if (e.deltaY < -20 && scrollTop <= 15) {
        containerRef.current.scrollTo({ top: maxScroll, behavior: 'smooth' });
        setActiveIndex(DEFAULT_REELS_VIDEOS.length - 1);
      }
    }
  };

  return (
    <section className="pt-0 pb-10 max-w-4xl mx-auto px-4" id="video-section">
      <div className="flex flex-col items-center justify-center w-full gap-5">
        
        {/* Beautiful sleek vertical video player container styled like YouTube Shorts */}
        <div className="relative w-full max-w-[300px] xs:max-w-[320px] sm:max-w-[700px] aspect-[9/16] bg-black rounded-3xl shadow-2xl overflow-hidden border border-orange-100/30 ring-4 ring-[#b38a57]/10 flex flex-col">
          
          {/* Scrolling Feed viewport */}
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className="flex-1 h-full w-full rounded-3xl overflow-y-scroll snap-y snap-mandatory scroll-smooth relative bg-black select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {DEFAULT_REELS_VIDEOS.map((video, index) => (
              <ReelVideo
                key={video.id}
                video={video}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          {/* Gentle Swipe-Up Guide overlay */}
          {showSwipeGuide && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex flex-col items-center justify-center z-40 pointer-events-none transition-opacity duration-500 ease-out">
              <div className="flex flex-col items-center gap-1 text-white/95">
                <div className="bg-orange-500/20 p-4 rounded-full border border-orange-400/30 animate-swipe-up-guide">
                  <ChevronsUp size={36} className="text-[#fbc4ab] drop-shadow-[0_2px_8px_rgba(201,109,66,0.5)]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#fbc4ab] drop-shadow bg-black/50 px-3 py-1.5 rounded-full border border-white/5 mt-4">
                  向上滑動切換影片
                </span>
              </div>
            </div>
          )}

          {/* Video Playlist Menu Button overlay inside player */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/75 hover:bg-black/90 active:scale-95 transition-all backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] text-orange-200 z-30 font-extrabold border border-white/10 shadow-lg cursor-pointer"
            title="開啟影片選單"
          >
            <Menu size={12} className="text-orange-200" />
            <span>影片選單 ({activeIndex + 1}/{DEFAULT_REELS_VIDEOS.length})</span>
          </button>
        </div>

      </div>

      {/* Fullscreen Video Menu Modal via React Portal to match pre/post test questionnaire style */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-[#4A3E3D]/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-hidden cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="bg-[#FFFDFB] border-t-8 border-[#FBC4AB] rounded-2xl p-4 md:p-6 max-w-md w-full relative shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10 cursor-pointer"
                  title="關閉選單"
                >
                  <X size={20} />
                </button>

                <div className="text-center md:text-left mb-4 pr-8 select-none">
                  <h3 className="text-base font-extrabold text-[#c96d42] flex items-center gap-1.5 justify-center md:justify-start">
                    <PlayCircle className="text-[#c96d42]" size={20} />
                    <span>影片選單</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    請點擊下方影片直接跳轉播放
                  </p>
                </div>

                {/* Video list wrap area */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-3 my-2 scrollbar-thin">
                  {DEFAULT_REELS_VIDEOS.map((video, index) => {
                    const isCurrent = index === activeIndex;
                    return (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => selectVideo(index)}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-50/70 border-amber-300 shadow-sm ring-1 ring-amber-300/50'
                            : 'bg-white border-orange-100/40 hover:border-orange-200 hover:bg-orange-50/30'
                        }`}
                      >
                        {/* Thumbnail preview aspect ratio 9:16 */}
                        <div className="relative w-14 h-20 rounded-lg overflow-hidden bg-black shrink-0 border border-orange-100 shadow-sm">
                          <img
                            src={video.posterUrl}
                            alt={video.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className={`p-1 rounded-full ${isCurrent ? 'bg-[#b38a57] text-white' : 'bg-white/80 text-[#b38a57]'} shadow-sm`}>
                              <Play size={10} className="fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Video text info */}
                        <div className="flex-1 flex flex-col justify-center">
                          {isCurrent && (
                            <span className="inline-flex self-start items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#FBC4AB] text-[#4A3E3D] mb-1.5 animate-pulse">
                              播放中 🔊
                            </span>
                          )}
                          <h4 className={`text-xs sm:text-sm font-extrabold leading-snug ${isCurrent ? 'text-[#c96d42]' : 'text-gray-700'}`}>
                            {video.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 mt-1 font-medium">
                            片長：{video.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer and confirm line */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-orange-50">
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2 px-5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-extrabold text-xs rounded-xl transition-all duration-150 cursor-pointer select-none"
                  >
                    關閉
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
