// App.tsx

import React, { useState, useEffect } from "react";
import AddTransaction from "./components/AddTransaction"; // AddTransaction bileşenini doğru import ediyoruz

interface Transaction {
  amount: string;
  description: string;
  category: string;
  date: string;
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // LocalStorage'dan işlemleri yükleme
  useEffect(() => {
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(storedTransactions);
  }, []);

  // İşlem ekleme
  const handleTransactionAdd = (newTransaction: Transaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <div className="app">
      <h1>Hesap Takibi</h1>

      {/* AddTransaction bileşenine işlemi eklemek için handleTransactionAdd fonksiyonunu geçiyoruz */}
      <AddTransaction onTransactionAdd={handleTransactionAdd} />

      {/* İşlem listesi */}
      <div className="transaction-list">
        <h2>İşlemler</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index} className="transaction-item">
              <p>
                <strong>Tutar:</strong> {transaction.amount} TL
              </p>
              <p>
                <strong>Açıklama:</strong> {transaction.description}
              </p>
              <p>
                <strong>Kategori:</strong> {transaction.category}
              </p>
              <p>
                <strong>Tarih:</strong> {transaction.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
