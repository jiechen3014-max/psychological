/**
 * 易经六十四卦参考数据（精选）
 * 供 Prompt 中快速引用
 */

export interface Hexagram {
  id: number;
  name: string;
  symbol: string;
  judgment: string;
  image: string;
  meaning: string;
}

export const HEXAGRAMS: Hexagram[] = [
  {
    id: 1, name: '乾', symbol: '䷀',
    judgment: '元亨利贞',
    image: '天行健，君子以自强不息',
    meaning: '创造、刚健、主动、领导',
  },
  {
    id: 2, name: '坤', symbol: '䷁',
    judgment: '元亨，利牝马之贞',
    image: '地势坤，君子以厚德载物',
    meaning: '包容、柔顺、承载、耐心',
  },
  {
    id: 3, name: '屯', symbol: '䷂',
    judgment: '元亨利贞，勿用有攸往',
    image: '云雷屯，君子以经纶',
    meaning: '初创、困难、积累、等待时机',
  },
  {
    id: 4, name: '蒙', symbol: '䷃',
    judgment: '亨，匪我求童蒙，童蒙求我',
    image: '山下出泉，蒙，君子以果行育德',
    meaning: '启蒙、学习、成长、解惑',
  },
  {
    id: 5, name: '需', symbol: '䷄',
    judgment: '有孚，光亨，贞吉',
    image: '云上于天，需，君子以饮食宴乐',
    meaning: '等待、耐心、时机未到',
  },
  {
    id: 11, name: '泰', symbol: '䷊',
    judgment: '小往大来，吉亨',
    image: '天地交，泰，后以财成天地之道',
    meaning: '通达、和谐、顺遂、转机',
  },
  {
    id: 12, name: '否', symbol: '䷋',
    judgment: '否之匪人，不利君子贞',
    image: '天地不交，否，君子以俭德辟难',
    meaning: '闭塞、困顿、保守、蛰伏',
  },
  {
    id: 24, name: '复', symbol: '䷗',
    judgment: '亨，出入无疾，朋来无咎',
    image: '雷在地中，复，先王以至日闭关',
    meaning: '回复、重新开始、转机来临',
  },
  {
    id: 29, name: '坎', symbol: '䷜',
    judgment: '习坎，有孚，维心亨',
    image: '水洊至，习坎，君子以常德行',
    meaning: '险难、考验、坚持、诚信',
  },
  {
    id: 36, name: '明夷', symbol: '䷣',
    judgment: '利艰贞',
    image: '明入地中，明夷，君子以莅众用晦而明',
    meaning: '晦暗、受伤、韬光养晦',
  },
  {
    id: 39, name: '蹇', symbol: '䷦',
    judgment: '利西南，不利东北',
    image: '山上有水，蹇，君子以反身修德',
    meaning: '艰难、阻碍、反省、自强',
  },
  {
    id: 46, name: '升', symbol: '䷭',
    judgment: '元亨，用见大人',
    image: '地中生木，升，君子以顺德积小以高大',
    meaning: '上升、发展、渐进、积累',
  },
  {
    id: 51, name: '震', symbol: '䷲',
    judgment: '亨，震来虩虩，笑言哑哑',
    image: '洊雷，震，君子以恐惧修省',
    meaning: '震动、变革、警醒、反省',
  },
  {
    id: 52, name: '艮', symbol: '䷳',
    judgment: '艮其背，不获其身',
    image: '兼山，艮，君子以思不出其位',
    meaning: '停止、知止、安分、内省',
  },
  {
    id: 58, name: '兑', symbol: '䷹',
    judgment: '亨，利贞',
    image: '丽泽，兑，君子以朋友讲习',
    meaning: '喜悦、沟通、交流、和谐',
  },
  {
    id: 63, name: '既济', symbol: '䷾',
    judgment: '亨小，利贞，初吉终乱',
    image: '水在火上，既济，君子以思患而豫防之',
    meaning: '完成、成功、居安思危',
  },
  {
    id: 64, name: '未济', symbol: '䷿',
    judgment: '亨，小狐汔济，濡其尾',
    image: '火在水上，未济，君子以慎辨物居方',
    meaning: '未完成、过渡、希望在前',
  },
];

/**
 * 根据关键词匹配相关卦象
 */
export function findRelevantHexagram(keywords: string[]): Hexagram {
  const keywordMap: Record<string, number> = {
    '迷茫': 4, '不知道': 4, '怎么办': 3,     // 蒙卦
    '等': 5, '耐心': 5,                        // 需卦
    '突破': 1, '创业': 1, '开始': 3,           // 屯卦
    '坚持': 29, '困难': 39, '压力': 29,        // 坎卦/蹇卦
    '重新': 24, '再来': 24,                     // 复卦
    '选择': 3, '纠结': 3,                       // 屯卦
    '感情': 58, '关系': 58,                     // 兑卦
    '工作': 46, '发展': 46,                     // 升卦
    '累': 36, '疲惫': 36,                       // 明夷卦
    '变': 51, '改变': 51,                       // 震卦
    '停': 52, '放': 52,                         // 艮卦
  };

  for (const kw of keywords) {
    const hexId = keywordMap[kw];
    if (hexId) {
      const found = HEXAGRAMS.find(h => h.id === hexId);
      if (found) return found;
    }
  }

  // 默认返回复卦（转机）
  return HEXAGRAMS.find(h => h.id === 24)!;
}
