import type { Meta, StoryObj } from '@storybook/angular';
import { SampleComponent } from './sample.component';

export default {
  component: SampleComponent,
  title: 'SampleComponent',
} as Meta<SampleComponent>;

export const Default: StoryObj<SampleComponent> = {
  args: {},
};
