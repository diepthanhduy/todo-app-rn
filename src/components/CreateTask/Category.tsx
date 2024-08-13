import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CategoryImage from '../CategoryImage';
import {fontSize, heightScale, widthScale} from '../../utils/scale';
import {colors} from '../../styles/colors';
import {Images} from '../../assets';

const Category = () => {
  return (
    <View style={{flex: 1}}>
      <Text style={styles.textTitle}>Category</Text>
      <View style={styles.containerList}>
        <ScrollView
          style={styles.list}
          horizontal
          contentContainerStyle={{gap: widthScale(8)}}>
          {Array.from({length: 20}).map((_, index) => (
            <CategoryImage
              key={index}
              source={Images.fileList}
              backgroundColor={colors.second}
            />
          ))}
        </ScrollView>

        <View style={styles.containerMore}>
          <Pressable style={styles.addBtn}>
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
