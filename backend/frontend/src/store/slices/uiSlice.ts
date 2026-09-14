import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewMode = 'input' | 'form' | 'both';

interface UiSliceState {
  viewMode: ViewMode;
  sidebarOpen: boolean;
}

const initialState: UiSliceState = {
  viewMode: 'both',
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setViewMode, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
