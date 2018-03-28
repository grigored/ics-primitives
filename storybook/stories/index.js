import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome';
import {AlertStories} from "../../dist/src/nativeComponents/Alert/Alert.storybook.native";

const addStories = (title, storiesData) => {
  const s = storiesOf(title, module);
  storiesData.forEach(oneData => s.add(oneData.title, oneData.component));
};

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

addStories('Alert', AlertStories);
