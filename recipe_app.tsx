import React, { useState, useEffect } from 'react';
import { ChefHat, Plus, X, Loader2 } from 'lucide-react';

const ReshipiKunApp = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClaudeAvailable, setIsClaudeAvailable] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsClaudeAvailable(typeof window !== 'undefined' && !!window.claude);
  }, []);

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
  const addIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // 食材を削除
  const removeIngredient = (ingredient) => {
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
      setError('食材と料理カテゴリーを選択してください！');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const prompt = `
あなたは料理の専門シェフです。以下の食材の中から適切なものを選んで、${selectedCategory}のレシピを3つ提案してください：

利用可能な食材: ${selectedIngredients.join('、')}
料理カテゴリー: ${selectedCategory}
人数: 2人前

注意：選択された食材を全て使う必要はありません。各レシピに最適な食材を選んで組み合わせてください。

${selectedCategory === '前菜' ? '前菜として軽めで食欲をそそる、食事の最初に楽しめる料理を提案してください。' : 'メインディッシュとしてボリュームがあり、満足感のある料理を提案してください。'}

以下の形式で3つのレシピを提案してください：

【レシピ1】
料理名: 
材料（2人前）:
- 各材料の分量を具体的に記載
作り方:
1. 手順を分かりやすく番号付きで記載
2. 初心者でも作れるよう詳しく説明

【レシピ2】
料理名: 
材料（2人前）:
- 各材料の分量を具体的に記載
作り方:
1. 手順を分かりやすく番号付きで記載
2. 初心者でも作れるよう詳しく説明

【レシピ3】
料理名: 
材料（2人前）:
- 各材料の分量を具体的に記載
作り方:
1. 手順を分かりやすく番号付きで記載
2. 初心者でも作れるよう詳しく説明

markdown記法は使用せず、普通の文章で回答してください。
`;

      const response = await window.claude.complete(prompt);
      setGeneratedRecipe(response);
    } catch (error) {
      console.error('レシピ生成エラー:', error);
      setError('レシピの生成に失敗しました。もう一度試してください。');
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

  // ログイン状態確認中
  if (isClaudeAvailable === null) {
    return null;
  }

  // 未ログイン時のゲート画面
  if (isClaudeAvailable === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <ChefHat className="mx-auto mb-4 text-orange-400" size={52} />
          <h1 className="text-2xl font-bold text-gray-800 mb-1">れしぴくん</h1>
          <p className="text-gray-500 text-sm mb-6">選んだ食材からおいしいレシピを提案します</p>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-orange-800 font-semibold mb-2 flex items-center gap-2">
              <span>🔐</span> ログインが必要です
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              このアプリはClaude AIを使ってレシピを提案します。ご利用には <strong>Claude.ai へのログイン</strong>が必要です。
            </p>
          </div>

          <ol className="text-left text-sm text-gray-600 mb-6 space-y-2 bg-gray-50 rounded-lg p-4">
            <li className="flex items-start gap-2">
              <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span>下のボタンから <strong>Claude.ai</strong> を開く</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span>アカウント作成またはログインする（無料）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span>ログイン後、このページに戻ってきてください</span>
            </li>
          </ol>

          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all shadow-md"
          >
            Claude.ai でログインする →
          </a>
          <p className="text-gray-400 text-xs mt-4">
            ※ 無料プランでもご利用いただけます
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="text-orange-600 mr-3" size={40} />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 whitespace-nowrap">れしぴくん</h1>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base whitespace-nowrap">選んだ食材からおいしいレシピを提案します</p>
        </div>

        <div className="flex flex-col gap-8">
          {/* 左側: 食材選択 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🥬 食材を選択</h2>
            
            {/* よく使う食材ボタン */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {commonIngredients.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => addIngredient(ingredient)}
                    disabled={selectedIngredients.includes(ingredient)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedIngredients.includes(ingredient)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-800 hover:scale-105'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>

            {/* カスタム食材入力 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">その他の食材:</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customIngredient}
                  onChange={(e) => setCustomIngredient(e.target.value)}
                  placeholder="食材名を入力"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
                />
                <button
                  onClick={addCustomIngredient}
                  className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* 選択された食材 */}
            {selectedIngredients.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">選択中の食材:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="ml-2 text-orange-600 hover:text-orange-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 料理カテゴリー選択 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">料理カテゴリー:</h3>
              <div className="grid grid-cols-2 gap-3">
                {['前菜', '主菜'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-4 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* エラーメッセージ */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                ⚠️ {error}
              </div>
            )}

            {/* 生成ボタン */}
            <div className="space-y-3">
              <button
                onClick={generateRecipe}
                disabled={isLoading || selectedIngredients.length === 0 || !selectedCategory}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-4 px-6 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    レシピを生成中...
                  </>
                ) : (
                  '🍽️ レシピを提案してもらう'
                )}
              </button>
              
              <button
                onClick={resetApp}
                className="w-full bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-all"
              >
                🔄 リセット
              </button>
            </div>
          </div>

          {/* 右側: レシピ表示 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🍽️ おすすめのレシピ</h2>
            
            {generatedRecipe ? (
              <div className="space-y-6">
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
                    let ingredients = [];
                    let instructions = [];
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
                      <div key={index} className="bg-white border-2 border-orange-200 rounded-xl p-6 shadow-lg">
                        {/* レシピヘッダー */}
                        <div className="border-b border-orange-100 pb-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              レシピ {index + 1}
                            </span>
                            <div className="flex gap-2">
                              <span className="bg-orange-50 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                約30分
                              </span>
                              <span className="bg-orange-50 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                ★★☆ 普通
                              </span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">{recipeName || 'おすすめレシピ'}</h3>
                        </div>
                        
                        {/* 材料セクション */}
                        <div className="mb-4">
                          <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                            🥘 材料（2人前）
                          </h4>
                          <div className="bg-orange-50 rounded-lg p-3">
                            <ul className="space-y-1">
                              {ingredients.map((ingredient, idx) => (
                                <li key={idx} className="text-gray-700 flex items-start">
                                  <span className="text-orange-600 mr-2">•</span>
                                  {ingredient}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* 作り方セクション */}
                        <div className="mb-4">
                          <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                            👨‍🍳 作り方
                          </h4>
                          <div className="space-y-3">
                            {instructions.map((instruction, idx) => (
                              <div key={idx} className="flex items-start">
                                <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <p className="text-gray-700 leading-relaxed">{instruction.replace(/^\d+\.\s*/, '')}</p>
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
              <div className="text-center py-12 text-gray-500">
                <ChefHat size={48} className="mx-auto mb-4 text-gray-300" />
                <p>食材と料理カテゴリーを選択して、</p>
                <p>「レシピを提案してもらう」ボタンを押してください</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReshipiKunApp;