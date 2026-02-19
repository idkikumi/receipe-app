import { useState } from 'react';
import { ChefHat, Plus, X, Loader2 } from 'lucide-react';

const App = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [generatedRecipe, setGeneratedRecipe] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // よく使う食材のボタン（カテゴリー順・使用頻度順）
  const commonIngredients = [
    // 野菜（よく使う順）
    'にんじん', '玉ねぎ', 'じゃがいも', 'トマト', 'キャベツ',
    'もやし', 'きのこ', 'ピーマン', 'なす', 'きゅうり',
    'ほうれん草', 'ブロッコリー', 'レタス', 'にんにく', '大根',

    // 肉類（よく使う順）
    '鶏肉', '豚肉', '牛肉', 'ひき肉', 'ベーコン', 'ソーセージ',

    // 魚介類（よく使う順）
    'サーモン', 'エビ', 'イカ', 'ツナ', 'さば', 'あじ',

    // 卵・乳製品（よく使う順）
    '卵', 'チーズ', 'バター', '牛乳', 'ヨーグルト',

    // その他
    '豆腐', '納豆', 'のり', 'わかめ', 'ねぎ', 'しょうが', '餅'
  ];

  // 食材を追加
  const addIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // 食材を削除
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };

  // カスタム食材を追加
  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients([...selectedIngredients, customIngredient.trim()]);
      setCustomIngredient('');
    }
  };

  // レシピを生成
  const generateRecipe = async () => {
    if (selectedIngredients.length === 0 || !selectedCategory) {
      alert('食材と料理カテゴリーを選択してください！');
      return;
    }

    setIsLoading(true);
    try {
      // モックレシピを生成（実際のAPIの代わり）
      await new Promise(resolve => setTimeout(resolve, 1500)); // ローディング演出

      const ingredientsText = selectedIngredients.slice(0, 3).join('、');

      const mockRecipe = selectedCategory === '前菜'
        ? `【レシピ1】
料理名: ${selectedIngredients[0]}のカルパッチョ
材料（2人前）:
- ${selectedIngredients[0]} 150g
- オリーブオイル 大さじ2
- レモン汁 大さじ1
- 塩 少々
- 黒こしょう 少々
- パルメザンチーズ 適量
作り方:
1. ${selectedIngredients[0]}を薄くスライスして、お皿に並べます。
2. オリーブオイル、レモン汁、塩、黒こしょうを混ぜてドレッシングを作ります。
3. スライスした${selectedIngredients[0]}の上にドレッシングをかけます。
4. 削ったパルメザンチーズをトッピングして完成です。

【レシピ2】
料理名: ${selectedIngredients.length > 1 ? selectedIngredients[1] : selectedIngredients[0]}のブルスケッタ
材料（2人前）:
- バゲット 6切れ
- ${selectedIngredients.length > 1 ? selectedIngredients[1] : selectedIngredients[0]} 100g
- にんにく 1片
- オリーブオイル 大さじ2
- バジル 適量
- 塩、こしょう 少々
作り方:
1. バゲットを1cm幅にスライスし、オーブントースターで軽く焼きます。
2. ${selectedIngredients.length > 1 ? selectedIngredients[1] : selectedIngredients[0]}を細かく刻みます。
3. 焼いたバゲットににんにくをこすりつけます。
4. 刻んだ${selectedIngredients.length > 1 ? selectedIngredients[1] : selectedIngredients[0]}をのせ、オリーブオイルをかけて、塩こしょうで味を整えます。
5. バジルをトッピングして完成です。

【レシピ3】
料理名: ${ingredientsText}のマリネ
材料（2人前）:
- ${selectedIngredients[0]} 100g
- ${selectedIngredients.length > 1 ? selectedIngredients[1] : '玉ねぎ'} 50g
- 酢 大さじ2
- オリーブオイル 大さじ1
- 砂糖 小さじ1
- 塩 少々
作り方:
1. ${selectedIngredients[0]}を一口大に切ります。
2. ${selectedIngredients.length > 1 ? selectedIngredients[1] : '玉ねぎ'}を薄くスライスします。
3. ボウルに酢、オリーブオイル、砂糖、塩を混ぜてマリネ液を作ります。
4. 切った食材をマリネ液に漬けて、冷蔵庫で30分以上冷やします。
5. お皿に盛り付けて完成です。`
        : `【レシピ1】
料理名: ${ingredientsText}の炒め物
材料（2人前）:
- ${selectedIngredients[0]} 150g
- ${selectedIngredients.length > 1 ? selectedIngredients[1] : '玉ねぎ'} 1/2個
- ${selectedIngredients.length > 2 ? selectedIngredients[2] : 'にんじん'} 1/2本
- サラダ油 大さじ1
- しょうゆ 大さじ1.5
- みりん 大さじ1
- 塩こしょう 少々
作り方:
1. ${selectedIngredients[0]}を一口大に切ります。
2. ${selectedIngredients.length > 1 ? selectedIngredients[1] : '玉ねぎ'}と${selectedIngredients.length > 2 ? selectedIngredients[2] : 'にんじん'}を食べやすい大きさに切ります。
3. フライパンに油を熱し、${selectedIngredients[0]}を炒めます。
4. 他の野菜も加えて一緒に炒めます。
5. しょうゆ、みりん、塩こしょうで味付けして完成です。

【レシピ2】
料理名: ${selectedIngredients[0]}の煮物
材料（2人前）:
- ${selectedIngredients[0]} 200g
- だし汁 300ml
- しょうゆ 大さじ2
- みりん 大さじ2
- 砂糖 大さじ1
- ${selectedIngredients.length > 1 ? selectedIngredients[1] : 'にんじん'} 1/2本
作り方:
1. ${selectedIngredients[0]}と${selectedIngredients.length > 1 ? selectedIngredients[1] : 'にんじん'}を一口大に切ります。
2. 鍋にだし汁、しょうゆ、みりん、砂糖を入れて煮立てます。
3. 切った食材を加えて、中火で15分ほど煮込みます。
4. 食材が柔らかくなり、味が染みたら完成です。
5. お好みで彩りに絹さやなどを添えても美味しいです。

【レシピ3】
料理名: ${ingredientsText}のグラタン
材料（2人前）:
- ${selectedIngredients[0]} 150g
- ${selectedIngredients.length > 1 ? selectedIngredients[1] : '玉ねぎ'} 1/2個
- バター 20g
- 小麦粉 大さじ2
- 牛乳 300ml
- ピザ用チーズ 50g
- 塩こしょう 少々
作り方:
1. ${selectedIngredients[0]}と${selectedIngredients.length > 1 ? selectedIngredients[1] : '玉ねぎ'}を食べやすい大きさに切り、バターで炒めます。
2. 小麦粉を加えて粉っぽさがなくなるまで炒めます。
3. 牛乳を少しずつ加えながら、とろみがつくまで混ぜます。
4. 塩こしょうで味を整え、耐熱皿に入れます。
5. チーズをのせて、200度のオーブンで15分焼いて完成です。`;

      setGeneratedRecipe(mockRecipe);
    } catch (error) {
      console.error('レシピ生成エラー:', error);
      alert('レシピの生成に失敗しました。もう一度試してください。');
    } finally {
      setIsLoading(false);
    }
  };

  // リセット
  const resetApp = () => {
    setSelectedIngredients([]);
    setCustomIngredient('');
    setSelectedCategory('');
    setGeneratedRecipe('');
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
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">🥬 食材を選択</h2>

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
                {['前菜', '主菜'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base font-medium transition-all ${
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
                    <span className="text-sm sm:text-base">レシピを生成中...</span>
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

            {generatedRecipe ? (
              <div className="space-y-4 sm:space-y-6">
                {(() => {
                  // レシピを正しく分割する
                  let recipes = [];

                  // 【レシピ1】【レシピ2】【レシピ3】で分割
                  const parts = generatedRecipe.split(/【レシピ[123]】/);

                  // 最初の部分を除いて、残りの部分をレシピとして扱う
                  for (let i = 1; i < parts.length; i++) {
                    if (parts[i].trim()) {
                      recipes.push(parts[i].trim());
                    }
                  }

                  // もしレシピが見つからない場合は、全体を1つのレシピとして扱う
                  if (recipes.length === 0) {
                    recipes = [generatedRecipe];
                  }

                  return recipes.map((recipe, index) => {
                    // レシピテキストを解析
                    const lines = recipe.split('\n').filter(line => line.trim());

                    let recipeName = '';
                    let ingredients: string[] = [];
                    let instructions: string[] = [];
                    let currentSection = '';

                    lines.forEach(line => {
                      const trimmedLine = line.trim();
                      if (trimmedLine.includes('料理名:')) {
                        recipeName = trimmedLine.replace('料理名:', '').trim();
                      } else if (trimmedLine.includes('材料')) {
                        currentSection = 'ingredients';
                      } else if (trimmedLine.includes('作り方')) {
                        currentSection = 'instructions';
                      } else if (trimmedLine.includes('ポイント')) {
                        currentSection = '';  // ポイントセクションは無視
                      } else if (trimmedLine && currentSection === 'ingredients' && (trimmedLine.startsWith('-') || trimmedLine.startsWith('・'))) {
                        ingredients.push(trimmedLine.replace(/^[-・]\s*/, ''));
                      } else if (trimmedLine && currentSection === 'instructions' && /^\d+\./.test(trimmedLine)) {
                        instructions.push(trimmedLine);
                      }
                    });

                    return (
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
                                約30分
                              </span>
                              <span className="bg-orange-50 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
                                ★★☆ 普通
                              </span>
                            </div>
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{recipeName || 'おすすめレシピ'}</h3>
                        </div>

                        {/* 材料セクション */}
                        <div className="mb-3 sm:mb-4">
                          <h4 className="flex items-center text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                            🥘 材料（2人前）
                          </h4>
                          <div className="bg-orange-50 rounded-lg p-2.5 sm:p-3">
                            <ul className="space-y-0.5 sm:space-y-1">
                              {ingredients.map((ingredient, idx) => (
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
                            {instructions.map((instruction, idx) => (
                              <div key={idx} className="flex items-start">
                                <span className="bg-orange-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">{instruction.replace(/^\d+\.\s*/, '')}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
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
