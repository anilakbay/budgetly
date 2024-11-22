import React, { useState } from "react";
import ExpenseChart from "../components/ExpenseChart";
import TransactionList from "../components/TransactionList";
import "../styles/App.css";

// İşlem ekleme bileşeni
const AddTransaction: React.FC = () => {
  const [amount, setAmount] = useState(""); // Tutar
  const [description, setDescription] = useState(""); // Açıklama
  const [category, setCategory] = useState(""); // Kategori
  const [date, setDate] = useState(""); // Tarih
  const [error, setError] = useState(""); // Hata mesajı

  // Formu gönderme işlemi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Alanları kontrol et
    if (!amount || !description || !category || !date) {
      setError("Tüm alanları doldurduğunuzdan emin olun.");
      return;
    }

    // Yeni işlem verisini oluştur
    const newTransaction = { amount, description, category, date };

    // LocalStorage'a işlemi kaydet
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    storedTransactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(storedTransactions));

    // Formu sıfırla
    setAmount("");
    setDescription("");
    setCategory("");
    setDate("");
    setError(""); // Hata mesajını sıfırla
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Hata mesajı */}
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
        <label htmlFor="date">Tarih</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Ekle
      </button>
    </form>
  );
};

// Ana Sayfa bileşeni
const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1 className="page-title">Aylık Harcama Takibi</h1>
      <AddTransaction /> {/* İşlem ekleme formu */}
      <ExpenseChart /> {/* Harcama grafik bileşeni */}
      <TransactionList /> {/* İşlem listesi */}
    </div>
  );
};

export default HomePage;
