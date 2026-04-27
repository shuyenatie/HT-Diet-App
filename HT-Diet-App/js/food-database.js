var categoryBgMap = {
  '主食-米饭': 'linear-gradient(135deg, #FFF8E1, #FFE082)',
  '主食-面条': 'linear-gradient(135deg, #FFF3E0, #FFCC80)',
  '主食-面点': 'linear-gradient(135deg, #FBE9E7, #FFAB91)',
  '主食-面包': 'linear-gradient(135deg, #EFEBE9, #BCAAA4)',
  '主食-薯类': 'linear-gradient(135deg, #FCE4EC, #F48FB1)',
  '主食-谷物': 'linear-gradient(135deg, #F1F8E9, #AED581)',
  '主食-粥类': 'linear-gradient(135deg, #FFFDE7, #FFF176)',
  '鸡肉-鸡胸': 'linear-gradient(135deg, #FFF3E0, #FF8A65)',
  '鸡肉-鸡腿': 'linear-gradient(135deg, #FBE9E7, #FF7043)',
  '鸡肉-整鸡': 'linear-gradient(135deg, #F3E5F5, #CE93D8)',
  '鸡肉-菜品': 'linear-gradient(135deg, #FCE4EC, #EF5350)',
  '鸡肉-小吃': 'linear-gradient(135deg, #FFF8E1, #FFA726)',
  '鸡肉-鸡翅': 'linear-gradient(135deg, #FBE9E7, #E57373)',
  '鸡肉-其他': 'linear-gradient(135deg, #EFEBE9, #A1887F)',
  '猪肉-瘦肉': 'linear-gradient(135deg, #FFEBEE, #EF9A9A)',
  '猪肉-五花肉': 'linear-gradient(135deg, #FCE4EC, #F06292)',
  '猪肉-排骨': 'linear-gradient(135deg, #FBE9E7, #FF8A65)',
  '猪肉-菜品': 'linear-gradient(135deg, #FFF3E0, #FF8A65)',
  '猪肉-加工': 'linear-gradient(135deg, #F3E5F5, #BA68C8)',
  '猪肉-内脏': 'linear-gradient(135deg, #EFEBE9, #8D6E63)',
  '牛肉-瘦肉': 'linear-gradient(135deg, #FFEBEE, #E57373)',
  '牛肉-牛排': 'linear-gradient(135deg, #FBE9E7, #D84315)',
  '牛肉-菜品': 'linear-gradient(135deg, #FFF3E0, #FF7043)',
  '牛肉-加工': 'linear-gradient(135deg, #EFEBE9, #A1887F)',
  '牛肉-火锅': 'linear-gradient(135deg, #FCE4EC, #EC407A)',
  '羊肉': 'linear-gradient(135deg, #FBE9E7, #BF360C)',
  '鱼类-三文鱼': 'linear-gradient(135deg, #FFE0B2, #FF6D00)',
  '鱼类-白鱼': 'linear-gradient(135deg, #E3F2FD, #64B5F6)',
  '鱼类-青鱼': 'linear-gradient(135deg, #E0F7FA, #4DD0E1)',
  '鱼类-其他': 'linear-gradient(135deg, #E8EAF6, #7986CB)',
  '虾类': 'linear-gradient(135deg, #FFE0B2, #FF8A65)',
  '蟹类': 'linear-gradient(135deg, #FCE4EC, #F48FB1)',
  '蛋类-鸡蛋': 'linear-gradient(135deg, #FFF8E1, #FFD54F)',
  '蛋类-其他': 'linear-gradient(135deg, #FFFDE7, #FFF176)',
  '奶类-牛奶': 'linear-gradient(135deg, #F3E5F5, #CE93D8)',
  '奶类-酸奶': 'linear-gradient(135deg, #FCE4EC, #F48FB1)',
  '奶类-奶酪': 'linear-gradient(135deg, #FFF8E1, #FFD54F)',
  '奶类-其他': 'linear-gradient(135deg, #EFEBE9, #BCAAA4)',
  '豆制品-豆腐': 'linear-gradient(135deg, #FFFDE7, #FFF9C4)',
  '豆制品-其他': 'linear-gradient(135deg, #F1F8E9, #DCEDC8)',
  '豆制品-饮品': 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
  '蔬菜-花菜类': 'linear-gradient(135deg, #E8F5E9, #81C784)',
  '蔬菜-叶菜类': 'linear-gradient(135deg, #E8F5E9, #66BB6A)',
  '蔬菜-茎菜类': 'linear-gradient(135deg, #F1F8E9, #AED581)',
  '蔬菜-果菜类': 'linear-gradient(135deg, #FFF3E0, #FFB74D)',
  '蔬菜-瓜类': 'linear-gradient(135deg, #E8F5E9, #4CAF50)',
  '蔬菜-根茎类': 'linear-gradient(135deg, #EFEBE9, #A1887F)',
  '蔬菜-菌类': 'linear-gradient(135deg, #EFEBE9, #8D6E63)',
  '蔬菜-藻类': 'linear-gradient(135deg, #E0F7FA, #26A69A)',
  '菌菇-常见': 'linear-gradient(135deg, #EFEBE9, #8D6E63)',
  '菌菇-珍品': 'linear-gradient(135deg, #FFF8E1, #FFB300)',
  '菌菇-干品': 'linear-gradient(135deg, #D7CCC8, #795548)',
  '水果-常见': 'linear-gradient(135deg, #FFF3E0, #FF8A65)',
  '水果-瓜类': 'linear-gradient(135deg, #FFFDE7, #FDD835)',
  '水果-浆果': 'linear-gradient(135deg, #F3E5F5, #AB47BC)',
  '水果-其他': 'linear-gradient(135deg, #E8F5E9, #66BB6A)',
  '水果-热带': 'linear-gradient(135deg, #FFF8E1, #FFB300)',
  '水果-核果': 'linear-gradient(135deg, #FCE4EC, #EC407A)',
  '水果-柑橘类': 'linear-gradient(135deg, #FFF8E1, #FFB74D)',
  '坚果-酱类': 'linear-gradient(135deg, #EFEBE9, #8D6E63)',
  '坚果-常见': 'linear-gradient(135deg, #EFEBE9, #A1887F)',
  '坚果-其他': 'linear-gradient(135deg, #FBE9E7, #BCAAA4)',
  '补剂': 'linear-gradient(135deg, #E3F2FD, #42A5F5)',
  '饮品-碳酸': 'linear-gradient(135deg, #E3F2FD, #90CAF9)',
  '饮品-茶饮': 'linear-gradient(135deg, #FFF8E1, #FFE082)',
  '饮品-咖啡': 'linear-gradient(135deg, #EFEBE9, #795548)',
  '饮品-果汁': 'linear-gradient(135deg, #FFF3E0, #FFB74D)',
  '饮品-酒精': 'linear-gradient(135deg, #FCE4EC, #F48FB1)',
  '快餐-火锅': 'linear-gradient(135deg, #FFEBEE, #EF5350)',
  '快餐-麻辣烫': 'linear-gradient(135deg, #FBE9E7, #FF5722)',
  '快餐-西式': 'linear-gradient(135deg, #FFF8E1, #FFA000)',
  '快餐-轻食': 'linear-gradient(135deg, #E8F5E9, #43A047)',
  '快餐-日式': 'linear-gradient(135deg, #FFF3E0, #FF8F00)',
  '快餐-粉面': 'linear-gradient(135deg, #FBE9E7, #FF6E40)',
  '快餐-早餐': 'linear-gradient(135deg, #FFF8E1, #FFD54F)',
  '鸭肉': 'linear-gradient(135deg, #FBE9E7, #FF8A65)',
  '零食-甜食': 'linear-gradient(135deg, #FCE4EC, #F06292)',
  '零食-咸味': 'linear-gradient(135deg, #FFF8E1, #FFB300)',
  '零食-中式': 'linear-gradient(135deg, #FFF3E0, #FF8F00)',
  '自定义': 'linear-gradient(135deg, #E3F2FD, #90CAF9)',
  'AI识别': 'linear-gradient(135deg, #E8EAF6, #7C4DFF)'
}

function getAvatarBg(category) {
  if (categoryBgMap[category]) return categoryBgMap[category]
  var topCat = category.split('-')[0]
  for (var key in categoryBgMap) {
    if (key.startsWith(topCat)) return categoryBgMap[key]
  }
  return 'linear-gradient(135deg, #f5f5f5, #e0e0e0)'
}

function decorateFood(food) {
  return Object.assign({}, food, {
    avatarBg: food.avatarBg || getAvatarBg(food.category || '自定义'),
    source: food.source || 'unverified',
    sourceId: food.sourceId || '',
    sourceName: food.sourceName || '',
    sourceVersion: food.sourceVersion || '',
    foodState: food.foodState || '',
    ediblePortion: food.ediblePortion == null ? 1 : food.ediblePortion,
    sourceNote: food.sourceNote || '未绑定权威食物成分来源，数值仅作估算'
  })
}

