import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Gelir verisini saklamak için tip
interface Income {
  id: number;
  amount: number;
  description: string;
  date: string;
}

const initialState: Income[] = []; // Başlangıçta gelirler boş

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<Income>) => {
      state.push(action.payload);
    },
    // Diğer gelirle ilgili işlemler eklenebilir (silme, güncelleme vs.)
  },
});

export const { addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
