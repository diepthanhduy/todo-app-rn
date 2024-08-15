import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import {fontSize, widthScale} from '../utils/scale';
import {Images} from '../assets';
import {colors} from '../styles/colors';
import CheckBox from './CheckBox';
import {ITodo} from '../interfaces';
import moment from 'moment';
import * as RNFS from '@dr.pogodin/react-native-fs';
import useAppStore from '../store/store';

interface ITodoItem {
  item: ITodo;
  isFirst?: boolean;
  isLast?: boolean;
  onPressItem: (item: ITodo) => void;
}

const TodoItem = (props: ITodoItem) => {
  const {isFirst, isLast, item, onPressItem} = props;
  const {completeTodo, undoComplete} = useAppStore();

  const diffDay = moment().diff(item?.time, 'days');
  const isDisabled = item?.completed && diffDay > 2;

  const getImagePath = (todo: ITodo) => {
    if ([0, 1, 2].includes(item?.type_id ? +item?.type_id : 0)) {
      const Img: any = Images;
      return Img[todo?.image || 'fileList'];
    }

    return {uri: `${RNFS.DocumentDirectoryPath}/${todo?.image}`};
  };

  const onCheck = useCallback(
    (status: boolean) => {
      if (status) {
        completeTodo(item?.id || 0);
      } else {
        undoComplete(item?.id || 0);
      }
    },
    [item?.id, completeTodo, undoComplete],
  );

  const itemStyle = useMemo(() => {
    return [
      styles.container,
      isFirst && styles.firstItem,
      isLast && styles.lastItem,
    ];
  }, [isFirst, isLast]);

  const textContainerStyle = useMemo(() => {
    return [
      styles.textContainer,
      {
        opacity: item?.completed ? 0.5 : 1,
      },
    ];
  }, [item?.completed]);

  const textTitleStyle: any = useMemo(() => {
    return [
      styles.textTitle,
      {
        textDecorationLine: item?.completed ? 'line-through' : 'none',
      },
    ];
  }, [item?.completed]);

  const styleImageBox: StyleProp<ViewStyle> = useMemo(() => {
    return [
      styles.imageBox,
      {
        opacity: item?.completed ? 0.5 : 1,
        backgroundColor: item?.color || colors.second,
      },
    ];
  }, [item?.color, item?.completed]);

  const pressOnItem = useCallback(() => {
    if (isDisabled) {
      return;
    }
    onPressItem(item);
  }, [item, onPressItem, isDisabled]);

  return (
    <Pressable onPress={pressOnItem}>
      <View style={itemStyle}>
        <View style={styleImageBox}>
          <Image style={styles.image} source={getImagePath(item) as any} />
        </View>

        <View style={textContainerStyle}>
          <Text numberOfLines={2} style={textTitleStyle}>
            {item?.title || 'TodoItem'}
          </Text>
          <Text numberOfLines={2} style={styles.textTime}>
            {item?.time ? moment(item?.time).format('lll') : 'No Time'}
          </Text>
        </View>

        <View>
          <CheckBox
            onChange={onCheck}
            isChecked={item?.completed}
            disabled={isDisabled}
          />
        </View>
      </View>
    </Pressable>
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
    color: colors.black('70'),
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
