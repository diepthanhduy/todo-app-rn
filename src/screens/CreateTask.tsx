import {
  Keyboard,
  Platform,
  Pressable,
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
import PrimaryButton from '../components/PrimaryButton';
import Category from '../components/CreateTask/Category';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import {ITodo} from '../interfaces';
import useAppStore from '../store/store';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import Toast from 'react-native-toast-message';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../interfaces/rootStack';

const CreateTask = () => {
  const todo =
    useRoute<RouteProp<RootStackParamList, 'CreateTask'>>()?.params?.todo;

  const {addTodo, todoTypes, updateTodo} = useAppStore();

  const [date, setDate] = React.useState(todo?.time || new Date());
  const [isOpenDatePicker, setIsOpenDatePicker] = React.useState(false);
  const [isOpenTimePicker, setIsOpenTimePicker] = React.useState(false);
  const [time, setTime] = React.useState(
    todo?.time || moment().add('minute', 30).toDate(),
  );
  const [modeDatePicker, setModeDatePicker] = React.useState<'date' | 'time'>(
    'date',
  );
  const [title, setTitle] = React.useState(todo?.title || '');
  const [note, setNote] = React.useState(todo?.note || '');
  const [iSelectType, setISelectType] = React.useState(
    Number(todo?.type_id) || 0,
  );

  const isDisabled = !title || !date || !time;

  const clearData = () => {
    Keyboard.dismiss();

    setTitle('');
    setNote('');
  };

  const showToast = () => {
    if (todo) {
      Toast.show({
        type: 'success',
        text1: 'Updated',
        text2: 'You have updated the task',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'You have created a new task',
      });
    }
  };

  const handleUpdateTodo = () => {
    if (!todo?.id) return;

    const timeTodo = moment(date)
      .set('hour', time.getHours())
      .set('minute', time.getMinutes())
      .toDate();

    const typeTodo = todoTypes[iSelectType];

    const todoUpdate: ITodo = {
      id: todo?.id,
      title,
      completed: false,
      time: timeTodo,
      created_at: new Date(),

      type_id: typeTodo?.id,
      color: typeTodo?.color,
      image: typeTodo?.image,
    };
    updateTodo(todoUpdate);
  };

  const pressSave = () => {
    if (props?.todo) {
      handleUpdateTodo();
      showToast();
      return;
    }

    console.log('first', {
      title,
      note,
      date: date,
      time: time,
    });

    const timeTodo = moment(date)
      .set('hour', time.getHours())
      .set('minute', time.getMinutes())
      .toDate();

    const typeTodo = todoTypes[iSelectType];

    const newTodo: ITodo = {
      id: timeTodo.valueOf(),
      title,
      completed: false,
      time: timeTodo,
      created_at: new Date(),

      type_id: typeTodo?.id,
      color: typeTodo?.color,
      image: typeTodo?.image,
    };
    addTodo(newTodo);

    const trigger: TimestampTrigger = {
      timestamp: timeTodo.getTime(),
      type: TriggerType.TIMESTAMP,
    };

    notifee.createTriggerNotification(
      {
        id: timeTodo.valueOf().toString(),
        title,
        body: note ? note : moment(timeTodo).format('HH:mm'),
        android: {
          channelId: 'default',
        },
      },
      trigger,
    );

    clearData();

    showToast();
  };

  const pressAddCategory = () => {
    console.log('press add category');
  };

  return (
    <View style={styles.container}>
      <Header title="Add New Task" style={{backgroundColor: colors.primary}} />

      <ScrollView style={styles.container}>
        <View style={styles.containerContent}>
          <View style={styles.section}>
            <Text style={styles.textTitle}>Task title</Text>
            <View style={styles.boxBorder}>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Task Title"
                maxLength={50}
              />
            </View>
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Category
              onSelected={i => {
                console.log('index selectedd', i);
                setISelectType(i);
              }}
              onPressAdd={pressAddCategory}
            />
          </View>

          {/* Due Date */}
          <View style={styles.containerDateTime}>
            <View style={styles.section}>
              <Text style={styles.textTitle}>Date</Text>
              <View style={styles.boxBorder}>
                <Pressable
                  hitSlop={20}
                  onPress={() => {
                    setIsOpenDatePicker(!isOpenDatePicker);
                    setModeDatePicker('date');
                  }}>
                  <Text>{moment(date).format('DD/MM/YYYY')}</Text>
                </Pressable>
                <DatePicker
                  minimumDate={new Date()}
                  modal
                  mode={modeDatePicker}
                  open={isOpenDatePicker}
                  date={new Date()}
                  onConfirm={(date: Date) => {
                    setDate(date);
                    setIsOpenDatePicker(false);
                  }}
                  onCancel={() => setIsOpenDatePicker(false)}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.textTitle}>Time</Text>
              <View style={styles.boxBorder}>
                <Pressable
                  hitSlop={20}
                  onPress={() => {
                    setIsOpenTimePicker(true);
                    setModeDatePicker('time');
                  }}>
                  <Text>{moment(time).format('HH:mm')}</Text>
                </Pressable>

                <DatePicker
                  modal
                  minimumDate={undefined}
                  mode={modeDatePicker}
                  open={isOpenTimePicker}
                  date={new Date()}
                  onConfirm={(date: Date) => {
                    setIsOpenTimePicker(false);

                    setTime(date);
                  }}
                  onCancel={() => setIsOpenTimePicker(false)}
                  hitSlop={50}
                />
              </View>
            </View>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.textTitle}>Notes</Text>
            <View style={styles.boxBorder}>
              <TextInput
                value={note}
                onChangeText={setNote}
                style={[styles.input, {textAlignVertical: 'top'}]}
                placeholder="Notes"
                multiline
                numberOfLines={8}
                maxLength={500}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.containerBottomBtn}>
        <PrimaryButton
          onPress={() => {
            console.log('onpress create');
            pressSave();
          }}
          title="Save"
          disabled={isDisabled}
        />
      </View>
    </View>
  );
};

export default React.memo(CreateTask);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  containerContent: {
    flex: 1,
    paddingHorizontal: widthScale(16),
    paddingVertical: heightScale(12),
  },

  section: {
    paddingVertical: heightScale(12),
    flex: 1,
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

  containerBottomBtn: {
    padding: widthScale(16),
  },

  containerDateTime: {
    flexDirection: 'row',
    gap: widthScale(8),
  },
});
