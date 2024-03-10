import type { Meta, StoryObj } from '@storybook/react';
import { BoxButton } from '@repo/ui/Button';
import { IconGoogle, IconPencil } from '@repo/ui/Icon';
const meta = {
  title: 'DesignSystem/Button/BoxButton',
  component: BoxButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // className: { control: false },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BoxButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'button',
    children: 'Box Button',
    size: 'large',
    style: 'solid',
  },
  argTypes: {
    icon: { control: false },
    iconPosition: { control: false },
    disabled: { control: false },
  },
};

export const WithIcon: Story = {
  args: {
    type: 'button',
    children: 'Box Button with Icon',
    size: 'large',
    iconPosition: 'left',
    style: 'solid',
  },
  argTypes: {
    disabled: { control: false },
    icon: { control: false },
  },
  render({ children, size, type, iconPosition, style }) {
    return (
      <BoxButton
        style={style}
        size={size}
        type={type}
        icon={<IconPencil className='size-5 fill-white stroke-white' />}
        iconPosition={iconPosition}
      >
        {children}
      </BoxButton>
    );
  },
};

export const Disabled: Story = {
  args: {
    type: 'button',
    children: 'Box Button Disabled',
    size: 'large',
    disabled: true,
    style: 'solid',
  },
  argTypes: {
    icon: { control: false },
    iconPosition: { control: false },
  },
};

export const StyleNone: Story = {
  args: {
    type: 'button',
    children: 'Box Button StyleNone',
    size: 'large',
    style: 'none',
    className: 'border',
  },
  argTypes: {
    icon: { control: false },
    iconPosition: { control: false },
  },
};

export const SocialLogin: Story = {
  args: {
    type: 'button',
    children: 'Google 계정 로그인',
    size: 'large',
    iconPosition: 'left',
    style: 'none',
    className: 'text-neutral-90 border border-neutral-30 bg-white',
  },
  argTypes: {
    className: { control: 'text' },
    disabled: { control: false },
    icon: { control: false },
  },
  render({ children, size, type, iconPosition, style, className }) {
    return (
      <BoxButton
        style={style}
        size={size}
        type={type}
        icon={<IconGoogle />}
        iconPosition={iconPosition}
        className={className}
      >
        {children}
      </BoxButton>
    );
  },
};
