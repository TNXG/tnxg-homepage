## 数据库概览

项目使用 MongoDB 作为数据库，数据库名为 `ink_battles`。

> ⚠️ **注意**: 此文档由脚本自动生成，反映了数据库中的实际数据结构。

## 集合（表）结构

### users - 用户表

**文档数量**: 1

**字段结构：**

| 字段名       | 类型   | 必填 | 描述          |
| ------------ | ------ | ---- | ------------- |
| \_id         | object | 是   | \_id (object) |
| email        | string | 是   | 用户邮箱地址  |
| passwordHash | string | 是   | 加密后的密码  |
| createdAt    | date   | 是   | 创建时间      |

**示例文档：**

```typescript
{
  "email": "tianxiang_tnxg@outlook.com",
  "passwordHash": "$2b$10$AvU1/z.eaIzk89l2WUAcF.Q0/xs7sgNbCEeibhR8aBUGQYviAIOcS",
  "createdAt": "2025-08-10T15:46:15.395Z"
}
```

### analysis_requests - 分析请求表

**文档数量**: 100

**字段结构：**

| 字段名       | 类型   | 必填   | 描述               |
| ------------ | ------ | ------ | ------------------ | ------ |
| \_id         | object | 是     | \_id (object)      |
| articleText  | string | 是     | 文章内容           |
| session      | string | 是     | 会话标识           |
| result       | string | 是     | 分析结果           |
| ip           | string | 是     | IP地址             |
| usage        | null   | 是     | usage (null)       |
| mode         | string | 是     | 分析模式           |
| timestamp    | string | 是     | timestamp (string) |
| overallScore | number | 是     | 综合评分           |
| orderNumber  | null   | string | 是                 | 订单号 |
| sha1         | string | 是     | 内容哈希值         |

**示例文档：**

