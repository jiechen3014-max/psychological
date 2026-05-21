export interface PsychologicalSignals {
  hesitation: boolean;       // 犹豫不决
  grievance: boolean;        // 委屈不平
  seekingValidation: boolean; // 寻求确认
  negativity: number;        // 负面情绪强度
  urgency: boolean;          // 急切程度
  questionCount: number;     // 问号数量
  wordCount: number;         // 总字数
  profile: string;           // 心理画像
  toneProfile: string;       // 语气画像
  keywords: string[];        // 提取的关键词
}

/**
 * 分析用户提问中的心理信号
 */
export function analyzeQuestion(text: string): PsychologicalSignals {
  const hesitationWords = ['要不要', '该不该', '怎么办', '纠结', '犹豫', '不知道', '迷茫', '左右为难', '拿不定'];
  const grievanceWords = ['为什么我', '凭什么', '不公平', '委屈', '吃亏', '针对我', '欺负'];
  const validationWords = ['是不是', '会不会', '对吗', '可以吗', '行不行', '能不能', '对吧', '你说'];
  const negativeWords = ['烦', '累', '焦虑', '压力', '崩溃', '绝望', '失败', '痛苦', '难过', '想哭', '撑不住', '看不到希望', '没意思', '不想'];
  const urgencyWords = ['急', '快', '马上', '立刻', '赶紧', '受不了了'];

  const signals: PsychologicalSignals = {
    hesitation: hesitationWords.some(w => text.includes(w)),
    grievance: grievanceWords.some(w => text.includes(w)),
    seekingValidation: validationWords.some(w => text.includes(w)),
    negativity: negativeWords.filter(w => text.includes(w)).length,
    urgency: urgencyWords.some(w => text.includes(w)),
    questionCount: (text.match(/[？?]/g) || []).length + (text.match(/[！!]/g) || []).length,
    wordCount: text.length,
    profile: '',
    toneProfile: '',
    keywords: [],
  };

  // 提取关键词
  const allKeywords = [...hesitationWords, ...grievanceWords, ...validationWords, ...negativeWords, ...urgencyWords];
  signals.keywords = allKeywords.filter(w => text.includes(w));

  // 推断心理画像
  if (signals.grievance && signals.negativity >= 2) {
    signals.profile = '内心积压了较多不满情绪，渴望被理解和公正对待';
  } else if (signals.grievance) {
    signals.profile = '感到不公，希望获得外界认同和支持';
  }

  if (signals.hesitation && signals.questionCount >= 3) {
    signals.profile += '；正处于人生十字路口，内心充满矛盾';
  } else if (signals.hesitation) {
    signals.profile += '；对当前处境有些犹豫，在寻找方向';
  }

  if (signals.seekingValidation && signals.hesitation) {
    signals.profile += '；其实内心已有答案，只是需要外界推一把';
  } else if (signals.seekingValidation) {
    signals.profile += '；内心有倾向性判断，寻求确认';
  }

  if (signals.negativity >= 3) {
    signals.profile += '；情绪处于低谷期，急需希望和方向感';
  } else if (signals.negativity >= 1) {
    signals.profile += '；有些疲惫和压力，需要喘息的空间';
  }

  if (signals.urgency) {
    signals.profile += '；感到时间紧迫，可能面临截止压力';
  }

  // 语气画像
  if (signals.negativity >= 3 && signals.hesitation) {
    signals.toneProfile = '疲惫迷茫型——内心已经很累，但又不知道往哪走';
  } else if (signals.negativity >= 3) {
    signals.toneProfile = '情绪宣泄型——主要是想倾诉，需要被倾听和理解';
  } else if (signals.hesitation && signals.seekingValidation) {
    signals.toneProfile = '寻求确认型——已有答案，需要外力推动';
  } else if (signals.seekingValidation) {
    signals.toneProfile = '探测型——在试探外界反应，内心较敏感';
  } else if (signals.hesitation) {
    signals.toneProfile = '纠结型——在两个选项之间摇摆不定';
  } else if (signals.wordCount < 15) {
    signals.toneProfile = '简洁谨慎型——不想透露太多，需要引导';
  } else if (signals.wordCount > 100) {
    signals.toneProfile = '倾诉型——有很多话想说，需要被认可和回应';
  } else {
    signals.toneProfile = '理性分析型——寻求实际的指导和建议';
  }

  // 清理 profile 开头的分号
  signals.profile = signals.profile.replace(/^；/, '');

  return signals;
}
