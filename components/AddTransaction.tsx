import React, { useState } from "react";

// AddTransaction bileşeni, harcama ekleme formunu içerir.
const AddTransaction: React.FC = () => {
  const [amount, setAmount] = useState(""); // Tutar
  const [description, setDescription] = useState(""); // Açıklama
  const [category, setCategory] = useState(""); // Kategori
  const [date, setDate] = useState(""); // Tarih
  const [error, setError] = useState<string>(""); // Hata mesajı

  // Form submit işlemi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Formun sayfayı yeniden yüklemesini engeller

    // Formdaki tüm alanların dolu olduğuna emin olun
    if (!amount || !description || !category || !date) {
      setError("Tüm alanları doldurduğunuzdan emin olun.");
      return;
    }

    // Yeni işlem objesi oluşturuluyor
    const newTransaction = {
      amount,
      description,
      category,
      date,
    };

    // LocalStorage'a yeni işlemi kaydetme
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    storedTransactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(storedTransactions));

    // Formu sıfırlama ve hata mesajını kaldırma
    setAmount("");
    setDescription("");
    setCategory("");
    setDate("");
    setError(""); // Hata mesajını sıfırlama
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Hata mesajı */}
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
      <button type="submit" className="submit-button">
        Ekle
      </button>
    </form>
  );
};

export default AddTransaction;
