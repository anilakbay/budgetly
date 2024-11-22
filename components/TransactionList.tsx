import React, { useEffect, useState } from "react";

// İşlem tipini sade tutuyoruz
interface Transaction {
  amount: number;
  description: string;
  category: string;
  date: string;
}

const TRANSACTIONS_KEY = "transactions"; // Veriler için localStorage anahtarı

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    try {
      // Verileri localStorage'dan yükle
      const stored = localStorage.getItem(TRANSACTIONS_KEY);
      if (stored) {
        const loadedTransactions: Transaction[] = JSON.parse(stored);
        // Yüklenen verilerin doğru formatta olduğundan emin olun
        if (Array.isArray(loadedTransactions)) {
          setTransactions(loadedTransactions);
        } else {
          console.error("Yüklenen veriler geçerli bir dizi değil.");
        }
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Veriler yüklenirken bir sorun oluştu:", error);
    }
  }, []);

  return (
    <div className="transaction-list">
      <h2>Harcama Listesi</h2>
      {transactions.length === 0 ? (
        <p>Henüz işlem eklenmedi.</p>
      ) : (
        <ul>
          {transactions.map((item) => (
            <li key={item.date}>
              {" "}
              {/* Benzersiz bir key kullanıyoruz */}
              <p>
                <strong>Tutar:</strong> {item.amount.toFixed(2)} TL
              </p>
              <p>
                <strong>Açıklama:</strong> {item.description}
              </p>
              <p>
                <strong>Kategori:</strong> {item.category}
              </p>
              <p>
                <strong>Tarih:</strong> {item.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
