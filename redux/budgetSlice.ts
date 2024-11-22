import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Bütçe verisini saklamak için tip
interface Budget {
  category: string;
  limit: number;
  currentAmount: number;
}

const initialState: Budget[] = []; // Başlangıçta bütçe sınırları boş

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudget: (state, action: PayloadAction<Budget>) => {
      const index = state.findIndex(
        (item) => item.category === action.payload.category
      );
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index] = action.payload;
      }
    },
    // Diğer bütçe işlemleri eklenebilir (güncelleme, silme vb.)
  },
});

export const { setBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
