import React, { useEffect, useState } from "react";

// Transaction tipi, amount sayısal olarak tutulacak
interface Transaction {
  amount: number;
  description: string;
  category: string;
  date: string;
}

const TRANSACTIONS_KEY = "transactions"; // LocalStorage anahtarı sabit olarak tanımlandı

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    try {
      // LocalStorage'dan verileri al
      const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
      const parsedTransactions: Transaction[] = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];

      // Sayısal amount verisini düzenleme
      const validTransactions = parsedTransactions.map((transaction) => ({
        ...transaction,
        amount: parseFloat(transaction.amount.toString()), // Sayıya dönüştürülür
      }));

      setTransactions(validTransactions);
    } catch (error) {
      console.error(
        "LocalStorage'dan veriler alınırken bir hata oluştu:",
        error
      );
      setTransactions([]);
    }
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
