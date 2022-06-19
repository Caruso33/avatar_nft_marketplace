import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { BiWallet } from "react-icons/bi"
import { getNftData } from "../components/index/utils"
import { getTokenHolders } from "../components/requests/nft_token_ids"
import Spinner from "../components/Spinner"
import {
  contractAddresses,
  contractArtifact,
} from "../constants/hardhat-helper"
import { TokenHolderInterface } from "../types/CovalentInterface"
import MarketItemInterface from "../types/MarketItemInterface"
import NftInterface from "../types/NftInterface"
import getBalanceExplorerUrl from "../utils/getBalanceExplorerUrl"

export default function Stats() {
  const { active, chainId, library } = useWeb3React()

  const [isLoading, setIsLoading] = useState(true)

  const [tokenHolders, setTokenHolders] = useState([])
  const [marketItems, setMarketItems] = useState([])

  useEffect(() => {
    if (chainId) loadMarketData()
  }, [chainId])

  const loadMarketData = async () => {
    if (!chainId) return

    setIsLoading(true)

    try {
      const holderResp = await getTokenHolders(chainId)

      const holders = holderResp?.data?.data?.items

      setTokenHolders(holders)

      let items: NftInterface[] = []

      const signer = library.getSigner()

      try {
        const contract = new ethers.Contract(
          contractAddresses[
            chainId || process.env.NEXT_PUBLIC_DEPLOYED_CHAINID
          ],
          contractArtifact.abi,
          signer
        )

        const data = await contract.fetchMarketItems()

        /*
         *  map over items returned from smart contract and format
         *  them as well as fetch their token metadata
         */
        items = await Promise.all(
          data.map(async (nft: MarketItemInterface) =>
            getNftData(nft, contract)
          )
        )
        setMarketItems(items)
      } catch (e: any) {
        console.error(e.message)
      }

      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  if (!active) {
    return (
      <div className="p-4">
        <p className="mt-4 text-center text-xl font-bold text-red-200">
          Please connect to Wallet in order to see stats.
        </p>
      </div>
    )
  }

  const totalPriceItems = marketItems?.reduce?.((acc, inc) => {
    return acc + Number(inc.price)
  }, 0)

  return (
    <div className="p-4">
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          <h2 className="text-3xl font-bold mb-4">
            Name: {tokenHolders?.[0]?.contract_name} (
            {tokenHolders?.[0]?.contract_ticker_symbol})
          </h2>

          <h2 className="text-2xl font-bold mb-4">
            Unique Owners: {tokenHolders?.length}
          </h2>

          {tokenHolders?.[0]?.total_supply && (
            <h3 className="text-2xl font-bold mb-4">
              Total Supply: {tokenHolders?.[0]?.total_supply}
            </h3>
          )}

          {tokenHolders.map((holder: TokenHolderInterface) => {
            const { address, balance } = holder

            return (
              <div key={holder.address} className="py-2">
                <p className="text-xl">
                  <BiWallet />

                  <a href={getBalanceExplorerUrl(chainId, holder.address)}>
                    {address}
                  </a>
                </p>
                <p className="text-xl">Balance: {balance}</p>
              </div>
            )
          })}

          <div className="py-2">
            <h2 className="text-2xl font-bold mb-4">
              Total Market Items: {marketItems?.length}
            </h2>

            <h2 className="text-2xl font-bold mb-4">
              Total Price Items: {totalPriceItems?.toFixed(5)}
            </h2>

            <h2 className="text-2xl font-bold mb-4">
              Average Price Item:{" "}
              {marketItems?.length &&
                (totalPriceItems / marketItems?.length).toFixed(5)}
            </h2>
          </div>
        </>
      )}
    </div>
  )
}
