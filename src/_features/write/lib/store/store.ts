import { create } from 'zustand';
import { WritingFormData } from '../types/write';

type StoreType = {
  WritingFormData: WritingFormData;
  setWritingFormData: (data: WritingFormData) => void;
  picture: File[];
  setPicture: (data: File[]) => void;
  deletePicture: (index: number) => void;
};

const writeStore =
  create <
  StoreType >
  ((set) => ({
    WritingFormData: {
      content: '',
      weather: '',
      picture: [],
    } as WritingFormData,
    setWritingFormData: (data) =>
      set((state) => ({
        WritingFormData: { ...state.WritingFormData, ...data },
      })),
    picture: [] as File[],
    setPicture: (data) =>
      set(() => ({
        picture: data,
      })),
    deletePicture: (index: number) =>
      set((state) => ({
        picture: state.picture.filter((_, idx) => index !== idx),
      })),
  }));

export default writeStore;