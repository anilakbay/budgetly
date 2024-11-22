import React, { useState } from "react";
import ExpenseChart from "../components/ExpenseChart"; // Grafik bileşenini import et
import TransactionList from "@components/TransactionList";

const AddTransaction: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = {
      amount,
      description,
      category,
      date,
    };

    // LocalStorage'a kaydet
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    storedTransactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(storedTransactions));

    // Formu sıfırlama
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
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Tutar"
          required
        />
      </div>

      <div>
        <label htmlFor="description">Açıklama</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama"
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
          <option value="">Kategori Seçin</option>
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
      </div>

      <div>
        <label htmlFor="date">Tarih</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit">Ekle</button>
    </form>
  );
};

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Aylık Harcama Takibi</h1>
      <AddTransaction /> {/* AddTransaction bileşenini ekle */}
      <ExpenseChart /> {/* ExpenseChart bileşenini ekle */}
      <TransactionList /> {/* TransactionList bileşenini ekle */}
    </div>
  );
};

export default HomePage;
