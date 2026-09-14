import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ComplaintFormState, RiskAssessment, SeverityLevel } from '@/types';
import {
  mockExtractionResult,
  mockRiskAssessment,
} from '@/services/api';

const emptyForm: ComplaintFormState = {
  customerName: '',
  customerType: '',
  productBrandName: '',
  batchNumber: '',
  mfgDate: '',
  expDate: '',
  complaintDescription: '',
};

interface ComplaintSliceState {
  rawText: string;
  form: ComplaintFormState;
  riskAssessment: RiskAssessment;
  extractionStatus: 'idle' | 'loading' | 'success' | 'error';
  extractionError: string;
  mockStatus: 'idle' | 'loading' | 'success' | 'error';
  mockError: string;
}

const initialState: ComplaintSliceState = {
  rawText: '',
  form: emptyForm,
  riskAssessment: {
    severityLevel: 'Low',
    capaRecommendation: '',
    riskSummary: '',
    keyFindings: [],
  },
  extractionStatus: 'idle',
  extractionError: '',
  mockStatus: 'idle',
  mockError: '',
};

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    setRawText(state, action: PayloadAction<string>) {
      state.rawText = action.payload;
    },
    setForm(state, action: PayloadAction<ComplaintFormState>) {
      state.form = action.payload;
    },
    updateFormField<K extends keyof ComplaintFormState>(
      state,
      action: PayloadAction<{ field: K; value: ComplaintFormState[K] }>
    ) {
      state.form[action.payload.field] = action.payload.value;
    },
    setRiskAssessment(state, action: PayloadAction<RiskAssessment>) {
      state.riskAssessment = action.payload;
    },
    setSeverity(state, action: PayloadAction<SeverityLevel>) {
      state.riskAssessment.severityLevel = action.payload;
    },
    setExtractionStatus(
      state,
      action: PayloadAction<{ status: 'loading' | 'success' | 'error'; error?: string }>
    ) {
      state.extractionStatus = action.payload.status;
      state.extractionError = action.payload.error ?? '';
    },
    setMockStatus(
      state,
      action: PayloadAction<{ status: 'loading' | 'success' | 'error'; error?: string }>
    ) {
      state.mockStatus = action.payload.status;
      state.mockError = action.payload.error ?? '';
    },
    populateMockData(state) {
      state.form = { ...mockExtractionResult };
      state.riskAssessment = { ...mockRiskAssessment };
      state.mockStatus = 'success';
    },
    resetAll(state) {
      state.rawText = '';
      state.form = emptyForm;
      state.riskAssessment = initialState.riskAssessment;
      state.extractionStatus = 'idle';
      state.extractionError = '';
      state.mockStatus = 'idle';
      state.mockError = '';
    },
  },
});

export const {
  setRawText,
  setForm,
  updateFormField,
  setRiskAssessment,
  setSeverity,
  setExtractionStatus,
  setMockStatus,
  populateMockData,
  resetAll,
} = complaintSlice.actions;

export default complaintSlice.reducer;
