# 孕產自主與助產照護學習平台 — 問卷模組移除操作說明書 (README_SURVEY_REMOVAL)

本平台原先設計了**前測問卷**與**後測問卷**（均以內嵌 Google Forms 的方式呈現），用於學術研究與成效評估。
若未來打包移交給醫院，且醫院需要**完全移除問卷流程**，請由工程師直接在程式碼中進行以下幾處簡單的修改。

---

## 快速修改指南 (三步驟完全移除)

以下修改均在 `src/App.tsx` 以及 `src/components/QASection.tsx` 這兩個檔案中進行。

### 步驟一：移除「首頁載入 2 秒後自動彈出的前測問卷」
在首頁載入時，系統會自動定時彈出前測問卷引導填寫。若要關閉此自動彈出功能：

1. 開啟 **`src/App.tsx`**。
2. 搜尋 `useEffect` 中啟動定時器的區塊（大約在第 33-47 行）：
   ```typescript
   // 原始程式碼
   useEffect(() => {
     // ... 清除暫存金鑰的部分保留 ...

     const timer = setTimeout(() => {
       setShowOnboarding(true); // 這裡會在 2 秒後觸發彈窗
     }, 2000);
     return () => clearTimeout(timer);
   }, []);
   ```
3. **修改方式：** 
   您可以直接將定時器內部的 `setShowOnboarding(true)` 改為 `setShowOnboarding(false)`，或者將整個 `const timer = ...` 到 `clearTimeout(timer)` 註解或刪除。
   
   *推薦做法 — 將定時器改為不觸發：*
   ```typescript
   useEffect(() => {
     // 保留清除暫存狀態，讓重新整理網頁時作答能正常重置
     sessionStorage.removeItem('maternity_qa_questions');
     sessionStorage.removeItem('maternity_qa_current_index');
     sessionStorage.removeItem('maternity_qa_is_completed');
     sessionStorage.removeItem('maternity_qa_has_finished_once');
     sessionStorage.removeItem('maternity_qa_user_answers');
     sessionStorage.removeItem('maternity_qa_answers_status');
     
     // 刪除或註解掉 setTimeout 彈窗邏輯即可
   }, []);
   ```

---

### 步驟二：移除側邊選單中的「前測問卷」與「後測問卷」按鈕
側邊抽屜選單中提供了讓使用者主動填寫問卷的按鈕，移除方式如下：

1. 開啟 **`src/App.tsx`**。
2. 搜尋 `handleOpenPreTestModal` 與 `handleOpenPostTestModal` 所在的按鈕區塊（大約在第 397-411 行）：
   ```typescript
   // 原始側邊選單按鈕程式碼
   <button
     onClick={handleOpenPreTestModal}
     className="w-full text-left py-3.5 px-4 rounded-xl font-bold flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 hover:bg-orange-50 text-gray-700"
   >
     <ClipboardList size={18} className="text-[#c96d42]" />
     <span>前測問卷</span>
   </button>

   <button
     onClick={handleOpenPostTestModal}
     className="w-full text-left py-3.5 px-4 rounded-xl font-bold flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 hover:bg-orange-50 text-gray-700"
   >
     <ClipboardList size={18} className="text-[#b38a57]" />
     <span>後測問卷</span>
   </button>
   ```
3. **修改方式：**
   直接將這兩個 `<button>...</button>` 元素整塊刪除或註解。
4. 為了讓程式碼更乾淨，您也可以一併刪除或註解檔案上方（大約第 102-123 行）的 `handleOpenPreTestModal` 與 `handleOpenPostTestModal` 這兩個函式宣告。

---

### 步驟三：移除「完成 8 題情境探索後的後測問卷自動彈出」
當使用者作答完第 8 題時，系統預設會彈出後測問卷。請依照以下步驟停用此自動彈出功能：

1. 開啟 **`src/components/QASection.tsx`**。
2. 搜尋 `handleNextQuestion` 函數（大約在第 350-368 行）：
   ```typescript
   // 原始程式碼
   const handleNextQuestion = () => {
     setShowModal(false);
     setSelectedOption(null);
     
     if (currentQuestionIndex + 1 === questions.length) {
       // Finished all 8! Trigger Completion state and show post-survey popup
       setIsCompleted(true);
       setShowPostSurveyModal(true); // <--- 這行負責自動彈出後測問卷
       setHasFinishedOnce(true);
     } else {
       // ...
     }
   };
   ```
3. **修改方式：**
   將 `setShowPostSurveyModal(true);` 這一行**刪除**、**註解**或改為 `setShowPostSurveyModal(false);`。
4. **移除後測問卷的 DOM 結構 (選做)：**
   在 `src/components/QASection.tsx` 的底部（大約在第 813-894 行），有一個包裹在 `{typeof document !== 'undefined' && createPortal(...)` 內的 `<AnimatePresence>` 模組，其 `id="post-survey-modal"`：
   ```typescript
   {/* Post-Survey Modal Overlay triggered when completing 8 questions */}
   {typeof document !== 'undefined' && createPortal(
     <AnimatePresence>
       {showPostSurveyModal && (
         <motion.div ...>
           ...
         </motion.div>
       )}
     </AnimatePresence>,
     document.body
   )}
   ```
   您可以放心地將這一整段後測問卷的 Modal 渲染程式碼刪除或註解，以完全釋放相關記憶體與 DOM 結構。

---

## 備註與驗證

1. **問卷彈窗元件所使用的 Icons：**
   移除上述程式碼後，若編譯器提示有未使用的變數（例如 `ClipboardList`），可以到檔案最上方（Import 處）將其移除，以保持程式碼最簡潔。
2. **編譯驗證：**
   修改完畢後，請在終端機中執行 `npm run build`。只要編譯成功，即可代表問卷流程已安全且乾淨地被剝離，不影響任何核心的情境問答、影音專區或常見問答之瀏覽。

---
*本平台由 台北市立聯合醫院婦幼院區 ✕ 國立臺灣師範大學健康促進與衛生教育學系 共同關懷協作。*
