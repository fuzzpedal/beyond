import {FC, useEffect, useState} from 'react';
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {getStudentsForWeek} from '../../api/query';
import {Day} from '../../components/Day';
import {Lesson} from '../../components/Lesson';
import {styles} from './styles';

const employeeId = 'A1248519453';

enum WeekDays {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
}

const weekDays = [
  WeekDays.MONDAY,
  WeekDays.TUESDAY,
  WeekDays.WEDNESDAY,
  WeekDays.THURSDAY,
  WeekDays.FRIDAY,
];

export const HomeView: FC = () => {
  const [week, setWeek] = useState<IWeek>();
  const [selectedDay, setSelectedDay] = useState<string>(WeekDays.MONDAY);

  useEffect(() => {
    const init = async () => {
      const result = await getStudentsForWeek();
      setWeek(result);
    };
    init();
  }, []);

  if (!week) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dayButtons}>
        {weekDays.map((weekDay: string) => (
          <TouchableOpacity
            key={weekDay}
            style={styles.dayButton}
            onPress={() => setSelectedDay(weekDay)}>
            <Text style={styles.dayButtonText}>{weekDay.slice(0, 3)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.selectedDayText}>{selectedDay}</Text>
      <FlatList
        data={week[selectedDay]}
        renderItem={({item}) => <Lesson lesson={item} />}
      />
    </View>
  );
};
