import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@repo/ui';
const meta = {
  title: 'DesignSystem/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Chip',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Tag',
  },
};
