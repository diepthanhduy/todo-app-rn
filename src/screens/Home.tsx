import {
  FlatList,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {colors} from '../styles/colors';
import {fontSize, heightScale, widthScale} from '../utils/scale';
import FixContainer from '../components/FixContainer';
import Header from '../components/Header';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import TodoItem from '../components/TodoItem';

const arrData = {
  todo: [
    {
      id: 1,
      title:
        'Todo 1 ne is simply dummy text of the printing and is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      time: '10:00',
    },
    {
      id: 2,
      title: 'Todo 2',
      time: '11:00',
    },
    {
      id: 3,
      title: 'Todo 3',
      time: '12:00',
    },
    {
      id: 4,
      title: 'Todo 4',
      time: '13:00',
    },
    {
      id: 5,
      title: 'Todo 5',
      time: '14:00',
    },
    {
      id: 6,
      title: 'Todo 6',
      time: '15:00',
    },
    {
      id: 7,
      title: 'Todo 7',
      time: '16:00',
    },
    {
      id: 8,
      title: 'Todo 8',
      time: '17:00',
    },
    {
      id: 9,
      title: 'Todo 9',
      time: '18:00',
    },
    {
      id: 10,
      title: 'Todo 10',
      time: '19:00',
    },
  ],
  completed: [
    {
      id: 1,
      title: 'Completed 1',
      time: '10:00',
    },
    {
      id: 2,
      title: 'Completed 2',
      time: '11:00',
    },
    {
      id: 3,
      title: 'Completed 3',
      time: '12:00',
    },
    {
      id: 4,
      title: 'Completed 4',
      time: '13:00',
    },
    {
      id: 5,
      title: 'Completed 5',
      time: '14:00',
    },
    {
      id: 6,
      title: 'Completed 6',
      time: '15:00',
    },
    {
      id: 7,
      title: 'Completed 7',
      time: '16:00',
    },
    {
      id: 8,
      title: 'Completed 8',
      time: '17:00',
    },
    {
      id: 9,
      title: 'Completed 9',
      time: '18:00',
    },
    {
      id: 10,
      title: 'Completed 10',
    },
  ],
};

const sectionData = [
  {
    title: 'Todo',
    data: arrData.todo,
  },
  {
    title: 'Completed',
    data: arrData.completed,
  },
];

const Home = () => {
  const offsetY = useSharedValue(0);

  const renderItem = useCallback(
    ({item, index, section}: {item: any; index: number; section: any}) => {
      const isFirst = index === 0;
      const isLast = index === section.data.length - 1;
      return <TodoItem item={item} isFirst={isFirst} isLast={isLast} />;
    },
    [],
  );

  const keyExtractor = useCallback((item: any, index: number) => {
    return index.toString();
  }, []);

  const renderHeaderFlatList = useCallback(() => {
    return (
      <View style={styles.listHeaderBox}>
        <Text style={styles.textHeader}>My Todo List</Text>
      </View>
    );
  }, []);

  const renderSectionHeader = useCallback(
    ({section}: {section: {title: string}}) => {
      if (section.title === 'Todo') {
        return null;
      }

      return <Text style={styles.titleSection}>{section.title}</Text>;
    },
    [],
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <Header scrollY={offsetY} hideBackButton />

      {/* Background header */}
      <View style={styles.backgroundHeader} />

      <SectionList
        sections={sectionData}
        ItemSeparatorComponent={renderSeparator}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.containerList}
        ListHeaderComponent={renderHeaderFlatList}
        onScroll={e => {
          offsetY.value = e.nativeEvent.contentOffset.y;
        }}
        removeClippedSubviews
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  backgroundHeader: {
    backgroundColor: colors.primary,
    height: heightScale(222),
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },

  listHeaderBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightScale(32),
  },
  textHeader: {
    fontSize: fontSize(30),
    color: 'white',
    fontWeight: '600',
  },

  containerList: {
    paddingHorizontal: widthScale(16),
  },

  titleSection: {
    fontSize: fontSize(16),
    fontWeight: 'semibold',
    marginVertical: heightScale(16),
    color: 'black',
  },

  itemSeparator: {
    height: heightScale(2),
    backgroundColor: colors.line,
    borderColor: colors.line,
  },
});
