import React, { useState, useEffect } from 'react';

// 定义单词结构
interface Word {
  name: string;
  trans: string[];
  notation: string;
  example: string;
}

const A2ExamMode: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // 1. 加载你刚刚创建的 goethe-a2.json
  useEffect(() => {
    fetch('/dicts/goethe-a2.json')
      .then(res => res.json())
      .then(data => {
        // 随机打乱顺序，模拟考试随机性
        setWords(data.sort(() => Math.random() - 0.5));
      });
  }, []);

  if (words.length === 0) return <div className="p-10 text-white">正在加载 A2 词库...</div>;

  const currentWord = words[currentIndex];

  const nextWord = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-[#24283b] rounded-2xl p-10 shadow-2xl border border-gray-700">
        <h2 className="text-blue-400 mb-4 text-sm font-bold tracking-widest uppercase">A2 考前模拟模式</h2>
        
        {/* 考试核心区域 */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-2">中文意思：</p>
          <p className="text-3xl font-bold mb-6">{currentWord.trans.join(' / ')}</p>
          
          <p className="text-gray-400 text-sm mb-2">例句助记：</p>
          <p className="text-xl italic text-gray-300 bg-black/20 p-4 rounded-lg border-l-4 border-blue-500">
             {currentWord.example}
          </p>
        </div>

        {/* 答案显示区域 */}
        <div className={`transition-all duration-300 mb-10 ${showAnswer ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-400 text-sm mb-2">德语单词：</p>
          <p className="text-4xl font-black text-green-400">{currentWord.name}</p>
          <p className="text-blue-300 mt-2 font-mono">[{currentWord.notation}]</p>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4">
          {!showAnswer ? (
            <button 
              onClick={() => setShowAnswer(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition-colors"
            >
              查看答案 (Check)
            </button>
          ) : (
            <button 
              onClick={nextWord}
              className="flex-1 bg-green-600 hover:bg-green-500 py-4 rounded-xl font-bold transition-colors"
            >
              下一个词 (Next)
            </button>
          )}
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          当前进度: {currentIndex + 1} / {words.length}
        </div>
      </div>
    </div>
  );
};

export default A2ExamMode;
