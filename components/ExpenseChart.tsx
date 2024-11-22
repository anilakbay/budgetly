import React, { useEffect, useState } from "react";
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

// Chart.js modüllerini kaydediyoruz
ChartJS.register(
  CategoryScale, // X eksenindeki kategoriler için
  LinearScale, // Y ekseninde sayısal veriler için
  BarElement, // Bar grafiği elemanı
  Title, // Başlık eklemek için
  Tooltip, // Grafikteki veriler için ipuçları
  Legend // Grafik için açıklama (legend)
);

// Harcama verileri için TypeScript türü tanımlıyoruz
interface Transaction {
  amount: string; // Harcama miktarı (string olarak alınır çünkü veriler localStorage'dan string olarak gelir)
  category: string; // Harcama kategorisi (örneğin: Yiyecek, Ulaşım, vb.)
}

const ExpenseChart: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // 'transactions' verisini localStorage'dan alıyoruz. Eğer veri yoksa, boş dizi dönüyoruz.
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(storedTransactions);
  }, []);

  // Kategorilerin toplamını hesaplamak için reduce kullanıyoruz
  const categorySums = transactions.reduce(
    (acc: Record<string, number>, transaction) => {
      const category = transaction.category || "Diğer"; // Kategori yoksa "Diğer" olarak kabul et
      const amount = parseFloat(transaction.amount);

      // Kategoriyi ve harcama miktarını toplamaya ekliyoruz
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    },
    {}
  );

  // Grafik için veriyi hazırlıyoruz
  const categories = Object.keys(categorySums); // Kategorileri dinamik olarak alıyoruz
  const data = {
    labels: categories, // Grafik etiketleri (dinamik olarak alınan kategoriler)
    datasets: [
      {
        label: "Bu Ayki Harcamalar", // Grafik başlığı
        data: categories.map((category) => categorySums[category]), // Kategorilere göre harcama verisi
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Çubuğun iç rengi
        borderColor: "rgba(75, 192, 192, 1)", // Çubuğun sınır rengi
        borderWidth: 1, // Çubuğun kenar çizgisi kalınlığı
      },
    ],
  };

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