```typescript
{
  "articleText": "《把我放在你心上》\n我们是恋人吗？\n像那星星与月亮\n永远地在夜空中相伴。\n或者仅是朋友，\n像那大豆与瘤菌\n长久地在大地上互助。\n\n在明天来临之际，\n我会再次孤独吗？\n我害怕孤独，\n它似死水湮没我的魂灵。\n\n那么我想问你，\n当你注视着我，\n你眼中是否存在着爱？\n你对我的感受如何，\n在你的内心深处，\n是否有着我的一方天地?\n\n我再想问你，\n你会想念我吗，\n当我在远方漂流的时候?\n在你的内心深处，\n是否有着我的一泓清泉?\n\n我能找到什么办法？\n让你想要我，\n就像我渴求你的青睐一样，\n因为我想我爱你。\n那么你也爱我吗？\n\n我不知道能不能让你，\n把我放到你的心里。\n不要让我走，\n也不要让你走。\n\n如果你知道我的感受，\n你不会说不，\n把我放到你的心里，\n不要让我走。\n\n因为你的爱，\n是我需要了解的一切。\n老实说，\n因为我确信，\n确实可以，\n我会让你快乐，\n永远地。\n\n因为我想念你，\n就像葵花渴望着阳光。\n当你远离我的时候，\n我梦见你，\n神似，\n一位追求智慧的贤者，\n日日夜夜。\n\n我能让你渴望我么，\n就像我渴求你的青睐一样，\n因为我想我爱你。\n可不可以你也爱我呢？\n把我放到你的心里，\n不要让我走。",
  "session": "9l2bjmg17lfp42nnyd2ws",
  "result": "{\n  \"overallScore\": 30.8,\n  \"overallAssessment\": \"《把我放在你心上》是一首情感真挚、表达直接的抒情诗。其核心优势在于对爱与孤独这一普世主题的直接抒发，能够触动读者的内心。然而，由于其体裁的限制以及在语言原创性、结构复杂度和互文性等维度上的传统性，作品在“作家战力系统”的评估中得分相对较低。若能进一步探索语言的独特性和表达的层次感，将有助于提升其文学深度和艺术魅力。\",\n  \"title\": \"🐣 写作苦手\",\n  \"ratingTag\": \"🐟 臭鱼烂虾 / 早该弃坑\",\n  \"summary\": \"《把我放在你心上》是一首以第一人称视角抒发对爱情渴望与对孤独恐惧的诗歌。诗歌通过一系列直接的疑问和恳求，表达了叙述者希望被爱、被记住的强烈愿望，并承诺会给对方带来快乐。作品情感真挚，语言朴实，以“星星与月亮”、“葵花渴望阳光”等比喻来强化其情感诉求，展现了对亲密关系的深切期盼。\",\n  \"dimensions\": [\n    {\n      \"name\": \"🎭 人物塑造力\",\n      \"score\": 3.5,\n      \"description\": \"诗歌通过第一人称视角，清晰地展现了叙述者对爱的渴望、对孤独的恐惧以及对情感回应的强烈期盼，其内心世界虽不复杂但情感真挚，形象立得住。\"\n    },\n    {\n      \"name\": \"🧠 结构复杂度\",\n      \"score\": 3,\n      \"description\": \"诗歌采用线性结构，通过重复的疑问句和祈使句推进情感，起承转合自然，但缺乏多线交错、非线性时间或元叙事等复杂设计。\"\n    },\n    {\n      \"name\": \"🔀 情节反转密度\",\n      \"score\": 1,\n      \"description\": \"作为一首抒情诗，作品不包含任何情节或叙事，因此无反转设计。\"\n    },\n    {\n      \"name\": \"💔 情感穿透力\",\n      \"score\": 4.5,\n      \"description\": \"诗歌情感表达直接而强烈，通过“死水湮没我的魂灵”、“葵花渴望着阳光”等比喻，将对孤独的恐惧和对爱的渴求展现得淋漓尽致，能引导读者投入强烈的情绪共振。\"\n    },\n    {\n      \"name\": \"🎨 文体魅力\",\n      \"score\": 3.5,\n      \"description\": \"诗歌语言通顺流畅，用词朴实，偶有比喻句增强画面感和情感张力，整体文风清晰，但缺乏高度独特的个人风格或实验性。\"\n    },\n    {\n      \"name\": \"🌀 先锋性/实验性\",\n      \"score\": 2,\n      \"description\": \"诗歌遵循传统的抒情诗歌范式，未在结构、语言或叙事上进行任何先锋性或实验性尝试。\"\n    },\n    {\n      \"name\": \"😂 幽默感/自嘲力\",\n      \"score\": 1,\n      \"description\": \"诗歌基调严肃且充满情感，未展现任何幽默感或自嘲元素。\"\n    },\n    {\n      \"name\": \"🌍 主题深度\",\n      \"score\": 3.5,\n      \"description\": \"诗歌围绕爱情、渴望与孤独这一普世主题展开，情感表达真挚，具有一定深度，但未进一步探讨哲学、社会或存在主义层面的复杂议题。\"\n    },\n    {\n      \"name\": \"🏺 文化底蕴性\",\n      \"score\": 2.5,\n      \"description\": \"诗歌使用了“星星与月亮”、“大豆与瘤菌”、“葵花渴望阳光”等常见比喻，但未深入融合特定文化语境、民俗或历史背景。\"\n    },\n    {\n      \"name\": \"🛠️ 作者产出速度\",\n      \"score\": 3,\n      \"description\": \"无法从单篇诗歌判断作者的整体产出速度，故给予中性默认分。\"\n    },\n    {\n      \"name\": \"📚 引用张力（互文性）\",\n      \"score\": 2.5,\n      \"description\": \"诗歌中使用的比喻和意象均为常见表达，未展现出与前文本进行深度对话、致敬或颠覆的互文性。\"\n    },\n    {\n      \"name\": \"🪤 谜团操控力与读者诱导性\",\n      \"score\": 1,\n      \"description\": \"诗歌为直接的情感抒发，不包含任何谜团设置或悬念铺垫。\"\n    },\n    {\n      \"name\": \"🧷 稳定性/完成度\",\n      \"score\": 4,\n      \"description\": \"诗歌情感表达完整，从疑问到渴望再到承诺，逻辑连贯，结构闭合，具有较高的完成度。\"\n    },\n    {\n      \"name\": \"🧬 语言原创性\",\n      \"score\": 3,\n      \"description\": \"诗歌语言清晰流畅，但遣词造句和比喻多为常见表达，缺乏高度独特的语言系统或强烈辨识度的个人风格。\"\n    },\n    {\n      \"name\": \"👑 经典性\",\n      \"score\": 0.8,\n      \"description\": \"作为一篇用户提供的未发表作品，目前不具备任何经典性或广泛的文化影响力。\"\n    },\n    {\n      \"name\": \"🧑‍🚀 新锐性\",\n      \"score\": 1.0,\n      \"description\": \"作品的语言和结构主要继承传统抒情诗模式，个人风格尚不突出，缺乏颠覆性或开创性的新锐特质。\"\n    }\n  ],\n  \"strengths\": [\n    \"情感表达真挚而强烈，能够直接触及读者内心，引发共鸣。\",\n    \"主题明确，围绕爱与孤独的普世情感展开，具有普遍性。\",\n    \"语言通顺流畅，易于理解，使得情感传达无障碍。\",\n    \"结构完整，情感递进清晰，表达了完整的内心诉求。\"\n  ],\n  \"improvements\": [\n    \"提升语言的原创性和独特性，避免使用过于常见的比喻和意象，以增强诗歌的艺术感染力。\",\n    \"尝试在结构上进行创新，打破线性抒情，增加诗歌的层次感和阅读趣味。\",\n    \"可以尝试融入更深层次的文化或哲学思考，提升主题的深度和广度，使其不仅仅停留在个人情感层面。\",\n    \"探索更多元的表达方式，例如运用象征、隐喻而非直白抒情，以增强文体魅力和回味空间。\",\n    \"考虑引入更具张力的意象或细节，以避免情感表达的直白化，增加诗歌的艺术留白。\"\n  ]\n}",
  "ip": "58.152.113.76, 47.242.57.32",
  "usage": null,
  "mode": "default",
  "timestamp": "2025-08-10T21:22:27.705Z",
  "overallScore": 30.8,
  "orderNumber": null,
  "sha1": "4fbbbd0d4ad491f8e70d19c1c5405084f2d16b8e"
}
```

