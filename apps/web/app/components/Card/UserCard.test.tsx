import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

jest.mock('../Avatar/Avatar', () => ({
  Avatar: () => <div data-testid='mock-avatar' />,
}));

describe('User Card', () => {
  const mockUser = {
    pageUrl: 'test-url',
    nickname: 'test-nickname',
    avatar: 'test-avatar',
    intro: 'test-intro',
    interests: ['test-interest1', 'test-interest2'],
  };
  test('renders correctly', () => {
    //@ts-ignore
    render(<UserCard user={mockUser} />);
    const link = screen.getByRole('link');
    const interestsText = screen.getByText('#test-interest1');
    const introText = screen.getByText('test-intro');
    expect(link).toHaveAttribute('href', '/user/test-url');
    expect(interestsText).toBeInTheDocument();
    expect(introText).toBeInTheDocument();
  });
});
