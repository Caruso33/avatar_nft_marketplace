# Avatar Nft Marketplace

## This is the repo for the [Encode Polygon Hackathon](https://www.encode.club/polygon-hackathon)

Remarks:

This repo is based on my repos [NftMarketplace](https://github.com/Caruso33/blockchain_dapps/tree/master/nader/4_nft_marketplace)
as well as [scripts to generate initial Nfts](https://github.com/Caruso33/blockchain_dapps/tree/master/nft/multiavatar) which are now copied here to be packaged as one dapp.

The marketplace is based on a tutorial by [Nader Dabit](https://twitter.com/dabit3).  
I've developed it further however, to increase the usability for the smart contract as well as the frontend. Also tests were added.

## Deployments

### Matic Mumbai Testnet

<!--
Recent addresses:
0xEf6d29dDFf75C3aC09C7AA37B3ea58aA2Bb24EB5
0x148B94D622c2Ac3abfb550AEaF48F25F105EA18b
0x663930fEBAD365ABC3E6388C6063829cCB1abedA
0xe27ece1d3d0A79692A85fc7114CA16e6cD421D91
0x39e618Ba8B2ba2E8902fabcBd184df6E9172e180
0x30a1b68D207c39924513424F2f9969a02eba2E2E
0xA4d1F6D750fe425A95DBb204115587D2c3D81DAf
0xB70C94932E241120e45B2cBE06b07D90a100Fd89
 -->

nftMarket deployed to: 0x0B19963b4B03c03aa46Cadf0f32fa016b41DaB6A

The frontend is deployed to: [avatar-nftmarket.vercel.app](https://avatar-nftmarket.vercel.app/)

---

<div style="margin-top: 50px" />

## Goals

- Create a smart contract for ERC721 avatars

  - expand default functionality
  - Right tests
  - Use contract verification & automate where possible

- Use Polygon

- Build a frontend to
  - interact with the smart contract using different providers (Unstoppable & Metamask)
  - Create unique avatars
  - Show stats and metrics

## Deploy & Run

Requirements: [Yarn](https://yarnpkg.com/) and [Nodejs](https://nodejs.org/en/)

`yarn install`
`yarn deploy --network localhost` # deploy to localhost (ganache GUI needs to run)
`yarn deploy --network mumbai` # deploy to polygon testnet
`yarn deploy --network polygon` # deploy to polygon mainnet

`yarn dev` # start dev nextjs server

For other commands, please refer to [package.json](package.json)

## Future work / Improvements

- Support ERC1155
- Improve IPFS support (Pinata seems to be unreliable with CORS errors)
- Deploy to mainnet
- Show important events

## Tools used

- [Solidity](https://soliditylang.org/)
- [Polygon](https://polygon.technology/)
- [NextJs](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Pinata-IPFS](https://pinata.cloud/)
- [Web3-React](https://github.com/NoahZinsmeister/web3-react)
- [Multiavatar](https://multiavatar.com/)
- [Unstoppable domains](https://unstoppabledomains.com)
- [Covalent](https://www.covalenthq.com/)
