export type WritingFormData = {
  content: string;
  weather: string;
  picture: string[];
};

export type ImageFile = { id: string; file: File | string; blob: string };