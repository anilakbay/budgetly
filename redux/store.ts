import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./incomeSlice";
import expenseReducer from "./expenseSlice";
import budgetReducer from "./budgetSlice";

// Store yapılandırması
const store = configureStore({
  reducer: {
    income: incomeReducer, // Gelir verisini yöneten reducer
    expense: expenseReducer, // Gider verisini yöneten reducer
    budget: budgetReducer, // Bütçe verisini yöneten reducer
  },
});

export default store;

// RootState ve AppDispatch türleri
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
