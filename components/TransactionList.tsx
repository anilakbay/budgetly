// TransactionList.tsx

import React from "react";

// Transaction tipini tekrar tanımlıyoruz
interface Transaction {
  amount: string;
  description: string;
  category: string;
  date: string;
}

// TransactionList bileşeninin props tipini tanımlıyoruz
interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
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
  );
};

export default TransactionList;
