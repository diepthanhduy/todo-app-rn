import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightScale} from '../utils/scale';
import {colors} from '../styles/colors';

interface IPrimaryButtonProps {
  title: string;
  onPress: () => void;
}

const PrimaryButton = (props: IPrimaryButtonProps) => {
  const {onPress, title} = props;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(PrimaryButton);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightScale(56),
    borderRadius: heightScale(28),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
