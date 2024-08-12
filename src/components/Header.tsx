import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {fontSize, heightScale, widthScale} from '../utils/scale';
import moment from 'moment';
import {Icons} from '../assets';
import {colors} from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../interfaces/rootStack';

interface IHomeHeaderProps {
  scrollY?: SharedValue<number>;
  goBack?: () => void;
  hideBackButton?: boolean;
  style?: StyleProp<ViewStyle>;

  title?: string;
}

const Header = (props: IHomeHeaderProps) => {
  const {scrollY, goBack, hideBackButton, style, title} = props;
  const navigation = useNavigation<NavigationProps>();

  const pressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      {!hideBackButton && (
        <Pressable style={styles.backBtn} onPress={pressGoBack}>
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
      <Text style={styles.textHeader}>
        {title ? title : moment().format('LL')}
      </Text>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightScale(32),
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
