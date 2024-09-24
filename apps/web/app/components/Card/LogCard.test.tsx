import { render, screen } from '@testing-library/react';
import { LogCard } from './LogCard';

// next/image와 next/link 모킹
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill } = props;
    const fillAttributes = fill ? { fill: 'true' } : {};

    return <img {...props} {...fillAttributes} />;
  },
}));

jest.mock('./components/CardContainers', () => ({
  LogCardContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='log-card-container'>{children}</div>
  ),
}));

jest.mock('./components/CardCategory', () => ({
  CardCategory: ({ category }: { category: string }) => (
    <div data-testid='card-category'>{category}</div>
  ),
}));

jest.mock('./components/CardTitle', () => ({
  CardTitle: ({ title }: { title: string }) => (
    <div data-testid='card-title'>{title}</div>
  ),
}));

jest.mock('../Avatar/Avatar', () => ({
  Avatar: () => <div data-testid='avatar' />,
}));

jest.mock('./components/CardViews', () => ({
  CardViews: ({ count }: { count: number }) => (
    <div data-testid='card-views'>{count}</div>
  ),
}));

jest.mock('./components/CardLikes', () => ({
  CardLikes: ({ count }: { count: number }) => (
    <div data-testid='card-likes'>{count}</div>
  ),
}));

jest.mock('./components/CardDate', () => ({
  CardDate: ({ date }: { date: string }) => (
    <div data-testid='card-date'>{date}</div>
  ),
}));

jest.mock('@/utils/extractTextFromHTML', () => ({
  extractTextFromHTML: () => 'Mocked extracted text',
}));

describe('Log Card', () => {
  const mockLog = {
    _id: 'test-id',
    title: 'test-title',
    category: 'test-category',
    createdAt: 'test-createdAt',
    author: {
      pageUrl: 'test-pageUrl',
      nickname: 'test-nickname',
      avatar: 'test-avatar',
    },
    thumbnail: 'test-thumbnail-url',
    logConentHTML: 'test-extract-test-from-html',
    views: 1,
    likes: 1,
  };
  it('renders log information correctly', () => {
    //@ts-ignore
    render(<LogCard log={mockLog} />);

    expect(screen.getByTestId('card-category')).toHaveTextContent(
      mockLog.category,
    );
    expect(screen.getByTestId('card-title')).toHaveTextContent(mockLog.title);
    expect(screen.getByTestId('card-date')).toHaveTextContent(
      mockLog.createdAt.toString(),
    );
    expect(screen.getByTestId('card-views')).toHaveTextContent(
      mockLog.views.toString(),
    );
    expect(screen.getByTestId('card-likes')).toHaveTextContent(
      mockLog.likes.toString(),
    );
  });

  test('render with thumbnail', () => {
    //@ts-ignore
    render(<LogCard log={mockLog} />);
    const thumbnail = screen.getByAltText('thumbnail');
    expect(thumbnail).toBeInTheDocument();
  });

  test('render without thumbnail', () => {
    const logWithoutThumbnail = { ...mockLog, thumbnail: '' };
    //@ts-ignore
    render(<LogCard log={logWithoutThumbnail} />);
    const title = screen.getAllByText(logWithoutThumbnail.title)[0];
    expect(title).toBeInTheDocument();
    const altThumbnailContent = screen.getByText('Mocked extracted text');
    expect(altThumbnailContent).toBeInTheDocument();
  });

  test('link has correct href', () => {
    //@ts-ignore
    render(<LogCard log={mockLog} />);

    const logLink = screen.getAllByRole('link')[0];
    expect(logLink).toHaveAttribute('href', `/log/${mockLog._id}`);

    const authorLink = screen.getAllByRole('link')[1];
    expect(authorLink).toHaveAttribute(
      'href',
      `/user/${mockLog.author.pageUrl}`,
    );
  });
});
