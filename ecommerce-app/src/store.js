import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        order: orderReducer,
        cart: cartReducer,
    },
});

export default store;
