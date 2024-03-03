import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@repo/ui';

const meta = {
  title: 'DesignSystem/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: { checked: { control: false } },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    label: '동의',
    value: 'agree',
    name: 'agree',
    checked: true,
    onChange({ name, value }) {
      console.log(name, value);
    },
  },
};

export const NotChecked: Story = {
  args: {
    label: '비동의',
    value: 'disagree',
    name: 'disagree',
    checked: false,
    onChange({ name, value }) {
      console.log(name, value);
    },
  },
};

export const Group = () => {
  return (
    <div>
      <Radio
        label='동의'
        name='policy'
        value='agree'
        checked={true}
        onChange={({ name, value }) => {
          console.log({ name, value });
        }}
      />
      <Radio
        label='비동의'
        name='policy'
        value='disagree'
        checked={false}
        onChange={({ name, value }) => {
          console.log({ name, value });
        }}
      />
    </div>
  );
};
