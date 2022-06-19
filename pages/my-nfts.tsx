import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getNftData } from "../components/index/utils"
import {
  contractAddresses,
  contractArtifact
} from "../constants/hardhat-helper"
import MarketItemInterface from "../types/MarketItemInterface"
import NftInterface from "../types/NftInterface"

export default function MyAssets() {
  const [nfts, setNfts] = useState<NftInterface[]>([])
  const [loadingState, setLoadingState] = useState("")

  const [error, setError] = useState("")

  const { active, chainId, library } = useWeb3React()

  const router = useRouter()

  useEffect(() => {
    loadMyNFTs()
  }, [])

  useEffect(() => {
    if (active && error) {
      setError("")
      loadMyNFTs()
    }
  }, [active])

  async function loadMyNFTs() {
    if (!active) {
      setError("No active provider found. Please connect to a wallet.")
      return
    }
    const signer = library.getSigner()

    const contract = new ethers.Contract(
      contractAddresses[chainId!],
      contractArtifact.abi,
      signer
    )

    setLoadingState("not-loaded")

    let items: NftInterface[] = []
    try {
      const data = await contract.fetchMyNFTs()

      items = await Promise.all(
        data.map(async (nft: MarketItemInterface) => getNftData(nft, contract))
      )
    } catch (e: any) {
      console.error(e.message)
    }

    setNfts(items)
    setLoadingState("loaded")
  }

  function resellNFT(nft: NftInterface) {
    if (!nft.tokenURI) return

    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>

  return (
    <div className="flex justify-center">
      <div className="p-4">
        {error && (
          <p className="mt-4 text-center text-xl font-bold text-red-200">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft: NftInterface, i) => {
            return (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                {nft.image && (
                  <Image
                    src={nft?.image}
                    className="rounded"
                    alt="Nft image"
                    height="100%"
                    width="100%"
                    layout="responsive"
                    objectFit="contain"
                    crossOrigin="anonymous"
                    unoptimized={true}
                  />
                )}

                <div className="p-4">
                  <p
                    style={{ height: "64px" }}
                    className="text-2xl font-semibold"
                  >
                    {nft?.name}
                  </p>
                  <div style={{ height: "70px", overflow: "hidden" }}>
                    <p className="text-gray-400">{nft?.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">
                    Price - {nft?.price?.toString()} Eth
                  </p>

                  {nft.tokenURI && (
                    <button
                      className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                      onClick={() => resellNFT(nft)}
                    >
                      List
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
