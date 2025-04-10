import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SignUpFormData = {
  name?: string;
  phoneNumber?: string;
  studentNumber?: string;
  gender?: string;
  mbti?: string;
  department?: string;
  instagramId?: string;
};

type SignUpState = {
  formData: SignUpFormData;
};

const initialState: SignUpState = {
  formData: {},
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    updateFormData(state, action: PayloadAction<Partial<SignUpFormData>>) {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm(state) {
      state.formData = {};
    },
  },
});

export const { updateFormData, resetForm } = signUpSlice.actions;
export default signUpSlice.reducer;
