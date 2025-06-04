import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  createdAt: string | null;
}

const initialState: ChatState = {
  createdAt: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCreatedAt(state, action: PayloadAction<string | null>) {
      state.createdAt = action.payload;
    },
  },
});

export const { setCreatedAt } = chatSlice.actions;
export default chatSlice.reducer;