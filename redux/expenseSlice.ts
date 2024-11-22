import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Gider verisini saklamak için tip
interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  category: string; // Örnek: Yiyecek, Ulaşım, Eğlence vb.
}

const initialState: Expense[] = []; // Başlangıçta giderler boş

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.push(action.payload);
    },
    // Diğer giderle ilgili işlemler eklenebilir (silme, güncelleme vs.)
  },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
