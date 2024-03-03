import type { StorybookConfig } from '@storybook/nextjs';
import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-essentials'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    if (!config.module || !config.module.rules) {
      return config;
    }
    config.module.rules = [
      ...config.module.rules.map(rule => {
        if (!rule || rule === '...') {
          return rule;
        }

        if (rule.test && /svg/.test(String(rule.test))) {
          return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
      }),
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ];
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'ProgressPlugin', // 나중에 제거예정
    );
    return config;
  },
};
export default config;

// webpackFinal: async config => {
//   if (config && config.module && config.module.rules) {
//     config.module.rules?.forEach(rule => {
//       if (!rule || typeof rule !== 'object') return;
//       if (rule.test instanceof RegExp && rule.test.test('.svg')) {
//         rule.exclude = /\.svg$/;
//       }
//     });
//   }

//   return config;
// },
