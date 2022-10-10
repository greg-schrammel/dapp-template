export const truncateAddress = (address: Address) =>
  address.replace(address.substring(6, 38), '...')
