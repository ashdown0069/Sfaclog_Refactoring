import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { MyLogCard } from './MyLogCard';

jest.mock('@repo/ui/Icon', () => ({
  IconChatBlack: () => <span data-testid='icon-chat-black' />,
  IconHeartBlack: () => <span data-testid='icon-heart-black' />,
  IconViewBlack: () => <span data-testid='icon-view-black' />,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/utils/formatUtils', () => ({
  CountComments: jest.fn(),
}));

describe('MyLog Card', () => {
  const mockLog = {
    _id: 'test-log-id',
    title: 'test-log-title',
    category: 'test-log-category',
    likes: 3,
    comments: 6,
    views: 9,
    createdAt: '2024-01-01',
    isVisibility: true,
  };

  const mockRouter = {
    refresh: jest.fn(),
  };
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    global.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', () => {
    //@ts-ignore
    render(<MyLogCard log={mockLog} />);
    const title = screen.getByText(mockLog.title);
    const category = screen.getByText(mockLog.category);
    const likes = screen.getByText(mockLog.likes);
    const views = screen.getByText(mockLog.views);
    const createdAt = screen.getByText(mockLog.createdAt);
    const visibility = screen.getByText('공개');
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
    expect(views).toBeInTheDocument();
    expect(createdAt).toBeInTheDocument();
    expect(visibility).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', `/log/${mockLog._id}`);
    expect(links[1]).toHaveAttribute('href', `/write/${mockLog._id}`);
  });

  test('delete log function success', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });
    //@ts-ignore
    render(<MyLogCard log={mockLog} />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    await waitFor(() => {
      const spyOnAlert = jest.spyOn(window, 'alert');
      expect(spyOnAlert).not.toHaveBeenCalled();
      expect(useRouter().refresh).toHaveBeenCalled();
    });
  });

  test('delete log function error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });
    //@ts-ignore
    render(<MyLogCard log={mockLog} />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    await waitFor(() => {
      const spyOnAlert = jest.spyOn(window, 'alert');
      expect(spyOnAlert).toHaveBeenCalledWith('삭제에 실패했습니다.');
      expect(useRouter().refresh).toHaveBeenCalled();
    });
  });
});
