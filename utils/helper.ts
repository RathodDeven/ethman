// string with randome characters of given lenght
export const randomString = (length: number): string => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

// containsWhiteSpace function
export const containsWhiteSpace = (s: string): boolean => {
  return /\s/g.test(s);
};

export const getStampFyiURL = (address: string) => {
  let currentAddress = address;
  if (!address) {
    currentAddress = "0x0000000000000000000000000000000000000000";
  }
  return `https://cdn.stamp.fyi/avatar/eth:${currentAddress.toLowerCase()}?s=250`;
};
