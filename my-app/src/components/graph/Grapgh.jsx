import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Graph = ({ time, exercise }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

  const exerciseData = [];

const uniqueExercises = [...new Set(exercise.map((item) => item.name))];

const colors = ['#FF5733', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

uniqueExercises.forEach((exerciseName, index) => {
  const exerciseLine = [];

  for (let day = 1; day <= lastDayOfMonth; day++) {
    if (time[day - 1] !== undefined) {
      exerciseLine.push({ x: day, y: Math.floor(time[day - 1] / 1000) });
    }
  }

  console.log(exerciseLine)

  exerciseData.push({
    name: exerciseName,
    data: exerciseLine,
    fill: colors[index % colors.length],
    line: true,
    shape: "star",
  });
});

// Функція, яка створює компоненти Scatter на основі даних
const renderScatterComponents = () => {
  return exerciseData.map((exercise) => (
    <Scatter
      key={exercise.name}
      name={exercise.name}
      data={exercise.data}
      fill={exercise.fill}
      line={exercise.line}
      shape={exercise.shape}
    />
  ));
};

return (
  <ResponsiveContainer width="100%" height={400}>
    <ScatterChart
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis
        type="number"
        dataKey="x"
        name="час"
        unit="д"
        domain={['dataMin', 'dataMax']}
      />
      <YAxis type="number" dataKey="y" name="cек" unit="сек" />
      <ZAxis type="number" range={[100]} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      {renderScatterComponents()} {/* Викликаємо функцію для генерації компонентів */}
    </ScatterChart>
  </ResponsiveContainer>
);
};

export default Graph;
