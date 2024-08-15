import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CategoryImage from '../CategoryImage';
import {fontSize, heightScale, widthScale} from '../../utils/scale';
import {colors} from '../../styles/colors';
import useAppStore from '../../store/store';
import {ITodoType} from '../../interfaces';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {Images} from '../../assets';

interface ICategoryProps {
  onPressAdd: () => void;
  onSelected: (index: number) => void;
}
const Category = (props: ICategoryProps) => {
  const {todoTypes} = useAppStore();

  const [iSelected, setISelected] = React.useState(0);

  const {onPressAdd, onSelected} = props;

  const getImagePath = (item: ITodoType) => {
    if ([0, 1, 2].includes(+item?.id)) {
      const Img: any = Images;
      return Img[item?.image || 'fileList'];
    }

    return {uri: `${RNFS.DocumentDirectoryPath}/${item?.image}`};
  };
  return (
    <View style={{flex: 1}}>
      <Text style={styles.textTitle}>Category</Text>
      <View style={styles.containerList}>
        <ScrollView
          style={styles.list}
          horizontal
          contentContainerStyle={{gap: widthScale(8)}}>
          {todoTypes.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setISelected(index);
                onSelected(index);
              }}>
              <CategoryImage
                source={getImagePath(item) as any}
                backgroundColor={item?.color || colors.second}
                isSelected={iSelected === index}
              />
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.containerMore}>
          <Pressable style={styles.addBtn} onPress={onPressAdd}>
            <Text style={styles.textAddBtn}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Category);

const styles = StyleSheet.create({
  containerList: {
    flex: 1,
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: fontSize(14),
    fontWeight: '500',
    color: colors.black(''),
  },
  list: {
    marginTop: heightScale(8),
    marginRight: widthScale(8),
  },

  containerMore: {
    width: widthScale(56),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    backgroundColor: colors.primary,
    width: widthScale(56),
    height: widthScale(36),
    borderRadius: widthScale(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScale(8),
  },
  textAddBtn: {
    fontSize: fontSize(14),
    fontWeight: '500',
    color: 'white',
  },
});
