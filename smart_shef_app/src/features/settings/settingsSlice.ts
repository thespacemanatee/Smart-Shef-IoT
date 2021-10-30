/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "react-native-ble-plx";

import { MQTTStatus } from "../../service/mqtt";

export type LogEntry = {
  timestamp: Date;
  topic: string;
  qos: number;
  retain: boolean;
  message: string;
};
interface SettingsState {
  selectedDeviceUUID: string | null;
  devices: Device[];
  logs: LogEntry[];
  clientStatus?: MQTTStatus | null;
}

const initialState: SettingsState = {
  selectedDeviceUUID: null,
  devices: [],
  logs: [],
  clientStatus: null,
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
    addLog: (state, action: PayloadAction<LogEntry>) => {
      state.logs = [action.payload].concat(state.logs);
    },
    resetLogs: state => {
      state.logs = [];
    },
    setClientStatus: (state, action: PayloadAction<MQTTStatus>) => {
      state.clientStatus = action.payload;
    },
  },
});

export const {
  addDevice,
  setSelectedDeviceUUID,
  removeSelectedDeviceUUID,
  removeDevice,
  resetDevices,
  addLog,
  resetLogs,
  setClientStatus,
} = settingsSlice.actions;

export default settingsSlice.reducer;
