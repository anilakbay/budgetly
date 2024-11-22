import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

// Transaction tipi (daha önce bunu tanımlamıştık)
type Transaction = {
  category: string;
  amount: number;
  date: string;
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Local storage'den verileri alalım
  useEffect(() => {
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(storedTransactions);
  }, []);

  // PDF oluşturma fonksiyonu
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Harcama Raporu", 10, 10);

    let yOffset = 20;
    transactions.forEach((transaction, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. ${transaction.category} - ${transaction.amount} TL`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    // PDF'i indirme
    doc.save("harcama-raporu.pdf");
  };

  return (
    <div className="app">
      <h1>Hesap Takibi</h1>
      {/* PDF raporu indirme butonu */}
      <button onClick={generatePDF}>PDF Raporu İndir</button>

      {/* Diğer bileşenler ve içerikler */}
    </div>
  );
};

export default App;
