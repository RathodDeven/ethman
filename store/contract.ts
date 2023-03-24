import { ContractType } from "@/types/contract";
import { create } from "zustand";

interface ContractStoreType {
  currentContract: ContractType | null;
  setCurrentContract: (contract: ContractType) => void;
}

export const useContractStore = create<ContractStoreType>((set) => ({
  currentContract: null,
  setCurrentContract: (contract) => set({ currentContract: contract }),
}));
