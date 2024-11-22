// ExpenseChart.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  amount: string;
  description: string;
  category: string;
  date: string;
}

interface ExpenseChartProps {
  transactions: Transaction[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  // Kategorilere göre harcamaları gruplayacağız
  const categorizedData = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = parseFloat(transaction.amount);

    // Eğer kategori daha önce eklenmemişse, yeni bir kategori ekliyoruz
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;

    return acc;
  }, {} as { [key: string]: number });

  // Gruplanan veriyi PieChart için uygun bir formata dönüştürme
  const chartData = Object.keys(categorizedData).map((category) => ({
    name: category,
    value: categorizedData[category],
  }));

  return (
    <div className="expense-chart">
      <h2>Harcama Grafiği</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
