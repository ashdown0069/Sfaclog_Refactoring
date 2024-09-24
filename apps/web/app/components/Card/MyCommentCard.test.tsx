import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { MyCommentCard } from './MyCommentCard';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@repo/ui/Icon', () => ({
  IconCancelBlack: () => (
    <div data-testid='mock-icon-cancel'>MockIconCancel</div>
  ),
  IconReplyArrow: () => <div data-testid='mock-icon-reply'>MockIconReply</div>,
}));
describe('My Comment Card', () => {
  const mockComment = {
    _id: 'test-commentid',
    content: 'test-content',
    createdAt: '2022-01-01',
    log: {
      _id: 'test-log-id',
      title: 'test-log-title',
    },
  };

  const mockRouter = {
    refresh: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    global.confirm = jest.fn(() => true);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', () => {
    //@ts-ignore
    render(<MyCommentCard comment={mockComment} />);
    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
    expect(screen.getByText(mockComment.createdAt)).toBeInTheDocument();
    expect(screen.getByText(mockComment.log.title)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/log/${mockComment.log._id}`,
    );
    expect(screen.getByTestId('mock-icon-cancel')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon-reply')).toBeInTheDocument();
  });

  test('loading state', () => {
    //@ts-ignore
    render(<MyCommentCard comment={undefined} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('delete comment function with success', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });
    const toastSuccess = jest.spyOn(toast, 'success');
    //@ts-ignore
    render(<MyCommentCard comment={mockComment} />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(toastSuccess).toHaveBeenCalledWith('삭제되었습니다.');
      expect(useRouter().refresh).toHaveBeenCalled();
    });
  });

  test('delete comment function with error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });
    const toastError = jest.spyOn(toast, 'error');
    //@ts-ignore
    render(<MyCommentCard comment={mockComment} />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(toastError).toHaveBeenCalledWith('삭제에 실패했습니다.');
      expect(useRouter().refresh).toHaveBeenCalled();
    });
  });
});
