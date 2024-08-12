import React, {memo} from 'react';
import {StatusBar, StatusBarStyle, StyleSheet} from 'react-native';
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {colors} from '../styles/colors';

interface Props {
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
}
const FixContainer = ({
  children,
  backgroundColor,
  statusBarStyle,
  ...rest
}: Props & NativeSafeAreaViewProps) => {
  return (
    <SafeAreaView
      style={[
        styles.view,
        {
          backgroundColor: backgroundColor,
        },
      ]}
      edges={['top', 'bottom']}
      {...rest}>
      <StatusBar
        barStyle={statusBarStyle || 'dark-content'}
        backgroundColor={'transparent'}
      />
      {children}
    </SafeAreaView>
  );
};

export default memo(FixContainer);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
