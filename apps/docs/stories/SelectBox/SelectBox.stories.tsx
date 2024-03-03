import type { Meta, StoryObj } from '@storybook/react';
import { Selectbox } from '@repo/ui';

const meta: Meta<typeof Selectbox> = {
  title: 'DesignSystem/Selectbox',
  component: Selectbox,
  decorators: Story => (
    <div className='mb-52 mt-2'>
      <Story />
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const selectList = [
  { value: 'UX/UI가 불편해서' },
  { value: '광고가 너무 많아서' },
  { value: '잘 사용하지 않아서' },
  { value: '개인정보가 걱정되서' },
  { value: '중복 계정이 존재해서' },
  { value: '기타' },
];

export const Default: Story = {
  args: {
    width: 'long',
    selectList: selectList,
  },
  argTypes: {
    defaultValueIndex: { control: false },
    selectedOption: { control: false },
  },
};

export const Placeholder: Story = {
  args: {
    width: 'long',
    selectList: selectList,
    placeholder: '무엇이 불편하셨나요?',
  },
  argTypes: {
    defaultValueIndex: { control: false },
    selectedOption: { control: false },
  },
};

export const DefaultSelect: Story = {
  args: {
    width: 'long',
    selectList: selectList,
    defaultValueIndex: 1,
  },
  argTypes: {
    defaultValueIndex: {
      control: { type: 'number', min: 0, max: 5, step: 1 },
    },
    selectedOption: { control: false },
  },
};
