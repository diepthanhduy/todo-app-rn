import {Image, StyleSheet, Text, View} from 'react-native';
import React, {memo, useMemo} from 'react';
import {fontSize, widthScale} from '../utils/scale';
import {Images} from '../assets';
import {colors} from '../styles/colors';
import CheckBox from './CheckBox';

const TodoItem = (props: any) => {
  const {isFirst, isLast, item} = props;

  const itemStyle = useMemo(() => {
    return [
      styles.container,
      isFirst && styles.firstItem,
      isLast && styles.lastItem,
    ];
  }, [isFirst, isLast]);

  return (
    <View style={itemStyle}>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={Images.fileList} />
      </View>

      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.textTitle}>
          {item?.title || 'TodoItem'}
        </Text>
        <Text numberOfLines={2} style={styles.textTime}>
          {item?.time || 'Time'}
        </Text>
      </View>

      <View>
        <CheckBox />
      </View>
    </View>
  );
};

export default memo(TodoItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: widthScale(16),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstItem: {
    borderTopLeftRadius: widthScale(16),
    borderTopRightRadius: widthScale(16),
  },
  lastItem: {
    borderBottomLeftRadius: widthScale(16),
    borderBottomRightRadius: widthScale(16),
  },

  image: {
    width: widthScale(24),
    height: widthScale(24),
  },
  imageBox: {
    padding: widthScale(12),
    borderRadius: 50,
    backgroundColor: colors.second,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthScale(8),
  },

  textTitle: {
    fontSize: fontSize(16),
    fontWeight: '500',
    color: 'black',
  },
  textTime: {
    fontSize: fontSize(14),
    fontWeight: '400',
    color: colors.black(0.7),
  },
  textContainer: {
    flex: 1,
    marginRight: widthScale(8),
  },

  containerCheckBox: {
    width: widthScale(24),
    marginLeft: widthScale(12),
  },
});
