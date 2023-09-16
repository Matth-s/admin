import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Material } from "../schema";
import type { RootState } from "./store";

interface DataState {
  dataMaterial: Material[];
  viewMaterial: Material;
  dataMaterialSearch: Material[] | [];
  searchText: string;
}

const initialState: DataState = {
  dataMaterial: [],
  viewMaterial: {
    downPayment: 0,
    category: "",
    date: null,
    description: "",
    id: "",
    presentationPicture: "",
    pictureArray: [],
    name: "",
    pricePerDay: 0,
    disponibility: false,
    visible: true,
    bookingDate: [],
  },
  dataMaterialSearch: [],
  searchText: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Material[]>) => {
      state.dataMaterial = action.payload;
    },
    addNewMaterial: (state, action: PayloadAction<Material>) => {
      state.dataMaterial.push(action.payload);
    },
    setViewMaterial: (state, action: PayloadAction<Material>) => {
      state.viewMaterial = action.payload;
    },
    deleteMaterial: (state, action: PayloadAction<string>) => {
      state.dataMaterial = state.dataMaterial.filter(
        (material) => material.id !== action.payload
      );
    },
    updateMaterial: (state, action: PayloadAction<Material>) => {
      const updatedMaterial = action.payload;

      state.dataMaterial = state.dataMaterial.filter(
        (material) => material.id !== updatedMaterial.id
      );

      state.dataMaterial.push(updatedMaterial);
      state.viewMaterial = updatedMaterial;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  addNewMaterial,
  setData,
  setViewMaterial,
  deleteMaterial,
  updateMaterial,
  setSearch,
} = dataSlice.actions;
export const selectData = (state: RootState) => state.data;
export default dataSlice.reducer;
