import { useWeb3React } from "@web3-react/core"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import Router from "next/router"
import { useEffect, useRef } from "react"
import { BiWallet } from "react-icons/bi"
import connectors from "./web3/connectors"

function Wallet() {
  const { active, account, activate, deactivate } = useWeb3React()

  const prevAccount = useRef(account)

  // useEffect(() => {
  //   if (!prevAccount.current) prevAccount.current = account

  //   if (account && prevAccount.current && prevAccount.current !== account) {
  //     console.log("Account changed, reloading page.")
  //     prevAccount.current = account
  //     Router.reload()
  //   }
  // }, [account])

  function createConnectHandler(connectorId: string) {
    return async () => {
      try {
        const connector = connectors[connectorId]

        // Taken from https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-817631654
        if (
          connector instanceof WalletConnectConnector &&
          connector.walletConnectProvider
        ) {
          connector.walletConnectProvider = undefined
        }

        await activate(connector)
        // Router.reload()
        localStorage.setItem("provider", connectorId)
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function handleDisconnect() {
    try {
      deactivate()
      localStorage.removeItem("provider")
    } catch (error) {
      console.error(error)
    }
  }

  if (active) {
    return (
      <div className="flex">
        <div style={{ maxWidth: "30vw", wordBreak: "break-all" }}>
          <div className="flex justify-center">
            <BiWallet size={20} />
          </div>

          {account}
        </div>

        <button
          className="ml-3 bg-gray-700 text-white font-bold py-2 px-2 rounded"
          onClick={handleDisconnect}
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div>
      {Object.keys(connectors).map((v) => (
        <button
          className="ml-2 bg-gray-700 text-white font-bold py-2 px-2 rounded"
          key={v}
          onClick={createConnectHandler(v)}
        >
          Connect to {v}
        </button>
      ))}
    </div>
  )
}

export default Wallet
