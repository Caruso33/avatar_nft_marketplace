import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import type { AppProps } from "next/app"
import Link from "next/link"
import Layout from "../components/Layout"
import Wallet from "../components/Wallet"
import "../styles/globals.css"

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <nav className="border-b p-6">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold tracking-widest font-serif">
            Avatar NFT Marketplace
          </p>

          <Wallet />
        </div>

        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-6 text-pink-500">Home</a>
          </Link>

          <Link href="/create-nft">
            <a className="mr-6 text-pink-500">Sell Digital Asset</a>
          </Link>

          <Link href="/my-nfts">
            <a className="mr-6 text-pink-500">My Digital Assets</a>
          </Link>

          <Link href="/dashboard">
            <a className="mr-6 text-pink-500">Creator Dashboard</a>
          </Link>

          <Link href="/stats">
            <a className="mr-6 text-pink-500">Stats</a>
          </Link>
        </div>
      </nav>

      {/* @ts-ignore */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3ReactProvider>
  )
}

export default MyApp
