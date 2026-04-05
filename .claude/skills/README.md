# Skills Directory

Bổ sung skills khi phát hiện pattern lặp lại trong quá trình code.

## Khi nào tạo skill mới?

- Sau khi code 2-3 features và thấy pattern lặp (VD: tạo CRUD page, form validation flow)
- Khi một workflow phức tạp cần document lại (VD: thêm bài học mới, import từ vựng)
- Khi phát hiện convention không rõ ràng cần ghi lại

## Cấu trúc skill

```
.claude/skills/
├── <skill-name>/
│   └── SKILL.md    # Prompt template + instructions
└── README.md       # File này
```

## Ví dụ skills sẽ tạo sau

- `create-crud-page` — Template tạo CRUD page cho admin
- `add-vocabulary-batch` — Quy trình import từ vựng hàng loạt
- `create-exercise-type` — Thêm loại bài tập mới
- `add-shadcn-component` — Thêm và customize shadcn component
