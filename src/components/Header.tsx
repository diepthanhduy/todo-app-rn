import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {fontSize, heightScale, widthScale} from '../utils/scale';
import moment from 'moment';
import {Icons} from '../assets';
import {colors} from '../styles/colors';

interface IHomeHeaderProps {
  scrollY: SharedValue<number>;
  goBack?: () => void;
  hideBackButton?: boolean;
}

const Header = (props: IHomeHeaderProps) => {
  const {scrollY, goBack, hideBackButton} = props;
  return (
    <View style={styles.container}>
      {!hideBackButton && (
        <Pressable style={styles.backBtn}>
          <Image
            style={styles.iconBack}
            width={widthScale(24)}
            height={widthScale(24)}
            source={Icons.back}
            tintColor={colors.primary}
            resizeMode="contain"
          />
        </Pressable>
      )}
      <Text style={styles.textHeader}>{moment().format('LL')}</Text>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightScale(16),
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: 'white',
  },

  backBtn: {
    position: 'absolute',
    left: widthScale(16),
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: widthScale(12),
    borderRadius: 999,
  },

  iconBack: {
    width: widthScale(24),
    height: widthScale(24),
  },
});
