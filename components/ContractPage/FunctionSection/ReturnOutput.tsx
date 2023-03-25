import React from "react";
import { ethers } from "ethers";

const ReturnOutput = ({ value }) => {
  console.log(value);
  if (!value) return null;

  if (ethers.BigNumber.isBigNumber(value)) {
    return <div>{ethers.BigNumber.from(value._hex).toNumber()}</div>;
  }
  return <div>ReturnOutput</div>;
};

export default ReturnOutput;
