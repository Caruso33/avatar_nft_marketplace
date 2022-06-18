import { useWeb3React } from "@web3-react/core"
import axios from "axios"
import { ethers } from "ethers"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  contractAddresses,
  contractArtifact,
} from "../constants/hardhat-helper"

export default function ResellNFT() {
  const [formInput, updateFormInput] = useState({ price: "", image: "" })
  const router = useRouter()
  const { id, tokenURI } = router.query
  const { image, price } = formInput

  const [error, setError] = useState("")

  const { active, chainId, library } = useWeb3React()

  async function fetchNFT() {
    if (!tokenURI) return

    try {
      const meta = await axios.get(tokenURI as string)

      updateFormInput((state) => ({ ...state, image: meta.data.image }))
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchNFT()
  }, [id, tokenURI])

  useEffect(() => {
    if (active && error) {
      setError("")
      fetchNFT()
    }
  }, [active])

  async function listNFTForSale() {
    if (!active) {
      setError("No active provider found. Please connect to a wallet.")
      return
    }

    if (!price) {
      setError("No price specified.")
      return
    }

    const signer = library.getSigner()

    const contract = new ethers.Contract(
      contractAddresses[chainId],
      contractArtifact.abi,
      signer
    )

    const priceFormatted = ethers.utils.parseUnits(formInput.price, "ether")

    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    let transaction = await contract.resellToken(id, priceFormatted, {
      value: listingPrice,
    })
    await transaction.wait()

    router.push("/")
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        {error && (
          <p className="mt-4 text-center text-xl font-bold text-red-200">
            {error}
          </p>
        )}

        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          type="number"
          min={0}
          step={0.01}
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />

        {image && (
          <div className="rounded mt-4">
            <Image
              src={image}
              alt="Nft image"
              height="100%"
              width="100%"
              layout="responsive"
              objectFit="contain"
              crossOrigin="anonymous"
              unoptimized={true}
            />
          </div>
        )}

        <button
          onClick={listNFTForSale}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          List NFT
        </button>
      </div>
    </div>
  )
}
