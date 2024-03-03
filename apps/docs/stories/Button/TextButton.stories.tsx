import type { Meta, StoryObj } from '@storybook/react';
import { TextButton } from '@repo/ui/Button';

const meta = {
  title: 'DesignSystem/Button/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    iconArea: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    href: '#',
    iconArea: false,
  },
};
