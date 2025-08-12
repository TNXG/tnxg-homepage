## Git 提交规范

### 提交消息格式

所有提交必须遵循以下格式：

```
<type>(<scope>): <description>

[可选的详细描述]

🤖 Generated with [Claude Code](https://claude.ai/code) 喵喵喵~

Co-Authored-By: <当前提交用户> <<用户邮箱>>
```

### 类型 (Type)

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更改
- `style`: 代码格式化（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改bug的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动

### 范围 (Scope)

范围指明本次提交影响的范围，例如：

- `auth`: 认证相关
- `db`: 数据库相关
- `ui`: 用户界面
- `api`: API接口
- `deps`: 依赖项

### 示例

```
feat(auth): 添加用户注册功能

- 新增用户注册API端点
- 添加邮箱验证码发送功能
- 实现密码加密存储

Generated with [Claude Code](https://claude.ai/code) 喵喵喵~

Co-Authored-By: TNXG<tnxg@outlook.jp>
```

如果在一次更改中涉及了多个功能，可以拆分成不同的commit，但每个commit必须符合上述规范。
