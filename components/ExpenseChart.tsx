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
  // transactions dizisini useState ile yönetiyoruz
  // Bu dizi, harcama verilerini tutacak
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // LocalStorage'dan verileri almak için useEffect kullanıyoruz
  useEffect(() => {
    // 'transactions' verisini localStorage'dan alıyoruz. Eğer veri yoksa, boş dizi dönüyoruz.
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    // Veriyi state'e set ediyoruz
    setTransactions(storedTransactions);
  }, []); // Bu useEffect sadece ilk renderda çalışır

  // Kategorilere göre toplam harcamaları hesaplamak için bir nesne oluşturuyoruz
  const categories = ["Yiyecek", "Ulaşım", "Eğlence", "Faturalar", "Diğer"];
  // Başlangıçta tüm kategorilerin harcama miktarını sıfır olarak tanımlıyoruz
  const categorySums = {
    Yiyecek: 0,
    Ulaşım: 0,
    Eğlence: 0,
    Faturalar: 0,
    Diğer: 0,
  };

  // transactions dizisinde döngü yaparak her bir harcamayı ilgili kategoriye ekliyoruz
  transactions.forEach((transaction) => {
    // Harcama miktarını sayıya çeviriyoruz ve kategoriye göre ekliyoruz
    if (transaction.category === "Yiyecek") {
      categorySums.Yiyecek += parseFloat(transaction.amount);
    } else if (transaction.category === "Ulaşım") {
      categorySums.Ulaşım += parseFloat(transaction.amount);
    } else if (transaction.category === "Eğlence") {
      categorySums.Eğlence += parseFloat(transaction.amount);
    } else if (transaction.category === "Faturalar") {
      categorySums.Faturalar += parseFloat(transaction.amount);
    } else {
      categorySums.Diğer += parseFloat(transaction.amount);
    }
  });

  // Grafik için gerekli veriyi hazırlıyoruz
  const data = {
    // Grafik etiketleri (kategoriler)
    labels: categories,
    datasets: [
      {
        label: "Bu Ayki Harcamalar", // Grafik başlığı
        // Kategorilere göre harcamaların toplamları
        data: [
          categorySums.Yiyecek,
          categorySums.Ulaşım,
          categorySums.Eğlence,
          categorySums.Faturalar,
          categorySums.Diğer,
        ],
        // Çubuğun rengini ve stilini belirliyoruz
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Çubuğun iç rengi
        borderColor: "rgba(75, 192, 192, 1)", // Çubuğun sınır rengi
        borderWidth: 1, // Çubuğun kenar çizgisi kalınlığı
      },
    ],
  };

  // Grafik için seçenekleri belirliyoruz
  const options = {
    responsive: true, // Ekran boyutuna göre grafik uyum sağlasın
    plugins: {
      title: {
        display: true, // Başlık görünsün
        text: "Aylık Harcama Grafiği", // Başlık metni
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Y ekseni sıfırdan başlasın
      },
    },
  };

  // JSX döndürüyoruz, burada grafik render edilecek
  return (
    <div className="expense-chart">
      {/* Bar grafiği render ediyoruz */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
