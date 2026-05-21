'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (data: {
    year: number;
    month: number;
    day: number;
    hour: number;
    question: string;
  }) => void;
  loading: boolean;
}

export default function FortuneForm({ onSubmit, loading }: Props) {
  const now = new Date();
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit({ year, month, day, hour, question: question.trim() });
  };

  const shichenOptions = [
    { value: 0, label: '子时 (23:00-01:00)' },
    { value: 2, label: '丑时 (01:00-03:00)' },
    { value: 4, label: '寅时 (03:00-05:00)' },
    { value: 6, label: '卯时 (05:00-07:00)' },
    { value: 8, label: '辰时 (07:00-09:00)' },
    { value: 10, label: '巳时 (09:00-11:00)' },
    { value: 12, label: '午时 (11:00-13:00)' },
    { value: 14, label: '未时 (13:00-15:00)' },
    { value: 16, label: '申时 (15:00-17:00)' },
    { value: 18, label: '酉时 (17:00-19:00)' },
    { value: 20, label: '戌时 (19:00-21:00)' },
    { value: 22, label: '亥时 (21:00-23:00)' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-amber-200 mb-3">📅 出生日期（阳历）</h3>
        <p className="text-xs text-stone-500 mb-3">系统会自动转换为农历八字 · 不知道具体时辰可选午时</p>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block text-sm text-stone-400 mb-1">年</label>
            <input
              type="number"
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              min={1900}
              max={now.getFullYear()}
              className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100
                         focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent
                         transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-stone-400 mb-1">月</label>
            <input
              type="number"
              value={month}
              onChange={e => setMonth(Number(e.target.value))}
              min={1} max={12}
              className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100
                         focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent
                         transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-stone-400 mb-1">日</label>
            <input
              type="number"
              value={day}
              onChange={e => setDay(Number(e.target.value))}
              min={1} max={31}
              className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100
                         focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent
                         transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-stone-400 mb-1">时辰</label>
            <select
              value={hour}
              onChange={e => setHour(Number(e.target.value))}
              className="w-full px-2 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm
                         focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent
                         transition-colors"
            >
              {shichenOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-amber-200 mb-3">🔮 你想问什么？</h3>
        <p className="text-xs text-stone-500 mb-3">
          可以问事业、感情、方向、人生等 · 越具体越准确
        </p>
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="例如：我在现在的公司待了五年，最近总感觉领导不太重视我，工作也没什么动力，不知道该不该换个环境..."
          rows={4}
          className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-100
                     placeholder-stone-600 resize-none
                     focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent
                     transition-colors"
        />
        <p className="text-xs text-stone-600 mt-2 text-right">{question.length} 字</p>
      </div>

      <button
        type="submit"
        disabled={loading || !question.trim()}
        className="w-full py-3 px-6 bg-gradient-to-r from-amber-700 to-amber-600
                   hover:from-amber-600 hover:to-amber-500
                   disabled:from-stone-700 disabled:to-stone-700 disabled:text-stone-500
                   text-stone-100 font-semibold rounded-lg
                   transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                   shadow-lg shadow-amber-900/30"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            推演命理中...
          </span>
        ) : (
          '✦ 开始推演命理'
        )}
      </button>
    </form>
  );
}
