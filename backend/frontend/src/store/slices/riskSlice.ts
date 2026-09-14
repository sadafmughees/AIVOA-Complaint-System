import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RiskAssessment, SeverityLevel } from '@/types';

interface RiskSliceState {
  assessment: RiskAssessment | null;
}

const initialState: RiskSliceState = {
  assessment: null,
};

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    setAssessment(state, action: PayloadAction<RiskAssessment>) {
      state.assessment = action.payload;
    },
    setSeverityLevel(state, action: PayloadAction<SeverityLevel>) {
      if (state.assessment) {
        state.assessment.severityLevel = action.payload;
      }
    },
    clearAssessment(state) {
      state.assessment = null;
    },
  },
});

export const { setAssessment, setSeverityLevel, clearAssessment } = riskSlice.actions;
export default riskSlice.reducer;
