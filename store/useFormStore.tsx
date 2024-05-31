import create from "zustand";

export interface IPanelFilling {
  layer: string;
  description: string;
  weight: number;
  sizeWidth: number;
  supplier: string;
}

export interface IFormStore {
  productName: string;
  productDetails: string;
  deliveryAddress: string;
  tickSupplier: string;
  tickQuality: string;
  tickNumberRef: string;
  tickColourRef: string;
  composition: string;
  issuedTo: string;
  dateRequired: string;
  comments: string;
  labelType: string[];
  springType: string[];
  quiltType: string[];
  accessories: string[];
  patternNumber: string[];
  borderType: string[];
  borderDepth: string;
  panelFillingTopLayer: IPanelFilling[];
  panelFillingBottomLayer: IPanelFilling[];
  borderFilling: IPanelFilling[];
  updateField: (field: keyof IFormStore, value: any) => void;
  updatePanelFilling: (field: keyof IFormStore, data: IPanelFilling[]) => void;
}

const useFormStore = create<IFormStore>((set) => ({
  productName: "",
  productDetails: "",
  deliveryAddress: "",
  tickSupplier: "",
  tickQuality: "",
  tickNumberRef: "",
  tickColourRef: "",
  composition: "",
  issuedTo: "",
  dateRequired: "",
  comments: "",
  labelType: [],
  springType: [],
  quiltType: [],
  accessories: [],
  patternNumber: [],
  borderType: [],
  borderDepth: "",
  panelFillingTopLayer: [],
  panelFillingBottomLayer: [],
  borderFilling: [],
  updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
  updatePanelFilling: (field, data) =>
    set((state) => ({ ...state, [field]: data })),
}));

export default useFormStore;
