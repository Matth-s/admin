import { FileImport, Material } from "../schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../db/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

import {
  setData,
  setViewMaterial,
  deleteMaterial,
  addNewMaterial,
  updateMaterial,
} from "../store/dataSlice";
import { setToken } from "../store/userSlice";

const url = "https://backendlocation.onrender.com";
const local = "http://localhost:3000";

//get all material
export const getData = createAsyncThunk("getData", async (_, { dispatch }) => {
  try {
    const { data } = await axios.get(`${local}/api/material`);
    dispatch(setData(data));
  } catch (error) {
    throw error;
  }
});

//getMaterialById
export const getMaterialById = createAsyncThunk(
  "getMaterialById",
  async (id: string, { dispatch }) => {
    try {
      const { data, status } = await axios.get(`${local}/api/material/${id}`);
      dispatch(setViewMaterial(data[0]));
      return status;
    } catch (error) {
      return error;
    }
  }
);

//deleteMaterialById
export const deleteMaterialById = createAsyncThunk(
  "deleteMaterialById",
  async ({ id, token }: { id: string; token: string | null }, { dispatch }) => {
    try {
      const { status } = await axios.delete(`${local}/api/material/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteMaterial(id));
      return status;
    } catch (error) {
      throw error;
    }
  }
);

//upload

//postmaterial
export const postMaterial = createAsyncThunk(
  "postData",
  async (
    {
      material,
      token,
      importedFiles,
      imagePresentation,
    }: {
      material: Material;
      token: string | null;
      importedFiles: [] | FileImport[];
      imagePresentation: FileImport | undefined;
    },
    { dispatch }
  ) => {
    if (imagePresentation?.name) {
      const presentationUrl = await uploadAndGetUrl(
        material.id,
        imagePresentation
      );
      material.presentationPicture = presentationUrl;
    } else if (importedFiles.length > 0 && !imagePresentation?.name) {
      const presentationUrl = await uploadAndGetUrl(
        material.id,
        importedFiles[0]
      );
      material.presentationPicture = presentationUrl;
    }

    // Upload and get URLs for imported files
    if (importedFiles.length > 0) {
      const fileUrls = await Promise.all(
        importedFiles.map(async (item) => {
          const fileUrl = await uploadAndGetUrl(material.id, item);
          return { image: fileUrl };
        })
      );
      material.pictureArray = fileUrls;
    }

    try {
      const { data, status } = await axios.post(
        `${local}/api/material`,
        { material },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(addNewMaterial(data));
      dispatch(setViewMaterial(data));
      return status;
    } catch (error) {
      throw error;
    }
  }
);

export const uploadAndGetUrl = async (id: string, file: any) => {
  try {
    const filePath = `material/${id}/${file.name}`;

    const fileBlob = new Blob([file]);

    const fileRef = ref(storage, filePath);

    await uploadBytes(fileRef, fileBlob);

    const downloadUrl = await getDownloadURL(fileRef);

    return downloadUrl;
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier :", error);
    throw error;
  }
};

// updateMaterial
export const updateMaterialById = createAsyncThunk(
  "updateMaterialById",
  async (
    {
      id,
      updatedMaterial,
      token,
    }: { id: string; updatedMaterial: Material; token: string | null },
    { dispatch }
  ) => {
    try {
      const { status, data } = await axios.put(
        `${local}/api/material/${id}`,
        {
          material: updatedMaterial,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateMaterial(data));
      return status;
    } catch (error) {
      console.error(error);
    }
  }
);

//sign
export const signIn = createAsyncThunk(
  "signIn",
  async (
    { password, email }: { password: string; email: string },
    { dispatch }
  ) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      dispatch(setToken(idToken));
      return { status: 201 };
    } catch (error) {
      throw error;
    }
  }
);

export const checkStatus = createAsyncThunk(
  "checkStatus",
  async (_, { dispatch }) => {
    try {
      const auth = getAuth();
      const user: {} | null = await new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
          resolve(user);
        });
      });

      if (user && typeof user === "object") {
        const token = await (user as any).getIdToken();
        dispatch(setToken(token));
        return "user";
      } else {
        dispatch(setToken(null));
        return "no-user";
      }
    } catch (error) {
      throw error;
    }
  }
);
