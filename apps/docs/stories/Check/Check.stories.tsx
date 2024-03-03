import type { Meta, StoryObj } from '@storybook/react';
import { Check } from '@repo/ui';
const meta = {
  title: 'DesignSystem/CheckBox',
  component: Check,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Check>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    label: '프론트엔드',
    value: 'frontend',
    name: 'develop',
    checked: true,
    onChange({ name, value, checked }) {
      console.log({ name, value, checked });
    },
  },
};

export const NotChecked: Story = {
  args: {
    label: '백엔드',
    value: 'backend',
    name: 'develop',
    checked: false,
    onChange({ name, value, checked }) {
      console.log({ name, value, checked });
    },
  },
};
