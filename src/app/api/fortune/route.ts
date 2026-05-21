import { NextRequest, NextResponse } from 'next/server';
import { solarToLunar, formatLunarDate, BaZi } from '@/lib/lunar';
import { analyzeQuestion } from '@/lib/psychology';
import { buildSystemPrompt, buildUserMessage } from '@/lib/prompt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, month, day, hour, question } = body;

    // 验证必填字段
    if (!year || !month || !day || !question) {
      return NextResponse.json(
        { error: '请提供完整的出生日期和问题' },
        { status: 400 }
      );
    }

    const birthHour = hour || 12;

    // 1. 农历转换 + 八字计算
    const lunarInfo = solarToLunar(
      Number(year), Number(month), Number(day), Number(birthHour)
    );
    const lunarDateStr = formatLunarDate(
      Number(year), Number(month), Number(day), Number(birthHour)
    );
    const baziStr = `年柱${lunarInfo.bazi.year} 月柱${lunarInfo.bazi.month} 日柱${lunarInfo.bazi.day} 时柱${lunarInfo.bazi.hour}`;

    // 2. 心理分析
    const signals = analyzeQuestion(question);

    // 3. 构建 Prompt
    const systemPrompt = buildSystemPrompt();
    const userMessage = buildUserMessage({
      question,
      bazi: baziStr,
      zodiac: lunarInfo.zodiac,
      signals,
    });

    // 4. 调用 DeepSeek API
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
    const model = process.env.DEEPSEEK_MODEL || 'deepseek-chat';

    if (!apiKey || apiKey === 'your_api_key_here') {
      // 没有配置 API key 时，返回本地分析结果
      return NextResponse.json({
        mode: 'local',
        lunarDate: lunarDateStr,
        bazi: lunarInfo.bazi,
        zodiac: lunarInfo.zodiac,
        wuxing: lunarInfo.wuxing,
        signals: {
          toneProfile: signals.toneProfile,
          profile: signals.profile,
          keywords: signals.keywords,
        },
        message: '请在 .env.local 中配置 DEEPSEEK_API_KEY 以启用 AI 解读功能。当前为本地心理分析模式。',
      });
    }

    const llmResponse = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      }),
    });

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      console.error('LLM API error:', errorText);
      return NextResponse.json(
        { error: `AI 服务调用失败: ${llmResponse.status}` },
        { status: 500 }
      );
    }

    const llmData = await llmResponse.json();
    const aiReading = llmData.choices?.[0]?.message?.content || '';

    return NextResponse.json({
      mode: 'ai',
      lunarDate: lunarDateStr,
      bazi: lunarInfo.bazi,
      zodiac: lunarInfo.zodiac,
      wuxing: lunarInfo.wuxing,
      signals: {
        toneProfile: signals.toneProfile,
        profile: signals.profile,
        keywords: signals.keywords,
      },
      reading: aiReading,
    });
  } catch (error) {
    console.error('Fortune API error:', error);
    return NextResponse.json(
      { error: '服务器内部错误，请稍后再试' },
      { status: 500 }
    );
  }
}
