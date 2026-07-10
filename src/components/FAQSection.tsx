import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PhoneCall, Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQSectionProps {
  onNavigateToVideo?: () => void;
  expandedFaqId?: number | null;
}

export default function FAQSection({ onNavigateToVideo, expandedFaqId }: FAQSectionProps) {
  // Accordion state - tracks which FAQ card is expanded
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  useEffect(() => {
    if (expandedFaqId !== undefined && expandedFaqId !== null) {
      setActiveFAQ(expandedFaqId);
    }
  }, [expandedFaqId]);

  const toggleFAQ = (id: number) => {
    setActiveFAQ(prev => {
      const next = prev === id ? null : id;
      // Reset interaction sub-states when switching/closing
      if (next !== 1) setActiveBubbles([]);
      if (next !== 2) setSelectedScenario(null);
      if (next !== 3) setTrafficLight(null);
      if (next !== 4) setPhoneClicked(false);
      return next;
    });
  };

  // Question 1: Wish Bubbles
  const [activeBubbles, setActiveBubbles] = useState<string[]>([]);
  const birthPlanCategories = [
    {
      title: '1. 待產時的環境',
      options: [
        { id: 'env-1', text: '音樂播放' },
        { id: 'env-2', text: '燈光昏暗' },
        { id: 'env-3', text: '由伴侶攝影' }
      ]
    },
    {
      title: '2. 待產時的處置',
      options: [
        { id: 'proc-1', text: '會陰剃毛' },
        { id: 'proc-2', text: '灌腸' },
        { id: 'proc-3', text: '催生藥物' }
      ]
    },
    {
      title: '3. 減痛方式',
      options: [
        { id: 'pain-1', text: '依醫護建議' },
        { id: 'pain-2', text: '產球' },
        { id: 'pain-3', text: '減痛分娩' }
      ]
    },
    {
      title: '4. 生產時',
      options: [
        { id: 'birth-1', text: '自由體位' },
        { id: 'birth-2', text: '會陰切開術' },
        { id: 'birth-3', text: '伴侶執行斷臍' }
      ]
    }
  ];

  const handleToggleBubble = (id: string) => {
    setActiveBubbles(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  // Question 2: Two Choices Scenario
  const [selectedScenario, setSelectedScenario] = useState<'A' | 'B' | null>(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // Question 3: Traffic Lights - Initial state is null as requested
  const [trafficLight, setTrafficLight] = useState<'green' | 'yellow' | 'red' | null>(null);

  // Question 4: Phone Call click state
  const [phoneClicked, setPhoneClicked] = useState(false);

  return (
    <section className="pt-4 pb-10 max-w-3xl mx-auto px-4" id="faq-section">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-sans text-gray-800">
          常見問答
        </h2>
      </div>

      {/* Stack of Collapsible FAQs */}
      <div className="flex flex-col gap-4" id="faq-interactive-grid">
        
        {/* Topic 1: Wish Bubbles */}
        <div className="bg-white border border-orange-100/70 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden" id="faq-item-1">
          <button
            type="button"
            onClick={() => toggleFAQ(1)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-extrabold text-gray-800 hover:bg-orange-50/20 transition-colors duration-150 cursor-pointer select-none"
          >
            <span className="text-sm sm:text-base pr-4">
              1. 什麼是生產計畫書？該怎麼寫？
            </span>
            <div className="p-1 rounded-full bg-orange-50 text-[#c96d42] shrink-0">
              {activeFAQ === 1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {activeFAQ === 1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-orange-50 bg-orange-50/10"
              >
                <div className="p-5 flex flex-col gap-4">
                  {/* Explanation text is presented directly from the start */}
                  <div className="bg-orange-50/60 border border-orange-100/40 p-4 rounded-xl text-xs font-semibold text-gray-700 leading-relaxed text-left">
                    <div className="flex items-center gap-1.5 text-[#c96d42] mb-1.5 font-extrabold">
                      <Sparkles size={14} className="animate-pulse" />
                      <span className="font-extrabold text-[13px]">生產計畫書的意義</span>
                    </div>
                    生產計劃書就是您與接生者的溝通工具，讓接生者知道您的理想生產方式，與一定要避免的措施！
                    <br />
                    您可自擬、或參考以下範例題目：
                  </div>

                  {/* Birth Plan Categories & Option Bubbles (Unified in a single card with close spacing and thin dividers) */}
                  <div className="bg-white/80 p-3 sm:p-4 rounded-2xl border border-orange-100/40 shadow-sm text-left flex flex-col gap-2.5">
                    {birthPlanCategories.map((category, catIdx) => (
                      <div key={catIdx} className="flex flex-col gap-1.5">
                        <span className="text-xs sm:text-sm font-extrabold text-gray-800 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 bg-[#c96d42] rounded-full"></span>
                          {category.title}
                        </span>
                        
                        <div className="flex flex-wrap gap-1.5 justify-start mt-0.5">
                          {category.options.map((option, optIdx) => {
                            const isActive = activeBubbles.includes(option.id);
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => handleToggleBubble(option.id)}
                                className={`px-3 py-1 text-xs sm:text-[13px] font-semibold rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                                  isActive
                                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-[#FBC4AB] text-[#c96d42] shadow-sm scale-105 ring-2 ring-orange-50/20'
                                    : 'bg-white border-gray-100 text-gray-600 hover:border-orange-100 animate-bubble-breath'
                                  }`}
                                style={!isActive ? { animationDelay: `${(catIdx * 3 + optIdx) * 0.25}s` } : undefined}
                              >
                                <div className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                                  isActive ? 'border-[#c96d42] bg-[#c96d42] text-white' : 'border-gray-300 bg-white'
                                }`}>
                                  {isActive && <Check size={7} className="stroke-[3]" />}
                                </div>
                                <span>{option.text}</span>
                              </button>
                            );
                          })}
                        </div>
                        {catIdx < birthPlanCategories.length - 1 && (
                          <div className="border-b border-orange-100/10 mt-1.5 mb-0.5"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Topic 3: Traffic Lights (Now Positioned 2) */}
        <div className="bg-white border border-orange-100/70 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden" id="faq-item-2">
          <button
            type="button"
            onClick={() => toggleFAQ(3)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-extrabold text-gray-800 hover:bg-orange-50/20 transition-colors duration-150 cursor-pointer select-none"
          >
            <span className="text-sm sm:text-base pr-4">
              2. 何時該來醫院呢？
            </span>
            <div className="p-1 rounded-full bg-orange-50 text-[#c96d42] shrink-0">
              {activeFAQ === 3 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {activeFAQ === 3 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-orange-50 bg-orange-50/10"
              >
                <div className="p-5">
                  {/* Traffic Light panel directly with no helper texts */}
                  <div className="flex justify-center gap-6 py-3.5 px-6 bg-white rounded-2xl max-w-sm mx-auto border border-orange-100/50 shadow-sm">
                    <button
                      key="tl-g"
                      type="button"
                      onClick={() => setTrafficLight('green')}
                      className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                        trafficLight === 'green'
                          ? 'bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-100 scale-110'
                          : 'bg-emerald-50/80 text-emerald-800 hover:bg-emerald-100/50 border border-emerald-100'
                      }`}
                      title="綠燈"
                    >
                      <span className="text-base font-bold">🟢</span>
                      <span className="text-[10px] font-extrabold mt-0.5">綠燈</span>
                    </button>

                    <button
                      key="tl-y"
                      type="button"
                      onClick={() => setTrafficLight('yellow')}
                      className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                        trafficLight === 'yellow'
                          ? 'bg-amber-400 text-amber-950 shadow-lg ring-4 ring-amber-100 scale-110'
                          : 'bg-amber-50 text-amber-800 hover:bg-amber-100/50 border border-amber-200/80'
                      }`}
                      title="黃燈"
                    >
                      <span className="text-base font-bold">🟡</span>
                      <span className="text-[10px] font-extrabold mt-0.5">黃燈</span>
                    </button>

                    <button
                      key="tl-r"
                      type="button"
                      onClick={() => setTrafficLight('red')}
                      className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                        trafficLight === 'red'
                          ? 'bg-rose-500 text-white shadow-lg ring-4 ring-rose-100 scale-110'
                          : 'bg-rose-50 text-rose-800 hover:bg-rose-100/50 border border-rose-200/80'
                      }`}
                      title="紅燈"
                    >
                      <span className="text-base font-bold">🔴</span>
                      <span className="text-[10px] font-extrabold mt-0.5">紅燈</span>
                    </button>
                  </div>

                  {/* Current Light explanation block with slide down animation */}
                  <AnimatePresence initial={false}>
                    {trafficLight !== null && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        {trafficLight === 'green' && (
                          <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl text-xs text-gray-700 leading-relaxed text-center font-semibold">
                            <p className="text-emerald-600 font-extrabold text-sm mb-1">🟢 綠燈：安心在家觀察</p>
                            <p className="mb-3 text-[11px] text-gray-500">不規則陣痛 ➡️ 「在家放鬆洗個澡」。</p>
                            <div className="flex justify-center">
                              <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-emerald-100 bg-white shadow-sm flex items-center justify-center shrink-0">
                                <img
                                  src="/images/light_g.jpg"
                                  alt="綠燈：在家放鬆"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    if (parent) {
                                      const existing = parent.querySelector('.img-placeholder');
                                      if (!existing) {
                                        const placeholder = document.createElement('div');
                                        placeholder.className = 'img-placeholder absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col items-center justify-center text-emerald-600 p-3 text-center gap-1';
                                        placeholder.innerHTML = `
                                          <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-xl">🟢</div>
                                          <span class="text-[11px] font-extrabold tracking-wide mt-1">綠燈：在家放鬆</span>
                                          <span class="text-[9px] text-gray-400 font-medium leading-tight">不規則陣痛</span>
                                        `;
                                        parent.appendChild(placeholder);
                                      }
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {trafficLight === 'yellow' && (
                          <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl text-xs text-gray-700 leading-relaxed text-center font-semibold">
                            <p className="text-amber-600 font-extrabold text-sm mb-1">🟡 黃燈：先電話諮詢產房</p>
                            <p className="mb-3 text-[11px] text-gray-500">第一胎時每 5 分鐘一次，持續 2 小時；第二胎後是每 10 分鐘一次，持續 1 小時 ➡️ 「打電話給產房」</p>
                            <div className="flex justify-center">
                              <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-amber-200 bg-white shadow-sm flex items-center justify-center shrink-0">
                                <img
                                  src="/images/light_y.jpg"
                                  alt="黃燈：打給產房"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    if (parent) {
                                      const existing = parent.querySelector('.img-placeholder');
                                      if (!existing) {
                                        const placeholder = document.createElement('div');
                                        placeholder.className = 'img-placeholder absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50/60 flex flex-col items-center justify-center text-amber-700 p-3 text-center gap-1';
                                        placeholder.innerHTML = `
                                          <div class="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-xl">🟡</div>
                                          <span class="text-[11px] font-extrabold tracking-wide mt-1">黃燈：打電話諮詢</span>
                                          <span class="text-[9px] text-gray-400 font-medium leading-tight">規律陣痛警訊</span>
                                        `;
                                        parent.appendChild(placeholder);
                                      }
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {trafficLight === 'red' && (
                          <div className="bg-rose-50/50 border border-rose-200 p-4 rounded-xl text-xs text-gray-700 leading-relaxed text-center font-semibold">
                            <p className="text-rose-600 font-extrabold text-sm mb-1">🔴 紅燈：攜帶待產包立刻出發</p>
                            <p className="mb-3 text-[11px] text-gray-500">破水或大出血 ➡️ 「拿著待產包立刻出發」。</p>
                            <div className="flex justify-center">
                              <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-rose-200 bg-white shadow-sm flex items-center justify-center shrink-0">
                                <img
                                  src="/images/light_r.jpg"
                                  alt="紅燈：立刻出發"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    if (parent) {
                                      const existing = parent.querySelector('.img-placeholder');
                                      if (!existing) {
                                        const placeholder = document.createElement('div');
                                        placeholder.className = 'img-placeholder absolute inset-0 bg-gradient-to-br from-rose-50 to-red-50 flex flex-col items-center justify-center text-rose-600 p-3 text-center gap-1';
                                        placeholder.innerHTML = `
                                          <div class="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-xl">🔴</div>
                                          <span class="text-[11px] font-extrabold tracking-wide mt-1">紅燈：立刻前往醫院</span>
                                          <span class="text-[9px] text-gray-400 font-medium leading-tight">破水或出血急症</span>
                                        `;
                                        parent.appendChild(placeholder);
                                      }
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Topic 2: Scenario Two-Choice Quiz (Now Positioned 3) */}
        <div className="bg-white border border-orange-100/70 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden" id="faq-item-3">
          <button
            type="button"
            onClick={() => toggleFAQ(2)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-extrabold text-gray-800 hover:bg-orange-50/20 transition-colors duration-150 cursor-pointer select-none"
          >
            <span className="text-sm sm:text-base pr-4">
              3. 怎麼分辨是破水或分泌物呢？
            </span>
            <div className="p-1 rounded-full bg-orange-50 text-[#c96d42] shrink-0">
              {activeFAQ === 2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {activeFAQ === 2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-orange-50 bg-orange-50/10"
              >
                <div className="p-5">
                  <div className="bg-white rounded-xl p-4 border border-orange-100/40 shadow-sm">
                    <span className="text-xs font-extrabold text-gray-700 block mb-2.5">
                      哪一種情況發生時，必須立刻前往醫院？
                    </span>

                    <div className="flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedScenario('A')}
                        className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          selectedScenario === 'A'
                            ? 'bg-amber-50/60 border-amber-200 text-gray-800 shadow-sm'
                            : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-black text-amber-600 mr-2">A.</span>
                        濃稠、牽絲、量少
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedScenario('B')}
                        className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          selectedScenario === 'B'
                            ? 'bg-[#FFFDFB] border-[#FBC4AB] text-gray-800 shadow-sm ring-1 ring-orange-100/30'
                            : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-black text-[#c96d42] mr-2">B.</span>
                        清澈水狀、像尿尿一樣滴答流不停
                      </button>
                    </div>
                  </div>

                  {/* Feedback Output - only show when selectedScenario is not null */}
                  <AnimatePresence initial={false}>
                    {selectedScenario !== null && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        {selectedScenario === 'A' ? (
                          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl text-xs text-gray-700 leading-relaxed font-semibold text-left">
                            <span className="text-amber-600 font-extrabold block mb-1">⚠️ 貼心提示</span>
                            <p className="mb-3">這是正常的分泌物情形。如果是「清澈水狀、像尿尿一樣滴答流不停」則屬於破水，需要儘速前來醫院！</p>
                            
                            <div className="mt-3 flex flex-col items-center bg-white/80 p-3 rounded-xl border border-amber-100/60 shadow-sm">
                              <img 
                                src="/images/secretions.png" 
                                alt="分泌物與破水辨識圖" 
                                className="w-full max-w-xs sm:max-w-md rounded-lg object-contain cursor-zoom-in hover:opacity-90 transition-all"
                                onClick={() => setIsImageZoomed(true)}
                                referrerPolicy="no-referrer"
                              />
                              <a
                                href="/images/secretions.png"
                                download="secretions.png"
                                className="mt-3 w-full sm:w-auto px-5 py-2 bg-[#b38a57] hover:bg-[#9a7547] text-white font-extrabold rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer select-none"
                              >
                                <span>下載圖片</span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl text-xs text-gray-700 leading-relaxed font-semibold text-left">
                            <span className="text-emerald-600 font-extrabold block mb-1">🎉 答對了！</span>
                            <p className="mb-3">如果是「沒有味道及顏色的透明液體、像尿尿一樣滴答流不停」就是破水，千萬不要洗澡，趕快墊上產褥墊來醫院！</p>
                            
                            <div className="mt-3 flex flex-col items-center bg-white/80 p-3 rounded-xl border border-emerald-100/60 shadow-sm">
                              <img 
                                src="/images/secretions.png" 
                                alt="分泌物與破水辨識圖" 
                                className="w-full max-w-xs sm:max-w-md rounded-lg object-contain cursor-zoom-in hover:opacity-90 transition-all"
                                onClick={() => setIsImageZoomed(true)}
                                referrerPolicy="no-referrer"
                              />
                              <a
                                href="/images/secretions.png"
                                download="secretions.png"
                                className="mt-3 w-full sm:w-auto px-5 py-2 bg-[#b38a57] hover:bg-[#9a7547] text-white font-extrabold rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer select-none"
                              >
                                <span>下載圖片</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Topic 4: Push Force/Midwife phone call */}
        <div className="bg-white border border-orange-100/70 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden" id="faq-item-4">
          <button
            type="button"
            onClick={() => toggleFAQ(4)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-extrabold text-gray-800 hover:bg-orange-50/20 transition-colors duration-150 cursor-pointer select-none"
          >
            <span className="text-sm sm:text-base pr-4">
              4. 何時該開始學習執行用力技巧？
            </span>
            <div className="p-1 rounded-full bg-orange-50 text-[#c96d42] shrink-0">
              {activeFAQ === 4 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {activeFAQ === 4 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-orange-50 bg-orange-50/10"
              >
                <div className="p-5">
                  {/* Midwife incoming call interaction card (No helper texts) */}
                  <div className="flex items-center justify-center p-5 bg-white border border-orange-100/50 rounded-2xl shadow-sm">
                    <button
                      type="button"
                      onClick={() => setPhoneClicked(prev => !prev)}
                      className={`flex items-center gap-3 px-6 py-3.5 rounded-full shadow-md transition-all duration-300 cursor-pointer ${
                        phoneClicked
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600 scale-105 ring-4 ring-emerald-100'
                          : 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-105 animate-bounce'
                      }`}
                    >
                      <div className="p-1 rounded-full bg-white/20 animate-pulse">
                        <PhoneCall size={20} className={phoneClicked ? 'animate-none' : 'animate-pulse'} />
                      </div>
                      <span className="font-extrabold text-xs sm:text-sm tracking-wide">
                        {phoneClicked ? '已接聽：通話中...' : '接聽助產師來電'}
                      </span>
                    </button>
                  </div>

                  {/* Call Output Explanation - only show when phoneClicked is true with slide down animation */}
                  <AnimatePresence initial={false}>
                    {phoneClicked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="bg-orange-50/60 border border-orange-100/40 p-4 rounded-xl text-xs text-gray-700 leading-relaxed font-semibold text-left">
                          <span className="text-[#c96d42] font-extrabold block mb-1">📞 助產師的溫柔提醒</span>
                          <p>越早學習用力技巧，在生產時的掌握度才會比較高喔！因此建議您可與助產師聯繫，或參加「產前夫婦教育班」了解更多技能！</p>
                          {onNavigateToVideo && (
                            <button
                              type="button"
                              onClick={onNavigateToVideo}
                              className="mt-3 w-full sm:w-auto px-5 py-2 bg-[#b38a57] hover:bg-[#9a7547] text-white font-extrabold rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all text-[11px] sm:text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>點我前往學習</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Fullscreen Image Zoom Modal via React Portal to ensure true global overlay (matching pre/post test questionnaire style) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isImageZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsImageZoomed(false)}
              className="fixed inset-0 z-[100] bg-[#4A3E3D]/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-hidden cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="bg-[#FFFDFB] border-t-8 border-[#FBC4AB] rounded-2xl p-4 md:p-6 max-w-4xl w-full relative shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsImageZoomed(false)}
                  className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10 cursor-pointer"
                  title="關閉"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="text-center md:text-left mb-2 pr-8 select-none">
                  <h3 className="text-base font-extrabold text-[#c96d42]">
                    分泌物與破水辨識圖
                  </h3>
                </div>

                {/* Embedded Image Area */}
                <div className="w-full flex-1 rounded-xl overflow-auto bg-[#FFFDFB] border border-orange-100 p-2 flex items-center justify-center shadow-inner my-2">
                  <img
                    src="/images/secretions.png"
                    alt="分泌物與破水辨識圖 (放大)"
                    className="max-w-full max-h-[60vh] rounded-lg object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Buttons and footer bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3 pt-3 border-t border-orange-50">
                  <div className="text-[10px] text-gray-400 text-center sm:text-left">
                    您可以下載此圖片保存，或點擊右上角關閉視窗。
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <a
                      href="/images/secretions.png"
                      download="secretions.png"
                      className="w-full sm:w-auto py-2 px-6 bg-[#b38a57] hover:bg-[#9a7547] text-white font-extrabold text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
                    >
                      <span>下載圖片</span>
                    </a>
                  </div>
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
