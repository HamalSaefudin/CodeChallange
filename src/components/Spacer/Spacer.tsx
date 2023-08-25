import React from 'react';
import {View} from 'react-native';

export default function Spacer({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) {
  return <View style={{height, width}} />;
}
