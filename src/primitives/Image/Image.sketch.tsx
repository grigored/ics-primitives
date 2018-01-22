import * as React from 'react';
import { Image as SketchImage } from 'react-sketchapp';
import {ImageProps} from "./Image.types";

export const Image: React.StatelessComponent<ImageProps> = ({source, ...other}) => (
  <SketchImage
      source={source.uri}
      {...other}
  />
);