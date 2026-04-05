# src/providers/ — React Context Providers

## Structure

```
providers/
├── query-provider.tsx   # TanStack Query QueryClientProvider
├── theme-provider.tsx   # next-themes (dark/light mode)
└── auth-provider.tsx    # Auth session context wrapper
```

## Usage

All providers composed in root layout (`app/layout.tsx`):

```tsx
<QueryProvider>
  <ThemeProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
</QueryProvider>
```

## Conventions

- Providers are always Client Components (`"use client"`)
- Keep providers thin — logic lives in `lib/` and `hooks/`
- Only create a provider when React Context is actually needed
