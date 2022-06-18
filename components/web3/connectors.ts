import { UAuthConnector } from "@uauth/web3-react"
import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import type { AbstractConnector } from "@web3-react/abstract-connector"

// Instanciate your other connectors.
export const injected = new InjectedConnector({
  supportedChainIds: [1, 80001, 1337],
})

export const walletconnect = new WalletConnectConnector({
  infuraId: process.env.NEXT_PUBLIC_INFURA_ID!,
  qrcode: true,
})

export const uauth = new UAuthConnector({
  clientID: process.env.NEXT_PUBLIC_CLIENT_ID!,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
  postLogoutRedirectUri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI!,
  // Scope must include openid and wallet
  scope: "openid wallet",

  // Injected and walletconnect connectors are required.
  connectors: { injected, walletconnect },
})

const connectors: Record<string, AbstractConnector> = {
  injected,
//   walletconnect,
  uauth,
}

export default connectors
