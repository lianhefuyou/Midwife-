import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Heart, Star, RefreshCw, Sparkles, ExternalLink, X, HelpCircle, ChevronDown, Download, ZoomIn } from 'lucide-react';
import styles from './QASection.module.css';
import { QAQuestion, QAOption } from '../types';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'motion/react';
import { getAssetUrl } from '../utils/asset';

const SAMPLE_QUESTIONS: QAQuestion[] = [
  {
    id: 'q-1',
    category: '助產師與產婆',
    question: '助產師跟產婆一樣嗎？',
    options: [
      {
        id: 'opt-1-o',
        text: 'O',
        isCorrect: false,
        empathyFeedback: '現代助產師不僅傳承了經驗，更受過嚴格的現代醫學訓練與考照制度。'
      },
      {
        id: 'opt-1-x',
        text: 'X',
        isCorrect: true,
        empathyFeedback: '現代助產師不僅專精接生，更具備完善的醫療常規處理能力。'
      }
    ],
    explanation: '現代醫院的助產師皆需通過國家考試。台灣體制下的助產師大多具備「護理師＋助產師」的雙執照，不僅會溫柔接生，更具備打針、打點滴、給藥等現代醫療處理能力，專業度與安全性都大幅提升！'
  },
  {
    id: 'q-2',
    category: '接生權責',
    question: '產檢一切順利的話，助產師能獨立接生嗎？',
    options: [
      {
        id: 'opt-2-o',
        text: 'O',
        isCorrect: true,
        empathyFeedback: '助產師本身即是守護自然產的專家，可以獨立接生與照護母嬰。'
      },
      {
        id: 'opt-2-x',
        text: 'X',
        isCorrect: false,
        empathyFeedback: '在「低風險自然產」的狀況下，助產師是完全可以獨立完成接生作業的。'
      }
    ],
    explanation: '助產師受過嚴格的產科訓練。在聯合醫院的醫助共照體制下，只要經評估屬於低風險狀況，助產師完全能獨立主導接生；而醫師則隨時把關潛在醫療風險，給您雙重保障！「低風險自然產」，通常指：單胞胎、胎位正常（頭產式）、足月（37~42週），且媽媽沒有重大的妊娠合併症。'
  },
  {
    id: 'q-3',
    category: '自然產程',
    question: '待產進度卡關就只能打催生針嗎？',
    options: [
      {
        id: 'opt-3-o',
        text: 'O',
        isCorrect: false,
        empathyFeedback: '臥床反而因地心引力受限而讓產程變慢。助產師會優先採用物理方式，降低對藥物的依賴。'
      },
      {
        id: 'opt-3-x',
        text: 'X',
        isCorrect: true,
        empathyFeedback: '助產師會先引導產婦變換姿勢，這能有效幫助骨盆空間展開，是減少不必要醫療介入的最佳策略之一。'
      }
    ],
    explanation: '待產時一直平躺其實會違反地心引力。透過下床走動、坐產球或變換姿勢，能利用地心引力幫助胎兒下降，撐開骨盆空間、縮短產程，避免陷入打催生針的連鎖反應。'
  },
  {
    id: 'q-4',
    category: '生產姿勢',
    question: '生小孩一定要躺在產檯上嗎？',
    options: [
      {
        id: 'opt-4-o',
        text: 'O',
        isCorrect: false,
        empathyFeedback: '平躺雖方便醫療視角，但助產師更鼓勵順應身體本能，轉換有助於順產的姿勢。'
      },
      {
        id: 'opt-4-x',
        text: 'X',
        isCorrect: true,
        empathyFeedback: '媽媽可以依自身舒適度選擇蹲姿、跪姿、側臥等進行生產，助產師會配合產婦當下的生理需求，讓骨盆發揮最大的空間優勢。'
      }
    ],
    explanation: '傳統平躺接生主要是為了方便醫療人員視角。但其實「直立式姿勢」（如蹲姿、跪姿、側臥）能讓骨盆出口增加約 20% 到 30% 的空間！助產師會鼓勵您傾聽身體的聲音，隨時轉換最順應本能的姿勢。'
  },
  {
    id: 'q-5',
    category: '非藥物減痛',
    question: '還不能打無痛分娩前的陣痛，只能死命忍耐嗎？',
    options: [
      {
        id: 'opt-5-o',
        text: 'O',
        isCorrect: false,
        empathyFeedback: '其實您不需要獨自苦撐。助產師具備豐富 of「非藥物舒緩技巧」，能有效協助產婦度過這段時期。'
      },
      {
        id: 'opt-5-x',
        text: 'X',
        isCorrect: true,
        empathyFeedback: '助產師會用下背部按摩、溫水淋浴及引導呼吸等方式幫忙減痛，有效轉移注意力並減輕疼痛感。'
      }
    ],
    explanation: '陣痛時，助產師會透過下背部按摩、熱水淋浴或引導呼吸，刺激大腦分泌「腦內啡」（人體天然止痛藥），並透過轉移注意力來阻斷疼痛訊號，讓您在溫柔的安撫中度過宮縮。'
  },
  {
    id: 'q-6',
    category: '減痛自主權',
    question: '選擇助產師陪伴的溫柔生產就不能打無痛分娩了？',
    options: [
      {
        id: 'opt-6-o',
        text: 'O',
        isCorrect: false,
        empathyFeedback: '溫柔生產並不等於必須忍痛，只要產婦有意願，助產師隨時能協助聯繫麻醉科。'
      },
      {
        id: 'opt-6-x',
        text: 'X',
        isCorrect: true,
        empathyFeedback: '溫柔生產的核心在於「尊重產婦意願」，若覺得物理減痛不夠，助產師團隊會全力支持您的減痛選擇並安排施打。'
      }
    ],
    explanation: '溫柔生產不等於「必須忍痛」！助產照護的核心是「醫病共享決策（SDM）」。只要產婦覺得非藥物減痛不夠，助產師會尊重您的意願，立即協助聯繫麻醉醫師施打減痛分娩。'
  },
  {
    id: 'q-7',
    category: '掌握主導權',
    question: '產房SOP（剃毛、灌腸、剪會陰）可以自己決定不做嗎？',
    options: [
      {
        id: 'opt-7-o',
        text: 'O',
        isCorrect: true,
        empathyFeedback: '這些並非絕對必要，透過生產計畫書與醫師及助產師討論都可以選擇不剃毛不灌腸，並依生產時的狀況決定剪不剪會陰，產婦能大幅提升對生產过程的控制感與安心感。'
      },
      {
        id: 'opt-7-x',
        text: 'X',
        isCorrect: false,
        empathyFeedback: '其實在現代實證醫學與溫柔生產觀念中，這些常規處置已經不再是絕對必要的了。'
      }
    ],
    explanation: '「生產計畫書」是您與醫療團隊溝通的橋樑。常見的剃毛、灌腸或剪會陰，在溫柔生產中都不是必要的。提前討論能提升您對生產的「控制感」，找回身體自主權。'
  },
  {
    id: 'q-8',
    category: '黃金一小時',
    question: '生完後寶寶會馬上被推去嬰兒室嗎?',
    options: [
      {
        id: 'opt-8-o',
        text: 'O',
        isCorrect: false,
        empathyFeedback: '休息固然重要，但產後的「黃金一小時」對母嬰同室與建立泌乳機制更為關鍵，助產師會從旁優先協助建立母嬰連結。'
      },
      {
        id: 'opt-8-x',
        text: 'X',
        isCorrect: true,
        empathyFeedback: '助產師會把握「黃金一小時」，優先協助媽媽與寶寶進行肌膚接觸，伴侶也可以參與，提升家庭親密關係的連結。'
      }
    ],
    explanation: '產後的「黃金一小時」非常關鍵！助產師會協助寶寶與您進行肌膚接觸，穩定寶寶的心跳與體溫，促進媽媽分泌催產素，幫助子宮收縮並順利啟動母乳哺育。'
  }
];

