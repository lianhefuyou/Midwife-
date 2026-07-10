import React, { useState, useEffect } from 'react';
import { ArrowUpToLine, Home, Film, Image as ImageIcon, Menu, X, Heart, Compass, ExternalLink, Sparkles, HelpCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import themeStyles from './styles/theme.module.css';

// Component imports
import HeaderBanner from './components/HeaderBanner';
import VideoSection from './components/VideoSection';
import QASection from './components/QASection';
import CompanionshipSection from './components/CompanionshipSection';
import RecommendSection from './components/RecommendSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FallbackImage from './components/FallbackImage';

// A custom tiny house icon with a plus sign inside, strictly without blinking/pulsing.
function HousePlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <line x1="12" y1="10" x2="12" y2="16" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
}

const SEARCH_INDEX = [
  {
    category: 'quiz',
    categoryLabel: '同理心挑戰',
    title: '助產師跟產婆一樣嗎？',
    description: '現代醫院助產師皆需國家考照，多具備護理與助產雙證照，非傳統產婆。',
    targetSection: 'qa',
    extraData: 0,
    keywords: ['助產師', '產婆', '醫療常規', '執照', '國家考試', '接生', '專業', '同理心']
  },
  {
    category: 'quiz',
    categoryLabel: '同理心挑戰',
    title: '產檢一切順利的話，助產師能獨立接生嗎？',
    description: '低風險自然產下，助產師完全可獨立接生，醫師在旁隨時把關潛在風險。',
    targetSection: 'qa',
    extraData: 1,
    keywords: ['獨立接生', '低風險自然產', '產檢', '醫師陪同', '保障', '安全']
  },
  {
    category: 'quiz',
    categoryLabel: '同理心挑戰',
    title: '待產進度卡關就只能打催生針嗎？',
    description: '助產師會優先運用物理方式（如變換姿勢、走動等）來促進產程，減少藥物使用。',
    targetSection: 'qa',
    extraData: 2,
    keywords: ['待產進度', '催生針', '走動', '產程', '物理方式', '姿勢', '慢']
  },
  {
    category: 'quiz',
    categoryLabel: '同理心挑戰',
    title: '生產時只能躺在產檯上用力，這才是最自然、最不會受傷的生產姿勢？',
    description: '蹲姿、跪姿、側臥等直立或自由體位更能順應重力，減少會陰受傷。',
    targetSection: 'qa',
    extraData: 3,
    keywords: ['產檯用力', '生產姿勢', '自由體位', '重力', '會陰受傷', '蹲姿', '跪姿', '側臥', '姿勢', '用力']
  },
  {
    category: 'quiz',
    categoryLabel: '同理心挑戰',
    title: '陣痛來臨時，除了打減痛分娩（無痛分娩）之外，產婦只能咬牙苦撐？',
    description: '非藥物舒緩（如按摩、溫水淋浴、呼吸等）能刺激腦內啡，提供極佳減痛效果。',
    targetSection: 'qa',
    extraData: 4,
    keywords: ['陣痛', '減痛分娩', '無痛分娩', '非藥物減痛', '按摩', '溫水淋浴', '呼吸', '腦內啡', '減痛', '忍痛']
  },
  {
    category: 'quiz',
    categoryLabel: '同理心挑戰',
    title: '選擇「溫柔生產」或助產師照護，就代表絕對不能打減痛分娩（無痛分娩）？',
    description: '溫柔生產核心是「醫病共享決策」，視產婦需要可合理使用藥物減痛，絕非忍痛。',
    targetSection: 'qa',
    extraData: 5,
    keywords: ['溫柔生產', '減痛分娩', '無痛', '共享決策', 'SDM', '共享', '決策']
  },
  {
    category: 'quiz',
    categoryLabel: '同理心挑戰',
    title: '生產時為了保持無菌和方便接生，必須進行「剃毛、灌腸、剪會陰」？',
    description: '現代實證醫學不推薦常規處置，孕產婦可透過生產計畫書與團隊討論。',
    targetSection: 'qa',
    extraData: 6,
    keywords: ['剃毛', '灌腸', '剪會陰', '常規處置', '實證醫學', '生產計畫書', '計畫書']
  },
  {
    category: 'quiz',
    categoryLabel: '同理心挑戰',
    title: '寶寶生出來後，媽媽產後應該好好休息，不需要跟寶寶有過多的親密接觸？',
    description: '產後「黃金一小時」肌膚接觸能穩定新生兒生命徵象、增進母乳哺育與親密感。',
    targetSection: 'qa',
    extraData: 7,
    keywords: ['黃金一小時', '親密接觸', '肌膚接觸', '休息', '母乳哺育', '新生兒', '接觸', '親密']
  },
  {
    category: 'faq',
    categoryLabel: '常見問答與互動',
    title: '常見問答：什麼是生產計畫書？該怎麼寫？',
    description: '引導式撰寫您的生產心願單，涵蓋待產環境、醫療處置、減痛方式及生產願望。',
    targetSection: 'faq',
    targetElementId: 'faq-item-1',
    extraData: 1,
    keywords: ['生產計畫書', '心願單', '待產環境', '醫療處置', '減痛方式', '剪會陰', '灌腸', '計畫書']
  },
  {
    category: 'faq',
    categoryLabel: '常見問答與互動',
    title: '常見問答：何時該來醫院呢？',
    description: '評估落紅、破水、陣痛三大指標的紅綠燈警訊，幫您掌握最適宜的入院時機。',
    targetSection: 'faq',
    targetElementId: 'faq-item-2',
    extraData: 3,
    keywords: ['何時去醫院', '落紅', '破水', '陣痛', '宮縮', '警訊', '入院時機', '醫院', '破水', '落紅']
  },
  {
    category: 'faq',
    categoryLabel: '常見問答與互動',
    title: '常見問答：怎麼分辨是破水或分泌物呢？',
    description: '互動小測試：教您用顏色、味道、量及試紙檢測，輕鬆辨別破水與分泌物的差異。',
    targetSection: 'faq',
    targetElementId: 'faq-item-3',
    extraData: 2,
    keywords: ['破水', '分泌物', '漏尿', '羊水', '酸鹼試紙', '流出', '分辨', '分辨破水']
  },
  {
    category: 'faq',
    categoryLabel: '常見問答與互動',
    title: '常見問答：何時該開始學習執行用力技巧？',
    description: '聽取專業助產師的聲音語音引導！學習配合宮縮 and 呼吸，保護骨盆底肌。',
    targetSection: 'faq',
    targetElementId: 'faq-item-4',
    extraData: 4,
    keywords: ['用力技巧', '聲音引導', '宮縮', '呼吸', '骨盆底肌', '胎頭下降', '用力', '技巧']
  },
  {
    category: 'video',
    categoryLabel: '微學習影片',
    title: '微學習影片：生產用力方法教學',
    description: '示範正確的呼吸與生產用力技巧，助您順產。',
    targetSection: 'video',
    targetElementId: 'video-card-0',
    keywords: ['用力', '呼吸', '影片', '影片教學', '呼吸示範', '教學']
  },
  {
    category: 'video',
    categoryLabel: '微學習影片',
    title: '微學習影片：什麼是醫助共照',
    description: '介紹醫師與助產師共同照護，提供最佳孕產保障。',
    targetSection: 'video',
    targetElementId: 'video-card-1',
    keywords: ['醫助共照', '共同照護', '影片', '醫師', '助產師', '共照']
  },
  {
    category: 'video',
    categoryLabel: '微學習影片',
    title: '微學習影片：助產師可以獨立接生嗎',
    description: '解答助產師在低風險自然產中的獨立接生權責與安全性。',
    targetSection: 'video',
    targetElementId: 'video-card-2',
    keywords: ['獨立接生', '助產師', '安全', '影片', '共照']
  },
  {
    category: 'video',
    categoryLabel: '微學習影片',
    title: '微學習影片：產婦進到醫院能得到什麼服務',
    description: '帶您了解醫助共照體制下，從入院、待產到產後的完整溫柔服務。',
    targetSection: 'video',
    targetElementId: 'video-card-3',
    keywords: ['服務', '產婦服務', '影片', '醫助共照', '待產', '醫院']
  },
  {
    category: 'video',
    categoryLabel: '微學習影片',
    title: '微學習影片：為什麼醫院需要醫助共照',
    description: '說明醫療團隊與助產師攜手合作，能提升生產品質並增強自主權。',
    targetSection: 'video',
    targetElementId: 'video-card-4',
    keywords: ['為什麼', '需要', '影片', '合作', '品質', '醫助共照']
  },
  {
    category: 'recommend',
    categoryLabel: '推薦資源與書籍',
    title: '推薦資源：臺北市立聯合醫院-和平婦幼院區 母嬰親善專區',
    description: '提供最在地的母嬰照護、母乳哺育及友善孕產資源。',
    targetSection: 'recommend',
    targetElementId: 'recommend-links-section',
    keywords: ['台北市聯醫', '和平婦幼', '母嬰親善', '資源', '網頁', '聯醫']
  },
  {
    category: 'recommend',
    categoryLabel: '推薦資源與書籍',
    title: '推薦資源：國民健康署 孕產婦關懷網站 & LINE官方帳號',
    description: '提供官方核定的孕產婦健康常識、答疑與即時諮詢服務。',
    targetSection: 'recommend',
    targetElementId: 'recommend-links-section',
    keywords: ['國民健康署', '國健署', '關懷網站', 'LINE', '官方帳號', 'LINE']
  },
  {
    category: 'recommend',
    categoryLabel: '推薦資源與書籍',
    title: '圖書/衛教小卡：產後肌膚接觸 / 出血 / 照顧',
    description: '深入簡出的產後衛教常識，幫助新手媽媽應對產後各種狀況。',
    targetSection: 'recommend',
    targetElementId: 'recommend-books-section',
    keywords: ['產後肌膚接觸', '產後出血', '產後照顧', '衛教小卡', '出血', '照顧', '肌膚接觸', '書']
  }
];

