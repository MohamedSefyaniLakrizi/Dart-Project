// Month.tsx
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import styled from 'styled-components/native';

export interface MonthData {
  id: number;
  name: string;
  status: 'done' | 'not done';
}

interface MonthProps {
  month: MonthData;
}

const Month: React.FC<MonthProps> = ({ month }) => {
  const [status, setStatus] = useState<'done' | 'not done'>('not done');

  useEffect(() => {
    // Replace with your API call
    const fetchData = async () => {
      const response = await fetch(`https://your-api.com/month-status/${month.id}`);
      const result = await response.json();
      setStatus(result.status);
    };

    fetchData();
  }, [month.id]);

  const statusIcon = status === 'done' ? '✔' : '✖';

  return (
    <Container>
      <Svg height="60" width="60">
        <Circle cx="30" cy="30" r="28" strokeWidth="4" stroke="#4a4a4a" fill="#fff" />
        <MonthNumber x="30" y="34" fontSize="16" fontWeight="bold" textAnchor="middle">
          {month.id}
        </MonthNumber>
      </Svg>
      <MonthName>{month.name}</MonthName>
      <Svg height="50" width="80">
        <Line
          x1="30"
          y1="10"
          x2="50"
          y2="40"
          strokeWidth="4"
          stroke="#4a4a4a"
          strokeLinecap="round"
        />
        <Circle cx="50" cy="40" r="10" strokeWidth="2" stroke="#4a4a4a" fill="#fff" />
        <StatusIcon x="50" y="44" fontSize="14" fontWeight="bold" textAnchor="middle">
          {statusIcon}
        </StatusIcon>
      </Svg>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
`;

const MonthNumber = styled(Text)`
  fill: #4a4a4a;
`;

const MonthName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StatusIcon = styled(Text)`
  fill: #4a4a4a;
`;

export default Month;
