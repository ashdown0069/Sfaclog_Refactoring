import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@repo/ui';
const meta: Meta<typeof Input> = {
  title: 'DesignSystem/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    successMessage: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'this is placeholder',
  },
  argTypes: {},
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'this is placeholder',
  },
  argTypes: {},
};

export const Hint: Story = {
  args: {
    type: 'password',
    hint: 'this is hint',
  },
  argTypes: {},
};

export const InputError: Story = {
  args: {
    type: 'text',
    placeholder: 'Default Input',
    errorMessage: 'this is error state',
  },
  argTypes: {},
};

export const InputSuccess: Story = {
  args: {
    type: 'text',
    placeholder: 'Default Input',
    successMessage: 'this is success message',
  },
  argTypes: {},
};
