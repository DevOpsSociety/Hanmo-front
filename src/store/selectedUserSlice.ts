// selectedUsersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedUser {
  userId: number;
  matchingType: string;
  genderMatchingType: string;
}

interface State {
  selected: SelectedUser[];
}

const initialState: State = {
  selected: [],
};

const selectedUsersSlice = createSlice({
  name: "selectedUsers",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<SelectedUser>) => {
      if (state.selected.length >= 4) return;

      const isSameMatchingType = state.selected.every(
        (u) =>
          u.matchingType === action.payload.matchingType &&
          u.genderMatchingType === action.payload.genderMatchingType
      );

      if (state.selected.length === 0 || isSameMatchingType) {
        state.selected.push(action.payload);
      }
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.selected = state.selected.filter((u) => u.userId !== action.payload);
    },
    resetUsers: (state) => {
      state.selected = [];
    },
  },
});

export const { addUser, removeUser, resetUsers } = selectedUsersSlice.actions;
export default selectedUsersSlice.reducer;
