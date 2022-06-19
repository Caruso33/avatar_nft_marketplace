type TokenHolderInterface = {
  contract_decimals: number
  contract_name: string
  contract_ticker_symbol: string
  contract_address: string
  supports_erc: boolean | null
  logo_url: string
  address: string
  balance: string
  total_supply: number | null
  block_height: number
}

export type { TokenHolderInterface }
