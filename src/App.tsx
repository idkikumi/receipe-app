import { useState } from 'react';
import { ChefHat, Plus, X, Loader2 } from 'lucide-react';

interface Recipe {
  name: string;
  keywords: string[];
  ingredients: string[];
  steps: string[];
  time: string;
  difficulty: string;
}

// 前菜 = 前菜・サラダ・汁物、主菜 = 主菜・丼・麺
const recipeDB: Record<string, Recipe[]> = {
  '前菜': [
    {
      name: 'トマトとチーズのカプレーゼ',
      keywords: ['トマト', 'チーズ'],
      ingredients: ['トマト 2個', 'チーズ（モッツァレラ等）100g', 'オリーブオイル 大さじ2', 'バジル 適量', '塩・黒こしょう 少々'],
      steps: [
        'トマトとチーズを5mm幅の輪切りにします。',
        'お皿にトマトとチーズを交互に並べます。',
        'オリーブオイルを全体にかけます。',
        '塩・黒こしょうで味を整え、バジルを飾って完成。',
      ],
      time: '10分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'きゅうりと生姜の浅漬け',
      keywords: ['きゅうり', 'しょうが'],
      ingredients: ['きゅうり 2本', '塩 小さじ1', 'しょうが 1片', 'ごま油 小さじ1', '白ごま 適量'],
      steps: [
        'きゅうりを乱切りにし、塩をふって10分おきます。',
        'しょうがをせん切りにします。',
        'きゅうりの水気をしっかり絞ります。',
        'きゅうり・しょうが・ごま油・白ごまを混ぜ合わせて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'ほうれん草のおひたし',
      keywords: ['ほうれん草'],
      ingredients: ['ほうれん草 1束', 'だし汁 100ml', 'しょうゆ 大さじ1', 'みりん 大さじ1', '鰹節 適量'],
      steps: [
        'ほうれん草を塩ゆでし、冷水にとって水気を絞ります。',
        '4cm幅に切り、器に盛ります。',
        'だし汁・しょうゆ・みりんを合わせたつゆをかけます。',
        '鰹節をのせて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'なすの揚げびたし',
      keywords: ['なす', 'ねぎ', 'しょうが'],
      ingredients: ['なす 3本', 'だし汁 200ml', 'しょうゆ 大さじ2', 'みりん 大さじ2', '揚げ油 適量', 'ねぎ・しょうが 適量'],
      steps: [
        'なすをひと口大に切り、揚げ油で揚げます。',
        'だし汁・しょうゆ・みりんを合わせてひと煮立ちさせます。',
        '揚げたなすを漬け汁に10分ほど漬けます。',
        'ねぎとしょうがを添えて完成。',
      ],
      time: '25分',
      difficulty: '★★☆ 普通',
    },
    {
      name: 'きのこのマリネ',
      keywords: ['きのこ', 'にんにく'],
      ingredients: ['きのこ（しめじ・えのき等）200g', 'オリーブオイル 大さじ3', '酢 大さじ2', '砂糖 小さじ1', '塩・こしょう 少々', 'にんにく 1片'],
      steps: [
        'きのこをほぐして、フライパンで炒めます。',
        'オリーブオイル・酢・砂糖・塩・みじん切りのにんにくを混ぜてマリネ液を作ります。',
        '温かいうちにきのこをマリネ液に漬けます。',
        '冷蔵庫で30分以上冷やして味をなじませたら完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'サーモンのカルパッチョ',
      keywords: ['サーモン', '玉ねぎ'],
      ingredients: ['サーモン（刺身用）150g', '玉ねぎ 1/4個', 'オリーブオイル 大さじ2', 'レモン汁 大さじ1', '塩・黒こしょう 少々', 'ケッパー 適量'],
      steps: [
        'サーモンを薄くスライスしてお皿に並べます。',
        '玉ねぎを薄切りにして水にさらし、辛みを抜きます。',
        'オリーブオイル・レモン汁・塩・こしょうを混ぜてドレッシングを作ります。',
        'サーモンに玉ねぎとドレッシングをかけ、ケッパーを散らして完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'ブロッコリーのごまあえ',
      keywords: ['ブロッコリー'],
      ingredients: ['ブロッコリー 1株', 'すりごま 大さじ3', '砂糖 小さじ2', 'しょうゆ 大さじ1', 'みりん 大さじ1'],
      steps: [
        'ブロッコリーを小房に分けて塩ゆでし、水気を切ります。',
        'すりごま・砂糖・しょうゆ・みりんを混ぜてごまだれを作ります。',
        'ブロッコリーとごまだれを和えます。',
        '器に盛って完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'もやしのナムル',
      keywords: ['もやし', 'にんにく'],
      ingredients: ['もやし 1袋', 'にんにく 1片', 'ごま油 大さじ1', '塩 小さじ1/2', '白ごま 適量', '鶏がらスープの素 小さじ1/2'],
      steps: [
        'もやしをさっと塩ゆでして水気を切ります。',
        'にんにくをすりおろします。',
        'もやし・にんにく・ごま油・塩・鶏がらスープの素を混ぜ合わせます。',
        '白ごまを散らして完成。冷蔵庫で冷やすとよりおいしいです。',
      ],
      time: '10分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '卵とひき肉のスコッチエッグ',
      keywords: ['卵', 'ひき肉', '玉ねぎ'],
      ingredients: ['卵 4個（うち3個ゆで卵用）', 'ひき肉 200g', '玉ねぎ 1/4個', '塩・こしょう 少々', 'パン粉 適量', '揚げ油 適量'],
      steps: [
        '卵3個をゆで卵にして殻をむきます。',
        'ひき肉に塩・こしょう・みじん切り玉ねぎを混ぜて肉ダネを作ります。',
        'ゆで卵を肉ダネで包み、卵液・パン粉の順につけます。',
        '170度の油で5〜6分揚げて完成。',
      ],
      time: '30分',
      difficulty: '★★☆ 普通',
    },
    {
      name: 'ポテトサラダ',
      keywords: ['じゃがいも', 'にんじん', '玉ねぎ', '卵'],
      ingredients: ['じゃがいも 3個', 'にんじん 1/2本', '玉ねぎ 1/4個', 'ゆで卵 2個', 'マヨネーズ 大さじ4', '塩・こしょう 少々', '酢 小さじ1'],
      steps: [
        'じゃがいも・にんじんをやわらかく茹でてつぶします。',
        '玉ねぎを薄切りにして塩もみし、水気を絞ります。',
        'ゆで卵を粗くつぶします。',
        'すべての材料をマヨネーズ・塩・こしょう・酢で和えて完成。',
      ],
      time: '25分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '豆腐の冷奴',
      keywords: ['豆腐', 'ねぎ', 'しょうが', 'のり'],
      ingredients: ['豆腐（絹ごし）1丁', 'ねぎ 適量', 'しょうが 1片', 'のり 適量', 'しょうゆ 大さじ1', 'かつお節 適量'],
      steps: [
        '豆腐を食べやすい大きさに切って器に盛ります。',
        'ねぎを小口切り、しょうがをすりおろします。',
        'のりを細く切ります。',
        '豆腐にねぎ・しょうが・のり・かつお節をのせ、しょうゆをかけて完成。',
      ],
      time: '5分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'あじの南蛮漬け',
      keywords: ['あじ', '玉ねぎ', 'ピーマン', 'にんじん'],
      ingredients: ['あじ 4尾', '玉ねぎ 1/2個', 'ピーマン 1個', 'にんじん 1/3本', '酢 100ml', '砂糖 大さじ3', 'しょうゆ 大さじ2', '鷹の爪 1本', '片栗粉・揚げ油 適量'],
      steps: [
        'あじに塩をふって片栗粉をまぶし、揚げます。',
        '野菜を千切りにします。',
        '酢・砂糖・しょうゆ・鷹の爪を合わせて南蛮酢を作ります。',
        '揚げたてのあじと野菜を南蛮酢に漬けて、30分以上置いて完成。',
      ],
      time: '40分',
      difficulty: '★★☆ 普通',
    },
    {
      name: 'ブロッコリーとベーコンのサラダ',
      keywords: ['ブロッコリー', 'ベーコン', 'チーズ'],
      ingredients: ['ブロッコリー 1株', 'ベーコン 3枚', 'チーズ（お好みで）30g', 'マヨネーズ 大さじ2', '粒マスタード 小さじ1', '塩・こしょう 少々'],
      steps: [
        'ブロッコリーを小房に分けて塩ゆでします。',
        'ベーコンをカリカリに焼きます。',
        'マヨネーズ・粒マスタード・塩・こしょうでドレッシングを作ります。',
        'ブロッコリー・ベーコン・チーズをドレッシングで和えて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
  ],
  '主菜': [
    {
      name: '鶏の唐揚げ',
      keywords: ['鶏肉', 'しょうが', 'にんにく'],
      ingredients: ['鶏もも肉 300g', 'しょうゆ 大さじ2', 'みりん 大さじ1', 'しょうが 1片', 'にんにく 1片', '片栗粉 大さじ3', '揚げ油 適量'],
      steps: [
        '鶏肉をひと口大に切り、しょうゆ・みりん・すりおろし生姜・にんにくで15分漬けます。',
        '漬けた鶏肉に片栗粉をまぶします。',
        '170度の油で5〜6分揚げます。',
        '油を切って器に盛り、レモンを添えて完成。',
      ],
      time: '30分',
      difficulty: '★★☆ 普通',
    },
    {
      name: '豚の生姜焼き',
      keywords: ['豚肉', 'しょうが', '玉ねぎ'],
      ingredients: ['豚こま肉 200g', 'しょうが 1片', 'しょうゆ 大さじ2', 'みりん 大さじ2', '酒 大さじ1', '玉ねぎ 1/2個', 'サラダ油 大さじ1'],
      steps: [
        '豚肉にしょうゆ・みりん・酒・すりおろし生姜を揉み込みます。',
        '玉ねぎを薄切りにします。',
        'フライパンに油を熱し、玉ねぎを炒めます。',
        '豚肉を加えて炒め、タレが絡んだら完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '牛肉と野菜の炒め物',
      keywords: ['牛肉', 'ピーマン', 'にんじん'],
      ingredients: ['牛こま肉 200g', 'ピーマン 2個', 'にんじん 1/2本', 'しょうゆ 大さじ2', 'オイスターソース 大さじ1', 'ごま油 大さじ1', 'にんにく 1片'],
      steps: [
        '牛肉・ピーマン・にんじんを食べやすい大きさに切ります。',
        'フライパンにごま油とにんにくを熱し、香りを出します。',
        '牛肉を炒め、野菜を加えてさらに炒めます。',
        'しょうゆ・オイスターソースで味付けして完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '麻婆豆腐',
      keywords: ['豆腐', 'ひき肉', 'ねぎ', 'にんにく', 'しょうが'],
      ingredients: ['豆腐 1丁', 'ひき肉 100g', 'ねぎ 1/2本', 'にんにく 1片', 'しょうが 1片', '豆板醤 小さじ1', '鶏がらスープ 200ml', '片栗粉 大さじ1', 'ごま油 適量'],
      steps: [
        '豆腐を2cm角に切り、さっとゆでて水気を切ります。',
        'フライパンにごま油を熱し、にんにく・しょうが・ひき肉を炒めます。',
        '豆板醤を加えて炒め、鶏がらスープを加えます。',
        '豆腐を加えて煮て、水溶き片栗粉でとろみをつけ、ねぎを散らして完成。',
      ],
      time: '25分',
      difficulty: '★★☆ 普通',
    },
    {
      name: '回鍋肉（ホイコーロー）',
      keywords: ['豚肉', 'キャベツ', 'ピーマン', 'にんにく'],
      ingredients: ['豚こま肉 200g', 'キャベツ 1/4個', 'ピーマン 2個', '豆板醤 小さじ1', 'みそ 大さじ1', 'しょうゆ 大さじ1', 'みりん 大さじ1', 'にんにく 1片'],
      steps: [
        'キャベツをひと口大、ピーマンを乱切りにします。',
        'みそ・しょうゆ・みりん・豆板醤を混ぜてタレを作ります。',
        'フライパンにごま油を熱し、にんにく・豚肉を炒めます。',
        '野菜を加えて炒め、タレを回し入れて絡めて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '肉じゃが',
      keywords: ['じゃがいも', '玉ねぎ', '牛肉', '豚肉', 'にんじん'],
      ingredients: ['じゃがいも 3個', '玉ねぎ 1個', '牛こま肉（または豚こま肉）150g', 'にんじん 1本', 'だし汁 300ml', 'しょうゆ 大さじ3', 'みりん 大さじ3', '砂糖 大さじ1'],
      steps: [
        'じゃがいも・玉ねぎ・にんじんを食べやすい大きさに切ります。',
        '鍋に油を熱し、肉・玉ねぎを炒めます。',
        'じゃがいも・にんじんを加えてさらに炒め、だし汁を加えます。',
        'しょうゆ・みりん・砂糖を加え、落としぶたをして20分ほど煮込んで完成。',
      ],
      time: '40分',
      difficulty: '★★☆ 普通',
    },
    {
      name: '鮭のムニエル',
      keywords: ['サーモン', 'バター'],
      ingredients: ['サーモン 2切れ', '塩・こしょう 少々', '小麦粉 大さじ2', 'バター 20g', 'レモン 1/2個', 'パセリ 適量'],
      steps: [
        'サーモンに塩・こしょうをふり、小麦粉をまぶします。',
        'フライパンにバターを溶かし、サーモンを両面こんがり焼きます。',
        'お皿に盛ります。',
        'レモンを搾り、パセリを散らして完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'エビチリ',
      keywords: ['エビ', 'ねぎ', 'にんにく', 'しょうが'],
      ingredients: ['エビ 200g', 'ねぎ 1/2本', 'にんにく 1片', 'しょうが 1片', 'ケチャップ 大さじ3', '豆板醤 小さじ1', '鶏がらスープ 100ml', '片栗粉 適量'],
      steps: [
        'エビの背わたを取り除いて片栗粉をまぶし、油で炒めます。',
        'にんにく・しょうが・ねぎをみじん切りにしてフライパンで炒めます。',
        'ケチャップ・豆板醤・鶏がらスープを加えてひと煮立ちさせます。',
        'エビを戻し入れてタレを絡め、片栗粉でとろみをつけて完成。',
      ],
      time: '25分',
      difficulty: '★★☆ 普通',
    },
    {
      name: 'ベーコンエッグ炒め',
      keywords: ['卵', 'ベーコン', 'ピーマン', '玉ねぎ'],
      ingredients: ['卵 3個', 'ベーコン 4枚', 'ピーマン 2個', '玉ねぎ 1/2個', '塩・こしょう 少々', 'しょうゆ 小さじ1'],
      steps: [
        'ベーコン・ピーマン・玉ねぎを食べやすい大きさに切ります。',
        'フライパンにベーコンを炒め、野菜を加えます。',
        '野菜がしんなりしたら溶き卵を回し入れます。',
        '塩・こしょう・しょうゆで味を整えて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'さばの味噌煮',
      keywords: ['さば', 'しょうが', 'ねぎ'],
      ingredients: ['さば 2切れ', 'しょうが 2片', 'みそ 大さじ2', 'みりん 大さじ2', '砂糖 大さじ1', '酒 大さじ2', '水 100ml', 'ねぎ 適量'],
      steps: [
        'さばに切り込みを入れ、熱湯をかけて臭みを取ります。',
        '鍋に水・酒・砂糖・みりんを合わせて煮立てます。',
        'さばとしょうがを加え、落としぶたをして10分煮ます。',
        'みそを溶き入れてさらに5分煮て、ねぎを散らして完成。',
      ],
      time: '25分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'イカと野菜の炒め物',
      keywords: ['イカ', 'ピーマン', '玉ねぎ', 'にんにく'],
      ingredients: ['イカ 1杯', 'ピーマン 2個', '玉ねぎ 1/2個', 'にんにく 1片', 'しょうゆ 大さじ2', 'みりん 大さじ1', 'ごま油 大さじ1', '塩・こしょう 少々'],
      steps: [
        'イカを輪切りにし、ピーマン・玉ねぎを食べやすい大きさに切ります。',
        'フライパンにごま油とにんにくを熱します。',
        'イカを加えて炒め、野菜を加えてさらに炒めます。',
        'しょうゆ・みりんで味付けして塩・こしょうで整えて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'ソーセージと野菜のソテー',
      keywords: ['ソーセージ', '玉ねぎ', 'ピーマン', 'にんにく'],
      ingredients: ['ソーセージ 6本', '玉ねぎ 1/2個', 'ピーマン 2個', 'にんにく 1片', 'バター 10g', '塩・こしょう 少々', 'しょうゆ 小さじ1'],
      steps: [
        'ソーセージに斜め切り込みを入れ、野菜を食べやすい大きさに切ります。',
        'フライパンにバターとにんにくを熱し、ソーセージを炒めます。',
        '野菜を加えて炒め合わせます。',
        '塩・こしょう・しょうゆで味を整えて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'ヨーグルトチキン',
      keywords: ['鶏肉', 'ヨーグルト', 'にんにく', 'しょうが'],
      ingredients: ['鶏もも肉 300g', 'プレーンヨーグルト 100g', 'にんにく 1片', 'しょうが 1片', 'カレー粉 大さじ1', '塩 小さじ1/2', 'レモン汁 大さじ1', 'サラダ油 大さじ1'],
      steps: [
        'ヨーグルト・すりおろしにんにく・しょうが・カレー粉・塩・レモン汁を混ぜてマリネ液を作ります。',
        '鶏肉をひと口大に切り、マリネ液に30分以上漬けます。',
        'フライパンに油を熱し、鶏肉を両面こんがり焼きます。',
        '中まで火が通ったら完成。レモンを添えてどうぞ。',
      ],
      time: '45分（漬け時間含む）',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'クリームシチュー',
      keywords: ['鶏肉', '牛乳', 'じゃがいも', '玉ねぎ', 'にんじん', 'バター'],
      ingredients: ['鶏もも肉 200g', 'じゃがいも 2個', '玉ねぎ 1個', 'にんじん 1本', '牛乳 400ml', 'バター 20g', '小麦粉 大さじ3', 'コンソメ 2個', '塩・こしょう 少々'],
      steps: [
        '野菜と鶏肉をひと口大に切ります。',
        '鍋にバターを溶かし、鶏肉と野菜を炒め、小麦粉を加えて炒めます。',
        '水とコンソメを加えて10分煮ます。',
        '牛乳を加えてさらに5分煮て、塩・こしょうで味を整えて完成。',
      ],
      time: '35分',
      difficulty: '★★☆ 普通',
    },
    {
      name: '磯辺焼き',
      keywords: ['餅', 'のり'],
      ingredients: ['切り餅 4個', 'のり 4枚', 'しょうゆ 大さじ2', 'みりん 大さじ1'],
      steps: [
        'しょうゆとみりんを合わせてたれを作ります。',
        '餅をトースターまたはフライパンで焼いてふくらませます。',
        '焼けた餅をたれにくぐらせます。',
        'のりで巻いて完成。',
      ],
      time: '10分',
      difficulty: '★☆☆ 簡単',
    },
  ],
  '汁物': [
    {
      name: '豆腐とわかめのみそ汁',
      keywords: ['豆腐', 'わかめ', 'ねぎ', 'しょうが'],
      ingredients: ['豆腐 1/2丁', 'わかめ（乾燥）5g', 'ねぎ 1/3本', 'だし汁 600ml', 'みそ 大さじ2'],
      steps: [
        'だし汁を鍋で温めます。',
        '豆腐を1cm角に切り、鍋に加えます。',
        '戻したわかめを加えます。',
        'みそを溶き入れ、ねぎを散らして完成。',
      ],
      time: '10分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '豚汁',
      keywords: ['豚肉', '大根', 'にんじん', 'じゃがいも'],
      ingredients: ['豚こま肉 100g', '大根 1/4本', 'にんじん 1/2本', 'じゃがいも 1個', 'ごぼう 1/4本', 'だし汁 800ml', 'みそ 大さじ3', 'ごま油 大さじ1'],
      steps: [
        '野菜を乱切りにします。',
        '鍋にごま油を熱し、豚肉と野菜を炒めます。',
        'だし汁を加えて野菜が柔らかくなるまで煮ます。',
        'みそを溶き入れて完成。',
      ],
      time: '30分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'トマトと卵のスープ',
      keywords: ['トマト', '卵', 'ねぎ'],
      ingredients: ['トマト 2個', '卵 2個', 'ねぎ 1/2本', '鶏がらスープ 600ml', 'しょうゆ 大さじ1', '塩・こしょう 少々', 'ごま油 小さじ1'],
      steps: [
        'トマトをひと口大に切り、ねぎを小口切りにします。',
        '鶏がらスープを沸かし、トマトを加えます。',
        '溶き卵を細く流し入れて半熟にします。',
        'しょうゆ・塩・こしょうで味を整え、ごま油を垂らしてねぎを散らして完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'きのことベーコンのスープ',
      keywords: ['きのこ', 'ベーコン', '玉ねぎ'],
      ingredients: ['きのこ（しめじ・エリンギ等）200g', 'ベーコン 2枚', '玉ねぎ 1/2個', 'コンソメ 1個', '水 600ml', '塩・こしょう 少々', 'パセリ 適量'],
      steps: [
        'きのこをほぐし、ベーコン・玉ねぎを薄切りにします。',
        '鍋にバターを熱し、ベーコンと玉ねぎを炒めます。',
        'きのこを加えてさらに炒め、水とコンソメを加えて10分煮ます。',
        '塩・こしょうで味を整え、パセリを散らして完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'ミネストローネ',
      keywords: ['トマト', '玉ねぎ', 'にんじん', 'キャベツ', 'にんにく'],
      ingredients: ['トマト 2個', '玉ねぎ 1/2個', 'にんじん 1/2本', 'キャベツ 2枚', 'にんにく 1片', 'オリーブオイル 大さじ2', 'コンソメ 2個', '水 600ml', '塩・こしょう 少々'],
      steps: [
        '野菜をすべてひと口大に切ります。',
        '鍋にオリーブオイルとにんにくを熱し、玉ねぎ・にんじんを炒めます。',
        'トマト・キャベツ・水・コンソメを加えて15分煮ます。',
        '塩・こしょうで味を整えて完成。',
      ],
      time: '30分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '卵とほうれん草のスープ',
      keywords: ['卵', 'ほうれん草'],
      ingredients: ['卵 2個', 'ほうれん草 1/2束', 'コンソメ 1個', '水 500ml', '塩・こしょう 少々', 'バター 10g'],
      steps: [
        'ほうれん草をざく切りにします。',
        '水とコンソメを鍋で沸かし、ほうれん草を加えます。',
        '溶き卵を細く流し入れ、ふんわり固まったら火を止めます。',
        '塩・こしょう・バターを加えて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'のりとねぎのみそ汁',
      keywords: ['のり', 'ねぎ', '豆腐'],
      ingredients: ['のり（焼きのり）1枚', 'ねぎ 1/3本', '豆腐 1/4丁', 'だし汁 600ml', 'みそ 大さじ2'],
      steps: [
        'だし汁を温めます。',
        '豆腐を1cm角に切り、ねぎを小口切りにします。',
        'みそを溶き入れて豆腐とねぎを加えます。',
        '手でちぎったのりをのせて完成（のりは食べる直前に）。',
      ],
      time: '10分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '玉ねぎのクリームスープ',
      keywords: ['玉ねぎ', '牛乳', 'バター', 'チーズ'],
      ingredients: ['玉ねぎ 2個', '牛乳 300ml', 'バター 20g', 'コンソメ 1個', '水 300ml', '塩・こしょう 少々', 'チーズ（お好みで）適量'],
      steps: [
        '玉ねぎを薄切りにし、バターでじっくり炒めて飴色にします（15〜20分）。',
        '水とコンソメを加えて5分煮ます。',
        '牛乳を加えてひと煮立ちさせます。',
        '塩・こしょうで味を整え、チーズをのせて完成。',
      ],
      time: '30分',
      difficulty: '★☆☆ 簡単',
    },
  ],
  '丼': [
    {
      name: '親子丼',
      keywords: ['鶏肉', '卵', '玉ねぎ'],
      ingredients: ['鶏もも肉 200g', '卵 3個', '玉ねぎ 1/2個', 'だし汁 150ml', 'しょうゆ 大さじ2', 'みりん 大さじ2', '砂糖 小さじ1', 'ご飯 2人前'],
      steps: [
        '鶏肉をひと口大に切り、玉ねぎを薄切りにします。',
        '小鍋にだし汁・しょうゆ・みりん・砂糖を煮立て、鶏肉・玉ねぎを加えます。',
        '鶏肉に火が通ったら溶き卵を回しかけ、半熟で火を止めます。',
        'ご飯の上にのせて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '牛丼',
      keywords: ['牛肉', '玉ねぎ'],
      ingredients: ['牛こま肉 200g', '玉ねぎ 1個', 'だし汁 200ml', 'しょうゆ 大さじ3', 'みりん 大さじ3', '砂糖 大さじ1', 'ご飯 2人前'],
      steps: [
        '玉ねぎを薄切りにします。',
        '鍋にだし汁・しょうゆ・みりん・砂糖を入れて沸かします。',
        '玉ねぎを加えて5分煮てから牛肉を加え、アクを取りながら煮ます。',
        'ご飯の上にのせ、お好みで紅しょうがを添えて完成。',
      ],
      time: '25分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'そぼろ丼',
      keywords: ['ひき肉', '卵', 'しょうが'],
      ingredients: ['ひき肉 200g', '卵 3個', 'しょうゆ 大さじ2', 'みりん 大さじ2', '砂糖 大さじ1', 'しょうが 1片', 'ご飯 2人前'],
      steps: [
        'フライパンにひき肉・しょうゆ・みりん・砂糖・すりおろし生姜を入れて炒めます。',
        '水分が飛んだらそぼろの完成。',
        '卵・砂糖・塩を混ぜて炒り卵を作ります。',
        'ご飯の上にそぼろと炒り卵を盛り付けて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '鮭の漬け丼',
      keywords: ['サーモン'],
      ingredients: ['サーモン（刺身用）150g', 'ご飯 2人前', 'しょうゆ 大さじ2', 'みりん 大さじ1', 'わさび 適量', 'のり 適量', 'いりごま 適量'],
      steps: [
        'サーモンを1cm角に切ります。',
        'しょうゆ・みりんを混ぜてサーモンに15分漬けます。',
        'ご飯の上にサーモンをのせ、わさびをのせます。',
        'のりといりごまを散らして完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '納豆卵かけご飯丼',
      keywords: ['納豆', '卵', 'ねぎ'],
      ingredients: ['納豆 2パック', '卵 2個', 'ねぎ 適量', 'しょうゆ 適量', 'からし 適量', 'ご飯 2人前'],
      steps: [
        '納豆をよくかき混ぜ、付属のたれとからしを加えます。',
        'ご飯の上に納豆をのせます。',
        '中央に卵黄をのせ、刻みねぎを散らします。',
        'お好みでしょうゆを数滴かけて完成。',
      ],
      time: '5分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'ツナ玉丼',
      keywords: ['ツナ', '卵', '玉ねぎ'],
      ingredients: ['ツナ缶 1缶', '卵 3個', '玉ねぎ 1/2個', 'だし汁 100ml', 'しょうゆ 大さじ2', 'みりん 大さじ1', 'ご飯 2人前'],
      steps: [
        '玉ねぎを薄切りにします。',
        'だし汁・しょうゆ・みりんで玉ねぎを煮ます。',
        'ツナを加えてひと煮立ちさせ、溶き卵を回しかけて半熟にします。',
        'ご飯にかけて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'イカと青ねぎ丼',
      keywords: ['イカ', 'ねぎ', 'しょうが'],
      ingredients: ['イカ（刺身用）150g', 'ねぎ 適量', 'しょうが 1片', 'しょうゆ 大さじ2', 'みりん 大さじ1', 'ごま油 小さじ1', 'ご飯 2人前', '白ごま 適量'],
      steps: [
        'イカを細切りにします。',
        'しょうゆ・みりん・ごま油・すりおろし生姜を混ぜてたれを作ります。',
        'イカをたれに15分漬けます。',
        'ご飯の上にイカをのせ、ねぎと白ごまを散らして完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'あじの漬け丼',
      keywords: ['あじ', 'ねぎ', 'しょうが'],
      ingredients: ['あじ（刺身用）150g', 'ねぎ 適量', 'しょうが 1片', 'しょうゆ 大さじ2', 'みりん 大さじ1', 'わさび 適量', 'ご飯 2人前', '白ごま 適量'],
      steps: [
        'あじを一口大に切ります。',
        'しょうゆ・みりん・すりおろし生姜を混ぜてたれを作ります。',
        'あじをたれに10分漬けます。',
        'ご飯の上にあじをのせ、ねぎ・わさび・白ごまを添えて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
  ],
  '麺': [
    {
      name: 'カルボナーラ',
      keywords: ['ベーコン', '卵', 'チーズ', 'にんにく'],
      ingredients: ['パスタ 160g', 'ベーコン 4枚', '卵 2個', 'チーズ（パルメザン等）50g', 'にんにく 1片', '黒こしょう 適量', '塩 適量'],
      steps: [
        'パスタを塩水でゆでます。',
        'フライパンでにんにく・ベーコンを炒めます。',
        '卵・チーズ・黒こしょうを混ぜてソースを作ります。',
        '火を止めてパスタとソースを混ぜ合わせ、黒こしょうをかけて完成。',
      ],
      time: '20分',
      difficulty: '★★☆ 普通',
    },
    {
      name: 'ナポリタン',
      keywords: ['ベーコン', '玉ねぎ', 'ピーマン', 'ソーセージ'],
      ingredients: ['パスタ 160g', 'ベーコン（またはソーセージ）4枚', '玉ねぎ 1/2個', 'ピーマン 2個', 'ケチャップ 大さじ5', 'バター 10g', '塩・こしょう 少々'],
      steps: [
        'パスタを塩水でゆでます。',
        '野菜とベーコンを食べやすい大きさに切ります。',
        'フライパンにバターを熱し、ベーコンと野菜を炒めます。',
        'パスタとケチャップを加えて炒め合わせ、塩・こしょうで味を整えて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'エビのペペロンチーノ',
      keywords: ['エビ', 'にんにく'],
      ingredients: ['パスタ 160g', 'エビ 150g', 'にんにく 2片', '鷹の爪 1本', 'オリーブオイル 大さじ4', '塩・こしょう 少々', 'パセリ 適量'],
      steps: [
        'パスタを塩水でゆでます。',
        'フライパンにオリーブオイル・にんにく・鷹の爪を入れて弱火で熱します。',
        'エビを加えて炒め、ゆで汁を少し加えて乳化させます。',
        'パスタを加えて絡め、パセリを散らして完成。',
      ],
      time: '20分',
      difficulty: '★★☆ 普通',
    },
    {
      name: '焼きそば',
      keywords: ['豚肉', 'キャベツ', 'もやし'],
      ingredients: ['中華麺 2玉', '豚こま肉 150g', 'キャベツ 1/4個', 'もやし 1袋', 'ソース 大さじ3', '塩・こしょう 少々', 'サラダ油 大さじ1'],
      steps: [
        'キャベツをひと口大に切ります。',
        'フライパンに油を熱し、豚肉を炒めます。',
        '野菜を加えて炒め、麺を加えてほぐしながら炒めます。',
        'ソースで味付けし、塩・こしょうで整えて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'きのことベーコンのパスタ',
      keywords: ['きのこ', 'ベーコン', 'にんにく', 'チーズ'],
      ingredients: ['パスタ 160g', 'きのこ（しめじ・エリンギ等）200g', 'ベーコン 3枚', 'にんにく 1片', 'しょうゆ 大さじ1', 'バター 15g', '塩・こしょう 少々'],
      steps: [
        'パスタを塩水でゆでます。',
        'フライパンにバター・にんにくを熱し、ベーコンを炒めます。',
        'きのこを加えて炒め、しょうゆを加えます。',
        'パスタを加えて混ぜ合わせ、塩・こしょうで整えて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'ひき肉と野菜のみそラーメン',
      keywords: ['ひき肉', 'ねぎ', 'もやし'],
      ingredients: ['ラーメン麺 2玉', 'ひき肉 150g', 'ねぎ 1/2本', 'もやし 1袋', '鶏がらスープ 800ml', 'みそ 大さじ2.5', 'しょうゆ 大さじ1', 'ごま油 小さじ1'],
      steps: [
        'フライパンでひき肉とねぎを炒めます。',
        '鶏がらスープを沸かし、みそ・しょうゆで味付けします。',
        '麺ともやしをゆでて器に盛り、スープを注ぎます。',
        'ひき肉とねぎをのせ、ごま油を垂らして完成。',
      ],
      time: '25分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'クリームパスタ',
      keywords: ['牛乳', 'バター', 'チーズ', 'ベーコン'],
      ingredients: ['パスタ 160g', 'ベーコン 4枚', '玉ねぎ 1/2個', '牛乳 200ml', 'バター 15g', 'チーズ 30g', '塩・こしょう 少々', 'にんにく 1片'],
      steps: [
        'パスタを塩水でゆでます。',
        'フライパンにバター・にんにくを熱し、ベーコン・玉ねぎを炒めます。',
        '牛乳を加えて煮詰め、チーズを溶かします。',
        'パスタを加えてよく混ぜ、塩・こしょうで整えて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '野菜たっぷりタンメン',
      keywords: ['もやし', 'キャベツ', 'にんじん', '豚肉', 'ねぎ'],
      ingredients: ['ラーメン麺 2玉', 'もやし 1袋', 'キャベツ 2枚', 'にんじん 1/3本', '豚こま肉 100g', 'ねぎ 1/2本', '鶏がらスープ 800ml', '塩・こしょう 少々', 'ごま油 大さじ1'],
      steps: [
        '野菜を食べやすい大きさに切ります。',
        'フライパンにごま油を熱し、豚肉と野菜を炒めます。',
        '鶏がらスープを加えて塩・こしょうで味を整えます。',
        'ゆでた麺を器に盛り、スープと野菜をかけて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'さばとトマトのパスタ',
      keywords: ['さば', 'トマト', 'にんにく'],
      ingredients: ['パスタ 160g', 'さば缶（水煮）1缶', 'トマト 2個', 'にんにく 2片', 'オリーブオイル 大さじ3', '塩・こしょう 少々', 'バジル 適量'],
      steps: [
        'パスタを塩水でゆでます。',
        'フライパンにオリーブオイルとにんにくを熱します。',
        'トマトを加えてつぶしながら炒め、さば缶を汁ごと加えます。',
        'パスタを加えて混ぜ合わせ、塩・こしょうで整えてバジルを飾って完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
  ],
  'サラダ': [
    {
      name: 'シーザーサラダ',
      keywords: ['レタス', 'チーズ', 'ベーコン', 'にんにく'],
      ingredients: ['レタス 1/2個', 'ベーコン 3枚', 'チーズ（パルメザン）30g', 'クルトン 適量', 'マヨネーズ 大さじ3', 'レモン汁 大さじ1', 'にんにく 1片', '塩・こしょう 少々'],
      steps: [
        'ベーコンをカリカリに焼きます。',
        'マヨネーズ・レモン汁・にんにく（すりおろし）・塩・こしょうでドレッシングを作ります。',
        'レタスをひと口大にちぎって器に盛ります。',
        'ベーコン・チーズ・クルトンをのせ、ドレッシングをかけて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'コールスロー',
      keywords: ['キャベツ', 'にんじん'],
      ingredients: ['キャベツ 1/4個', 'にんじん 1/3本', '塩 小さじ1', 'マヨネーズ 大さじ3', '酢 大さじ1', '砂糖 小さじ1', '塩・こしょう 少々'],
      steps: [
        'キャベツを千切り、にんじんを細切りにします。',
        '塩をふって10分おき、水気をしっかり絞ります。',
        'マヨネーズ・酢・砂糖・塩・こしょうを混ぜてドレッシングを作ります。',
        '野菜とドレッシングを和えて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: '大根とにんじんの紅白なます',
      keywords: ['大根', 'にんじん'],
      ingredients: ['大根 200g', 'にんじん 50g', '塩 小さじ1', '酢 大さじ3', '砂糖 大さじ2', '塩 少々'],
      steps: [
        '大根とにんじんをせん切りにします。',
        '塩をふって10分おき、水気をしっかり絞ります。',
        '酢・砂糖・塩を合わせてすし酢を作ります。',
        '野菜にすし酢を和えて冷蔵庫で30分馴染ませて完成。',
      ],
      time: '20分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'きゅうりとわかめの酢の物',
      keywords: ['きゅうり', 'わかめ'],
      ingredients: ['きゅうり 2本', 'わかめ（乾燥）5g', '酢 大さじ3', '砂糖 大さじ1.5', '塩 小さじ1/2', 'しょうゆ 小さじ1', '白ごま 適量'],
      steps: [
        'きゅうりを薄切りにして塩をふり、しばらくおいて水気を絞ります。',
        'わかめを水で戻して食べやすい大きさに切ります。',
        '酢・砂糖・塩・しょうゆを混ぜてすし酢を作ります。',
        'きゅうりとわかめをすし酢で和え、白ごまを散らして完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'ツナとほうれん草のサラダ',
      keywords: ['ツナ', 'ほうれん草', '玉ねぎ'],
      ingredients: ['ほうれん草 1/2束', 'ツナ缶 1缶', '玉ねぎ 1/4個', 'マヨネーズ 大さじ2', 'しょうゆ 小さじ1', '塩・こしょう 少々'],
      steps: [
        'ほうれん草を塩ゆでして水気を絞り、4cm幅に切ります。',
        '玉ねぎを薄切りにして水にさらします。',
        'ツナの油を切ります。',
        'すべてをマヨネーズ・しょうゆ・塩・こしょうで和えて完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'グリーンサラダ',
      keywords: ['レタス', 'きゅうり', 'トマト', '玉ねぎ'],
      ingredients: ['レタス 1/4個', 'きゅうり 1本', 'トマト 1個', '玉ねぎ 1/4個', 'オリーブオイル 大さじ2', '酢 大さじ1', '塩・こしょう 少々'],
      steps: [
        'レタスを手でちぎり、きゅうりとトマトを食べやすい大きさに切ります。',
        '玉ねぎを薄切りにして水にさらします。',
        'オリーブオイル・酢・塩・こしょうでドレッシングを作ります。',
        '野菜を盛り付けてドレッシングをかけて完成。',
      ],
      time: '10分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'レタスとツナのサラダ',
      keywords: ['レタス', 'ツナ', '玉ねぎ'],
      ingredients: ['レタス 1/2個', 'ツナ缶 1缶', '玉ねぎ 1/4個', 'トマト 1個', 'マヨネーズ 大さじ2', 'しょうゆ 小さじ1', 'レモン汁 小さじ1'],
      steps: [
        'レタスをひと口大にちぎり、玉ねぎを薄切りにして水にさらします。',
        'トマトをくし切りにします。',
        'マヨネーズ・しょうゆ・レモン汁を混ぜてドレッシングを作ります。',
        '野菜を盛り付け、ツナをのせてドレッシングをかけて完成。',
      ],
      time: '10分',
      difficulty: '★☆☆ 簡単',
    },
    {
      name: 'わかめと野菜のさっぱりサラダ',
      keywords: ['わかめ', 'きゅうり', '大根'],
      ingredients: ['わかめ（乾燥）8g', 'きゅうり 1本', '大根 100g', '酢 大さじ3', '砂糖 大さじ1.5', 'しょうゆ 大さじ1', '白ごま 適量', 'ごま油 小さじ1'],
      steps: [
        'わかめを水で戻して食べやすい大きさに切ります。',
        'きゅうりを薄切り、大根をせん切りにして塩もみし水気を絞ります。',
        '酢・砂糖・しょうゆ・ごま油を混ぜてドレッシングを作ります。',
        'すべてを和えて白ごまを散らして完成。',
      ],
      time: '15分',
      difficulty: '★☆☆ 簡単',
    },
  ],
};

// 前菜 = 前菜・汁物・サラダ、主菜 = 主菜・丼・麺
const categoryMap: Record<string, string[]> = {
  '前菜': ['前菜', '汁物', 'サラダ'],
  '主菜': ['主菜', '丼', '麺'],
};

const findMatchingRecipes = (category: string, selectedIngredients: string[]): Recipe[] => {
  const internalCategories = categoryMap[category] || [category];
  const pool = internalCategories.flatMap(cat => recipeDB[cat] || []);
  if (pool.length === 0) return [];

  const scored = pool.map(recipe => ({
    recipe,
    score: recipe.keywords.filter(k => selectedIngredients.includes(k)).length,
    rand: Math.random(),
  }));

  // スコア降順、同点はランダムでシャッフル（毎回少し違う結果に）
  scored.sort((a, b) => b.score - a.score || a.rand - b.rand);
  return scored.slice(0, 3).map(s => s.recipe);
};

const App = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const commonIngredients = [
    'にんじん', '玉ねぎ', 'じゃがいも', 'トマト', 'キャベツ',
    'もやし', 'きのこ', 'ピーマン', 'なす', 'きゅうり',
    'ほうれん草', 'ブロッコリー', 'レタス', 'にんにく', '大根',
    '鶏肉', '豚肉', '牛肉', 'ひき肉', 'ベーコン', 'ソーセージ',
    'サーモン', 'エビ', 'イカ', 'ツナ', 'さば', 'あじ',
    '卵', 'チーズ', 'バター', '牛乳', 'ヨーグルト',
    '豆腐', '納豆', 'のり', 'わかめ', 'ねぎ', 'しょうが', '餅',
  ];

  const categories = ['前菜', '主菜'];

  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };

  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients([...selectedIngredients, customIngredient.trim()]);
      setCustomIngredient('');
    }
  };

  const generateRecipe = async () => {
    if (selectedIngredients.length === 0 || !selectedCategory) {
      alert('食材と料理カテゴリーを選択してください！');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const recipes = findMatchingRecipes(selectedCategory, selectedIngredients);
    setFoundRecipes(recipes);
    setIsLoading(false);
  };

  const resetApp = () => {
    setSelectedIngredients([]);
    setCustomIngredient('');
    setSelectedCategory('');
    setFoundRecipes([]);
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 p-2 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full px-0">
        {/* ヘッダー */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-center mb-2 sm:mb-4">
            <ChefHat className="text-orange-600 mr-2 sm:mr-3" size={32} />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">れしぴくん</h1>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base px-2 sm:px-4">選んだ食材からおいしいレシピを提案します</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-8 lg:items-start">
          {/* 左側: 食材選択 */}
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-5 md:p-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto custom-scrollbar">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">🥬 食材を選択</h2>
            <p className="text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2 mb-3 sm:mb-4">
              💡 3〜5個選ぶとベストなマッチングになります
            </p>

            {/* よく使う食材ボタン */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {commonIngredients.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => addIngredient(ingredient)}
                    disabled={selectedIngredients.includes(ingredient)}
                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
                      selectedIngredients.includes(ingredient)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-800 active:scale-95 sm:hover:scale-105'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>

            {/* カスタム食材入力 */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">その他の食材:</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customIngredient}
                  onChange={(e) => setCustomIngredient(e.target.value)}
                  placeholder="食材名を入力"
                  className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
                />
                <button
                  onClick={addCustomIngredient}
                  className="px-3 sm:px-4 py-2 sm:py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:scale-95 transition-all"
                >
                  <Plus size={18} className="sm:hidden" />
                  <Plus size={20} className="hidden sm:block" />
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                入力した食材を活かしたレシピ提案は
                <button
                  onClick={() => window.parent.postMessage('switchToAI', '*')}
                  className="text-orange-500 underline underline-offset-2 hover:text-orange-600"
                >
                  AIバージョン
                </button>
                で。
              </p>
            </div>

            {/* 選択された食材 */}
            {selectedIngredients.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">選択中の食材:</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedIngredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center"
                    >
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="ml-1.5 sm:ml-2 text-orange-600 hover:text-orange-800"
                      >
                        <X size={12} className="sm:hidden" />
                        <X size={14} className="hidden sm:block" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 料理カテゴリー選択 */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">料理カテゴリー:</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-2.5 sm:p-4 rounded-lg text-sm sm:text-base font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 生成ボタン */}
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={generateRecipe}
                disabled={isLoading || selectedIngredients.length === 0 || !selectedCategory}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    <span className="text-sm sm:text-base">レシピを探しています...</span>
                  </>
                ) : (
                  <span className="text-sm sm:text-base">🍽️ レシピを提案してもらう</span>
                )}
              </button>

              <button
                onClick={resetApp}
                className="w-full bg-gray-200 text-gray-700 font-medium py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-gray-300 active:scale-95 transition-all"
              >
                🔄 リセット
              </button>
            </div>
          </div>

          {/* 右側: レシピ表示 */}
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-5 md:p-6 lg:min-h-[500px]">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">🍽️ おすすめのレシピ</h2>

            {foundRecipes.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {foundRecipes.map((recipe, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-orange-200 rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* レシピヘッダー */}
                    <div className="border-b border-orange-100 pb-3 sm:pb-4 mb-3 sm:mb-4">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <span className="bg-orange-600 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                          レシピ {index + 1}
                        </span>
                        <div className="flex gap-1.5 sm:gap-2">
                          <span className="bg-orange-50 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
                            {recipe.time}
                          </span>
                          <span className="bg-orange-50 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
                            {recipe.difficulty}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{recipe.name}</h3>
                    </div>

                    {/* 材料セクション */}
                    <div className="mb-3 sm:mb-4">
                      <h4 className="flex items-center text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                        🥘 材料（2人前）
                      </h4>
                      <div className="bg-orange-50 rounded-lg p-2.5 sm:p-3">
                        <ul className="space-y-0.5 sm:space-y-1">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="text-gray-700 flex items-start text-xs sm:text-sm">
                              <span className="text-orange-600 mr-1.5 sm:mr-2">•</span>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 作り方セクション */}
                    <div className="mb-3 sm:mb-4">
                      <h4 className="flex items-center text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                        👨‍🍳 作り方
                      </h4>
                      <div className="space-y-2 sm:space-y-3">
                        {recipe.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="bg-orange-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* AI版への誘導CTA */}
                <div className="mt-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl p-4 sm:p-5">
                  <p className="text-sm sm:text-base font-bold text-orange-700 mb-2 text-center">✨ このレシピ、気に入りましたか？</p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed text-left">
                    AIバージョンなら食材の相性・調理法まで考えた本格レシピを提案します。無料で使えます。
                  </p>
                  <button
                    onClick={() => window.parent.postMessage('switchToAI', '*')}
                    className="w-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg px-4 py-2.5 active:scale-95 transition-all hover:from-orange-600 hover:to-orange-700"
                  >
                    AIバージョンを試す →
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                <ChefHat size={40} className="mx-auto mb-3 sm:mb-4 text-gray-300 sm:w-12 sm:h-12" />
                <p className="text-xs sm:text-sm">食材と料理カテゴリーを選択して、</p>
                <p className="text-xs sm:text-sm">「レシピを提案してもらう」ボタンを押してください</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
