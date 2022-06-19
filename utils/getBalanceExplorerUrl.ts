function getBalanceExplorerUrl(chainId: number, address: string) {
  const polyChains = [137, 80001]
  if (polyChains.includes(chainId))
    return `https://mumbai.polygonscan.com/address/${address}`

  return `https://etherscan.io/address/${address}`
}

export default getBalanceExplorerUrl
