import React, { useEffect, useState } from "react";

interface Transaction {
  amount: string;
  description: string;
  category: string;
  date: string;
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // LocalStorage'dan verileri al
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(storedTransactions);
  }, []); // Sadece ilk renderda çalışır

  return (
    <div className="transaction-list">
      <h2>Harcama Listesi</h2>
      {transactions.length === 0 ? (
        <p>Henüz işlem eklemediniz.</p>
      ) : (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
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
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
