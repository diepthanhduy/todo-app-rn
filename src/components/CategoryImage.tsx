import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {Images} from '../assets';
import {widthScale} from '../utils/scale';

interface ICategoryImage {
  source: ImageSourcePropType;
  backgroundColor?: string;
  isSelected?: boolean;
}
const CategoryImage = (props: ICategoryImage) => {
  const {source, backgroundColor, isSelected} = props;
  const styleContainer: StyleProp<ViewStyle> = React.useMemo(() => {
    return {
      ...styles.container,
      backgroundColor,
      opacity: isSelected ? 1 : 0.4,
    };
  }, [backgroundColor, isSelected]);

  return (
    <View style={styleContainer}>
      <Image style={styles.image} source={source} />
    </View>
  );
};

export default React.memo(CategoryImage);

const styles = StyleSheet.create({
  container: {
    padding: widthScale(12),
    borderRadius: widthScale(48),
    borderWidth: widthScale(2),
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: widthScale(24),
    height: widthScale(24),
  },
});
