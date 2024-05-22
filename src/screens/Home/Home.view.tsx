import { FC, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { getWeekPlan } from '../../api/query';
import { IWeek, WeekDays, weekDays } from '../../api/types';
import { Lesson } from '../../components/Lesson';
import { styles } from './styles';

export const HomeView: FC = () => {
  const [week, setWeek] = useState<IWeek>();
  const [selectedDay, setSelectedDay] = useState<string>(WeekDays.MONDAY);

  useEffect(() => {
    const init = async () => {
      const result = await getWeekPlan();
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
        renderItem={({ item }) => <Lesson lesson={item} />}
      />
    </View>
  );
};