var foodDatabase = [
  { id: 'f001', name: '白米饭', emoji: '🍚', category: '主食-米饭', caloriesPer100g: 116, proteinPer100g: 2.6, fatPer100g: 0.3, carbsPer100g: 25.9, unit: 'g', defaultWeight: 200, keywords: ['米饭', '白饭', '白米饭'] },
  { id: 'f002', name: '糙米饭', emoji: '🌾', category: '主食-米饭', caloriesPer100g: 111, proteinPer100g: 2.6, fatPer100g: 0.9, carbsPer100g: 23.5, unit: 'g', defaultWeight: 200, keywords: ['糙米饭', '糙米'] },
  { id: 'f003', name: '杂粮饭', emoji: '🍚', category: '主食-米饭', caloriesPer100g: 120, proteinPer100g: 3.2, fatPer100g: 0.8, carbsPer100g: 24.5, unit: 'g', defaultWeight: 200, keywords: ['杂粮饭', '五谷饭'] },
  { id: 'f004', name: '蛋炒饭', emoji: '🍳', category: '主食-米饭', caloriesPer100g: 174, proteinPer100g: 4.8, fatPer100g: 6.5, carbsPer100g: 24.2, unit: 'g', defaultWeight: 300, keywords: ['蛋炒饭', '炒饭'] },
  { id: 'f005', name: '扬州炒饭', emoji: '🥘', category: '主食-米饭', caloriesPer100g: 195, proteinPer100g: 6.2, fatPer100g: 8.3, carbsPer100g: 24.0, unit: 'g', defaultWeight: 300, keywords: ['扬州炒饭'] },
  { id: 'f006', name: '煲仔饭', emoji: '🍲', category: '主食-米饭', caloriesPer100g: 210, proteinPer100g: 7.5, fatPer100g: 9.8, carbsPer100g: 22.5, unit: 'g', defaultWeight: 350, keywords: ['煲仔饭', '腊味煲仔饭'] },
  { id: 'f007', name: '饭团', emoji: '🍙', category: '主食-米饭', caloriesPer100g: 155, proteinPer100g: 3.2, fatPer100g: 2.8, carbsPer100g: 29.5, unit: 'g', defaultWeight: 150, keywords: ['饭团', '日式饭团', '三角饭团'] },
  { id: 'f008', name: '寿司', emoji: '🍣', category: '主食-米饭', caloriesPer100g: 145, proteinPer100g: 3.5, fatPer100g: 1.8, carbsPer100g: 28.0, unit: 'g', defaultWeight: 200, keywords: ['寿司', '紫菜包饭'] },
  { id: 'f009', name: '白面条(煮)', emoji: '🍜', category: '主食-面条', caloriesPer100g: 110, proteinPer100g: 3.4, fatPer100g: 0.4, carbsPer100g: 24.3, unit: 'g', defaultWeight: 250, keywords: ['面条', '白面', '挂面', '煮面条'] },
  { id: 'f010', name: '炸酱面', emoji: '🍝', category: '主食-面条', caloriesPer100g: 163, proteinPer100g: 5.8, fatPer100g: 5.2, carbsPer100g: 22.5, unit: 'g', defaultWeight: 300, keywords: ['炸酱面'] },
  { id: 'f011', name: '牛肉面', emoji: '🍜', category: '主食-面条', caloriesPer100g: 135, proteinPer100g: 7.2, fatPer100g: 3.8, carbsPer100g: 17.5, unit: 'g', defaultWeight: 400, keywords: ['牛肉面', '红烧牛肉面'] },
  { id: 'f012', name: '拉面', emoji: '🍜', category: '主食-面条', caloriesPer100g: 140, proteinPer100g: 6.5, fatPer100g: 4.2, carbsPer100g: 18.5, unit: 'g', defaultWeight: 400, keywords: ['拉面', '兰州拉面'] },
  { id: 'f013', name: '意大利面', emoji: '🍝', category: '主食-面条', caloriesPer100g: 157, proteinPer100g: 5.8, fatPer100g: 2.5, carbsPer100g: 30.0, unit: 'g', defaultWeight: 250, keywords: ['意大利面', '意面', '通心粉'] },
  { id: 'f014', name: '炒面', emoji: '🍜', category: '主食-面条', caloriesPer100g: 185, proteinPer100g: 5.5, fatPer100g: 7.8, carbsPer100g: 24.0, unit: 'g', defaultWeight: 300, keywords: ['炒面', '干炒牛河'] },
  { id: 'f015', name: '凉面', emoji: '🍜', category: '主食-面条', caloriesPer100g: 155, proteinPer100g: 4.2, fatPer100g: 4.5, carbsPer100g: 25.0, unit: 'g', defaultWeight: 250, keywords: ['凉面', '冷面'] },
  { id: 'f016', name: '米线', emoji: '🥣', category: '主食-面条', caloriesPer100g: 98, proteinPer100g: 2.2, fatPer100g: 0.3, carbsPer100g: 21.5, unit: 'g', defaultWeight: 300, keywords: ['米线', '过桥米线'] },
  { id: 'f017', name: '馒头', emoji: '🍞', category: '主食-面点', caloriesPer100g: 223, proteinPer100g: 7.0, fatPer100g: 1.1, carbsPer100g: 47.0, unit: 'g', defaultWeight: 100, keywords: ['馒头', '花卷'] },
  { id: 'f018', name: '包子(猪肉)', emoji: '🥟', category: '主食-面点', caloriesPer100g: 227, proteinPer100g: 7.2, fatPer100g: 7.5, carbsPer100g: 32.0, unit: 'g', defaultWeight: 100, keywords: ['包子', '肉包', '猪肉包'] },
  { id: 'f019', name: '小笼包', emoji: '🥟', category: '主食-面点', caloriesPer100g: 232, proteinPer100g: 8.0, fatPer100g: 8.5, carbsPer100g: 30.0, unit: 'g', defaultWeight: 150, keywords: ['小笼包', '灌汤包'] },
  { id: 'f020', name: '饺子(猪肉)', emoji: '🥟', category: '主食-面点', caloriesPer100g: 196, proteinPer100g: 7.8, fatPer100g: 6.5, carbsPer100g: 27.0, unit: 'g', defaultWeight: 200, keywords: ['饺子', '水饺'] },
  { id: 'f021', name: '饺子(素馅)', emoji: '🥟', category: '主食-面点', caloriesPer100g: 170, proteinPer100g: 5.5, fatPer100g: 4.2, carbsPer100g: 28.0, unit: 'g', defaultWeight: 200, keywords: ['素饺子', '素水饺'] },
  { id: 'f022', name: '馄饨', emoji: '🥣', category: '主食-面点', caloriesPer100g: 175, proteinPer100g: 7.0, fatPer100g: 5.5, carbsPer100g: 23.0, unit: 'g', defaultWeight: 250, keywords: ['馄饨', '抄手', '云吞'] },
  { id: 'f023', name: '烧麦', emoji: '🥟', category: '主食-面点', caloriesPer100g: 238, proteinPer100g: 8.5, fatPer100g: 9.2, carbsPer100g: 30.0, unit: 'g', defaultWeight: 120, keywords: ['烧麦', '烧卖'] },
  { id: 'f024', name: '煎饺', emoji: '🥟', category: '主食-面点', caloriesPer100g: 225, proteinPer100g: 7.5, fatPer100g: 9.0, carbsPer100g: 28.0, unit: 'g', defaultWeight: 200, keywords: ['煎饺', '锅贴'] },
  { id: 'f025', name: '全麦面包', emoji: '🍞', category: '主食-面包', caloriesPer100g: 246, proteinPer100g: 8.5, fatPer100g: 3.5, carbsPer100g: 45.0, unit: 'g', defaultWeight: 60, keywords: ['全麦面包', '面包'] },
  { id: 'f026', name: '白吐司', emoji: '🍞', category: '主食-面包', caloriesPer100g: 264, proteinPer100g: 7.5, fatPer100g: 3.5, carbsPer100g: 50.0, unit: 'g', defaultWeight: 40, keywords: ['吐司', '白面包', '切片面包'] },
  { id: 'f027', name: '法棍', emoji: '🥖', category: '主食-面包', caloriesPer100g: 278, proteinPer100g: 8.0, fatPer100g: 2.5, carbsPer100g: 55.0, unit: 'g', defaultWeight: 80, keywords: ['法棍', '法式面包'] },
  { id: 'f028', name: '牛角包', emoji: '🥐', category: '主食-面包', caloriesPer100g: 406, proteinPer100g: 8.0, fatPer100g: 21.0, carbsPer100g: 47.0, unit: 'g', defaultWeight: 60, keywords: ['牛角包', '可颂', '羊角面包'] },
  { id: 'f029', name: '红薯', emoji: '🍠', category: '主食-薯类', caloriesPer100g: 99, proteinPer100g: 1.1, fatPer100g: 0.2, carbsPer100g: 23.1, unit: 'g', defaultWeight: 200, keywords: ['红薯', '地瓜', '番薯'] },
  { id: 'f030', name: '紫薯', emoji: '🍠', category: '主食-薯类', caloriesPer100g: 82, proteinPer100g: 1.2, fatPer100g: 0.2, carbsPer100g: 18.5, unit: 'g', defaultWeight: 200, keywords: ['紫薯'] },
  { id: 'f031', name: '土豆(蒸)', emoji: '🥔', category: '主食-薯类', caloriesPer100g: 76, proteinPer100g: 2.0, fatPer100g: 0.2, carbsPer100g: 16.5, unit: 'g', defaultWeight: 200, keywords: ['土豆', '马铃薯', '洋芋'] },
  { id: 'f032', name: '炸薯条', emoji: '🍟', category: '主食-薯类', caloriesPer100g: 298, proteinPer100g: 3.5, fatPer100g: 15.0, carbsPer100g: 37.0, unit: 'g', defaultWeight: 120, keywords: ['薯条', '炸薯条'] },
  { id: 'f033', name: '烤红薯', emoji: '🍠', category: '主食-薯类', caloriesPer100g: 110, proteinPer100g: 1.3, fatPer100g: 0.3, carbsPer100g: 25.5, unit: 'g', defaultWeight: 250, keywords: ['烤红薯', '烤地瓜'] },
  { id: 'f034', name: '燕麦(干)', emoji: '🥣', category: '主食-谷物', caloriesPer100g: 367, proteinPer100g: 15.0, fatPer100g: 6.7, carbsPer100g: 61.6, unit: 'g', defaultWeight: 40, keywords: ['燕麦', '麦片', 'oatmeal'] },
  { id: 'f035', name: '玉米', emoji: '🌽', category: '主食-谷物', caloriesPer100g: 112, proteinPer100g: 4.0, fatPer100g: 1.2, carbsPer100g: 22.8, unit: 'g', defaultWeight: 200, keywords: ['玉米', '苞谷'] },
  { id: 'f036', name: '小米粥', emoji: '🥣', category: '主食-粥类', caloriesPer100g: 46, proteinPer100g: 1.4, fatPer100g: 0.7, carbsPer100g: 8.4, unit: 'g', defaultWeight: 300, keywords: ['小米粥', '小米稀饭'] },
  { id: 'f037', name: '白粥', emoji: '🥣', category: '主食-粥类', caloriesPer100g: 30, proteinPer100g: 0.8, fatPer100g: 0.1, carbsPer100g: 6.5, unit: 'g', defaultWeight: 300, keywords: ['白粥', '稀饭', '粥'] },
  { id: 'f038', name: '皮蛋瘦肉粥', emoji: '🥣', category: '主食-粥类', caloriesPer100g: 55, proteinPer100g: 3.2, fatPer100g: 1.8, carbsPer100g: 6.5, unit: 'g', defaultWeight: 350, keywords: ['皮蛋瘦肉粥'] },
  { id: 'f039', name: '八宝粥', emoji: '🥣', category: '主食-粥类', caloriesPer100g: 68, proteinPer100g: 2.0, fatPer100g: 0.8, carbsPer100g: 13.5, unit: 'g', defaultWeight: 300, keywords: ['八宝粥', '腊八粥'] },
  { id: 'f040', name: '鸡胸肉(水煮)', emoji: '🍗', category: '鸡肉-鸡胸', caloriesPer100g: 137, proteinPer100g: 28.0, fatPer100g: 2.2, carbsPer100g: 0.1, unit: 'g', defaultWeight: 150, keywords: ['鸡胸肉', '鸡胸', '水煮鸡胸'] },
  { id: 'f041', name: '鸡胸肉(煎)', emoji: '🍗', category: '鸡肉-鸡胸', caloriesPer100g: 165, proteinPer100g: 26.0, fatPer100g: 6.5, carbsPer100g: 0.5, unit: 'g', defaultWeight: 150, keywords: ['煎鸡胸', '香煎鸡胸'] },
  { id: 'f042', name: '鸡胸肉(烤)', emoji: '🍗', category: '鸡肉-鸡胸', caloriesPer100g: 148, proteinPer100g: 27.0, fatPer100g: 4.5, carbsPer100g: 0.5, unit: 'g', defaultWeight: 150, keywords: ['烤鸡胸', '烤箱鸡胸'] },
  { id: 'f043', name: '鸡腿肉(烤)', emoji: '🍗', category: '鸡肉-鸡腿', caloriesPer100g: 195, proteinPer100g: 24.0, fatPer100g: 10.0, carbsPer100g: 0, unit: 'g', defaultWeight: 150, keywords: ['烤鸡腿', '鸡腿'] },
  { id: 'f044', name: '鸡腿肉(炸)', emoji: '🍗', category: '鸡肉-鸡腿', caloriesPer100g: 280, proteinPer100g: 20.0, fatPer100g: 18.5, carbsPer100g: 10.0, unit: 'g', defaultWeight: 150, keywords: ['炸鸡腿', '肯德基鸡腿'] },
  { id: 'f045', name: '鸡腿肉(红烧)', emoji: '🍗', category: '鸡肉-鸡腿', caloriesPer100g: 210, proteinPer100g: 22.0, fatPer100g: 11.5, carbsPer100g: 4.5, unit: 'g', defaultWeight: 150, keywords: ['红烧鸡腿'] },
  { id: 'f046', name: '烤鸡', emoji: '🐔', category: '鸡肉-整鸡', caloriesPer100g: 190, proteinPer100g: 22.0, fatPer100g: 10.5, carbsPer100g: 1.0, unit: 'g', defaultWeight: 200, keywords: ['烤鸡', '烧鸡', '烤全鸡'] },
  { id: 'f047', name: '炸鸡', emoji: '🐔', category: '鸡肉-整鸡', caloriesPer100g: 279, proteinPer100g: 18.5, fatPer100g: 17.5, carbsPer100g: 13.5, unit: 'g', defaultWeight: 200, keywords: ['炸鸡', '炸全鸡', '韩式炸鸡'] },
  { id: 'f048', name: '盐焗鸡', emoji: '🐔', category: '鸡肉-整鸡', caloriesPer100g: 195, proteinPer100g: 24.0, fatPer100g: 9.5, carbsPer100g: 1.5, unit: 'g', defaultWeight: 150, keywords: ['盐焗鸡', '客家盐焗鸡'] },
  { id: 'f049', name: '白切鸡', emoji: '🐔', category: '鸡肉-整鸡', caloriesPer100g: 165, proteinPer100g: 25.0, fatPer100g: 7.0, carbsPer100g: 0.5, unit: 'g', defaultWeight: 150, keywords: ['白切鸡', '白斩鸡'] },
  { id: 'f050', name: '口水鸡', emoji: '🐔', category: '鸡肉-整鸡', caloriesPer100g: 205, proteinPer100g: 22.0, fatPer100g: 11.5, carbsPer100g: 3.5, unit: 'g', defaultWeight: 150, keywords: ['口水鸡'] },
  { id: 'f051', name: '叫花鸡', emoji: '🐔', category: '鸡肉-整鸡', caloriesPer100g: 200, proteinPer100g: 23.0, fatPer100g: 10.0, carbsPer100g: 2.5, unit: 'g', defaultWeight: 200, keywords: ['叫花鸡', '叫化鸡'] },
  { id: 'f052', name: '宫保鸡丁', emoji: '🥘', category: '鸡肉-菜品', caloriesPer100g: 197, proteinPer100g: 16.0, fatPer100g: 11.0, carbsPer100g: 8.5, unit: 'g', defaultWeight: 200, keywords: ['宫保鸡丁'] },
  { id: 'f053', name: '辣子鸡', emoji: '🌶️', category: '鸡肉-菜品', caloriesPer100g: 225, proteinPer100g: 18.0, fatPer100g: 14.0, carbsPer100g: 6.0, unit: 'g', defaultWeight: 200, keywords: ['辣子鸡', '重庆辣子鸡'] },
  { id: 'f054', name: '黄焖鸡', emoji: '🥘', category: '鸡肉-菜品', caloriesPer100g: 185, proteinPer100g: 17.0, fatPer100g: 9.5, carbsPer100g: 8.0, unit: 'g', defaultWeight: 250, keywords: ['黄焖鸡', '黄焖鸡米饭'] },
  { id: 'f055', name: '咖喱鸡', emoji: '🍛', category: '鸡肉-菜品', caloriesPer100g: 175, proteinPer100g: 15.0, fatPer100g: 8.5, carbsPer100g: 10.5, unit: 'g', defaultWeight: 250, keywords: ['咖喱鸡', '咖喱鸡肉'] },
  { id: 'f056', name: '大盘鸡', emoji: '🥘', category: '鸡肉-菜品', caloriesPer100g: 168, proteinPer100g: 14.0, fatPer100g: 8.0, carbsPer100g: 11.0, unit: 'g', defaultWeight: 300, keywords: ['大盘鸡', '新疆大盘鸡'] },
  { id: 'f057', name: '鸡米花', emoji: '🍗', category: '鸡肉-小吃', caloriesPer100g: 295, proteinPer100g: 16.0, fatPer100g: 18.0, carbsPer100g: 18.0, unit: 'g', defaultWeight: 100, keywords: ['鸡米花', '爆米花鸡'] },
  { id: 'f058', name: '鸡排', emoji: '🍖', category: '鸡肉-小吃', caloriesPer100g: 265, proteinPer100g: 18.0, fatPer100g: 15.0, carbsPer100g: 13.0, unit: 'g', defaultWeight: 200, keywords: ['鸡排', '大鸡排', '炸鸡排'] },
  { id: 'f059', name: '鸡翅(烤)', emoji: '🍗', category: '鸡肉-鸡翅', caloriesPer100g: 194, proteinPer100g: 22.0, fatPer100g: 10.5, carbsPer100g: 1.5, unit: 'g', defaultWeight: 120, keywords: ['烤鸡翅', '鸡翅'] },
  { id: 'f060', name: '鸡翅(炸)', emoji: '🍗', category: '鸡肉-鸡翅', caloriesPer100g: 255, proteinPer100g: 18.0, fatPer100g: 16.0, carbsPer100g: 10.0, unit: 'g', defaultWeight: 120, keywords: ['炸鸡翅'] },
  { id: 'f061', name: '可乐鸡翅', emoji: '🍗', category: '鸡肉-鸡翅', caloriesPer100g: 210, proteinPer100g: 19.0, fatPer100g: 10.0, carbsPer100g: 8.5, unit: 'g', defaultWeight: 150, keywords: ['可乐鸡翅'] },
  { id: 'f062', name: '鸡爪', emoji: '🍗', category: '鸡肉-其他', caloriesPer100g: 254, proteinPer100g: 23.9, fatPer100g: 16.4, carbsPer100g: 2.7, unit: 'g', defaultWeight: 150, keywords: ['鸡爪', '凤爪', '泡椒凤爪'] },
  { id: 'f063', name: '鸡心', emoji: '🍗', category: '鸡肉-其他', caloriesPer100g: 172, proteinPer100g: 15.9, fatPer100g: 10.5, carbsPer100g: 2.5, unit: 'g', defaultWeight: 80, keywords: ['鸡心', '烤鸡心'] },
  { id: 'f064', name: '鸡肝', emoji: '🍗', category: '鸡肉-其他', caloriesPer100g: 121, proteinPer100g: 16.7, fatPer100g: 4.5, carbsPer100g: 2.8, unit: 'g', defaultWeight: 80, keywords: ['鸡肝'] },
  { id: 'f065', name: '鸡胗', emoji: '🍗', category: '鸡肉-其他', caloriesPer100g: 118, proteinPer100g: 19.2, fatPer100g: 2.8, carbsPer100g: 4.0, unit: 'g', defaultWeight: 80, keywords: ['鸡胗', '鸡肫'] },
  { id: 'f066', name: '猪瘦肉(炒)', emoji: '🥩', category: '猪肉-瘦肉', caloriesPer100g: 143, proteinPer100g: 20.3, fatPer100g: 6.2, carbsPer100g: 1.5, unit: 'g', defaultWeight: 100, keywords: ['猪瘦肉', '瘦猪肉', '猪肉'] },
  { id: 'f067', name: '红烧肉', emoji: '🥘', category: '猪肉-五花肉', caloriesPer100g: 337, proteinPer100g: 13.0, fatPer100g: 30.0, carbsPer100g: 3.5, unit: 'g', defaultWeight: 150, keywords: ['红烧肉', '东坡肉'] },
  { id: 'f068', name: '回锅肉', emoji: '🥘', category: '猪肉-五花肉', caloriesPer100g: 295, proteinPer100g: 14.0, fatPer100g: 24.0, carbsPer100g: 6.5, unit: 'g', defaultWeight: 150, keywords: ['回锅肉'] },
  { id: 'f069', name: '糖醋排骨', emoji: '🍖', category: '猪肉-排骨', caloriesPer100g: 265, proteinPer100g: 15.0, fatPer100g: 16.0, carbsPer100g: 14.5, unit: 'g', defaultWeight: 200, keywords: ['糖醋排骨', '排骨'] },
  { id: 'f070', name: '红烧排骨', emoji: '🍖', category: '猪肉-排骨', caloriesPer100g: 245, proteinPer100g: 16.0, fatPer100g: 15.5, carbsPer100g: 7.0, unit: 'g', defaultWeight: 200, keywords: ['红烧排骨'] },
  { id: 'f071', name: '排骨汤', emoji: '🥣', category: '猪肉-排骨', caloriesPer100g: 55, proteinPer100g: 4.5, fatPer100g: 2.5, carbsPer100g: 3.5, unit: 'g', defaultWeight: 300, keywords: ['排骨汤', '猪骨汤'] },
  { id: 'f072', name: '猪排(煎)', emoji: '🥩', category: '猪肉-排骨', caloriesPer100g: 210, proteinPer100g: 22.0, fatPer100g: 12.0, carbsPer100g: 2.0, unit: 'g', defaultWeight: 150, keywords: ['猪排', '煎猪排'] },
  { id: 'f073', name: '炸猪排', emoji: '🥩', category: '猪肉-排骨', caloriesPer100g: 285, proteinPer100g: 18.0, fatPer100g: 18.0, carbsPer100g: 12.0, unit: 'g', defaultWeight: 150, keywords: ['炸猪排', '日式炸猪排'] },
  { id: 'f074', name: '鱼香肉丝', emoji: '🥘', category: '猪肉-菜品', caloriesPer100g: 175, proteinPer100g: 12.0, fatPer100g: 10.5, carbsPer100g: 9.0, unit: 'g', defaultWeight: 200, keywords: ['鱼香肉丝'] },
  { id: 'f075', name: '京酱肉丝', emoji: '🥘', category: '猪肉-菜品', caloriesPer100g: 195, proteinPer100g: 14.0, fatPer100g: 12.0, carbsPer100g: 7.5, unit: 'g', defaultWeight: 200, keywords: ['京酱肉丝'] },
  { id: 'f076', name: '锅包肉', emoji: '🥘', category: '猪肉-菜品', caloriesPer100g: 255, proteinPer100g: 13.0, fatPer100g: 15.0, carbsPer100g: 18.0, unit: 'g', defaultWeight: 200, keywords: ['锅包肉'] },
  { id: 'f077', name: '腊肉', emoji: '🥓', category: '猪肉-加工', caloriesPer100g: 492, proteinPer100g: 15.0, fatPer100g: 48.0, carbsPer100g: 1.5, unit: 'g', defaultWeight: 50, keywords: ['腊肉', '熏肉'] },
  { id: 'f078', name: '火腿', emoji: '🥓', category: '猪肉-加工', caloriesPer100g: 330, proteinPer100g: 16.0, fatPer100g: 27.4, carbsPer100g: 4.9, unit: 'g', defaultWeight: 50, keywords: ['火腿', '金华火腿'] },
  { id: 'f079', name: '香肠', emoji: '🌭', category: '猪肉-加工', caloriesPer100g: 508, proteinPer100g: 24.1, fatPer100g: 40.7, carbsPer100g: 11.2, unit: 'g', defaultWeight: 50, keywords: ['香肠', '腊肠', '烤肠'] },
  { id: 'f080', name: '培根', emoji: '🥓', category: '猪肉-加工', caloriesPer100g: 541, proteinPer100g: 8.9, fatPer100g: 55.0, carbsPer100g: 2.5, unit: 'g', defaultWeight: 30, keywords: ['培根', '烟肉', 'bacon'] },
  { id: 'f081', name: '猪肝', emoji: '🥩', category: '猪肉-内脏', caloriesPer100g: 129, proteinPer100g: 19.3, fatPer100g: 3.5, carbsPer100g: 5.0, unit: 'g', defaultWeight: 80, keywords: ['猪肝'] },
  { id: 'f082', name: '肥肠', emoji: '🥩', category: '猪肉-内脏', caloriesPer100g: 165, proteinPer100g: 12.0, fatPer100g: 11.5, carbsPer100g: 4.5, unit: 'g', defaultWeight: 100, keywords: ['肥肠', '猪大肠', '干锅肥肠'] },
  { id: 'f083', name: '牛肉(瘦/炒)', emoji: '🥩', category: '牛肉-瘦肉', caloriesPer100g: 125, proteinPer100g: 19.9, fatPer100g: 4.2, carbsPer100g: 2.0, unit: 'g', defaultWeight: 150, keywords: ['牛肉', '瘦牛肉', '炒牛肉'] },
  { id: 'f084', name: '牛排(煎)', emoji: '🥩', category: '牛肉-牛排', caloriesPer100g: 190, proteinPer100g: 22.0, fatPer100g: 10.0, carbsPer100g: 0.5, unit: 'g', defaultWeight: 200, keywords: ['牛排', '煎牛排', 'steak'] },
  { id: 'f085', name: '烤牛排', emoji: '🥩', category: '牛肉-牛排', caloriesPer100g: 175, proteinPer100g: 23.5, fatPer100g: 8.0, carbsPer100g: 0.5, unit: 'g', defaultWeight: 200, keywords: ['烤牛排'] },
  { id: 'f086', name: '水煮牛肉', emoji: '🥘', category: '牛肉-菜品', caloriesPer100g: 165, proteinPer100g: 16.0, fatPer100g: 9.5, carbsPer100g: 4.0, unit: 'g', defaultWeight: 200, keywords: ['水煮牛肉'] },
  { id: 'f087', name: '番茄炖牛腩', emoji: '🥘', category: '牛肉-菜品', caloriesPer100g: 135, proteinPer100g: 14.0, fatPer100g: 6.5, carbsPer100g: 6.5, unit: 'g', defaultWeight: 250, keywords: ['番茄牛腩', '炖牛腩'] },
  { id: 'f088', name: '牛肉干', emoji: '🥩', category: '牛肉-加工', caloriesPer100g: 550, proteinPer100g: 45.6, fatPer100g: 40.0, carbsPer100g: 1.5, unit: 'g', defaultWeight: 30, keywords: ['牛肉干', '风干牛肉'] },
  { id: 'f089', name: '酱牛肉', emoji: '🥩', category: '牛肉-加工', caloriesPer100g: 165, proteinPer100g: 25.0, fatPer100g: 5.5, carbsPer100g: 4.0, unit: 'g', defaultWeight: 100, keywords: ['酱牛肉', '卤牛肉'] },
  { id: 'f090', name: '肥牛卷', emoji: '🥩', category: '牛肉-火锅', caloriesPer100g: 218, proteinPer100g: 16.0, fatPer100g: 16.5, carbsPer100g: 0.5, unit: 'g', defaultWeight: 150, keywords: ['肥牛', '肥牛卷', '火锅肥牛'] },
  { id: 'f091', name: '羊肉(瘦)', emoji: '🥩', category: '羊肉', caloriesPer100g: 141, proteinPer100g: 19.0, fatPer100g: 6.5, carbsPer100g: 0, unit: 'g', defaultWeight: 150, keywords: ['羊肉', '瘦羊肉'] },
  { id: 'f092', name: '烤羊排', emoji: '🥩', category: '羊肉', caloriesPer100g: 225, proteinPer100g: 18.0, fatPer100g: 16.0, carbsPer100g: 1.0, unit: 'g', defaultWeight: 200, keywords: ['烤羊排', '羊排'] },
  { id: 'f093', name: '羊肉串', emoji: '🍢', category: '羊肉', caloriesPer100g: 217, proteinPer100g: 17.0, fatPer100g: 14.5, carbsPer100g: 2.5, unit: 'g', defaultWeight: 80, keywords: ['羊肉串', '烤羊肉串'] },
  { id: 'f094', name: '涮羊肉', emoji: '🥘', category: '羊肉', caloriesPer100g: 145, proteinPer100g: 20.0, fatPer100g: 6.0, carbsPer100g: 0.5, unit: 'g', defaultWeight: 150, keywords: ['涮羊肉', '羊肉片'] },
  { id: 'f095', name: '三文鱼(生)', emoji: '🐟', category: '鱼类-三文鱼', caloriesPer100g: 139, proteinPer100g: 17.2, fatPer100g: 7.8, carbsPer100g: 0, unit: 'g', defaultWeight: 120, keywords: ['三文鱼', '鲑鱼', 'salmon', '刺身'] },
  { id: 'f096', name: '三文鱼(煎)', emoji: '🐟', category: '鱼类-三文鱼', caloriesPer100g: 185, proteinPer100g: 20.0, fatPer100g: 10.5, carbsPer100g: 0.5, unit: 'g', defaultWeight: 120, keywords: ['煎三文鱼', '香煎三文鱼'] },
  { id: 'f097', name: '三文鱼(烤)', emoji: '🐟', category: '鱼类-三文鱼', caloriesPer100g: 175, proteinPer100g: 21.0, fatPer100g: 9.0, carbsPer100g: 0.5, unit: 'g', defaultWeight: 120, keywords: ['烤三文鱼'] },
  { id: 'f098', name: '鳕鱼(蒸)', emoji: '🐟', category: '鱼类-白鱼', caloriesPer100g: 88, proteinPer100g: 20.4, fatPer100g: 0.6, carbsPer100g: 0, unit: 'g', defaultWeight: 150, keywords: ['鳕鱼', '银鳕鱼', '蒸鳕鱼'] },
  { id: 'f099', name: '鲈鱼(清蒸)', emoji: '🐟', category: '鱼类-白鱼', caloriesPer100g: 105, proteinPer100g: 18.6, fatPer100g: 3.1, carbsPer100g: 0, unit: 'g', defaultWeight: 200, keywords: ['鲈鱼', '清蒸鲈鱼'] },
  { id: 'f100', name: '带鱼(红烧)', emoji: '🐟', category: '鱼类-白鱼', caloriesPer100g: 155, proteinPer100g: 16.5, fatPer100g: 8.5, carbsPer100g: 2.0, unit: 'g', defaultWeight: 150, keywords: ['带鱼', '红烧带鱼'] },
  { id: 'f101', name: '黄花鱼(红烧)', emoji: '🐟', category: '鱼类-白鱼', caloriesPer100g: 140, proteinPer100g: 17.5, fatPer100g: 6.5, carbsPer100g: 1.5, unit: 'g', defaultWeight: 150, keywords: ['黄花鱼', '红烧黄花鱼'] },
  { id: 'f102', name: '秋刀鱼(烤)', emoji: '🐟', category: '鱼类-青鱼', caloriesPer100g: 230, proteinPer100g: 18.0, fatPer100g: 17.0, carbsPer100g: 0, unit: 'g', defaultWeight: 120, keywords: ['秋刀鱼', '烤秋刀鱼'] },
  { id: 'f103', name: '沙丁鱼(罐头)', emoji: '🐟', category: '鱼类-青鱼', caloriesPer100g: 208, proteinPer100g: 19.5, fatPer100g: 13.5, carbsPer100g: 0.5, unit: 'g', defaultWeight: 80, keywords: ['沙丁鱼', '沙丁鱼罐头'] },
  { id: 'f104', name: '金枪鱼(罐头)', emoji: '🐟', category: '鱼类-青鱼', caloriesPer100g: 116, proteinPer100g: 25.5, fatPer100g: 1.0, carbsPer100g: 0, unit: 'g', defaultWeight: 80, keywords: ['金枪鱼', '吞拿鱼', 'tuna'] },
  { id: 'f105', name: '烤鱼', emoji: '🐟', category: '鱼类-其他', caloriesPer100g: 165, proteinPer100g: 18.0, fatPer100g: 8.5, carbsPer100g: 3.5, unit: 'g', defaultWeight: 200, keywords: ['烤鱼', '万州烤鱼'] },
  { id: 'f106', name: '水煮鱼', emoji: '🐟', category: '鱼类-其他', caloriesPer100g: 155, proteinPer100g: 16.0, fatPer100g: 9.0, carbsPer100g: 2.5, unit: 'g', defaultWeight: 250, keywords: ['水煮鱼', '酸菜鱼'] },
  { id: 'f107', name: '虾仁(水煮)', emoji: '🦐', category: '虾类', caloriesPer100g: 87, proteinPer100g: 18.6, fatPer100g: 0.8, carbsPer100g: 0.5, unit: 'g', defaultWeight: 100, keywords: ['虾仁', '虾', 'shrimp'] },
  { id: 'f108', name: '大虾(油焖)', emoji: '🦐', category: '虾类', caloriesPer100g: 155, proteinPer100g: 16.0, fatPer100g: 8.5, carbsPer100g: 2.5, unit: 'g', defaultWeight: 150, keywords: ['油焖大虾', '大虾', '对虾'] },
  { id: 'f109', name: '炸虾', emoji: '🦐', category: '虾类', caloriesPer100g: 215, proteinPer100g: 15.0, fatPer100g: 13.0, carbsPer100g: 10.0, unit: 'g', defaultWeight: 100, keywords: ['炸虾', '天妇罗虾'] },
  { id: 'f110', name: '小龙虾', emoji: '🦞', category: '虾类', caloriesPer100g: 93, proteinPer100g: 14.8, fatPer100g: 3.2, carbsPer100g: 0.5, unit: 'g', defaultWeight: 200, keywords: ['小龙虾', '麻辣小龙虾', '龙虾'] },
  { id: 'f111', name: '螃蟹(清蒸)', emoji: '🦀', category: '蟹类', caloriesPer100g: 95, proteinPer100g: 13.8, fatPer100g: 2.3, carbsPer100g: 4.7, unit: 'g', defaultWeight: 200, keywords: ['螃蟹', '大闸蟹', '清蒸蟹'] },
  { id: 'f112', name: '香辣蟹', emoji: '🦀', category: '蟹类', caloriesPer100g: 155, proteinPer100g: 12.0, fatPer100g: 9.5, carbsPer100g: 5.5, unit: 'g', defaultWeight: 200, keywords: ['香辣蟹', '避风塘炒蟹'] },
  { id: 'f113', name: '鸡蛋(煮)', emoji: '🥚', category: '蛋类-鸡蛋', caloriesPer100g: 144, proteinPer100g: 13.3, fatPer100g: 8.8, carbsPer100g: 2.8, unit: 'g', defaultWeight: 60, keywords: ['鸡蛋', '煮鸡蛋', '水煮蛋', '白煮蛋'] },
  { id: 'f114', name: '煎蛋', emoji: '🥚', category: '蛋类-鸡蛋', caloriesPer100g: 199, proteinPer100g: 13.5, fatPer100g: 14.5, carbsPer100g: 2.5, unit: 'g', defaultWeight: 60, keywords: ['煎蛋', '荷包蛋', '太阳蛋'] },
  { id: 'f115', name: '炒鸡蛋', emoji: '🥚', category: '蛋类-鸡蛋', caloriesPer100g: 185, proteinPer100g: 12.5, fatPer100g: 13.0, carbsPer100g: 3.0, unit: 'g', defaultWeight: 80, keywords: ['炒鸡蛋', '番茄炒蛋'] },
  { id: 'f116', name: '茶叶蛋', emoji: '🥚', category: '蛋类-鸡蛋', caloriesPer100g: 151, proteinPer100g: 13.0, fatPer100g: 9.5, carbsPer100g: 3.0, unit: 'g', defaultWeight: 60, keywords: ['茶叶蛋'] },
  { id: 'f117', name: '蒸蛋(鸡蛋羹)', emoji: '🥚', category: '蛋类-鸡蛋', caloriesPer100g: 75, proteinPer100g: 7.0, fatPer100g: 4.0, carbsPer100g: 2.5, unit: 'g', defaultWeight: 120, keywords: ['蒸蛋', '鸡蛋羹', '水蒸蛋', '蛋羹'] },
  { id: 'f118', name: '咸鸭蛋', emoji: '🥚', category: '蛋类-其他', caloriesPer100g: 190, proteinPer100g: 12.7, fatPer100g: 12.7, carbsPer100g: 4.7, unit: 'g', defaultWeight: 60, keywords: ['咸鸭蛋', '咸蛋'] },
  { id: 'f119', name: '皮蛋', emoji: '🥚', category: '蛋类-其他', caloriesPer100g: 171, proteinPer100g: 14.2, fatPer100g: 10.7, carbsPer100g: 4.5, unit: 'g', defaultWeight: 50, keywords: ['皮蛋', '松花蛋'] },
  { id: 'f120', name: '牛奶(全脂)', emoji: '🥛', category: '奶类-牛奶', caloriesPer100g: 54, proteinPer100g: 3.0, fatPer100g: 3.2, carbsPer100g: 3.4, unit: 'ml', defaultWeight: 250, keywords: ['牛奶', '全脂牛奶', '纯牛奶'] },
  { id: 'f121', name: '牛奶(脱脂)', emoji: '🥛', category: '奶类-牛奶', caloriesPer100g: 34, proteinPer100g: 3.4, fatPer100g: 0.1, carbsPer100g: 5.0, unit: 'ml', defaultWeight: 250, keywords: ['脱脂牛奶', '脱脂奶'] },
  { id: 'f122', name: '酸奶(原味)', emoji: '🥛', category: '奶类-酸奶', caloriesPer100g: 72, proteinPer100g: 2.5, fatPer100g: 2.7, carbsPer100g: 9.3, unit: 'g', defaultWeight: 200, keywords: ['酸奶', '原味酸奶'] },
  { id: 'f123', name: '酸奶(低脂)', emoji: '🥛', category: '奶类-酸奶', caloriesPer100g: 57, proteinPer100g: 3.5, fatPer100g: 1.0, carbsPer100g: 7.5, unit: 'g', defaultWeight: 200, keywords: ['低脂酸奶', '希腊酸奶'] },
  { id: 'f124', name: '希腊酸奶', emoji: '🥛', category: '奶类-酸奶', caloriesPer100g: 97, proteinPer100g: 9.0, fatPer100g: 5.0, carbsPer100g: 3.6, unit: 'g', defaultWeight: 150, keywords: ['希腊酸奶', 'Greek yogurt'] },
  { id: 'f125', name: '奶酪', emoji: '🧀', category: '奶类-奶酪', caloriesPer100g: 328, proteinPer100g: 20.0, fatPer100g: 25.0, carbsPer100g: 6.5, unit: 'g', defaultWeight: 30, keywords: ['奶酪', '芝士', 'cheese'] },
  { id: 'f126', name: '奶油', emoji: '🧈', category: '奶类-其他', caloriesPer100g: 309, proteinPer100g: 2.1, fatPer100g: 33.0, carbsPer100g: 3.4, unit: 'g', defaultWeight: 15, keywords: ['奶油', '鲜奶油'] },
  { id: 'f127', name: '黄油', emoji: '🧈', category: '奶类-其他', caloriesPer100g: 717, proteinPer100g: 1.4, fatPer100g: 81.1, carbsPer100g: 0, unit: 'g', defaultWeight: 10, keywords: ['黄油', '牛油', 'butter'] },
  { id: 'f128', name: '豆腐(老/北)', emoji: '🥡', category: '豆制品-豆腐', caloriesPer100g: 116, proteinPer100g: 8.1, fatPer100g: 3.7, carbsPer100g: 4.2, unit: 'g', defaultWeight: 150, keywords: ['豆腐', '老豆腐', '北豆腐'] },
  { id: 'f129', name: '豆腐(嫩/南)', emoji: '🥡', category: '豆制品-豆腐', caloriesPer100g: 50, proteinPer100g: 5.0, fatPer100g: 2.5, carbsPer100g: 2.8, unit: 'g', defaultWeight: 150, keywords: ['嫩豆腐', '内酯豆腐', '南豆腐'] },
  { id: 'f130', name: '麻婆豆腐', emoji: '🥘', category: '豆制品-豆腐', caloriesPer100g: 125, proteinPer100g: 8.0, fatPer100g: 7.5, carbsPer100g: 5.5, unit: 'g', defaultWeight: 200, keywords: ['麻婆豆腐'] },
  { id: 'f131', name: '豆腐皮', emoji: '🥡', category: '豆制品-其他', caloriesPer100g: 409, proteinPer100g: 44.6, fatPer100g: 17.4, carbsPer100g: 18.8, unit: 'g', defaultWeight: 30, keywords: ['豆腐皮', '千张', '百叶'] },
  { id: 'f132', name: '腐竹', emoji: '🥡', category: '豆制品-其他', caloriesPer100g: 461, proteinPer100g: 44.6, fatPer100g: 21.7, carbsPer100g: 22.3, unit: 'g', defaultWeight: 25, keywords: ['腐竹'] },
  { id: 'f133', name: '豆浆(无糖)', emoji: '🥛', category: '豆制品-饮品', caloriesPer100g: 31, proteinPer100g: 3.0, fatPer100g: 1.6, carbsPer100g: 1.2, unit: 'ml', defaultWeight: 300, keywords: ['豆浆', '无糖豆浆'] },
  { id: 'f134', name: '豆浆(加糖)', emoji: '🥛', category: '豆制品-饮品', caloriesPer100g: 48, proteinPer100g: 2.8, fatPer100g: 1.5, carbsPer100g: 6.5, unit: 'ml', defaultWeight: 300, keywords: ['甜豆浆'] },
  { id: 'f135', name: '毛豆', emoji: '🫘', category: '豆制品-其他', caloriesPer100g: 123, proteinPer100g: 13.1, fatPer100g: 5.0, carbsPer100g: 10.5, unit: 'g', defaultWeight: 100, keywords: ['毛豆', '煮毛豆'] },
  { id: 'f136', name: '西兰花', emoji: '🥦', category: '蔬菜-花菜类', caloriesPer100g: 33, proteinPer100g: 4.1, fatPer100g: 0.6, carbsPer100g: 4.3, unit: 'g', defaultWeight: 150, keywords: ['西兰花', '花椰菜'] },
  { id: 'f137', name: '花菜', emoji: '🥦', category: '蔬菜-花菜类', caloriesPer100g: 26, proteinPer100g: 2.1, fatPer100g: 0.2, carbsPer100g: 4.6, unit: 'g', defaultWeight: 150, keywords: ['花菜', '菜花', '白花菜'] },
  { id: 'f138', name: '菠菜', emoji: '🥬', category: '蔬菜-叶菜类', caloriesPer100g: 28, proteinPer100g: 2.6, fatPer100g: 0.3, carbsPer100g: 4.5, unit: 'g', defaultWeight: 150, keywords: ['菠菜'] },
  { id: 'f139', name: '生菜', emoji: '🥬', category: '蔬菜-叶菜类', caloriesPer100g: 15, proteinPer100g: 1.3, fatPer100g: 0.3, carbsPer100g: 2.1, unit: 'g', defaultWeight: 100, keywords: ['生菜'] },
  { id: 'f140', name: '白菜', emoji: '🥬', category: '蔬菜-叶菜类', caloriesPer100g: 20, proteinPer100g: 1.5, fatPer100g: 0.2, carbsPer100g: 3.6, unit: 'g', defaultWeight: 200, keywords: ['白菜', '大白菜'] },
  { id: 'f141', name: '小白菜', emoji: '🥬', category: '蔬菜-叶菜类', caloriesPer100g: 17, proteinPer100g: 1.5, fatPer100g: 0.3, carbsPer100g: 2.3, unit: 'g', defaultWeight: 150, keywords: ['小白菜', '青菜'] },
  { id: 'f142', name: '空心菜', emoji: '🥬', category: '蔬菜-叶菜类', caloriesPer100g: 25, proteinPer100g: 2.2, fatPer100g: 0.3, carbsPer100g: 3.9, unit: 'g', defaultWeight: 150, keywords: ['空心菜', '蕹菜'] },
  { id: 'f143', name: '油麦菜', emoji: '🥬', category: '蔬菜-叶菜类', caloriesPer100g: 15, proteinPer100g: 1.4, fatPer100g: 0.4, carbsPer100g: 1.5, unit: 'g', defaultWeight: 150, keywords: ['油麦菜'] },
  { id: 'f144', name: '芹菜', emoji: '🥬', category: '蔬菜-茎菜类', caloriesPer100g: 20, proteinPer100g: 1.2, fatPer100g: 0.2, carbsPer100g: 3.5, unit: 'g', defaultWeight: 100, keywords: ['芹菜'] },
  { id: 'f145', name: '番茄', emoji: '🍅', category: '蔬菜-果菜类', caloriesPer100g: 19, proteinPer100g: 0.9, fatPer100g: 0.2, carbsPer100g: 4.0, unit: 'g', defaultWeight: 150, keywords: ['番茄', '西红柿'] },
  { id: 'f146', name: '黄瓜', emoji: '🥒', category: '蔬菜-果菜类', caloriesPer100g: 16, proteinPer100g: 0.8, fatPer100g: 0.2, carbsPer100g: 2.9, unit: 'g', defaultWeight: 150, keywords: ['黄瓜'] },
  { id: 'f147', name: '茄子', emoji: '🍆', category: '蔬菜-果菜类', caloriesPer100g: 23, proteinPer100g: 1.1, fatPer100g: 0.2, carbsPer100g: 4.9, unit: 'g', defaultWeight: 150, keywords: ['茄子'] },
  { id: 'f148', name: '青椒', emoji: '🫑', category: '蔬菜-果菜类', caloriesPer100g: 22, proteinPer100g: 1.0, fatPer100g: 0.2, carbsPer100g: 4.2, unit: 'g', defaultWeight: 100, keywords: ['青椒', '甜椒', '彩椒'] },
  { id: 'f149', name: '苦瓜', emoji: '🥒', category: '蔬菜-果菜类', caloriesPer100g: 22, proteinPer100g: 1.0, fatPer100g: 0.1, carbsPer100g: 4.9, unit: 'g', defaultWeight: 150, keywords: ['苦瓜'] },
  { id: 'f150', name: '冬瓜', emoji: '🥒', category: '蔬菜-瓜类', caloriesPer100g: 12, proteinPer100g: 0.4, fatPer100g: 0.2, carbsPer100g: 2.4, unit: 'g', defaultWeight: 200, keywords: ['冬瓜'] },
  { id: 'f151', name: '南瓜', emoji: '🎃', category: '蔬菜-瓜类', caloriesPer100g: 23, proteinPer100g: 0.7, fatPer100g: 0.1, carbsPer100g: 5.3, unit: 'g', defaultWeight: 200, keywords: ['南瓜', '老南瓜'] },
  { id: 'f152', name: '丝瓜', emoji: '🥒', category: '蔬菜-瓜类', caloriesPer100g: 20, proteinPer100g: 1.0, fatPer100g: 0.2, carbsPer100g: 3.7, unit: 'g', defaultWeight: 150, keywords: ['丝瓜'] },
  { id: 'f153', name: '莲藕', emoji: '🥕', category: '蔬菜-根茎类', caloriesPer100g: 73, proteinPer100g: 2.0, fatPer100g: 0.2, carbsPer100g: 16.4, unit: 'g', defaultWeight: 150, keywords: ['莲藕', '藕'] },
  { id: 'f154', name: '胡萝卜', emoji: '🥕', category: '蔬菜-根茎类', caloriesPer100g: 37, proteinPer100g: 1.0, fatPer100g: 0.2, carbsPer100g: 8.1, unit: 'g', defaultWeight: 100, keywords: ['胡萝卜', '红萝卜'] },
  { id: 'f155', name: '白萝卜', emoji: '🥕', category: '蔬菜-根茎类', caloriesPer100g: 21, proteinPer100g: 0.9, fatPer100g: 0.1, carbsPer100g: 4.0, unit: 'g', defaultWeight: 150, keywords: ['白萝卜', '萝卜'] },
  { id: 'f156', name: '洋葱', emoji: '🧅', category: '蔬菜-根茎类', caloriesPer100g: 40, proteinPer100g: 1.1, fatPer100g: 0.2, carbsPer100g: 9.0, unit: 'g', defaultWeight: 80, keywords: ['洋葱'] },
  { id: 'f157', name: '蘑菇(白蘑菇)', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 27, proteinPer100g: 2.7, fatPer100g: 0.1, carbsPer100g: 4.1, unit: 'g', defaultWeight: 100, keywords: ['蘑菇', '白蘑菇', '洋菇', '口蘑'] },
  { id: 'f158', name: '香菇(鲜)', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 26, proteinPer100g: 2.2, fatPer100g: 0.3, carbsPer100g: 5.2, unit: 'g', defaultWeight: 80, keywords: ['香菇', '鲜香菇', '冬菇'] },
  { id: 'f159', name: '金针菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 32, proteinPer100g: 2.4, fatPer100g: 0.2, carbsPer100g: 6.0, unit: 'g', defaultWeight: 100, keywords: ['金针菇'] },
  { id: 'f160', name: '木耳(水发)', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 27, proteinPer100g: 1.5, fatPer100g: 0.2, carbsPer100g: 6.5, unit: 'g', defaultWeight: 50, keywords: ['木耳', '黑木耳', '云耳'] },
  { id: 'f282', name: '杏鲍菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 31, proteinPer100g: 1.3, fatPer100g: 0.1, carbsPer100g: 6.1, unit: 'g', defaultWeight: 120, keywords: ['杏鲍菇'] },
  { id: 'f283', name: '平菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 24, proteinPer100g: 2.1, fatPer100g: 0.3, carbsPer100g: 4.6, unit: 'g', defaultWeight: 100, keywords: ['平菇', '侧耳'] },
  { id: 'f284', name: '茶树菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 28, proteinPer100g: 2.6, fatPer100g: 0.2, carbsPer100g: 5.4, unit: 'g', defaultWeight: 80, keywords: ['茶树菇', '柱状田头菇'] },
  { id: 'f285', name: '草菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 27, proteinPer100g: 2.7, fatPer100g: 0.2, carbsPer100g: 4.3, unit: 'g', defaultWeight: 100, keywords: ['草菇', '兰花菇'] },
  { id: 'f286', name: '猴头菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 21, proteinPer100g: 2.0, fatPer100g: 0.2, carbsPer100g: 4.9, unit: 'g', defaultWeight: 80, keywords: ['猴头菇'] },
  { id: 'f287', name: '白玉菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 28, proteinPer100g: 1.8, fatPer100g: 0.1, carbsPer100g: 5.8, unit: 'g', defaultWeight: 100, keywords: ['白玉菇', '白雪菇'] },
  { id: 'f288', name: '蟹味菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 28, proteinPer100g: 2.1, fatPer100g: 0.2, carbsPer100g: 5.5, unit: 'g', defaultWeight: 100, keywords: ['蟹味菇', '真姬菇', '海鲜菇'] },
  { id: 'f289', name: '鸡腿菇', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 25, proteinPer100g: 2.5, fatPer100g: 0.3, carbsPer100g: 4.3, unit: 'g', defaultWeight: 100, keywords: ['鸡腿菇', '毛头鬼伞'] },
  { id: 'f290', name: '松茸(鲜)', emoji: '🍄', category: '菌菇-珍品', caloriesPer100g: 112, proteinPer100g: 2.4, fatPer100g: 2.2, carbsPer100g: 20.3, unit: 'g', defaultWeight: 50, keywords: ['松茸', '松口蘑'] },
  { id: 'f291', name: '牛肝菌(鲜)', emoji: '🍄', category: '菌菇-珍品', caloriesPer100g: 27, proteinPer100g: 3.5, fatPer100g: 0.3, carbsPer100g: 3.8, unit: 'g', defaultWeight: 80, keywords: ['牛肝菌'] },
  { id: 'f292', name: '竹荪(干)', emoji: '🍄', category: '菌菇-珍品', caloriesPer100g: 276, proteinPer100g: 19.4, fatPer100g: 2.8, carbsPer100g: 60.4, unit: 'g', defaultWeight: 10, keywords: ['竹荪', '竹参', '竹笙'], foodState: 'dry', sourceNote: '干菌菇含较多不可利用碳水/膳食纤维，普通宏量热量折算会高估；需绑定权威食物成分表来源' },
  { id: 'f293', name: '羊肚菌(干)', emoji: '🍄', category: '菌菇-珍品', caloriesPer100g: 295, proteinPer100g: 26.9, fatPer100g: 7.1, carbsPer100g: 53.7, unit: 'g', defaultWeight: 10, keywords: ['羊肚菌'], foodState: 'dry', sourceNote: '干菌菇含较多不可利用碳水/膳食纤维，普通宏量热量折算会高估；需绑定权威食物成分表来源' },
  { id: 'f294', name: '鸡枞菌(鲜)', emoji: '🍄', category: '菌菇-珍品', caloriesPer100g: 28, proteinPer100g: 3.2, fatPer100g: 0.2, carbsPer100g: 4.2, unit: 'g', defaultWeight: 80, keywords: ['鸡枞菌', '鸡枞'] },
  { id: 'f295', name: '松露', emoji: '🍄', category: '菌菇-珍品', caloriesPer100g: 31, proteinPer100g: 3.0, fatPer100g: 0.5, carbsPer100g: 4.5, unit: 'g', defaultWeight: 20, keywords: ['松露', '黑松露', '白松露', 'truffle'] },
  { id: 'f296', name: '银耳(水发)', emoji: '🍄', category: '菌菇-常见', caloriesPer100g: 21, proteinPer100g: 0.5, fatPer100g: 0.1, carbsPer100g: 5.0, unit: 'g', defaultWeight: 50, keywords: ['银耳', '白木耳', '雪耳'] },
  { id: 'f297', name: '香菇(干)', emoji: '🍄', category: '菌菇-干品', caloriesPer100g: 259, proteinPer100g: 20.0, fatPer100g: 1.2, carbsPer100g: 61.7, unit: 'g', defaultWeight: 10, keywords: ['干香菇', '花菇', '冬菇干'], foodState: 'dry', sourceNote: '干菌菇含较多不可利用碳水/膳食纤维，普通宏量热量折算会高估；需绑定权威食物成分表来源' },
  { id: 'f298', name: '木耳(干)', emoji: '🍄', category: '菌菇-干品', caloriesPer100g: 205, proteinPer100g: 12.1, fatPer100g: 1.5, carbsPer100g: 65.6, unit: 'g', defaultWeight: 10, keywords: ['干木耳', '黑木耳干'], foodState: 'dry', sourceNote: '干菌菇含较多不可利用碳水/膳食纤维，普通宏量热量折算会高估；需绑定权威食物成分表来源' },
  { id: 'f299', name: '茶树菇(干)', emoji: '🍄', category: '菌菇-干品', caloriesPer100g: 279, proteinPer100g: 23.1, fatPer100g: 3.3, carbsPer100g: 56.1, unit: 'g', defaultWeight: 10, keywords: ['干茶树菇'], foodState: 'dry', sourceNote: '干菌菇含较多不可利用碳水/膳食纤维，普通宏量热量折算会高估；需绑定权威食物成分表来源' },
  { id: 'f161', name: '海带', emoji: '🥬', category: '蔬菜-藻类', caloriesPer100g: 16, proteinPer100g: 1.2, fatPer100g: 0.1, carbsPer100g: 2.1, unit: 'g', defaultWeight: 50, keywords: ['海带', '昆布'] },
  { id: 'f162', name: '苹果', emoji: '🍎', category: '水果-常见', caloriesPer100g: 52, proteinPer100g: 0.2, fatPer100g: 0.1, carbsPer100g: 13.5, unit: 'g', defaultWeight: 200, keywords: ['苹果', 'apple'] },
  { id: 'f163', name: '香蕉', emoji: '🍌', category: '水果-常见', caloriesPer100g: 91, proteinPer100g: 1.4, fatPer100g: 0.2, carbsPer100g: 22.0, unit: 'g', defaultWeight: 120, keywords: ['香蕉', 'banana'] },
  { id: 'f164', name: '橙子', emoji: '🍊', category: '水果-常见', caloriesPer100g: 48, proteinPer100g: 0.8, fatPer100g: 0.2, carbsPer100g: 11.1, unit: 'g', defaultWeight: 200, keywords: ['橙子', '橘子', '柑橘'] },
  { id: 'f165', name: '葡萄', emoji: '🍇', category: '水果-常见', caloriesPer100g: 44, proteinPer100g: 0.5, fatPer100g: 0.2, carbsPer100g: 10.3, unit: 'g', defaultWeight: 150, keywords: ['葡萄'] },
  { id: 'f166', name: '西瓜', emoji: '🍉', category: '水果-瓜类', caloriesPer100g: 31, proteinPer100g: 0.5, fatPer100g: 0.1, carbsPer100g: 6.8, unit: 'g', defaultWeight: 300, keywords: ['西瓜'] },
  { id: 'f167', name: '哈密瓜', emoji: '🍈', category: '水果-瓜类', caloriesPer100g: 34, proteinPer100g: 0.5, fatPer100g: 0.1, carbsPer100g: 7.9, unit: 'g', defaultWeight: 250, keywords: ['哈密瓜', '蜜瓜'] },
  { id: 'f168', name: '草莓', emoji: '🍓', category: '水果-浆果', caloriesPer100g: 30, proteinPer100g: 1.0, fatPer100g: 0.2, carbsPer100g: 6.2, unit: 'g', defaultWeight: 150, keywords: ['草莓'] },
  { id: 'f169', name: '蓝莓', emoji: '🫐', category: '水果-浆果', caloriesPer100g: 57, proteinPer100g: 0.7, fatPer100g: 0.3, carbsPer100g: 14.5, unit: 'g', defaultWeight: 80, keywords: ['蓝莓', 'blueberry'] },
  { id: 'f170', name: '猕猴桃', emoji: '🥝', category: '水果-其他', caloriesPer100g: 56, proteinPer100g: 0.8, fatPer100g: 0.6, carbsPer100g: 11.9, unit: 'g', defaultWeight: 100, keywords: ['猕猴桃', '奇异果'] },
  { id: 'f171', name: '芒果', emoji: '🥭', category: '水果-热带', caloriesPer100g: 35, proteinPer100g: 0.6, fatPer100g: 0.2, carbsPer100g: 8.3, unit: 'g', defaultWeight: 200, keywords: ['芒果'] },
  { id: 'f172', name: '菠萝', emoji: '🍍', category: '水果-热带', caloriesPer100g: 41, proteinPer100g: 0.5, fatPer100g: 0.1, carbsPer100g: 10.8, unit: 'g', defaultWeight: 150, keywords: ['菠萝', '凤梨'] },
  { id: 'f173', name: '榴莲', emoji: '🥭', category: '水果-热带', caloriesPer100g: 147, proteinPer100g: 2.6, fatPer100g: 3.3, carbsPer100g: 28.3, unit: 'g', defaultWeight: 100, keywords: ['榴莲', 'durian'] },
  { id: 'f174', name: '牛油果', emoji: '🥑', category: '水果-其他', caloriesPer100g: 161, proteinPer100g: 2.0, fatPer100g: 15.3, carbsPer100g: 7.4, unit: 'g', defaultWeight: 80, keywords: ['牛油果', '鳄梨', 'avocado'] },
  { id: 'f175', name: '樱桃', emoji: '🍒', category: '水果-其他', caloriesPer100g: 46, proteinPer100g: 1.1, fatPer100g: 0.2, carbsPer100g: 10.2, unit: 'g', defaultWeight: 100, keywords: ['樱桃', '车厘子'] },
  { id: 'f176', name: '桃子', emoji: '🍑', category: '水果-核果', caloriesPer100g: 44, proteinPer100g: 0.8, fatPer100g: 0.1, carbsPer100g: 10.9, unit: 'g', defaultWeight: 200, keywords: ['桃子', '水蜜桃'] },
  { id: 'f177', name: '梨', emoji: '🍐', category: '水果-核果', caloriesPer100g: 44, proteinPer100g: 0.4, fatPer100g: 0.2, carbsPer100g: 11.0, unit: 'g', defaultWeight: 200, keywords: ['梨', '雪梨'] },
  { id: 'f241', name: '李子', emoji: '🍇', category: '水果-核果', caloriesPer100g: 38, proteinPer100g: 0.7, fatPer100g: 0.2, carbsPer100g: 8.7, unit: 'g', defaultWeight: 100, keywords: ['李子', '青李', '红李'] },
  { id: 'f242', name: '杏', emoji: '🍑', category: '水果-核果', caloriesPer100g: 38, proteinPer100g: 0.9, fatPer100g: 0.1, carbsPer100g: 9.0, unit: 'g', defaultWeight: 100, keywords: ['杏', '杏子'] },
  { id: 'f243', name: '杨梅', emoji: '🍒', category: '水果-核果', caloriesPer100g: 28, proteinPer100g: 0.8, fatPer100g: 0.2, carbsPer100g: 6.7, unit: 'g', defaultWeight: 100, keywords: ['杨梅'] },
  { id: 'f244', name: '枣(鲜)', emoji: '🍎', category: '水果-核果', caloriesPer100g: 125, proteinPer100g: 1.2, fatPer100g: 0.2, carbsPer100g: 30.5, unit: 'g', defaultWeight: 80, keywords: ['枣', '鲜枣', '冬枣', '红枣'] },
  { id: 'f245', name: '枣(干)', emoji: '🍎', category: '水果-核果', caloriesPer100g: 276, proteinPer100g: 2.1, fatPer100g: 0.4, carbsPer100g: 67.8, unit: 'g', defaultWeight: 30, keywords: ['干枣', '红枣干', '蜜枣'] },
  { id: 'f246', name: '柿子', emoji: '🍊', category: '水果-核果', caloriesPer100g: 74, proteinPer100g: 0.4, fatPer100g: 0.1, carbsPer100g: 18.5, unit: 'g', defaultWeight: 150, keywords: ['柿子', '柿饼'] },
  { id: 'f247', name: '荔枝', emoji: '🍇', category: '水果-热带', caloriesPer100g: 70, proteinPer100g: 0.9, fatPer100g: 0.2, carbsPer100g: 16.6, unit: 'g', defaultWeight: 150, keywords: ['荔枝', 'lychee'] },
  { id: 'f248', name: '龙眼(桂圆)', emoji: '🍇', category: '水果-热带', caloriesPer100g: 71, proteinPer100g: 1.2, fatPer100g: 0.1, carbsPer100g: 16.5, unit: 'g', defaultWeight: 100, keywords: ['龙眼', '桂圆', 'longan'] },
  { id: 'f249', name: '山竹', emoji: '🍇', category: '水果-热带', caloriesPer100g: 69, proteinPer100g: 0.4, fatPer100g: 0.2, carbsPer100g: 17.9, unit: 'g', defaultWeight: 150, keywords: ['山竹', 'mangosteen'] },
  { id: 'f250', name: '红毛丹', emoji: '🍇', category: '水果-热带', caloriesPer100g: 75, proteinPer100g: 0.8, fatPer100g: 0.5, carbsPer100g: 17.5, unit: 'g', defaultWeight: 100, keywords: ['红毛丹', 'rambutan'] },
  { id: 'f251', name: '百香果', emoji: '🍋', category: '水果-热带', caloriesPer100g: 56, proteinPer100g: 2.2, fatPer100g: 0.7, carbsPer100g: 11.2, unit: 'g', defaultWeight: 60, keywords: ['百香果', 'passion fruit'] },
  { id: 'f252', name: '木瓜', emoji: '🥭', category: '水果-热带', caloriesPer100g: 29, proteinPer100g: 0.5, fatPer100g: 0.1, carbsPer100g: 7.2, unit: 'g', defaultWeight: 200, keywords: ['木瓜', 'papaya'] },
  { id: 'f253', name: '椰子(肉)', emoji: '🥥', category: '水果-热带', caloriesPer100g: 241, proteinPer100g: 4.0, fatPer100g: 12.1, carbsPer100g: 31.3, unit: 'g', defaultWeight: 100, keywords: ['椰子', '椰肉', 'coconut'] },
  { id: 'f254', name: '椰子水', emoji: '🥥', category: '水果-热带', caloriesPer100g: 19, proteinPer100g: 0.7, fatPer100g: 0.2, carbsPer100g: 3.7, unit: 'ml', defaultWeight: 300, keywords: ['椰子水', '椰汁'] },
  { id: 'f255', name: '杨桃', emoji: '🍋', category: '水果-热带', caloriesPer100g: 29, proteinPer100g: 0.6, fatPer100g: 0.2, carbsPer100g: 7.4, unit: 'g', defaultWeight: 150, keywords: ['杨桃', 'star fruit'] },
  { id: 'f256', name: '火龙果(红心)', emoji: '🥝', category: '水果-热带', caloriesPer100g: 51, proteinPer100g: 1.1, fatPer100g: 0.2, carbsPer100g: 13.3, unit: 'g', defaultWeight: 200, keywords: ['火龙果', '红心火龙果', 'dragon fruit'] },
  { id: 'f257', name: '火龙果(白心)', emoji: '🥝', category: '水果-热带', caloriesPer100g: 42, proteinPer100g: 0.9, fatPer100g: 0.2, carbsPer100g: 10.0, unit: 'g', defaultWeight: 200, keywords: ['白心火龙果'] },
  { id: 'f258', name: '释迦果', emoji: '🍐', category: '水果-热带', caloriesPer100g: 94, proteinPer100g: 1.8, fatPer100g: 0.1, carbsPer100g: 23.6, unit: 'g', defaultWeight: 150, keywords: ['释迦果', '番荔枝', 'custard apple'] },
  { id: 'f259', name: '柚子', emoji: '🍊', category: '水果-柑橘类', caloriesPer100g: 42, proteinPer100g: 0.8, fatPer100g: 0.2, carbsPer100g: 9.5, unit: 'g', defaultWeight: 200, keywords: ['柚子', '沙田柚', '葡萄柚', 'grapefruit'] },
  { id: 'f260', name: '柠檬', emoji: '🍋', category: '水果-柑橘类', caloriesPer100g: 35, proteinPer100g: 1.0, fatPer100g: 0.2, carbsPer100g: 6.2, unit: 'g', defaultWeight: 50, keywords: ['柠檬', 'lemon'] },
  { id: 'f261', name: '金桔', emoji: '🍊', category: '水果-柑橘类', caloriesPer100g: 55, proteinPer100g: 1.0, fatPer100g: 0.2, carbsPer100g: 13.7, unit: 'g', defaultWeight: 50, keywords: ['金桔', '金橘'] },
  { id: 'f262', name: '青柠', emoji: '🍋', category: '水果-柑橘类', caloriesPer100g: 30, proteinPer100g: 0.7, fatPer100g: 0.2, carbsPer100g: 7.7, unit: 'g', defaultWeight: 30, keywords: ['青柠', 'lime'] },
  { id: 'f263', name: '枇杷', emoji: '🍑', category: '水果-其他', caloriesPer100g: 39, proteinPer100g: 0.8, fatPer100g: 0.2, carbsPer100g: 9.3, unit: 'g', defaultWeight: 150, keywords: ['枇杷'] },
  { id: 'f264', name: '桑葚', emoji: '🫐', category: '水果-浆果', caloriesPer100g: 47, proteinPer100g: 1.7, fatPer100g: 0.4, carbsPer100g: 9.7, unit: 'g', defaultWeight: 80, keywords: ['桑葚', '桑椹'] },
  { id: 'f265', name: '树莓', emoji: '🍓', category: '水果-浆果', caloriesPer100g: 52, proteinPer100g: 1.2, fatPer100g: 0.7, carbsPer100g: 11.9, unit: 'g', defaultWeight: 80, keywords: ['树莓', '覆盆子', 'raspberry'] },
  { id: 'f266', name: '黑莓', emoji: '🫐', category: '水果-浆果', caloriesPer100g: 43, proteinPer100g: 1.4, fatPer100g: 0.5, carbsPer100g: 9.6, unit: 'g', defaultWeight: 80, keywords: ['黑莓', 'blackberry'] },
  { id: 'f267', name: '蔓越莓', emoji: '🍒', category: '水果-浆果', caloriesPer100g: 46, proteinPer100g: 0.4, fatPer100g: 0.1, carbsPer100g: 12.2, unit: 'g', defaultWeight: 50, keywords: ['蔓越莓', 'cranberry'] },
  { id: 'f268', name: '葡萄柚(西柚)', emoji: '🍊', category: '水果-柑橘类', caloriesPer100g: 33, proteinPer100g: 0.7, fatPer100g: 0.1, carbsPer100g: 7.2, unit: 'g', defaultWeight: 200, keywords: ['西柚', '葡萄柚'] },
  { id: 'f269', name: '甘蔗', emoji: '🌽', category: '水果-其他', caloriesPer100g: 65, proteinPer100g: 0.4, fatPer100g: 0.1, carbsPer100g: 16.0, unit: 'g', defaultWeight: 200, keywords: ['甘蔗'] },
  { id: 'f270', name: '无花果', emoji: '🍐', category: '水果-其他', caloriesPer100g: 59, proteinPer100g: 1.5, fatPer100g: 0.1, carbsPer100g: 14.5, unit: 'g', defaultWeight: 80, keywords: ['无花果', 'fig'] },
  { id: 'f271', name: '石榴', emoji: '🍎', category: '水果-其他', caloriesPer100g: 63, proteinPer100g: 0.9, fatPer100g: 0.2, carbsPer100g: 14.5, unit: 'g', defaultWeight: 150, keywords: ['石榴', 'pomegranate'] },
  { id: 'f272', name: '猕猴桃(绿心)', emoji: '🥝', category: '水果-其他', caloriesPer100g: 56, proteinPer100g: 0.8, fatPer100g: 0.6, carbsPer100g: 11.9, unit: 'g', defaultWeight: 100, keywords: ['绿心猕猴桃'] },
  { id: 'f273', name: '猕猴桃(黄心)', emoji: '🥝', category: '水果-其他', caloriesPer100g: 61, proteinPer100g: 1.0, fatPer100g: 0.5, carbsPer100g: 14.2, unit: 'g', defaultWeight: 100, keywords: ['黄心猕猴桃', '金果'] },
  { id: 'f274', name: '圣女果', emoji: '🍅', category: '水果-其他', caloriesPer100g: 22, proteinPer100g: 1.0, fatPer100g: 0.2, carbsPer100g: 4.0, unit: 'g', defaultWeight: 150, keywords: ['圣女果', '小番茄', '樱桃番茄'] },
  { id: 'f300', name: '番石榴(红心)', emoji: '🍎', category: '水果-热带', caloriesPer100g: 46, proteinPer100g: 0.9, fatPer100g: 0.3, carbsPer100g: 10.5, unit: 'g', defaultWeight: 200, keywords: ['番石榴', '红心番石榴', '红心芭乐', 'guava', '红肉番石榴'] },
  { id: 'f301', name: '番石榴(白心)', emoji: '🍏', category: '水果-热带', caloriesPer100g: 38, proteinPer100g: 1.1, fatPer100g: 0.2, carbsPer100g: 8.5, unit: 'g', defaultWeight: 200, keywords: ['番石榴', '白心番石榴', '白心芭乐', 'guava', '白肉番石榴', '牛奶番石榴'] },
  { id: 'f276', name: '莲雾', emoji: '🍎', category: '水果-热带', caloriesPer100g: 25, proteinPer100g: 0.5, fatPer100g: 0.1, carbsPer100g: 5.8, unit: 'g', defaultWeight: 150, keywords: ['莲雾', '水蒲桃'] },
  { id: 'f277', name: '蛇果', emoji: '🍎', category: '水果-常见', caloriesPer100g: 55, proteinPer100g: 0.2, fatPer100g: 0.1, carbsPer100g: 14.0, unit: 'g', defaultWeight: 200, keywords: ['蛇果', '红蛇果'] },
  { id: 'f278', name: '提子', emoji: '🍇', category: '水果-常见', caloriesPer100g: 43, proteinPer100g: 0.5, fatPer100g: 0.2, carbsPer100g: 10.3, unit: 'g', defaultWeight: 150, keywords: ['提子', '青提', '红提'] },
  { id: 'f279', name: '哈密瓜(黄)', emoji: '🍈', category: '水果-瓜类', caloriesPer100g: 34, proteinPer100g: 0.5, fatPer100g: 0.1, carbsPer100g: 7.9, unit: 'g', defaultWeight: 250, keywords: ['黄金哈密瓜'] },
  { id: 'f280', name: '甜瓜', emoji: '🍈', category: '水果-瓜类', caloriesPer100g: 26, proteinPer100g: 0.4, fatPer100g: 0.1, carbsPer100g: 6.2, unit: 'g', defaultWeight: 250, keywords: ['甜瓜', '香瓜', '伊丽莎白瓜'] },
  { id: 'f281', name: '羊角蜜', emoji: '🍈', category: '水果-瓜类', caloriesPer100g: 28, proteinPer100g: 0.5, fatPer100g: 0.1, carbsPer100g: 6.5, unit: 'g', defaultWeight: 250, keywords: ['羊角蜜'] },
  { id: 'f178', name: '花生酱', emoji: '🥜', category: '坚果-酱类', caloriesPer100g: 594, proteinPer100g: 22.0, fatPer100g: 50.0, carbsPer100g: 20.0, unit: 'g', defaultWeight: 20, keywords: ['花生酱'] },
  { id: 'f179', name: '杏仁', emoji: '🥜', category: '坚果-常见', caloriesPer100g: 578, proteinPer100g: 21.0, fatPer100g: 50.0, carbsPer100g: 19.0, unit: 'g', defaultWeight: 25, keywords: ['杏仁', 'almond'] },
  { id: 'f180', name: '核桃', emoji: '🥜', category: '坚果-常见', caloriesPer100g: 627, proteinPer100g: 14.9, fatPer100g: 58.8, carbsPer100g: 19.1, unit: 'g', defaultWeight: 25, keywords: ['核桃'] },
  { id: 'f181', name: '腰果', emoji: '🥜', category: '坚果-常见', caloriesPer100g: 559, proteinPer100g: 17.3, fatPer100g: 36.7, carbsPer100g: 41.6, unit: 'g', defaultWeight: 25, keywords: ['腰果', 'cashew'] },
  { id: 'f182', name: '开心果', emoji: '🥜', category: '坚果-常见', caloriesPer100g: 562, proteinPer100g: 20.0, fatPer100g: 45.0, carbsPer100g: 28.0, unit: 'g', defaultWeight: 25, keywords: ['开心果', 'pistachio'] },
  { id: 'f183', name: '花生', emoji: '🥜', category: '坚果-常见', caloriesPer100g: 563, proteinPer100g: 24.8, fatPer100g: 44.3, carbsPer100g: 21.7, unit: 'g', defaultWeight: 30, keywords: ['花生', '落花生'] },
  { id: 'f184', name: '瓜子', emoji: '🌻', category: '坚果-常见', caloriesPer100g: 606, proteinPer100g: 23.9, fatPer100g: 49.9, carbsPer100g: 19.1, unit: 'g', defaultWeight: 30, keywords: ['瓜子', '葵花籽'] },
  { id: 'f185', name: '芝麻', emoji: '🥜', category: '坚果-其他', caloriesPer100g: 517, proteinPer100g: 19.1, fatPer100g: 46.1, carbsPer100g: 24.0, unit: 'g', defaultWeight: 10, keywords: ['芝麻', '黑芝麻', '白芝麻'] },
  { id: 'f186', name: '蛋白粉(乳清)', emoji: '💪', category: '补剂', caloriesPer100g: 375, proteinPer100g: 75.0, fatPer100g: 3.0, carbsPer100g: 10.0, unit: 'g', defaultWeight: 30, keywords: ['蛋白粉', '乳清蛋白', 'whey'] },
  { id: 'f187', name: '肌酸', emoji: '💪', category: '补剂', caloriesPer100g: 0, proteinPer100g: 0, fatPer100g: 0, carbsPer100g: 0, unit: 'g', defaultWeight: 5, keywords: ['肌酸', 'creatine'] },
  { id: 'f188', name: '可乐', emoji: '🥤', category: '饮品-碳酸', caloriesPer100g: 43, proteinPer100g: 0, fatPer100g: 0, carbsPer100g: 10.6, unit: 'ml', defaultWeight: 330, keywords: ['可乐', '碳酸饮料'] },
  { id: 'f189', name: '雪碧', emoji: '🥤', category: '饮品-碳酸', caloriesPer100g: 42, proteinPer100g: 0, fatPer100g: 0, carbsPer100g: 10.2, unit: 'ml', defaultWeight: 330, keywords: ['雪碧'] },
  { id: 'f190', name: '奶茶', emoji: '🧋', category: '饮品-茶饮', caloriesPer100g: 52, proteinPer100g: 0.8, fatPer100g: 1.4, carbsPer100g: 9.2, unit: 'ml', defaultWeight: 500, keywords: ['奶茶'] },
  { id: 'f191', name: '珍珠奶茶', emoji: '🧋', category: '饮品-茶饮', caloriesPer100g: 68, proteinPer100g: 1.0, fatPer100g: 1.8, carbsPer100g: 12.5, unit: 'ml', defaultWeight: 500, keywords: ['珍珠奶茶', '波霸奶茶'] },
  { id: 'f192', name: '绿茶(无糖)', emoji: '🍵', category: '饮品-茶饮', caloriesPer100g: 1, proteinPer100g: 0, fatPer100g: 0, carbsPer100g: 0, unit: 'ml', defaultWeight: 500, keywords: ['绿茶', '茶', '无糖茶'] },
  { id: 'f193', name: '咖啡(黑)', emoji: '☕', category: '饮品-咖啡', caloriesPer100g: 2, proteinPer100g: 0.1, fatPer100g: 0, carbsPer100g: 0.3, unit: 'ml', defaultWeight: 350, keywords: ['咖啡', '黑咖啡', '美式'] },
  { id: 'f194', name: '拿铁', emoji: '☕', category: '饮品-咖啡', caloriesPer100g: 42, proteinPer100g: 2.0, fatPer100g: 1.5, carbsPer100g: 5.5, unit: 'ml', defaultWeight: 350, keywords: ['拿铁', 'latte'] },
  { id: 'f195', name: '卡布奇诺', emoji: '☕', category: '饮品-咖啡', caloriesPer100g: 45, proteinPer100g: 2.2, fatPer100g: 2.0, carbsPer100g: 5.0, unit: 'ml', defaultWeight: 350, keywords: ['卡布奇诺', 'cappuccino'] },
  { id: 'f196', name: '摩卡', emoji: '☕', category: '饮品-咖啡', caloriesPer100g: 65, proteinPer100g: 2.5, fatPer100g: 2.8, carbsPer100g: 9.0, unit: 'ml', defaultWeight: 350, keywords: ['摩卡', 'mocha'] },
  { id: 'f197', name: '橙汁', emoji: '🧃', category: '饮品-果汁', caloriesPer100g: 45, proteinPer100g: 0.7, fatPer100g: 0.2, carbsPer100g: 10.4, unit: 'ml', defaultWeight: 250, keywords: ['橙汁', '鲜榨橙汁'] },
  { id: 'f198', name: '啤酒', emoji: '🍺', category: '饮品-酒精', caloriesPer100g: 32, proteinPer100g: 0.4, fatPer100g: 0, carbsPer100g: 3.3, unit: 'ml', defaultWeight: 500, keywords: ['啤酒', 'beer'] },
  { id: 'f199', name: '红酒', emoji: '🍷', category: '饮品-酒精', caloriesPer100g: 74, proteinPer100g: 0.1, fatPer100g: 0, carbsPer100g: 2.6, unit: 'ml', defaultWeight: 150, keywords: ['红酒', '葡萄酒', 'wine'], foodState: 'alcoholic beverage', sourceNote: '酒类热量主要来自乙醇，普通蛋白/脂肪/碳水折算不会反映全部热量；需绑定酒精度或权威营养数据来源' },
  { id: 'f200', name: '白酒', emoji: '🍶', category: '饮品-酒精', caloriesPer100g: 298, proteinPer100g: 0, fatPer100g: 0, carbsPer100g: 0, unit: 'ml', defaultWeight: 50, keywords: ['白酒', '烈酒'], foodState: 'alcoholic beverage', sourceNote: '酒类热量主要来自乙醇，普通蛋白/脂肪/碳水折算不会反映全部热量；需绑定酒精度或权威营养数据来源' },
  { id: 'f201', name: '火锅(麻辣锅底)', emoji: '🍲', category: '快餐-火锅', caloriesPer100g: 85, proteinPer100g: 2.5, fatPer100g: 6.0, carbsPer100g: 4.5, unit: 'g', defaultWeight: 400, keywords: ['火锅', '麻辣火锅', '重庆火锅'] },
  { id: 'f202', name: '火锅(清汤锅底)', emoji: '🍲', category: '快餐-火锅', caloriesPer100g: 25, proteinPer100g: 1.5, fatPer100g: 0.8, carbsPer100g: 3.0, unit: 'g', defaultWeight: 400, keywords: ['清汤火锅', '菌汤火锅'] },
  { id: 'f203', name: '麻辣烫', emoji: '🍲', category: '快餐-麻辣烫', caloriesPer100g: 95, proteinPer100g: 4.0, fatPer100g: 5.5, carbsPer100g: 7.5, unit: 'g', defaultWeight: 400, keywords: ['麻辣烫'] },
  { id: 'f204', name: '汉堡', emoji: '🍔', category: '快餐-西式', caloriesPer100g: 264, proteinPer100g: 12.0, fatPer100g: 14.5, carbsPer100g: 24.0, unit: 'g', defaultWeight: 200, keywords: ['汉堡', 'hamburger'] },
  { id: 'f205', name: '披萨', emoji: '🍕', category: '快餐-西式', caloriesPer100g: 266, proteinPer100g: 11.0, fatPer100g: 13.0, carbsPer100g: 28.0, unit: 'g', defaultWeight: 200, keywords: ['披萨', 'pizza', '比萨'] },
  { id: 'f206', name: '炸鸡(快餐)', emoji: '🍗', category: '快餐-西式', caloriesPer100g: 279, proteinPer100g: 18.5, fatPer100g: 17.5, carbsPer100g: 13.5, unit: 'g', defaultWeight: 200, keywords: ['炸鸡', '肯德基', 'KFC'] },
  { id: 'f207', name: '热狗', emoji: '🌭', category: '快餐-西式', caloriesPer100g: 290, proteinPer100g: 10.5, fatPer100g: 17.5, carbsPer100g: 24.0, unit: 'g', defaultWeight: 120, keywords: ['热狗', 'hotdog'] },
  { id: 'f208', name: '三明治', emoji: '🥪', category: '快餐-西式', caloriesPer100g: 210, proteinPer100g: 9.0, fatPer100g: 8.5, carbsPer100g: 26.0, unit: 'g', defaultWeight: 180, keywords: ['三明治', 'sandwich'] },
  { id: 'f209', name: '沙拉(蔬菜)', emoji: '🥗', category: '快餐-轻食', caloriesPer100g: 35, proteinPer100g: 2.0, fatPer100g: 1.0, carbsPer100g: 4.5, unit: 'g', defaultWeight: 250, keywords: ['沙拉', '蔬菜沙拉', 'salad'] },
  { id: 'f210', name: '鸡胸肉沙拉', emoji: '🥗', category: '快餐-轻食', caloriesPer100g: 75, proteinPer100g: 9.5, fatPer100g: 2.5, carbsPer100g: 4.0, unit: 'g', defaultWeight: 300, keywords: ['鸡胸沙拉', '鸡肉沙拉'] },
  { id: 'f211', name: '寿司拼盘', emoji: '🍣', category: '快餐-日式', caloriesPer100g: 145, proteinPer100g: 4.0, fatPer100g: 1.5, carbsPer100g: 28.0, unit: 'g', defaultWeight: 300, keywords: ['寿司拼盘', '刺身拼盘'] },
  { id: 'f212', name: '拉面(日式)', emoji: '🍜', category: '快餐-日式', caloriesPer100g: 130, proteinPer100g: 5.5, fatPer100g: 4.5, carbsPer100g: 17.0, unit: 'g', defaultWeight: 450, keywords: ['日式拉面', '味噌拉面'] },
  { id: 'f213', name: '天妇罗', emoji: '🍤', category: '快餐-日式', caloriesPer100g: 225, proteinPer100g: 8.5, fatPer100g: 14.0, carbsPer100g: 16.0, unit: 'g', defaultWeight: 120, keywords: ['天妇罗', 'tempura'] },
  { id: 'f214', name: '烤鸭', emoji: '🦆', category: '鸭肉', caloriesPer100g: 236, proteinPer100g: 16.5, fatPer100g: 18.0, carbsPer100g: 1.0, unit: 'g', defaultWeight: 150, keywords: ['烤鸭', '北京烤鸭'] },
  { id: 'f215', name: '盐水鸭', emoji: '🦆', category: '鸭肉', caloriesPer100g: 195, proteinPer100g: 18.0, fatPer100g: 13.0, carbsPer100g: 1.5, unit: 'g', defaultWeight: 120, keywords: ['盐水鸭'] },
  { id: 'f216', name: '鸭血', emoji: '🦆', category: '鸭肉', caloriesPer100g: 55, proteinPer100g: 8.7, fatPer100g: 0.6, carbsPer100g: 2.5, unit: 'g', defaultWeight: 100, keywords: ['鸭血'] },
  { id: 'f217', name: '巧克力', emoji: '🍫', category: '零食-甜食', caloriesPer100g: 546, proteinPer100g: 5.0, fatPer100g: 31.0, carbsPer100g: 60.0, unit: 'g', defaultWeight: 30, keywords: ['巧克力', 'chocolate'] },
  { id: 'f218', name: '薯片', emoji: '🍿', category: '零食-咸味', caloriesPer100g: 536, proteinPer100g: 5.5, fatPer100g: 35.0, carbsPer100g: 50.0, unit: 'g', defaultWeight: 40, keywords: ['薯片', '洋芋片'] },
  { id: 'f219', name: '饼干', emoji: '🍪', category: '零食-甜食', caloriesPer100g: 433, proteinPer100g: 7.5, fatPer100g: 14.0, carbsPer100g: 71.0, unit: 'g', defaultWeight: 30, keywords: ['饼干', '曲奇'] },
  { id: 'f220', name: '蛋糕', emoji: '🎂', category: '零食-甜食', caloriesPer100g: 348, proteinPer100g: 7.0, fatPer100g: 15.0, carbsPer100g: 49.0, unit: 'g', defaultWeight: 80, keywords: ['蛋糕', '奶油蛋糕'] },
  { id: 'f221', name: '冰淇淋', emoji: '🍦', category: '零食-甜食', caloriesPer100g: 127, proteinPer100g: 2.4, fatPer100g: 5.3, carbsPer100g: 17.3, unit: 'g', defaultWeight: 80, keywords: ['冰淇淋', '雪糕', 'ice cream'] },
  { id: 'f222', name: '麻花', emoji: '🥨', category: '零食-中式', caloriesPer100g: 524, proteinPer100g: 7.5, fatPer100g: 26.0, carbsPer100g: 65.0, unit: 'g', defaultWeight: 40, keywords: ['麻花'] },
  { id: 'f223', name: '月饼', emoji: '🥮', category: '零食-中式', caloriesPer100g: 421, proteinPer100g: 8.0, fatPer100g: 19.0, carbsPer100g: 55.0, unit: 'g', defaultWeight: 100, keywords: ['月饼'] },
  { id: 'f224', name: '粽子(肉粽)', emoji: '🍙', category: '零食-中式', caloriesPer100g: 233, proteinPer100g: 6.5, fatPer100g: 7.5, carbsPer100g: 37.0, unit: 'g', defaultWeight: 200, keywords: ['粽子', '肉粽'] },
  { id: 'f225', name: '汤圆', emoji: '🥣', category: '零食-中式', caloriesPer100g: 311, proteinPer100g: 4.5, fatPer100g: 8.0, carbsPer100g: 55.0, unit: 'g', defaultWeight: 100, keywords: ['汤圆', '元宵'] },
  { id: 'f226', name: '油条', emoji: '🥖', category: '零食-中式', caloriesPer100g: 386, proteinPer100g: 6.9, fatPer100g: 17.6, carbsPer100g: 51.0, unit: 'g', defaultWeight: 80, keywords: ['油条', '炸油条'] },
  { id: 'f227', name: '煎饼果子', emoji: '🥞', category: '零食-中式', caloriesPer100g: 235, proteinPer100g: 7.5, fatPer100g: 10.5, carbsPer100g: 28.0, unit: 'g', defaultWeight: 200, keywords: ['煎饼果子', '煎饼'] },
  { id: 'f228', name: '肉夹馍', emoji: '🥙', category: '零食-中式', caloriesPer100g: 265, proteinPer100g: 10.0, fatPer100g: 12.0, carbsPer100g: 30.0, unit: 'g', defaultWeight: 150, keywords: ['肉夹馍'] },
  { id: 'f229', name: '螺蛳粉', emoji: '🍜', category: '快餐-粉面', caloriesPer100g: 135, proteinPer100g: 5.5, fatPer100g: 5.5, carbsPer100g: 16.0, unit: 'g', defaultWeight: 350, keywords: ['螺蛳粉'] },
  { id: 'f230', name: '酸辣粉', emoji: '🍜', category: '快餐-粉面', caloriesPer100g: 125, proteinPer100g: 3.5, fatPer100g: 5.0, carbsPer100g: 16.5, unit: 'g', defaultWeight: 300, keywords: ['酸辣粉'] },
  { id: 'f231', name: '煎饼(杂粮)', emoji: '🥞', category: '零食-中式', caloriesPer100g: 200, proteinPer100g: 6.5, fatPer100g: 7.5, carbsPer100g: 27.0, unit: 'g', defaultWeight: 180, keywords: ['杂粮煎饼'] },
  { id: 'f232', name: '豆浆油条套餐', emoji: '🥣', category: '快餐-早餐', caloriesPer100g: 215, proteinPer100g: 5.5, fatPer100g: 9.5, carbsPer100g: 28.0, unit: 'g', defaultWeight: 300, keywords: ['豆浆油条', '早餐套餐'] },
  { id: 'f233', name: '肠粉', emoji: '🥡', category: '快餐-早餐', caloriesPer100g: 110, proteinPer100g: 4.5, fatPer100g: 2.5, carbsPer100g: 18.0, unit: 'g', defaultWeight: 250, keywords: ['肠粉', '广式肠粉'] },
  { id: 'f234', name: '豆沙包', emoji: '🥟', category: '主食-面点', caloriesPer100g: 238, proteinPer100g: 6.0, fatPer100g: 3.5, carbsPer100g: 46.0, unit: 'g', defaultWeight: 80, keywords: ['豆沙包', '红豆包'] },
  { id: 'f235', name: '叉烧包', emoji: '🥟', category: '主食-面点', caloriesPer100g: 245, proteinPer100g: 8.5, fatPer100g: 6.5, carbsPer100g: 38.0, unit: 'g', defaultWeight: 80, keywords: ['叉烧包'] },
  { id: 'f236', name: '春卷', emoji: '🥟', category: '零食-中式', caloriesPer100g: 235, proteinPer100g: 5.5, fatPer100g: 10.0, carbsPer100g: 30.0, unit: 'g', defaultWeight: 80, keywords: ['春卷', '炸春卷'] },
  { id: 'f238', name: '家常豆腐', emoji: '🥘', category: '豆制品-豆腐', caloriesPer100g: 110, proteinPer100g: 7.5, fatPer100g: 6.0, carbsPer100g: 5.5, unit: 'g', defaultWeight: 200, keywords: ['家常豆腐'] },
  { id: 'f239', name: '臭豆腐', emoji: '🥡', category: '零食-中式', caloriesPer100g: 195, proteinPer100g: 10.0, fatPer100g: 12.0, carbsPer100g: 10.5, unit: 'g', defaultWeight: 100, keywords: ['臭豆腐'] },
  { id: 'f240', name: '烤冷面', emoji: '🥡', category: '零食-中式', caloriesPer100g: 215, proteinPer100g: 6.5, fatPer100g: 8.5, carbsPer100g: 29.0, unit: 'g', defaultWeight: 150, keywords: ['烤冷面'] }
]

function searchFoods(keyword) {
  var foods = getAllFoods()
  if (!keyword || keyword.trim() === '') return foods
  var kw = keyword.trim().toLowerCase()
  return foods.filter(function(food) {
    return food.name.toLowerCase().includes(kw) || food.keywords.some(function(k) { return k.toLowerCase().includes(kw) })
  })
}

function getFoodById(id) {
  var food = getAllFoods().find(function(f) { return f.id === id })
  if (!food) return null
  return decorateFood(food)
}

function calculateNutrition(foodId, weightGrams) {
  var food = getFoodById(foodId)
  if (!food) return null
  var weight = typeof roundWeight === 'function' ? roundWeight(weightGrams) : Math.round(weightGrams * 10) / 10
  var roundValue = typeof roundNutrition === 'function'
    ? roundNutrition
    : function(value) { return Math.round(value * 100) / 100 }
  var ratio = weight / 100
  return {
    foodId: food.id,
    foodName: food.name,
    category: food.category,
    weight: weight,
    calories: roundValue(food.caloriesPer100g * ratio),
    protein: roundValue(food.proteinPer100g * ratio),
    fat: roundValue(food.fatPer100g * ratio),
    carbs: roundValue(food.carbsPer100g * ratio)
  }
}

var topCategoryConfig = [
  { key: '主食', label: '🍚 主食', subCategories: ['主食-米饭', '主食-面条', '主食-面点', '主食-面包', '主食-薯类', '主食-谷物', '主食-粥类'] },
  { key: '肉类', label: '🥩 肉类', subCategories: ['鸡肉-鸡胸', '鸡肉-鸡腿', '鸡肉-整鸡', '鸡肉-菜品', '鸡肉-小吃', '鸡肉-鸡翅', '鸡肉-其他', '猪肉-瘦肉', '猪肉-五花肉', '猪肉-排骨', '猪肉-菜品', '猪肉-加工', '猪肉-内脏', '牛肉-瘦肉', '牛肉-牛排', '牛肉-菜品', '牛肉-加工', '牛肉-火锅', '羊肉', '鸭肉'] },
  { key: '海鲜', label: '🐟 海鲜', subCategories: ['鱼类-三文鱼', '鱼类-白鱼', '鱼类-青鱼', '鱼类-其他', '虾类', '蟹类'] },
  { key: '蛋类', label: '🥚 蛋类', subCategories: ['蛋类-鸡蛋', '蛋类-其他'] },
  { key: '奶类', label: '🥛 奶类', subCategories: ['奶类-牛奶', '奶类-酸奶', '奶类-奶酪', '奶类-其他'] },
  { key: '豆制品', label: '🧊 豆制品', subCategories: ['豆制品-豆腐', '豆制品-其他', '豆制品-饮品'] },
  { key: '蔬菜', label: '🥬 蔬菜', subCategories: ['蔬菜-花菜类', '蔬菜-叶菜类', '蔬菜-茎菜类', '蔬菜-果菜类', '蔬菜-瓜类', '蔬菜-根茎类', '蔬菜-藻类'] },
  { key: '菌菇', label: '🍄 菌菇', subCategories: ['菌菇-常见', '菌菇-珍品', '菌菇-干品'] },
  { key: '水果', label: '🍎 水果', subCategories: ['水果-常见', '水果-瓜类', '水果-浆果', '水果-其他', '水果-热带', '水果-核果', '水果-柑橘类'] },
  { key: '坚果', label: '🥜 坚果', subCategories: ['坚果-酱类', '坚果-常见', '坚果-其他'] },
  { key: '饮品', label: '🥤 饮品', subCategories: ['饮品-碳酸', '饮品-茶饮', '饮品-咖啡', '饮品-果汁', '饮品-酒精'] },
  { key: '快餐', label: '🍔 快餐', subCategories: ['快餐-火锅', '快餐-麻辣烫', '快餐-西式', '快餐-轻食', '快餐-日式', '快餐-粉面', '快餐-早餐'] },
  { key: '零食', label: '🍫 零食', subCategories: ['零食-甜食', '零食-咸味', '零食-中式'] },
  { key: '补剂', label: '💪 补剂', subCategories: ['补剂'] }
]

function getCategoryTopKey(detailCategory) {
  for (var i = 0; i < topCategoryConfig.length; i++) {
    if (topCategoryConfig[i].subCategories.includes(detailCategory)) return topCategoryConfig[i].key
  }
  return detailCategory.split('-')[0]
}

function getCategories() {
  return topCategoryConfig.map(function(tc) {
    return {
      name: tc.label,
      key: tc.key,
      foods: foodDatabase.filter(function(f) { return tc.subCategories.includes(f.category) })
    }
  })
}

function getTopCategories() {
  return topCategoryConfig.map(function(tc) { return tc.label })
}

function getSubCategories(topCategoryLabel) {
  var tc = topCategoryConfig.find(function(t) { return t.label === topCategoryLabel || t.key === topCategoryLabel })
  if (!tc) return []
  return tc.subCategories
}

function getCustomFoods() {
  if (typeof _getStorage === 'function') return _getStorage('customFoods') || []
  try { return JSON.parse(localStorage.getItem('customFoods')) || [] } catch { return [] }
}

function addCustomFood(food) {
  var customFoods = getCustomFoods()
  var roundFoodNutrition = typeof roundNutrition === 'function'
    ? roundNutrition
    : function(value) { return Math.round((parseFloat(value) || 0) * 100) / 100 }
  var roundFoodWeight = typeof roundWeight === 'function'
    ? roundWeight
    : function(value) { return Math.round((parseFloat(value) || 0) * 10) / 10 }
  var newFood = {
    id: 'custom_' + Date.now(),
    name: food.name,
    emoji: food.emoji || '🍽️',
    category: food.category || '自定义',
    caloriesPer100g: roundFoodNutrition(food.caloriesPer100g),
    proteinPer100g: roundFoodNutrition(food.proteinPer100g),
    fatPer100g: roundFoodNutrition(food.fatPer100g),
    carbsPer100g: roundFoodNutrition(food.carbsPer100g),
    unit: food.unit || 'g',
    defaultWeight: roundFoodWeight(food.defaultWeight == null ? 100 : food.defaultWeight),
    keywords: food.keywords || [food.name],
    source: 'manual',
    sourceId: '',
    sourceName: '用户自定义',
    sourceVersion: '',
    foodState: food.foodState || '',
    ediblePortion: food.ediblePortion == null ? 1 : food.ediblePortion,
    sourceNote: '用户手动录入，需按包装标签或权威数据库自行核对'
  }
  customFoods.push(newFood)
  if (typeof _setStorage === 'function') {
    _setStorage('customFoods', customFoods)
  } else {
    try { localStorage.setItem('customFoods', JSON.stringify(customFoods)) } catch {}
  }
  return newFood
}

function getAllFoods() {
  return foodDatabase.concat(getCustomFoods()).map(function(food) {
    return decorateFood(food)
  })
}
