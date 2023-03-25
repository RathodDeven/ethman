import { ContractType } from "@/types/contract";
import { create } from "zustand";
import { FunctionFragment } from "ethers/types/abi";

interface ContractStoreType {
  currentContract: ContractType | null;
  setCurrentContract: (contract: ContractType) => void;
  selectedFunction: FunctionFragment;
  setSelectedFunction: (f: FunctionFragment) => void;
}

export const useContractStore = create<ContractStoreType>((set) => ({
  currentContract: null,
  setCurrentContract: (contract) =>
    set(() => ({ currentContract: contract, selectedFunction: null })),
  selectedFunction: null,
  setSelectedFunction: (f) => set(() => ({ selectedFunction: f })),
}));
