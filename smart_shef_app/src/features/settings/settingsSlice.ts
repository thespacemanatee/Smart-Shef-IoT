/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "react-native-ble-plx";

interface SettingsState {
  selectedDeviceUUID: string | null;
  devices: Device[];
}

const initialState: SettingsState = {
  selectedDeviceUUID: null,
  devices: [],
};
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<Device>) => {
      if (!state.devices.some(e => e.id === action.payload.id)) {
        state.devices.push(action.payload);
      }
    },
    setSelectedDeviceUUID: (state, action: PayloadAction<string>) => {
      state.selectedDeviceUUID = action.payload;
    },
    removeSelectedDeviceUUID: state => {
      state.selectedDeviceUUID = null;
    },
    removeDevice: (state, action: PayloadAction<Device>) => {
      state.devices = state.devices.filter(e => e !== action.payload);
    },
    resetDevices: state => {
      state.devices = [];
    },
  },
});

export const {
  addDevice,
  setSelectedDeviceUUID,
  removeSelectedDeviceUUID,
  removeDevice,
  resetDevices,
} = settingsSlice.actions;

export default settingsSlice.reducer;
