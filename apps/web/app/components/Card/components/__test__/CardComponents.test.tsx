import { render, screen } from '@testing-library/react';

import { CardCategory } from '../CardCategory';
import { CardComments } from '../CardComments';
import {
  LogCardContainer,
  MyCommentCardContainer,
  MylogCardContainer,
} from '../CardContainers';
import { CardDate } from '../CardDate';
import { CardLikes } from '../CardLikes';
import { CardTag } from '../CardTag';
import { CardViews } from '../CardViews';
import { CardTitle } from '../CardTitle';

jest.mock('@/utils/formatUtils', () => ({
  formatDate: jest.fn(() => 'mocked date'),
  formatNumber: jest.fn(() => 'mocked number'),
}));

jest.mock('@repo/ui/Icon', () => ({
  IconChatBlack: () => <span data-testid='icon-chat-black' />,
  IconHeartBlack: () => <span data-testid='icon-heart-black' />,
  IconViewBlack: () => <span data-testid='icon-view-black' />,
}));

describe('Card components rendering test', () => {
  test('Card Category', () => {
    render(<CardCategory category='test' />);
    const category = screen.getByText('test');
    expect(category).toBeInTheDocument();
  });

  test('Card Comments', () => {
    render(<CardComments count={10} />);
    const comments = screen.getByText('mocked number');
    expect(comments).toBeInTheDocument();
    expect(screen.getByTestId('icon-chat-black')).toBeInTheDocument();
  });

  test('Card Date', () => {
    render(<CardDate date='2024-01-01' />);
    const dateElement = screen.getByText('mocked date');
    expect(dateElement).toBeInTheDocument();
  });

  test('Card Likes', () => {
    render(<CardLikes count={10} />);
    const likes = screen.getByText('mocked number');
    expect(likes).toBeInTheDocument();
    expect(screen.getByTestId('icon-heart-black')).toBeInTheDocument();
  });

  test('Card tag', () => {
    render(<CardTag tag='test' />);
    const tag = screen.getByText('#test');
    expect(tag).toBeInTheDocument();
  });

  test('Card title', () => {
    render(<CardTitle title='test title' />);
    const title = screen.getByText('test title');
    expect(title).toBeInTheDocument();
  });

  test('Card Views', () => {
    render(<CardViews count={10} />);
    const views = screen.getByText('mocked number');
    expect(views).toBeInTheDocument();
    expect(screen.getByTestId('icon-view-black')).toBeInTheDocument();
  });

  test('LogCard Containers', () => {
    render(
      <LogCardContainer>
        <p>test children</p>
      </LogCardContainer>,
    );
    const container = screen.getByText('test children');
    expect(container).toBeInTheDocument();
  });

  test('My Comment Card Containers', () => {
    render(
      <MyCommentCardContainer>
        <p>test children</p>
      </MyCommentCardContainer>,
    );
    const container = screen.getByText('test children');
    expect(container).toBeInTheDocument();
  });

  test('My LogCard Containers', () => {
    render(
      <MylogCardContainer>
        <p>test children</p>
      </MylogCardContainer>,
    );
    const container = screen.getByText('test children');
    expect(container).toBeInTheDocument();
  });
});