const getCategoryMenuName = (category: string) => {
  switch (category) {
    case 'qa':
    case 'quiz':
      return '首頁';
    case 'faq':
      return '常見問答';
    case 'video':
      return '影音專區';
    case 'recommend':
      return '資源推介';
    default:
      return '';
  }
};

const getCategorySubtitle = (category: string) => {
  switch (category) {
    case 'qa':
    case 'quiz':
      return '';
    case 'faq':
      return '常見問答與互動';
    case 'recommend':
      return '推薦資源與書籍';
    case 'video':
    default:
      return '';
  }
};

const getDisplayTitle = (item: typeof SEARCH_INDEX[0]) => {
  return item.title.replace(/^(常見問答：|推薦資源：|微學習影片：|圖書\/衛教小卡：)/, '');
};

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return <span>{text}</span>;
  
  const queryChars = new Set(
    query.toLowerCase().replace(/\s+/g, '').split('')
  );
  
  return (
    <>
      {text.split('').map((char, index) => {
        const isMatch = queryChars.has(char.toLowerCase());
        return (
          <span 
            key={index} 
            className={isMatch ? "text-[#c96d42] font-black" : ""}
          >
            {char}
          </span>
        );
      })}
    </>
  );
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<'qa' | 'faq' | 'video' | 'recommend'>('qa');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hot keywords state
  const [hotKeywords, setHotKeywords] = useState<string[]>([]);

  const ALL_HOT_KEYWORDS = [
    '生產計畫書', '何時來醫院', '破水', '用力技巧', '醫助共照', '溫柔生產', '黃金一小時',
    '剃毛', '灌腸', '剪會陰', '陣痛', '無痛分娩', '產後出血', '呼吸', '助產師', '產婆'
  ];

  const shuffleKeywords = () => {
    const shuffled = [...ALL_HOT_KEYWORDS].sort(() => 0.5 - Math.random());
    setHotKeywords(shuffled.slice(0, 7)); // Select 7 random keywords
  };

  const handleSearchFocus = () => {
    shuffleKeywords();
    setIsSearchFocused(true);
  };

  // Site-wide search states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

  useEffect(() => {
    shuffleKeywords(); // Initialize once on mount
  }, []);
  
  const [sectionFade, setSectionFade] = useState(true);

  // Reset QA state on full page refresh/load
  useEffect(() => {
    // Clear the specific session storage progress keys so reload/refresh starts clean
    sessionStorage.removeItem('maternity_qa_questions');
    sessionStorage.removeItem('maternity_qa_current_index');
    sessionStorage.removeItem('maternity_qa_is_completed');
    sessionStorage.removeItem('maternity_qa_has_finished_once');
    sessionStorage.removeItem('maternity_qa_user_answers');
    sessionStorage.removeItem('maternity_qa_answers_status');
  }, []);

  // Synchronize state with URL Hash for perfect browser Back/Forward (上一頁/下一頁) support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'qa' || hash === 'faq' || hash === 'video' || hash === 'recommend') {
        setActiveSection(hash);
      }
    };

    // Run once on load to restore page if user has a hash in URL
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const getFilteredResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const cleanQ = query.replace(/\s+/g, '');
    if (cleanQ.length === 0) return [];

    // Filter items first and calculate relevance scores for sorting
    const scoredItems = SEARCH_INDEX.map(item => {
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const keywordsJoined = item.keywords.join(" ").toLowerCase();
      const targetText = `${titleLower} ${descLower} ${keywordsJoined}`;
      
      let score = 0;
      let matched = false;

      // 1. Check direct substring match
      if (titleLower.includes(query)) {
        score += 1000;
        matched = true;
      } else if (descLower.includes(query)) {
        score += 500;
        matched = true;
      } else if (keywordsJoined.includes(query)) {
        score += 300;
        matched = true;
      }

      // Check keyword exact matching
      if (item.keywords.some(kw => kw.toLowerCase() === query)) {
        score += 600;
        matched = true;
      }

      // 2. Character match ratio
      let matchCount = 0;
      let titleMatchCount = 0;
      for (let i = 0; i < cleanQ.length; i++) {
        const char = cleanQ[i];
        if (targetText.includes(char)) {
          matchCount++;
        }
        if (titleLower.includes(char)) {
          titleMatchCount++;
        }
      }

      const overallRatio = matchCount / cleanQ.length;
      const titleRatio = titleMatchCount / cleanQ.length;

      // Filter criteria:
      // If it's a 1-character query, must match perfectly.
      // Otherwise, overall overlap ratio must be >= 0.8
      const isEligible = matched || (cleanQ.length === 1 ? overallRatio === 1.0 : overallRatio >= 0.8);

      if (isEligible) {
        // Add weighted overlap ratio to score
        score += overallRatio * 150;
        score += titleRatio * 200;
        return { item, score, isEligible: true };
      }

      return { item, score: 0, isEligible: false };
    }).filter(res => res.isEligible);

    // Sort descending by calculated relevance score
    scoredItems.sort((a, b) => b.score - a.score);

    return scoredItems.map(res => res.item);
  };

  const filteredResults = getFilteredResults();

  const handleSearchResultClick = (item: typeof SEARCH_INDEX[0]) => {
    setSectionFade(false);
    setTimeout(() => {
      setActiveSection(item.targetSection);
      window.location.hash = item.targetSection;
      
      if (item.category === 'faq' && item.extraData) {
        setExpandedFaqId(item.extraData);
      } else {
        setExpandedFaqId(null);
      }
      
      if (item.category === 'quiz' && typeof item.extraData === 'number') {
        setActiveQuestionIndex(item.extraData);
      } else {
        setActiveQuestionIndex(null);
      }
      
      setSectionFade(true);

      setTimeout(() => {
        const elementId = item.targetElementId || (item.category === 'quiz' ? 'qa-interactive-card' : '');
        const el = elementId ? document.getElementById(elementId) : null;
        
        if (!el) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }, 200);

    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleGoHome = () => {
    if (activeSection === 'qa') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSectionFade(false);
      setTimeout(() => {
        window.location.hash = 'qa';
        setActiveSection('qa');
        setSectionFade(true);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      }, 200);
    }
    setIsMenuOpen(false);
  };

  // Set the browser page title
  useEffect(() => {
    document.title = "孕助醫＋：共同探索醫助共照與孕產知識";

    const handleScroll = () => {
      const threshold = activeSection === 'video' ? 100 : 450;
      if (window.scrollY > threshold) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Smoothly scroll the video section to center of user view when entering video section
  useEffect(() => {
    if (activeSection === 'video') {
      const timer = setTimeout(() => {
        const element = document.getElementById('content-viewport');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const handleSelectSection = (section: 'qa' | 'faq' | 'video' | 'recommend') => {
    setSectionFade(false);
    setTimeout(() => {
      window.location.hash = section;
      setActiveSection(section);
      setSectionFade(true);
      
      // Since changing state sets whether the banner is rendered or not, we should always scroll to 0:
      // - If going to 'qa' (Home), scrolling to 0 displays the banner and intro beautifully at the top of the viewport.
      // - If going to other sections (except video), the banner is completely removed from the layout, so scrolling to 0 positions the selection menu and contents flawlessly at the very top of the screen (underneath the header) with absolutely zero over-scrolling!
      if (section !== 'video') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 200);
    setIsMenuOpen(false);
  };

  return (
    <div 
      className={`${themeStyles.appContainer} ${themeStyles.font_standard} min-h-screen pb-1`}
      id="maternal-app-root"
    >
      {/* Background radial soft hue to represent calm maternity atmosphere */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#FBC4AB]/10 to-transparent pointer-events-none" />

      {/* STICKY HEADER TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100/50 px-4 py-2 md:py-3" id="top-navigation-bar">
        <div className="max-w-6xl mx-auto flex items-center justify-between relative min-h-[44px]">
          {/* Leftside Menu Toggle Button (Icon Only as requested to remove '選單') */}
          <div className="flex items-center justify-start z-10">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-[#b38a57] hover:bg-orange-100/80 hover:text-[#9c7344] active:scale-95 transition-all border border-orange-100/60 focus:outline-none cursor-pointer"
              title="開啟導覽"
              id="top-menu-trigger"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Centered Website Logo/Subtitle - Perfect Centering with Heart and Title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 px-12 text-center">
            <motion.button
              type="button"
              onClick={handleGoHome}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="pointer-events-auto text-lg sm:text-2xl md:text-3xl font-black text-gray-800 hover:text-[#c96d42] tracking-wider font-sans focus:outline-none cursor-pointer transition-colors duration-300 flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <HousePlusIcon className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] text-[#c96d42] shrink-0" />
              <span className="truncate leading-none">孕助醫＋</span>
            </motion.button>
            <span className="text-[#b38a57] font-bold text-[9px] sm:text-[10px] md:text-xs tracking-widest mt-2 sm:mt-3 md:mt-3.5 select-none leading-none">
              孕婦＋助產師＋醫師
            </span>
          </div>

          {/* Rightside Logo blocks matching requested images with direct layout (no border/background) */}
          <div className="flex items-center gap-1.5 md:gap-3 z-10 w-auto" id="header-logo-placeholders">
            <div className="flex items-center justify-center select-none pointer-events-none cursor-default" title="台北市立聯合醫院">
              <FallbackImage 
                basePath="images/tch" 
                alt="北市聯醫 Logo" 
                referrerPolicy="no-referrer"
                className="h-7 sm:h-8 md:h-10 w-auto object-contain select-none pointer-events-none cursor-default"
              />
            </div>
            <div className="flex items-center justify-center select-none pointer-events-none cursor-default" title="國立臺灣師範大學健康促進與衛生教育學系">
              <FallbackImage 
                basePath="images/hphe" 
                alt="臺師大衛教系 Logo" 
                referrerPolicy="no-referrer"
                className="h-[22px] sm:h-[26px] md:h-[32px] w-auto object-contain select-none pointer-events-none cursor-default"
              />
            </div>
          </div>
        </div>
      </header>

      {/* INTEGRATED FULL-WIDTH CONTAINER: Header banner & selection menu together, spanning edge-to-edge layout */}
      <div className="w-full bg-white shadow-md border-b border-orange-100/60 relative z-20 animate-fade-in" id="top-full-width-section">
        {/* Only Home (qa) page shows the Header Banner */}
        {activeSection === 'qa' && (
          <div id="top-header-banner-section" className="w-full">
            <HeaderBanner />
          </div>
        )}

        {/* SECTION SELECTION MENU: Centered inside the full-width block with scroll-margin to clear sticky top-bar */}
        <div className="w-full max-w-4xl mx-auto px-4 py-3.5 scroll-mt-[56px] md:scroll-mt-[72px]" id="quick-selection-menu">
          
          {/* Transparent click detector to close search dropdown on outside click */}
          {isSearchFocused && (
            <div 
              className="fixed inset-0 z-30 bg-transparent cursor-default" 
              onClick={() => setIsSearchFocused(false)} 
            />
          )}

          {/* SITE-WIDE SEARCH BAR WITH VERTICAL MARQUEE BACKGROUND */}
          <div className="relative max-w-xl mx-auto mb-4.5 z-40" id="site-wide-search-container">
            <div className="w-full h-10 sm:h-11 bg-orange-50/20 border border-orange-100 rounded-full flex items-center px-4 hover:border-orange-200 focus-within:border-[#c96d42] focus-within:ring-2 focus-within:ring-[#c96d42]/10 transition-all shadow-sm relative z-40">
              <Search size={16} className="text-[#c96d42] shrink-0 mr-2" />
              
              <div className="relative flex-1 h-full flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  className="w-full h-full bg-transparent border-none text-gray-800 text-xs sm:text-sm font-semibold focus:outline-none placeholder-transparent py-1 select-text"
                  placeholder="搜尋孕產知識..."
                />
                
                {/* STATIC PLACEHOLDER */}
                {searchQuery === '' && !isSearchFocused && (
                  <div className="absolute inset-0 flex items-center pointer-events-none select-none">
                    <span className="text-gray-400 text-xs sm:text-sm font-semibold truncate">
                      共同探索醫助共照與孕產知識
                    </span>
                  </div>
                )}
              </div>

              {searchQuery !== '' && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full hover:bg-orange-100/50 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer ml-1"
                  title="清除搜尋"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* SEARCH RESULTS DROPDOWN */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-orange-100 rounded-2xl shadow-xl z-40 overflow-hidden max-h-[320px] flex flex-col"
                >
                  {searchQuery.trim() === '' ? (
                    // HOT RECOMMENDATIONS WHEN EMPTY
                    <div className="p-4 flex flex-col gap-2.5">
                      <span className="text-xs font-bold text-gray-400">熱門搜尋關鍵字</span>
                      <div className="flex flex-wrap gap-2">
                        {hotKeywords.map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-3 py-1.5 bg-orange-50/55 hover:bg-orange-100/60 text-[#c96d42] text-xs font-bold rounded-full transition-colors cursor-pointer"
                          >
                            #{term}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : filteredResults.length > 0 ? (
                    // GROUPED RESULTS
                    <div className="overflow-y-auto py-2 divide-y divide-orange-50/40">
                      {Array.from(new Set(filteredResults.map(r => r.category))).map(category => {
                        const categoryItems = filteredResults.filter(r => r.category === category);
                        const menuName = getCategoryMenuName(category);
                        return (
                          <div key={category} className="p-2">
                            <div className="px-2 py-1 text-[11px] font-black text-[#c96d42] uppercase tracking-wider">
                              {menuName}
                            </div>
                            <div className="flex flex-col gap-0.5 mt-1">
                              {categoryItems.map(item => {
                                const displayTitle = getDisplayTitle(item);
                                return (
                                  <button
                                    key={item.title}
                                    onClick={() => handleSearchResultClick(item)}
                                    className="w-full text-left p-2 hover:bg-orange-50/30 rounded-xl transition-colors cursor-pointer group flex flex-col"
                                  >
                                    <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#c96d42] transition-colors line-clamp-2">
                                      {highlightText(displayTitle, searchQuery)}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // NO RESULTS
                    <div className="p-6 text-center flex flex-col items-center justify-center gap-1.5 text-gray-400">
                      <HelpCircle size={28} className="text-orange-200" />
                      <span className="text-xs sm:text-sm font-semibold">無相關搜尋結果，請嘗試其他關鍵字！</span>
                      <span className="text-[11px] text-gray-300">可以試試：落紅、呼吸、助產師、出血</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            <button
              onClick={() => handleSelectSection('qa')}
              className={`py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                activeSection === 'qa'
                  ? 'bg-[#FBC4AB] text-[#4A3E3D] shadow-inner font-extrabold scale-102 border-b-2 border-amber-300 animate-menu-active-pulse'
                  : 'bg-orange-50/50 hover:bg-orange-50 text-gray-600 animate-menu-inactive-pulse border border-transparent'
              }`}
              id="menu-btn-qa"
            >
              <Home size={18} className="shrink-0" />
              <span className="truncate">首頁</span>
            </button>
 
            <button
              onClick={() => handleSelectSection('video')}
              className={`py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                activeSection === 'video'
                  ? 'bg-[#FBC4AB] text-[#4A3E3D] shadow-inner font-extrabold scale-102 border-b-2 border-amber-300 animate-menu-active-pulse animation-delay-200'
                  : 'bg-orange-50/50 hover:bg-orange-50 text-gray-600 animate-menu-inactive-pulse border border-transparent animation-delay-200'
              }`}
              id="menu-btn-video"
            >
              <Film size={18} className="shrink-0" />
              <span className="truncate">影音專區</span>
            </button>
 
            <button
              onClick={() => handleSelectSection('faq')}
              className={`py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                activeSection === 'faq'
                  ? 'bg-[#FBC4AB] text-[#4A3E3D] shadow-inner font-extrabold scale-102 border-b-2 border-amber-300 animate-menu-active-pulse animation-delay-400'
                  : 'bg-orange-50/50 hover:bg-orange-50 text-gray-600 animate-menu-inactive-pulse border border-transparent animation-delay-400'
              }`}
              id="menu-btn-faq"
            >
              <HelpCircle size={18} className="shrink-0" />
              <span className="truncate">常見問答</span>
            </button>
 
            <button
              onClick={() => handleSelectSection('recommend')}
              className={`py-2 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs md:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                activeSection === 'recommend'
                  ? 'bg-[#FBC4AB] text-[#4A3E3D] shadow-inner font-extrabold scale-102 border-b-2 border-amber-300 animate-menu-active-pulse animation-delay-600'
                  : 'bg-orange-50/50 hover:bg-orange-50 text-gray-600 animate-menu-inactive-pulse border border-transparent animation-delay-600'
              }`}
              id="menu-btn-recommend"
            >
              <Compass size={18} className="shrink-0" />
              <span className="truncate">資源推介</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Grid Frame container */}
      <div className={`${themeStyles.sectionWrapper} relative z-10 font-sans mt-2`}>

        {/* Selected Section viewport area with beautiful smooth fade-in transform */}
        <div id="content-viewport" className={`transition-all duration-350 ease-in-out transform ${sectionFade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.985]'} scroll-mt-20`}>
          {activeSection === 'qa' && (
            <div className="animate-fade-in space-y-4">
              <QASection 
                activeQuestionIndex={activeQuestionIndex}
              />
              <CompanionshipSection />
            </div>
          )}

          {activeSection === 'faq' && (
            <div className="animate-fade-in">
              <FAQSection 
                onNavigateToVideo={() => handleSelectSection('video')} 
                expandedFaqId={expandedFaqId}
              />
            </div>
          )}

          {activeSection === 'video' && (
            <div className="animate-fade-in">
              <VideoSection />
            </div>
          )}

          {activeSection === 'recommend' && (
            <div className="animate-fade-in">
              <RecommendSection />
            </div>
          )}
        </div>

      </div>

      {/* Joint project credits & exact custom copyright */}
      <Footer />

      {/* DOCK BACKDRAWER DRAWER: Off-canvas navigation of menu choices with spring transitions */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#4A3E3D]/60 backdrop-blur-sm flex justify-start"
            onClick={() => setIsMenuOpen(false)}
            id="sidebar-navigation-drawer"
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-80 max-w-[85vw] h-full bg-[#FFFBF9] shadow-2xl p-6 flex flex-col justify-between relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-orange-100">
                  <span className="font-extrabold text-[#c96d42] text-base font-sans flex items-center gap-2">
                    <Compass size={18} />
                    選單
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-[#c96d42] hover:bg-orange-50 active:scale-90 transition-all cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
  
                {/* Navigation list */}
                <nav className="mt-8 space-y-3">
                  <button
                    onClick={() => handleSelectSection('qa')}
                    className={`w-full text-left py-3.5 px-4 rounded-xl font-bold flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      activeSection === 'qa'
                        ? 'bg-[#FBC4AB] text-[#4A3E3D]'
                        : 'hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    <Home size={18} />
                    <span>首頁</span>
                  </button>

                   <button
                    onClick={() => handleSelectSection('video')}
                    className={`w-full text-left py-3.5 px-4 rounded-xl font-bold flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      activeSection === 'video'
                        ? 'bg-[#FBC4AB] text-[#4A3E3D]'
                        : 'hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    <Film size={18} />
                    <span>影音專區</span>
                  </button>

                  <button
                    onClick={() => handleSelectSection('faq')}
                    className={`w-full text-left py-3.5 px-4 rounded-xl font-bold flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      activeSection === 'faq'
                        ? 'bg-[#FBC4AB] text-[#4A3E3D]'
                        : 'hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    <HelpCircle size={18} />
                    <span>常見問答</span>
                  </button>

                  <button
                    onClick={() => handleSelectSection('recommend')}
                    className={`w-full text-left py-3.5 px-4 rounded-xl font-bold flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 ${
                      activeSection === 'recommend'
                        ? 'bg-[#FBC4AB] text-[#4A3E3D]'
                        : 'hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    <Compass size={18} />
                    <span>資源推介</span>
                  </button>
  

  
                  <a
                    href="https://tpech.gov.taipei/mp109161/Default.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left py-3.5 px-4 rounded-xl font-bold flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 hover:bg-orange-50 text-gray-700"
                  >
                    <ExternalLink size={18} />
                    <span>聯合醫院婦幼院區官網</span>
                  </a>
                </nav>
              </div>
  
              {/* Bottom Branding inside drawer */}
              <div className="border-t border-orange-100 pt-4 text-center">
                <Heart size={24} fill="#c96d42" className="mx-auto text-[#c96d42]/70 mb-2 animate-pulse" />
                
                {/* Address and General Contact info in Gray text as instructed */}
                <p className="text-[10px] text-gray-400 mb-2.5 leading-normal font-medium font-sans">
                  聯醫婦幼院址：100027 臺北市福州街12號
                  <br />
                  總機：(02)2391-6470
                </p>
  
                <p className="text-[11px] text-[#b38a57] font-semibold leading-relaxed">
                  孕助一家＝孕助醫＋
                </p>
                <p className="text-[9px] text-gray-500 mt-1">
                  北市聯醫婦幼 ✕ 臺師大衛教系
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth scroll back to top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={handleScrollToTop}
          className="fixed bottom-24 right-6 p-3 bg-[#b38a57] text-white rounded-full shadow-lg hover:bg-[#9c7344] hover:shadow-xl transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-[#FBC4AB] cursor-pointer"
          title="回頁首"
          id="scroll-to-top-btn"
        >
          <ArrowUpToLine size={20} />
        </button>
      )}
    </div>
  );
}
