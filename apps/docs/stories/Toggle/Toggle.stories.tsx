import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@repo/ui';

const meta = {
  title: 'DesignSystem/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftText: '팔로잉 123',
    rightText: '팔로워 34',
    onToggle: () => {},
  },
};
