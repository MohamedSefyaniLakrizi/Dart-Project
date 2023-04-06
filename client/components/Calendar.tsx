// Calendar.tsx
import React from 'react';
import { View } from 'react-native';
import Month, { MonthData } from './Month';

const Calendar: React.FC = () => {
  const months: MonthData[] = [
    { id: 1, name: 'January', status: 'done' },
    { id: 2, name: 'February', status: 'not done' },
    // ...
  ];

  return (
    <View>
      {months.map((month) => (
        <Month key={month.id} month={month} />
      ))}
    </View>
  );
};

export default Calendar;