// Fisher-Yates shuffle helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Helper to resolve specific golden feedback titles from option IDs to avoid generic placeholders
const getFeedbackTitle = (option: QAOption): string => {
  switch (option.id) {
    case 'opt-1-o': return '這是常見的誤解喔';
    case 'opt-1-x': return '觀念很正確';
    case 'opt-2-o': return '觀念很清晰';
    case 'opt-2-x': return '這是常見的誤解喔';
    case 'opt-3-o': return '這是常見的誤解喔';
    case 'opt-3-x': return '觀念很正確';
    case 'opt-4-o': return '這是常見的誤解喔';
    case 'opt-4-x': return '觀念很正確';
    case 'opt-5-o': return '這是常見的誤解喔';
    case 'opt-5-x': return '觀念很正確';
    case 'opt-6-o': return '這是常見的誤解喔';
    case 'opt-6-x': return '觀念很正確';
    case 'opt-7-o': return '完全正確';
    case 'opt-7-x': return '這是誤解喔';
    case 'opt-8-o': return '這是常見的誤解喔';
    case 'opt-8-x': return '觀念很正確';
    default:
      return option.isCorrect ? '觀念完全正確！' : '讓我們一起理解看看：';
  }
};

interface QASectionProps {
  onOpenPostTest?: () => void;
  activeQuestionIndex?: number | null;
}

