import {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

interface Props {
  lesson: IDayLesson;
}

export const LessonView: FC<Props> = ({lesson}) => {
  return (
    <View>
      <Text style={styles.lessonTimeText}>
        {lesson.startTime} - {lesson.endTime}
      </Text>
      {lesson.studentNames.map((name: string) => (
        <View key={name}>
          <Text>{name}</Text>
        </View>
      ))}
    </View>
  );
};
