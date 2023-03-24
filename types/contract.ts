import { UserType } from "@/components/LayoutPage/Navbar";

export interface ContractType {
  id: string;
  name: string;
  creatorPublicKey: string;
  description?: string;
  abi?: string;
  collaborators?: UserType[];
  contractAddress?: string;
}
