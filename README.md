# Dependencies
1. auth.js 
2. prisma with its auth.js provider
```
pnpm add @prisma/client @auth/prisma-adapter
pnpm add bcrypt @types/bcrypt

pnpm add prisma --save-dev
```

```
DATABASE_URL=postgres://postgres:<username>@0.0.0.0:5432/db

```