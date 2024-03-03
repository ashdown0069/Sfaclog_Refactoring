const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
  rules: {
    "no-unused-vars": "off", //타입스크립트 사용시 interface의 변수명을 eslint가 잡지 않도록 함.
    "@typescript-eslint/no-unused-vars": "warn", // 대신 사용하지 않는 변수는 @typescript/eslint를 통해 잡아줌.
    "tailwindcss/no-custom-classname": "off", // tailwind custom classname 경고 끄기
  },
};
