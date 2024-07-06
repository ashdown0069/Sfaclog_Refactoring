const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"),
    "plugin:@typescript-eslint/recommended",
    "eslint-config-turbo",
    "plugin:tailwindcss/recommended",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    "no-unused-vars": "off", //타입스크립트 사용시 interface의 변수명을 eslint가 잡지 않도록 함.
    "@typescript-eslint/no-unused-vars": "warn", // 대신 사용하지 않는 변수는 @typescript/eslint를 통해 잡아줌.
    "@typescript-eslint/no-explicit-any": "off", // type any 경고 끄기
    "tailwindcss/no-custom-classname": "off", // tailwind custom classname 경고 끄기
    "@next/next/no-img-element": "off", // Next Image가 아닌 img 태그 사용 시 경고 끄기
    "@typescript-eslint/ban-ts-comment": "off", // @ts-ignore 사용 경고 끄기
  },
};
