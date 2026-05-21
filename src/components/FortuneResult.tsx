'use client';

import { BaZi } from '@/lib/lunar';

interface Props {
  mode: 'local' | 'ai';
  lunarDate: string;
  bazi: BaZi;
  zodiac: string;
  wuxing: string;
  signals: {
    toneProfile: string;
    profile: string;
    keywords: string[];
  };
  reading?: string;
  message?: string;
  onReset: () => void;
}

export default function FortuneResult({
  mode, lunarDate, bazi, zodiac, wuxing, signals, reading, message, onReset,
}: Props) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 八字信息 */}
      <div className="bg-stone-800/80 rounded-xl p-6 border border-amber-900/30">
        <h3 className="text-lg font-semibold text-amber-200 mb-4">📜 命盘信息</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-stone-500">农历：</span>
            <span className="text-stone-200">{lunarDate}</span>
          </div>
          <div>
            <span className="text-stone-500">生肖：</span>
            <span className="text-stone-200">{zodiac}</span>
          </div>
          <div>
            <span className="text-stone-500">纳音：</span>
            <span className="text-stone-200">{wuxing}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {(['year', 'month', 'day', 'hour'] as const).map((key, i) => (
            <div key={key} className="text-center p-3 bg-stone-900/50 rounded-lg border border-stone-700/30">
              <div className="text-xs text-stone-500 mb-1">
                {['年柱', '月柱', '日柱', '时柱'][i]}
              </div>
              <div className="text-lg font-bold text-amber-300 font-mono">
                {bazi[key]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 心理预分析（调试信息，仅本地模式可见） */}
      {mode === 'local' && (
        <div className="bg-stone-800/80 rounded-xl p-6 border border-amber-900/30">
          <h3 className="text-lg font-semibold text-amber-200 mb-4">🧠 心理预分析</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-stone-500">语气画像：</span>
              <span className="text-amber-300">{signals.toneProfile}</span>
            </div>
            <div>
              <span className="text-stone-500">心理画像：</span>
              <span className="text-stone-300">{signals.profile}</span>
            </div>
            {signals.keywords.length > 0 && (
              <div>
                <span className="text-stone-500">关键词：</span>
                <span className="text-stone-400">{signals.keywords.join(' · ')}</span>
              </div>
            )}
          </div>
          {message && (
            <div className="mt-4 p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg">
              <p className="text-amber-300 text-sm">{message}</p>
            </div>
          )}
        </div>
      )}

      {/* AI 解读结果 */}
      {mode === 'ai' && reading && (
        <div className="bg-stone-800/80 rounded-xl p-6 border border-amber-900/30">
          <h3 className="text-lg font-semibold text-amber-200 mb-4">🧧 命理解读</h3>
          <div className="prose prose-invert prose-amber max-w-none">
            {reading.split('\n').map((line, i) => {
              // 渲染粗体标题行
              if (line.startsWith('**【') && line.endsWith('】**')) {
                return (
                  <h4 key={i} className="text-amber-300 font-semibold text-base mt-6 mb-2 first:mt-0">
                    {line.replace(/\*\*/g, '')}
                  </h4>
                );
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <h4 key={i} className="text-amber-300 font-semibold text-base mt-6 mb-2 first:mt-0">
                    {line.replace(/\*\*/g, '')}
                  </h4>
                );
              }
              if (line.trim() === '') {
                return <div key={i} className="h-2" />;
              }
              return (
                <p key={i} className="text-stone-300 leading-relaxed text-[15px] mb-2">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* 重新提问 */}
      <button
        onClick={onReset}
        className="w-full py-3 px-6 bg-stone-800 hover:bg-stone-700
                   text-stone-400 hover:text-stone-200 rounded-lg
                   transition-all duration-300 border border-stone-700/30"
      >
        重新提问
      </button>
    </div>
  );
}
