import { useWeb3React } from "@web3-react/core"
import React, { useEffect } from "react"
import connectors from "./web3/connectors"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { activate, chainId } = useWeb3React()

  useEffect(() => {
    const provider = window.localStorage.getItem(
      "provider"
    ) as keyof typeof connectors

    if (provider) activate(connectors[provider])
  }, [])

  const networkContent = (
    <div className="flex justify-center">
      <div className="p-4" style={{ maxWidth: "1600px" }}>
        <p className="text-lg font-bold text-center">
          {`Wrong network set.`}
          <br />
          <br />
          {
            "Please change your wallet to Polygon's Mumbai network as explained here and please refresh the page:"
          }
          <br />
          {
            "https://medium.com/stakingbits/how-to-connect-polygon-mumbai-testnet-to-metamask-fc3487a3871f"
          }
        </p>
      </div>
    </div>
  )

  return chainId && chainId !== Number(process.env.NEXT_PUBLIC_DEPLOYED_CHAINID)
    ? networkContent
    : children
}
