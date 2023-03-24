import ContractPage from "@/components/ContractPage/ContractPage";
import { useContractStore } from "@/store/contract";
import Head from "next/head";

export default function Home() {
  const currentContract = useContractStore((state) => state.currentContract);
  return (
    <>
      <Head>
        <title>Ethman | Home for all your contracts</title>
        <meta
          name="description"
          content="Ethman | Home for all your contracts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        {currentContract ? (
          <ContractPage />
        ) : (
          <div className="w-full text-center mt-60 flex justify-center items-center">
            Select a contract
          </div>
        )}
      </div>
    </>
  );
}
