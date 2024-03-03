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
    label: 'Capsule Button',
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
    label: 'Capsule Button with Icon',
    size: 'large',
    iconPosition: 'left',
    style: 'solid',
  },
  argTypes: {
    disabled: { control: false },
    icon: { control: false },
  },
  render({ label, size, type, iconPosition, style }) {
    return (
      <CapsuleButton
        style={style}
        label={label}
        size={size}
        type={type}
        icon={<IconPencil className='size-5 fill-white stroke-white' />}
        iconPosition={iconPosition}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    type: 'button',
    label: 'Capsule Button Disabled',
    size: 'large',
    disabled: true,
    style: 'solid',
  },
  argTypes: {
    icon: { control: false },
    iconPosition: { control: false },
  },
};