export default function QASection({ activeQuestionIndex }: QASectionProps = {}) {
  const [questions, setQuestions] = useState<QAQuestion[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('maternity_qa_questions');
      if (saved) return JSON.parse(saved);
    }
    return [...SAMPLE_QUESTIONS];
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('maternity_qa_current_index');
      if (saved) return Number(saved);
    }
    return 0;
  });

  useEffect(() => {
    if (activeQuestionIndex !== undefined && activeQuestionIndex !== null) {
      setCurrentQuestionIndex(activeQuestionIndex);
    }
  }, [activeQuestionIndex]);
  const [selectedOption, setSelectedOption] = useState<QAOption | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);

  // Trigger 5-second lock with progress bar when the empathy modal shows up
  useEffect(() => {
    if (showModal) {
      setProgress(0);
      const startTime = Date.now();
      const duration = 5000; // 5 seconds
      let animFrameId: number;
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(currentProgress);
        
        if (elapsed < duration) {
          animFrameId = requestAnimationFrame(updateProgress);
        }
      };
      
      animFrameId = requestAnimationFrame(updateProgress);
      return () => cancelAnimationFrame(animFrameId);
    } else {
      setProgress(0);
    }
  }, [showModal]);

  // States to track completed state
  const [isCompleted, setIsCompleted] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('maternity_qa_is_completed');
      return saved === 'true';
    }
    return false;
  });
  const [hasFinishedOnce, setHasFinishedOnce] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('maternity_qa_has_finished_once');
      return saved === 'true';
    }
    return false;
  });
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('maternity_qa_user_answers');
      if (saved) return JSON.parse(saved);
    }
    return {};
  });
  const [showFaqBtn, setShowFaqBtn] = useState(true);
  const [answersStatus, setAnswersStatus] = useState<Record<string, { selectedText: string; isCorrect: boolean }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('maternity_qa_answers_status');
      if (saved) return JSON.parse(saved);
    }
    return {};
  });
  const [showPathModal, setShowPathModal] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);

  // Synchronize state changes to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('maternity_qa_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    sessionStorage.setItem('maternity_qa_current_index', String(currentQuestionIndex));
  }, [currentQuestionIndex]);

  useEffect(() => {
    sessionStorage.setItem('maternity_qa_is_completed', String(isCompleted));
  }, [isCompleted]);

  useEffect(() => {
    sessionStorage.setItem('maternity_qa_has_finished_once', String(hasFinishedOnce));
  }, [hasFinishedOnce]);

  useEffect(() => {
    sessionStorage.setItem('maternity_qa_user_answers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    sessionStorage.setItem('maternity_qa_answers_status', JSON.stringify(answersStatus));
  }, [answersStatus]);

  const correctCount = Object.values(answersStatus).filter((a: any) => a.isCorrect).length;
  const incorrectCount = Object.values(answersStatus).filter((a: any) => !a.isCorrect).length;

  // Never disable webpage scrolling to ensure the main webpage scrollbar is fully active and functional at all times
  useEffect(() => {
    // Scrollbar locking is completely disabled as requested to keep the page scroll active
  }, [showPathModal, showZoomModal]);

  useEffect(() => {
    if (!isCompleted) {
      setShowFaqBtn(true);
      return;
    }

    // Always start with showing the button
    setShowFaqBtn(true);

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Always show when near top (first 120px) to prevent hiding initially
          if (currentScrollY < 120) {
            setShowFaqBtn(true);
            lastScrollY = currentScrollY;
            ticking = false;
            return;
          }

          const diff = currentScrollY - lastScrollY;
          if (Math.abs(diff) > 12) {
            if (diff > 0) {
              // Scrolling down -> hide
              setShowFaqBtn(false);
            } else {
              // Scrolling up -> show
              setShowFaqBtn(true);
            }
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCompleted]);

  const handleScrollToCompanionship = () => {
    const element = document.getElementById('companionship-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option: QAOption) => {
    setSelectedOption(option);
    setShowModal(true);

    // Save answer context for report Summary (no correct/incorrect highlight bias, pure cognitive learning path)
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option.text === 'O' ? 'O (是)' : option.text === 'X' ? 'X (否)' : option.text
    }));

    // Record correct/incorrect status
    setAnswersStatus(prev => ({
      ...prev,
      [currentQuestion.id]: {
        selectedText: option.text,
        isCorrect: option.isCorrect
      }
    }));
  };

  const handleNextQuestion = () => {
    setShowModal(false);
    setSelectedOption(null);
    
    if (currentQuestionIndex + 1 === questions.length) {
      // Finished all 8! Trigger Completion state and record finishing status
      setIsCompleted(true);
      setHasFinishedOnce(true);
    } else {
      setIsTransitioning(true);
      
      // Slow down card loading by 750ms so that the transition is peaceful, serene, and professional
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 750);
    }
  };

  const handleRestart = () => {
    setIsTransitioning(true);
    setSelectedOption(null);
    setShowModal(false);
    setIsCompleted(false);
    setUserAnswers({});
    setAnswersStatus({});
    setShowPathModal(false);
    setShowZoomModal(false);
    
    // Explicitly clear session storage so subsequent updates on clean restart are properly refreshed
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('maternity_qa_questions');
      sessionStorage.removeItem('maternity_qa_current_index');
      sessionStorage.removeItem('maternity_qa_is_completed');
      sessionStorage.removeItem('maternity_qa_user_answers');
      sessionStorage.removeItem('maternity_qa_answers_status');
    }

    // Shuffle questions on restart for subsequent re-testing attempts
    if (hasFinishedOnce) {
      setQuestions(shuffleArray(SAMPLE_QUESTIONS));
    } else {
      setQuestions([...SAMPLE_QUESTIONS]);
    }

    setTimeout(() => {
      setCurrentQuestionIndex(0);
      setIsTransitioning(false);
    }, 500);
  };

  const handleDownloadReport = () => {
    let reportText = `學習路徑精華懶人包\n`;
    reportText += `=========================================\n\n`;
    reportText += `恭喜您完成了 8 個關鍵孕產信念的探索！以下是您的專屬學習路徑與迷思導正錦囊：\n\n`;
    SAMPLE_QUESTIONS.forEach((q, idx) => {
      const userChoice = userAnswers[q.id];
      reportText += `【第 ${idx + 1} 題】 ${q.category}\n`;
      reportText += `情境探索：${q.question}\n`;
      if (userChoice) {
        reportText += `我的選擇偏好：${userChoice}\n`;
      }
      reportText += `衛教補給站：\n${q.explanation}\n`;
      reportText += `-----------------------------------------\n\n`;
    });
    reportText += `孕助一家＝孕助醫＋\n`;
    reportText += `北市聯醫婦幼 ✕ 臺師大衛教系 祝福每一位溫柔順產的媽媽\n`;
    reportText += `聯醫婦幼院址：100027 臺北市福州街12號  總機：(02)2391-6470\n`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `孕助醫＋_學習懶人包.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReportHTML = () => {
    let htmlContent = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>學習路徑精華懶人包</title>
  <style>
    body {
      background-color: #FFF8EE;
      color: #4A3E3D;
      font-family: system-ui, -apple-system, sans-serif;
      padding: 20px;
      margin: 0;
    }
    .container {
      max-width: 650px;
      margin: 0 auto;
      background: white;
      border: 3px solid #FBC4AB;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 10px 25px rgba(179,138,87,0.15);
    }
    h1 {
      color: #c96d42;
      font-size: 20px;
      text-align: center;
      margin-bottom: 5px;
    }
    .subtitle {
      text-align: center;
      font-size: 13px;
      color: #7D6F6D;
      margin-bottom: 25px;
    }
    .card {
      background: #FFFDFB;
      border: 1px solid #FFF0E8;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .card-num {
      display: inline-block;
      font-size: 11px;
      font-weight: bold;
      color: #c96d42;
      background: #FFF0E8;
      padding: 2px 8px;
      border-radius: 99px;
      margin-bottom: 10px;
    }
    .question {
      font-weight: bold;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    .option {
      background: white;
      border: 1px solid #FFF0E8;
      border-radius: 8px;
      padding: 10px;
      font-size: 13px;
      color: #555;
      margin-bottom: 10px;
    }
    .tips {
      background: #FFFBF0;
      border-left: 4px solid #b38a57;
      padding: 10px;
      border-radius: 0 8px 8px 0;
      font-size: 12.5px;
      line-height: 1.5;
      color: #555;
    }
    .tips-title {
      font-weight: bold;
      color: #b38a57;
      display: block;
      margin-bottom: 3px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      border-top: 1px dashed #FBC4AB;
      padding-top: 15px;
      font-size: 12px;
      color: #7D6F6D;
    }
    .footer-highlight {
      font-weight: bold;
      color: #b38a57;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>學習路徑精華懶人包</h1>
    <div class="subtitle">北市聯醫婦幼 ✕ 臺師大衛教系 祝福您溫柔順產</div>
`;

    SAMPLE_QUESTIONS.forEach((q, idx) => {
      const userChoice = userAnswers[q.id];
      htmlContent += `
    <div class="card">
      <span class="card-num">${idx + 1}. ${q.category}</span>
      <div class="question">情境：${q.question}</div>
      ` + (userChoice ? `<div class="option"><strong>我的選擇偏好：</strong> ${userChoice}</div>` : '') + `
      <div class="tips">
        <span class="tips-title">衛教補給站：</span>
        ${q.explanation}
      </div>
    </div>`;
    });

    htmlContent += `
    <div class="footer">
      <p class="footer-highlight">孕助一家＝孕助醫＋</p>
      <p>聯醫婦幼院址：100027 臺北市福州街12號 ✕ 總機：(02)2391-6470</p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `孕助醫＋_學習懶人包.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="pt-2 pb-4 max-w-4xl mx-auto px-4" id="qa-section">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-800">
          媽咪，您有聽過嗎⋯？
        </h2>
      </div>

      {isCompleted ? (
        /* SPECIAL VIEWPORT: Custom Infographic (懶人包) Image with Zoom & Download */
        <div className="bg-white border-4 border-white shadow-xl rounded-3xl p-6 md:p-8 animate-fade-in text-center max-w-4xl mx-auto" id="qa-completion-infographic-view">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-extrabold text-[#c96d42] mb-2">
              恭喜完成探索！
            </h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
              點擊下方圖片可放大檢視或下載保存！
            </p>
          </div>

          {/* Compact Small O & X Scores display directly above the infographic image as requested */}
          <div className="flex items-center justify-center gap-6 mb-3 animate-fade-in">
            <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-sm sm:text-base">
              <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-black font-sans text-xs">O</span>
              <span>{correctCount}</span>
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5 text-rose-500 font-extrabold text-sm sm:text-base">
              <span className="w-5 h-5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center font-black font-sans text-xs">X</span>
              <span>{incorrectCount}</span>
            </span>
          </div>

          {/* Underneath the scores is a single clean button for viewing detailed path */}
          <div className="mb-6 animate-fade-in">
            <button
              onClick={() => setShowPathModal(true)}
              className="py-2.5 px-6 bg-[#b38a57] hover:bg-[#9c7344] text-white font-extrabold rounded-xl text-xs sm:text-sm hover:scale-[1.02] active:scale-95 duration-150 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm mx-auto"
            >
              <HelpCircle size={15} />
              <span>查看詳細答題路徑</span>
            </button>
          </div>

          {/* Infographic Image Card with hover styles and click-to-zoom action */}
          <div className="relative group max-w-2xl mx-auto rounded-2xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 mb-6 bg-orange-50/20">
            <img
              src={getAssetUrl('images/qa.jpg')}
              alt="孕助醫＋ 學習懶人包"
              referrerPolicy="no-referrer"
              className="w-full h-auto cursor-zoom-in group-hover:scale-[1.01] transition-transform duration-300"
              onClick={() => setShowZoomModal(true)}
              onError={(e) => {
                // If qa.jpg is not found yet, gracefully fall back to infographic.png
                (e.target as HTMLImageElement).src = getAssetUrl('images/infographic.png');
              }}
            />
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap gap-3 justify-center items-center max-w-lg mx-auto mb-4">
            <a
              href={getAssetUrl('images/qa.jpg')}
              download="qa.jpg"
              className="py-2.5 px-4 bg-[#b38a57] hover:bg-[#9c7344] text-white font-extrabold rounded-xl text-xs sm:text-sm hover:scale-[1.03] active:scale-95 duration-150 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              onClick={(e) => {
                // Safe check if image falls back
                const img = document.querySelector('img[alt*="孕助醫"]');
                if (img && (img as HTMLImageElement).src.includes('infographic.png')) {
                  e.preventDefault();
                  const link = document.createElement('a');
                  link.href = getAssetUrl('images/infographic.png');
                  link.download = 'infographic.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            >
              <Download size={16} />
              <span>下載儲存</span>
            </a>
            <button 
              onClick={handleRestart}
              className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-xl text-xs sm:text-sm hover:scale-[1.03] active:scale-95 duration-150 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <RefreshCw size={14} />
              <span>重新測試</span>
            </button>
          </div>
        </div>
      ) : (
        /* STANDARD QA RUNNING STATE */
        /* Question Card Box with Transition Loader */
        isTransitioning ? (
          <div className={`${styles.qaWrapper} flex flex-col justify-center items-center py-20 text-center animate-pulse`}>
            <div className="w-10 h-10 border-4 border-[#b38a57] border-t-transparent rounded-full animate-spin mb-4" />
            <h4 className="text-[#b38a57] font-bold text-base mb-1">正在為您準備下一學習情境</h4>
            <p className="text-xs text-gray-400">請保持放鬆，深呼吸享受孕產之旅</p>
          </div>
        ) : (
          <div className={`${styles.qaWrapper} border border-orange-100/60 shadow-lg`}>
            <div className={styles.questionHeader}>
              <span className={styles.categoryTag}>
                {currentQuestion.category}
              </span>
              <span className={styles.progressLabel}>
                進度：{currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>

            <h3 className={styles.questionBody}>
              {currentQuestion.question}
            </h3>

            {/* Option select choices with added transitions and animations */}
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isO = option.text === 'O';
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className="flex flex-col items-center justify-center py-8 px-4 bg-[#fdfaf7] hover:bg-orange-50/70 border-2 border-[#fbc4ab]/20 rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-95 transform transition-all duration-200 shadow-sm text-center focus:outline-none"
                    id={`qa-option-${option.id}`}
                  >
                    <span className={`text-5xl font-extrabold ${isO ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation row inside card */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end items-center flex-wrap gap-2">
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-1.5 text-xs text-[#b38a57] hover:text-[#9c7344] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer font-bold"
                title="從第一題重新自我檢驗"
                id="qa-reset-btn"
              >
                <RefreshCw size={13} />
                重新測試
              </button>
            </div>

            {/* Empathetic feedback block contained strictly within the Q&A wrapper */}
            <AnimatePresence>
              {showModal && selectedOption && (
                <div 
                  className="absolute inset-0 z-50 bg-[#4A3E3D]/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-hidden rounded-2xl" 
                  id="empathy-modal"
                >
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    className="bg-[#FFFDFB] border-t-8 border-[#FBC4AB] rounded-2xl p-5 md:p-6 max-w-xl w-full max-h-[94%] relative shadow-2xl flex flex-col"
                  >
                    <div className="text-center mb-3 shrink-0">
                      <div className="mx-auto w-14 h-14 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 flex items-center justify-center mb-2 shadow-sm">
                        <span className="text-3xl font-black text-[#D4AF37] leading-none select-none">
                          {selectedOption.isCorrect ? 'O' : 'X'}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-[#b38a57]">
                        {getFeedbackTitle(selectedOption)}
                      </h4>
                    </div>

                    {/* Single scrollable container for empathy text and science explanation to prevent scroll conflicts */}
                    <div className={`flex-1 overflow-y-auto pr-1.5 mb-4 text-left ${styles.scrollbarCustom}`}>
                      {/* Central empathy feedback text */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-center mb-4 font-medium px-2">
                        {selectedOption.empathyFeedback}
                      </p>

                      {/* Detailed Scientific Clarification Box */}
                      <div className="bg-[#b38a57]/5 p-4 rounded-xl text-left border border-[#b38a57]/20 mb-4">
                        <span className="text-xs font-bold text-[#b38a57] block mb-1 font-sans">衛教補給站：</span>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {currentQuestion.explanation}
                        </p>
                      </div>

                      {/* Rounded dismiss CTA with smooth 5-second progress-based activation lock (no text countdowns) */}
                      <button
                        type="button"
                        onClick={progress >= 100 ? handleNextQuestion : undefined}
                        disabled={progress < 100}
                        className="relative w-full py-3 overflow-hidden rounded-xl text-xs sm:text-sm font-extrabold text-center transition-all duration-150 shadow-md shrink-0 focus:outline-none select-none"
                        style={{
                          backgroundColor: progress >= 100 ? '#b38a57' : '#e6dfd7',
                          color: progress >= 100 ? '#ffffff' : '#8c8070',
                          cursor: progress >= 100 ? 'pointer' : 'not-allowed',
                          transform: progress >= 100 ? undefined : 'none',
                        }}
                        id="modal-dismiss-btn"
                      >
                        {/* Progress fill layer */}
                        {progress < 100 && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-[#b38a57]/25 pointer-events-none"
                            style={{ 
                              width: `${progress}%`,
                              willChange: 'width'
                            }}
                          />
                        )}
                        <span className="relative z-10">了解了！前往下一題</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )
      )}

      {isCompleted && typeof document !== 'undefined' && createPortal(
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 transform ${
            showFaqBtn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
          data-html2canvas-ignore="true"
        >
          <button
            onClick={handleScrollToCompanionship}
            className="flex items-center gap-2 px-5 py-3 bg-[#c96d42] hover:bg-[#b05a30] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.05] active:scale-95 duration-150 cursor-pointer"
          >
            <Heart size={16} fill="white" className="text-white shrink-0" />
            <span>助產師陪伴流程</span>
            <ChevronDown size={16} className="animate-bounce mt-0.5 shrink-0" />
          </button>
        </div>,
        document.body
      )}

      {/* Floating score badge removed to avoid clutter below CompanionshipSection */}

      {/* Answer Path and Score Details Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showPathModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[9999] bg-[#4A3E3D]/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-hidden" 
              id="path-modal" 
              onClick={() => setShowPathModal(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="bg-[#FFFDFB] border-t-8 border-[#FBC4AB] rounded-2xl p-4 md:p-6 max-w-4xl w-full relative shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setShowPathModal(false)}
                  className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10 cursor-pointer"
                  title="關閉"
                >
                  <X size={20} />
                </button>
  
                {/* Header */}
                <div className="mb-3 pr-8 border-b border-orange-100 pb-2">
                  <h3 className="text-base md:text-lg font-extrabold text-[#c96d42] flex items-center gap-1.5 justify-center md:justify-start">
                    <Sparkles size={20} className="text-[#c96d42]" />
                    <span>我的答題路徑</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">
                    這裡記錄了您本次探索之作答選擇。您可以點擊下方按鈕將網頁保存至您的裝置。
                  </p>
                </div>
  
                {/* Path List (8 questions) */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4" style={{ maxHeight: '55vh' }}>
                  {questions.map((q, idx) => {
                    const userChoice = userAnswers[q.id];
                    const choiceStatus = answersStatus[q.id];
                    
                    return (
                      <div key={q.id} className="border border-orange-100/60 rounded-2xl p-4 bg-white hover:border-orange-100 duration-200 transition-all shadow-sm">
                        <div className="flex items-center justify-between gap-2 border-b border-orange-50 pb-2 mb-2">
                          <span className="text-xs font-bold text-[#c96d42] bg-orange-50 px-2.5 py-0.5 rounded-full">
                            {idx + 1}. {q.category}
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-bold text-gray-800 leading-relaxed mb-2.5">
                          情境探索：{q.question}
                        </h4>
                        
                        {userChoice && (
                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl mb-2.5">
                            <p className="text-xs text-gray-600 leading-relaxed">
                              <span className="font-semibold text-gray-700">我的選擇偏好：</span>
                              <span className={`font-bold ml-1 ${
                                choiceStatus?.isCorrect ? 'text-emerald-600' : 'text-rose-500'
                              }`}>
                                {userChoice}
                              </span>
                            </p>
                          </div>
                        )}
                        
                        <div className="bg-amber-50/40 border-l-4 border-[#b38a57] p-3 rounded-r-xl">
                          <span className="text-xs font-bold text-[#b38a57] block mb-1">衛教補給站：</span>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
  
                {/* Footer with actions Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
                  <div className="text-[10px] text-gray-400 text-center sm:text-left">
                    您可以下載保存 HTML 格式的完整學習報告。
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={handleDownloadReportHTML}
                      className="py-2 px-4 bg-[#b38a57] hover:bg-[#9c7344] text-white font-extrabold rounded-xl text-xs hover:scale-[1.02] active:scale-95 duration-150 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Download size={14} />
                      <span>下載網頁</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPathModal(false)}
                      className="py-2 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-xl text-xs hover:scale-[1.02] active:scale-95 duration-150 transition-all cursor-pointer shadow-sm animate-fade-in"
                    >
                      關閉視窗
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}



      {/* Fullscreen Zoom Modal (Lightbox) styled exactly like the pre-survey onboarding popup as requested */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showZoomModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[9999] bg-[#4A3E3D]/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-hidden"
              onClick={() => setShowZoomModal(false)}
              id="zoom-modal"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="bg-[#FFFDFB] border-t-8 border-[#FBC4AB] rounded-2xl p-4 md:p-6 max-w-4xl w-full relative shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button identical to pre-survey modal close x button */}
                <button
                  type="button"
                  onClick={() => setShowZoomModal(false)}
                  className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10 cursor-pointer"
                  title="關閉"
                  id="zoom-modal-close-x"
                >
                  <X size={20} />
                </button>
  
                {/* Framed full-size image viewport matching pre-survey embedded box layout */}
                <div className="w-full flex-1 rounded-xl overflow-auto border border-orange-100 bg-[#FFFDFB] relative shadow-inner my-2 flex items-center justify-center">
                  <img
                    src={getAssetUrl('images/qa.jpg')}
                    alt="孕助醫＋ 學習懶人包"
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[75vh] object-contain rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getAssetUrl('images/infographic.png');
                    }}
                  />
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
