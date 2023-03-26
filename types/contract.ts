import { UserType } from "@/components/LayoutPage/Navbar";

export interface ContractType {
  id: string;
  name: string;
  creatorPublicKey: string;
  creator?: UserType;
  creatorAddress?: string;
  description?: string;
  abi?: string;
  collaborators?: UserType[];
  contractAddress?: string;
  functionDescription?: Map<string, string>;
  groupChatId?: string;
  type?: string;
}
