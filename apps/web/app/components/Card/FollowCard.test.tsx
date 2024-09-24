import { render, screen } from '@testing-library/react';
import { FollowCard } from './FollowCard';

// Avatar 컴포넌트는 테스트코드가 따로존재
jest.mock('../Avatar/Avatar', () => ({
  Avatar: () => <div data-testid='mock-avatar' />,
}));

describe('Follow Card', () => {
  const mockUser = {
    pageUrl: 'test-url',
    nickname: 'test-nickname',
    avatar: 'test-avatar',
    intro: 'test-intro',
  };
  test('follow card rendering test', () => {
    //@ts-ignore
    render(<FollowCard user={mockUser} />);
    expect(screen.getByText('test-nickname')).toBeInTheDocument();
    expect(screen.getByText('test-intro')).toBeInTheDocument();
    expect(screen.getByTestId('mock-avatar')).toBeInTheDocument();
  });

  test('does not render intro props if not provided', () => {
    const userWithoutIntro = { ...mockUser, intro: undefined };
    //@ts-ignore
    render(<FollowCard user={userWithoutIntro} />);
    expect(screen.queryByText('test-intro')).not.toBeInTheDocument();
  });

  test('link to users pageUrl test', () => {
    //@ts-ignore
    render(<FollowCard user={mockUser} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/user/${mockUser.pageUrl}`);
  });
});
