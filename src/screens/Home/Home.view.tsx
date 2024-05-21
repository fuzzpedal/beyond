import {FC, createRef, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {getStudentsForWeek} from '../../api/query';
import {Lesson} from '../../components/Lesson';
import {styles} from './styles';
import {IWeek, WeekDays, weekDays} from '../../api/types';

const employeeId = 'A1248519453';

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
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
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
      <View style={styles.selectedDay}>
        <Text style={styles.selectedDayText}>{selectedDay}</Text>
      </View>
      <FlatList
        data={week[selectedDay]}
        renderItem={({item}) => <Lesson lesson={item} />}
      />
    </View>
  );
};
