import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
  workspaces: Array<{
    type: 'PERSONAL' | 'PUBLIC';
    name: string;
    id: string;
  }>;
};

const initialState: InitialStateProps = {
  workspaces: [],
};

export const Workspaces = createSlice({
  name: 'workspace',
  initialState: initialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<InitialStateProps>) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACES } = Workspaces.actions;
export default Workspaces.reducer;
