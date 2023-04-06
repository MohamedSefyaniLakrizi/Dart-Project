import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const STATUS = ['not_done', 'in_progress', 'done'] as const;
type StatusType = typeof STATUS[number];

interface MonthData {
  month: number;
  status: StatusType;
}

const MonthCircle: React.FC<{ month: number; status: StatusType }> = ({
  month,
  status,
}) => {
  const fillColor = () => {
    switch (status) {
      case 'not_done':
        return 'gray';
      case 'in_progress':
        return 'yellow';
      case 'done':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <View style={styles.monthCircleContainer}>
      <Svg height="50" width="50">
        <Circle cx="25" cy="25" r="20" fill={fillColor()} />
      </Svg>
      <Text style={styles.monthText}>{month}</Text>
    </View>
  );
};

const Calendar: React.FC = () => {
  const [months, setMonths] = useState<MonthData[]>([
    { month: 1, status: 'not_done' },
    { month: 2, status: 'in_progress' },
    { month: 3, status: 'done' },
    { month: 4, status: 'not_done' },
    { month: 5, status: 'not_done' },
    { month: 6, status: 'not_done' },
  ]);

  return (
    <View style={styles.container}>
      {months.map((month, index) => (
        <View key={month.month} style={styles.monthContainer}>
          <MonthCircle month={month.month} status={month.status} />
          {index < months.length - 1 && (
            <Svg height="50" width="50">
              <Line
                x1="25"
                y1="25"
                x2="25"
                y2="75"
                stroke="black"
                strokeWidth="2"
              />
            </Svg>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  monthContainer: {
    alignItems: 'center',
  },
  monthCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

/*export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Calendar />
    </View>
  );
}*/

export default Calendar;