### api_keys - API 密钥表

**文档数量**: 42

**字段结构：**

| 字段名                    | 类型    | 必填 | 描述             |
| ------------------------- | ------- | ---- | ---------------- |
| \_id                      | object  | 是   | \_id (object)    |
| orderNumber               | string  | 是   | 订单号           |
| orderTime                 | date    | 是   | 订单时间         |
| firstIssuedTime           | date    | 是   | 首次签发时间     |
| lastFingerprintUpdateTime | date    | 是   | 最后指纹更新时间 |
| userIp                    | string  | 是   | 用户IP           |
| token                     | string  | 是   | 访问令牌         |
| browserFingerprint        | string  | 是   | 浏览器指纹       |
| isActive                  | boolean | 是   | 是否激活         |

**示例文档：**

```typescript
{
  "orderNumber": "20250810202842975610253806",
  "orderTime": "2025-08-10T12:28:42.000Z",
  "firstIssuedTime": "2025-08-10T12:30:08.128Z",
  "lastFingerprintUpdateTime": "2025-08-10T12:30:08.128Z",
  "userIp": "188.253.120.77",
  "token": "4abc254caf1ffb49339c9af5d4d569e6c7f6f6ae970248206d80469f5c7d054f",
  "browserFingerprint": "cd1ec55",
  "isActive": true
}
```

### email_verification_codes - 邮箱验证码表

**文档数量**: 2

**字段结构：**

| 字段名    | 类型    | 必填 | 描述          |
| --------- | ------- | ---- | ------------- |
| \_id      | object  | 是   | \_id (object) |
| email     | string  | 是   | 用户邮箱地址  |
| type      | string  | 是   | 类型标识      |
| codeHash  | string  | 是   | 验证码哈希    |
| createdAt | date    | 是   | 创建时间      |
| expiresAt | date    | 是   | 过期时间      |
| used      | boolean | 是   | 是否已使用    |
| usedAt    | date    | 否   | usedAt (date) |

**示例文档：**

```typescript
{
  "email": "iykrzu@qq.com",
  "type": "register",
  "codeHash": "$2b$10$/2LcOMcJI0kqbE50Nx5m9./hFMgvdZD2nuXqwrhfNd.pDjPXsSR96",
  "createdAt": "2025-08-10T15:28:53.437Z",
  "expiresAt": "2025-08-10T15:38:53.437Z",
  "used": false
}
```

### sessions - 会话表

**文档数量**: 100

**字段结构：**

| 字段名  | 类型   | 必填 | 描述          |
| ------- | ------ | ---- | ------------- |
| \_id    | object | 是   | \_id (object) |
| session | string | 是   | 会话标识      |

**示例文档：**

```typescript
{
  "session": "27lgjk5z4sqox9wxgr3rx"
}
```

### daily_usage - 每日使用统计表

_集合暂无数据_

## 索引规范

### 必需索引

1. **users.email** - 唯一索引

   ```javascript
   { email: 1; }
   ```

2. **analysis_requests.sha1_mode** - 复合索引（用于去重查询）

   ```javascript
   { sha1: 1, mode: 1 }
   ```

3. **analysis_requests.timestamp** - 普通索引（用于时间排序）

   ```javascript
   { timestamp: -1; }
   ```

4. **api_keys.orderNumber** - 唯一索引

   ```javascript
   { orderNumber: 1; }
   ```

5. **api_keys.token** - 唯一索引

   ```javascript
   { token: 1; }
   ```

6. **email_verification_codes.email_type_used** - 复合索引

   ```javascript
   { email: 1, type: 1, used: 1 }
   ```

7. **sessions.session** - 唯一索引

   ```javascript
   { session: 1; }
   ```

8. **daily_usage.dayKey_type_key** - 复合唯一索引
   ```javascript
   { dayKey: 1, type: 1, key: 1 }
   ```

## 数据访问规范

1. **统一入口**: 所有数据库操作必须通过 `src/lib/db.ts` 中的函数进行
2. **连接管理**: 使用连接池，自动管理连接生命周期
3. **错误处理**: 所有数据库操作都必须包含适当的错误处理
4. **数据验证**: 在写入数据库前进行数据验证
5. **安全性**: 敏感信息（如密码、验证码）必须加密存储
