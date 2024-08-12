import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {scale, widthScale} from '../utils/scale';
import {colors} from '../styles/colors';
import {Icons} from '../assets';
import Animated, {BounceIn, useAnimatedStyle} from 'react-native-reanimated';

interface ICheckBoxProps {
  disabled?: boolean;
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const CheckBox = (props: ICheckBoxProps) => {
  const {disabled, isChecked: isCheckProp, onChange} = props;
  const [isChecked, setIsChecked] = React.useState(isCheckProp);

  const checkBoxStyle = useAnimatedStyle(() => {
    return {
      ...styles.container,
      backgroundColor: isChecked ? colors.primary : 'white',
    };
  });

  const onPress = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Animated.View style={checkBoxStyle}>
        {isChecked && (
          <Animated.Image
            resizeMode="contain"
            style={styles.imgCheck}
            source={Icons.check}
            tintColor={'white'}
            entering={BounceIn.duration(350)}
          />
        )}
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(CheckBox);

const styles = StyleSheet.create({
  container: {
    width: widthScale(24),
    height: widthScale(24),
    borderRadius: widthScale(4),
    borderWidth: widthScale(1),
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCheck: {
    width: widthScale(16),
    height: widthScale(16),
  },
});
