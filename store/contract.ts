import { ContractType } from "@/types/contract";
import { create } from "zustand";

interface ContractStoreType {
  currentContract: ContractType | null;
  setCurrentContract: (contract: ContractType) => void;
  selectedFunction: any;
  setSelectedFunction: (f: any) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useContractStore = create<ContractStoreType>((set) => ({
  currentContract: null,
  setCurrentContract: (contract) =>
    set((state) => {
      if (state.currentContract?.id === contract.id)
        return {
          currentContract: contract,
        };
      return { currentContract: contract, selectedFunction: null };
    }),
  selectedFunction: null,
  setSelectedFunction: (f) => set(() => ({ selectedFunction: f })),
  isAdmin: false,
  setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
}));
