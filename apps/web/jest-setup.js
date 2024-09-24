import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));
