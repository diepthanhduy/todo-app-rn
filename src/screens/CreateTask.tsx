import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {colors} from '../styles/colors';
import {fontSize, heightScale, widthScale} from '../utils/scale';

const CreateTask = () => {
  return (
    <ScrollView style={styles.container}>
      <Header title="Add New Task" style={{backgroundColor: colors.primary}} />

      <View style={styles.containerContent}>
        <View style={styles.section}>
          <Text style={styles.textTitle}>Task title</Text>
          <View style={styles.boxBorder}>
            <TextInput style={styles.input} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default React.memo(CreateTask);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  containerContent: {
    paddingHorizontal: widthScale(16),
  },

  section: {
    paddingVertical: heightScale(24),
  },
  textTitle: {
    fontSize: fontSize(14),
    fontWeight: '500',
    color: colors.black(''),
  },

  boxBorder: {
    backgroundColor: 'white',
    padding: widthScale(12),
    marginTop: heightScale(8),
    borderRadius: widthScale(8),
    borderWidth: widthScale(1),
    borderColor: colors.line,
  },

  input: {
    paddingVertical: Platform.OS === 'android' ? 0 : 6,
  },
});
