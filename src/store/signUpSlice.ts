import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SignUpFormData = {
  name?: string;
  // nickname?: string;
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
