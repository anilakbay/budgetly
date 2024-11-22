import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { jsPDF } from "jspdf";

// Transaction tipi
type Transaction = { category: string; amount: number; date: string };

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  // LocalStorage'den verileri al
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(stored);
  }, []);

  // Tema değiştir ve localStorage'a kaydet
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // PDF oluştur
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18).text("Harcama Raporu", 10, 10);
    transactions.forEach((transaction, index) => {
      doc
        .setFontSize(12)
        .text(
          `${index + 1}. ${transaction.category} - ${transaction.amount} TL`,
          10,
          20 + index * 10
        );
    });
    doc.save("harcama-raporu.pdf");
  };

  return (
    <div className="app">
      <h1>Hesap Takibi</h1>
      <button onClick={generatePDF}>PDF Raporu İndir</button>
      <button onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />} Tema Değiştir
      </button>
    </div>
  );
};

export default App;
