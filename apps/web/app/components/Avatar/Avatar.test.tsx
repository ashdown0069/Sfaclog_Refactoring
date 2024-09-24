import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill } = props;
    const fillAttributes = fill ? { fill: 'true' } : {};
    return <img {...props} {...fillAttributes} alt={props.alt} />;
  },
}));

const sizeClasses = {
  xs: 'w-[25px] h-[25px]',
  s: 'w-8 h-8',
  m: 'w-[50px] h-[50px]',
  l: 'w-20 h-20',
};

describe('Avatar Component', () => {
  test('Avatar default rendering test', () => {
    render(<Avatar size='m' />);
    const image = screen.getByAltText('profile image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/Avatar.png');
  });

  test('Avatar type "all" rendering test', () => {
    render(<Avatar size='m' type='all' />);
    const avatarDiv = screen.getByText('ALL');
    expect(avatarDiv).toBeInTheDocument();
    expect(avatarDiv).toHaveClass('bg-brand-90');
  });

  test('Avatar size props test', () => {
    const sizes = ['xs', 's', 'm', 'l'] as const;
    sizes.forEach(size => {
      const { container } = render(<Avatar size={size} />);
      const avatarContainer = container.firstChild;
      const className = sizeClasses[size];
      expect(avatarContainer).toHaveClass(className);
    });
  });

  test('Avatar custom url props test', () => {
    const customUrl = '/custom-avatar.png';
    render(<Avatar size='m' url={customUrl} />);
    const image = screen.getByAltText('profile image');
    expect(image).toHaveAttribute('src', customUrl);
  });
});
