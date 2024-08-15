import {
  InteractionManager,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {colors} from '../styles/colors';
import {fontSize, heightScale, widthScale} from '../utils/scale';
import Header from '../components/Header';
import {useSharedValue} from 'react-native-reanimated';
import TodoItem from '../components/TodoItem';
import {createSectionData} from '../utils/chunkData';

import {ITodo} from '../interfaces';
import PrimaryButton from '../components/PrimaryButton';
import useAppStore from '../store/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../interfaces/rootStack';

const Home = () => {
  const offsetY = useSharedValue(0);
  const navigation = useNavigation<NavigationProps>();
  const {todos: data, cacheTodos} = useAppStore();

  useEffect(() => {
    InteractionManager.runAfterInteractions(async () => {
      getTodoToday();
    });
  }, []);

  const getTodoToday = () => {
    const today = new Date();
    const todayTodos = data.filter(todo => {
      return (
        todo.time &&
        new Date(todo.time).getDate() === today.getDate() &&
        new Date(todo.time).getMonth() === today.getMonth() &&
        new Date(todo.time).getFullYear() === today.getFullYear()
      );
    });
    cacheTodos(todayTodos);
  };

  const pressAddTaskBtn = () => {
    console.log('Button Pressed');
    navigation.navigate('CreateTask');
  };

  const pressOnItem = useCallback((todo: ITodo) => {
    navigation.navigate('CreateTask', {todo});
  }, []);

  const renderItem = React.useCallback(
    ({item, index, section}: {item: ITodo; index: number; section: any}) => {
      const isFirst = index === 0;
      const isLast = index === section.data.length - 1;
      return (
        <TodoItem
          onPressItem={pressOnItem}
          item={item}
          isFirst={isFirst}
          isLast={isLast}
        />
      );
    },
    [],
  );

  const keyExtractor = React.useCallback((item: any, index: number) => {
    return index.toString();
  }, []);

  const renderHeaderFlatList = React.useCallback(() => {
    return (
      <View style={styles.listHeaderBox}>
        <Text style={styles.textHeader}>My Todo List</Text>
      </View>
    );
  }, []);

  const renderSectionHeader = React.useCallback(
    ({section}: {section: {title: string; data: ITodo[]}}) => {
      if (section.title === 'Todo' || !section?.data?.length) {
        return null;
      }

      return <Text style={styles.titleSection}>{section.title}</Text>;
    },
    [],
  );

  const renderSeparator = React.useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

  const renderEmptyList = React.useCallback(() => {
    return (
      <View style={styles.center}>
        <Text style={styles.textHeaderEmpty}>No event</Text>
        <Text style={styles.textContentEmpty}>You have no upcoming events</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

        <Header scrollY={offsetY} hideBackButton />

        {/* Background header */}
        <View style={styles.backgroundHeader} />

        <SectionList
          sections={data.length ? createSectionData(data) : []}
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
          ListEmptyComponent={renderEmptyList}
        />
      </View>
      <View style={styles.containerBottomBtn}>
        <PrimaryButton onPress={pressAddTaskBtn} title="Add New Task" />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

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

  textHeaderEmpty: {
    fontSize: fontSize(24),
    color: 'white',
    fontWeight: '500',
  },
  textContentEmpty: {
    fontSize: fontSize(14),
    color: 'white',
    fontWeight: '400',
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
    height: heightScale(1),
    backgroundColor: colors.line,
    borderColor: colors.line,
  },

  containerBottomBtn: {
    padding: widthScale(16),
  },
  imgEmpty: {
    width: '100%',
    height: 'auto',
  },
});
