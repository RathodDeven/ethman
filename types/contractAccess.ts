import { UserType } from "@/components/LayoutPage/Navbar";
import { ContractType } from "./contract";

export interface ContractAccessType {
  id: string;
  contract: ContractType;
  accessUserId: string;
}
