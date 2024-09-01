export function shortenAddress(address, length = 4, ends = 4) {
  // console.log(address);
  if (!address) return "";
  if (address.length < 2 + length + ends) return address;
  return `${address.slice(0, 2 + length)}..${address.slice(
    -ends
  )}`.toLowerCase();
}

