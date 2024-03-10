import type { Meta, StoryObj } from '@storybook/react';
import { CapsuleButton } from '@repo/ui/Button';
import { IconPencil } from '@repo/ui/Icon';
const meta = {
  title: 'DesignSystem/Button/CapsuleButton',
  component: CapsuleButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: false },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CapsuleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'button',
    children: 'Capsule Button',
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
    children: 'Capsule Button with Icon',
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
      <CapsuleButton
        style={style}
        size={size}
        type={type}
        icon={<IconPencil className='size-5 fill-white stroke-white' />}
        iconPosition={iconPosition}
      >
        {children}
      </CapsuleButton>
    );
  },
};

export const Disabled: Story = {
  args: {
    type: 'button',
    children: 'Capsule Button Disabled',
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
