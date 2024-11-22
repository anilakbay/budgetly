// index.tsx
import React, { useState } from "react";
import AddTransaction from "../components/AddTransaction";
import ExpenseChart from "../components/ExpenseChart";
import TransactionList from "../components/TransactionList";
import "../styles/App.css";

interface Transaction {
  amount: string;
  description: string;
  category: string;
  date: string;
}

// Ana sayfa bileşeni
const HomePage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // İşlemler

  // İşlem ekleme fonksiyonu
  const addTransaction = (transaction: Transaction) => {
    // Yeni işlem ekle
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);

    // LocalStorage'a kaydet
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <div className="home-page">
      <h1 className="page-title">Aylık Harcama Takibi</h1>
      {/* İşlem ekleme formu */}
      <AddTransaction addTransaction={addTransaction} />
      {/* Harcama grafik bileşeni */}
      <ExpenseChart transactions={transactions} />
      {/* İşlem listesi */}
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default HomePage;
