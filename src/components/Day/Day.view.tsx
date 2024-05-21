import {FC} from 'react';
import {View} from 'react-native';
import {Lesson} from '../Lesson';

interface Props {
  lessons: IDayLesson[];
}

export const DayView: FC<Props> = ({lessons}) => {
  return (
    <View>
      {lessons.map((lesson: IDayLesson) => (
        <Lesson key={lesson.startTime} lesson={lesson} />
      ))}
    </View>
  );
};
