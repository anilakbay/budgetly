import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js modüllerini ekleyin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart: React.FC = () => {
  // Örnek harcama verileri
  const data = {
    labels: ["Yiyecek", "Ulaşım", "Eğlence", "Faturalar", "Diğer"],
    datasets: [
      {
        label: "Bu Ayki Harcamalar",
        data: [300, 200, 150, 100, 50], // Burada harcama verilerini girebilirsiniz
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Grafik çubuğunun rengi
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Grafik seçenekleri
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Aylık Harcama Grafiği",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="expense-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
