import React, { useState } from "react";

const AddTransaction: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { amount, description, category, date } = formData;

    // Alanları kontrol et
    if (!amount || !description || !category || !date) {
      setError("Tüm alanları doldurduğunuzdan emin olun.");
      return;
    }

    // Tutarı sayıya dönüştür ve geçerliliğini kontrol et
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setError("Geçerli bir tutar girin.");
      return;
    }

    const newTransaction = { ...formData, amount: parsedAmount };

    // LocalStorage'a işlemi kaydet
    const storedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    localStorage.setItem(
      "transactions",
      JSON.stringify([...storedTransactions, newTransaction])
    );

    // Formu sıfırla
    setFormData({ amount: "", description: "", category: "", date: "" });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      {error && <div className="error-message">{error}</div>}
      <div>
        <label htmlFor="amount">Tutar</label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Tutar"
          required
        />
      </div>
      <div>
        <label htmlFor="description">Açıklama</label>
        <input
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          placeholder="Açıklama"
          required
        />
      </div>
      <div>
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
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
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
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
