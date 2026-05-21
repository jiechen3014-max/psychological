'use client';

import { useState } from 'react';
import FortuneForm from '@/components/FortuneForm';
import FortuneResult from '@/components/FortuneResult';

interface ResultData {
  mode: 'local' | 'ai';
  lunarDate: string;
  bazi: { year: string; month: string; day: string; hour: string };
  zodiac: string;
  wuxing: string;
  signals: {
    toneProfile: string;
    profile: string;
    keywords: string[];
  };
  reading?: string;
  message?: string;
}

export default function Home() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    year: number;
    month: number;
    day: number;
    hour: number;
    question: string;
  }) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || '请求失败');
        return;
      }

      setResult(json);
    } catch {
      setError('网络错误，请检查网络连接后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      {/* 背景装饰 */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950 to-stone-950 pointer-events-none" />
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* 标题 */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            道·心理命理
          </h1>
          <p className="text-stone-500 text-sm">
            以易经为镜，以道德经为尺，照见你的内心
          </p>
        </header>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 表单或结果 */}
        {!result ? (
          <div className="bg-stone-900/60 backdrop-blur-sm rounded-2xl p-6 border border-stone-800/50 shadow-2xl">
            <FortuneForm onSubmit={handleSubmit} loading={loading} />
          </div>
        ) : (
          <FortuneResult
            mode={result.mode}
            lunarDate={result.lunarDate}
            bazi={result.bazi}
            zodiac={result.zodiac}
            wuxing={result.wuxing}
            signals={result.signals}
            reading={result.reading}
            message={result.message}
            onReset={handleReset}
          />
        )}

        {/* 底部说明 */}
        <footer className="mt-12 text-center text-xs text-stone-700">
          <p>此命理推演基于心理学与传统文化 · 仅供参考 · 不构成人生决策依据</p>
        </footer>
      </div>
    </main>
  );
}