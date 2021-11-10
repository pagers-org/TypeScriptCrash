import { Story } from '@storybook/react'
import Header from './Header';

const HeaderStories = {
  title: 'common/Header',
  component: Header,
}

const Template: Story = args => <Header {...args} />;

export const Default = Template.bind({});
export default HeaderStories;