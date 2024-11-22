// AddTransaction.tsx
import React, { useState } from "react";

// `Transaction` arayüzü
interface Transaction {
  amount: string;
  description: string;
  category: string;
  date: string;
}

// `AddTransactionProps` arayüzü
interface AddTransactionProps {
  addTransaction: (transaction: Transaction) => void; // `addTransaction` fonksiyonunu alıyoruz
}

const AddTransaction: React.FC<AddTransactionProps> = ({ addTransaction }) => {
  // Form verileri için state
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Form submit işlemi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction: Transaction = {
      amount,
      description,
      category,
      date,
    };

    // Yeni işlemi ekliyoruz
    addTransaction(newTransaction);

    // Formu sıfırlıyoruz
    setAmount("");
    setDescription("");
    setCategory("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Tutar</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Açıklama</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Seçiniz</option>
          <option value="Gıda">Gıda</option>
          <option value="Fatura">Fatura</option>
          <option value="Eğlence">Eğlence</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Tarih</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">İşlem Ekle</button>
    </form>
  );
};

export default AddTransaction;
