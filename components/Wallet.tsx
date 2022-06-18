import { useWeb3React } from "@web3-react/core"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import connectors from "./web3/connectors"
import { BiWallet } from "react-icons/bi"

function Wallet() {
  const { active, account, activate, deactivate } = useWeb3React()

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
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function handleDisconnect() {
    try {
      deactivate()
    } catch (error) {
      console.error(error)
    }
  }

  if (active) {
    return (
      <div className="flex">
        <div style={{ maxWidth: "30vw", wordBreak: "break-all" }}>
          <div className="w-full text-center">
            <BiWallet size={"2rem"} />
          </div>

          {account}
        </div>

        <button
          className="mt-4 ml-3 bg-gray-700 text-white font-bold py-2 px-2 rounded"
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
          className="mt-4 ml-2 bg-gray-700 text-white font-bold py-2 px-2 rounded"
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
