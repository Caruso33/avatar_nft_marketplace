import axios from "axios"
import { contractAddresses } from "../../constants/hardhat-helper"

const covalent_url = `https://api.covalenthq.com/v1/`

const minBlockHeight = 26465357

function getCollection(chainId: number) {
  return getCovalenCollection(chainId)
}

function getTokenHolders(chainId: number, blockHeight: number | null = null) {
  return getCovalentBalanceRequest(chainId, blockHeight)
}

function getNftTokenIds(chainId: number) {
  return getCovalentNFTRequest(chainId, "nft_token_ids")
}

function getNftTokenTransactions(chainId: number) {
  return getCovalentNFTRequest(chainId, "nft_transactions")
}

function getNftMetadata(chainId: number, tokenId: number) {
  return getCovalentNFTRequest(chainId, `nft_metadata/${tokenId}`)
}

function getContractEvents(
  chainId: number,
  startingBlock: number | null = null,
  endingBlock: number | null = null
) {
  return getCovalentEventRequest(chainId, startingBlock, endingBlock)
}

async function getCovalenCollection(chainId: number) {
  const contractAddress = contractAddresses[chainId]

  const url = `https://api.covalenthq.com/v1/${chainId}/nft_market/collection/${contractAddress}/`

  try {
    const response = axios.get(url, {
      auth: { username: process.env.NEXT_PUBLIC_COVALENT_API! },
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

function getCovalentBalanceRequest(
  chainId: number,
  blockHeight: number | null = null
) {
  const contractAddress = contractAddresses[chainId]

  let url = `${covalent_url}${chainId}/tokens/${contractAddress}/token_holders/`

  if (blockHeight) {
    url += `&block-height=${blockHeight}`
  }

  try {
    const response = axios.get(url, {
      auth: { username: process.env.NEXT_PUBLIC_COVALENT_API! },
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

function getCovalentEventRequest(
  chainId: number,
  startingBlock: number | null = null,
  endingBlock: number | null = null
) {
  const contractAddress = contractAddresses[chainId]

  let url = `${covalent_url}${chainId}/events/address/${contractAddress}/`

  url += `?starting-block=${startingBlock ? startingBlock : minBlockHeight}`

  url += `&ending-block=${endingBlock ? endingBlock : "latest"}`

  try {
    const response = axios.get(url, {
      auth: { username: process.env.NEXT_PUBLIC_COVALENT_API! },
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

function getCovalentNFTRequest(chainId: number, endpoint: string) {
  const contractAddress = contractAddresses[chainId]

  try {
    const response = axios.get(
      `${covalent_url}${chainId}/tokens/${contractAddress}/${endpoint}/`,
      { auth: { username: process.env.NEXT_PUBLIC_COVALENT_API! } }
    )

    return response
  } catch (error) {
    console.error(error)
  }
}

export {
  getCollection,
  getTokenHolders,
  getNftTokenIds,
  getNftTokenTransactions,
  getNftMetadata,
  getContractEvents,
}
