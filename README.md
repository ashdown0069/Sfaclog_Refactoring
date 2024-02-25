# Turborepo starter - Next.js, Typescript, Tailwind CSS, ESlint, Prettier

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/tailwind-config` : global tailwind configurations

### eslint extends and rules

```javascript
extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"),
    "plugin:@typescript-eslint/recommended",
    "eslint-config-turbo",
    "plugin:tailwindcss/recommended",
  ],
rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "tailwindcss/no-custom-classname": "off",
    "@next/next/no-img-element": "off",
  },
```

### prettier rules

```bash
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "avoid",
  proseWrap: "preserve",
  endOfLine: "auto",
  jsxSingleQuote: true,
```
