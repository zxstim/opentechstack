import Header from "../components/Header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import WalletManagement from "../components/PlaygroundToys/WalletManagement/WalletManagement";
import EnsCheck from "../components/PlaygroundToys/WalletManagement/EnsCheck";
import AppFooter from "../components/AppFooter/AppFooter";
// import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
 
// import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { publicProvider } from 'wagmi/providers/public'
 
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { InjectedConnector } from 'wagmi/connectors/injected'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import NavigationGroup from "../components/NavigationGroup/NavigationGroup";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)
// Set up client
// const client = createClient({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: {
//         appName: 'wagmi',
//       },
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         qrcode: true,
//       },
//     }),
//     new InjectedConnector({
//       chains,
//       options: {
//         name: 'Injected',
//         shimDisconnect: true,
//       },
//     }),
//   ],
//   provider,
//   webSocketProvider,
// })

export default function Playground(props) {
  const { t } = useTranslation("playground");
  // Configure chains & providers with the Alchemy provider.
  // Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
  const headerContent = {
    title: "Play and learn about Web3 - OpenTechStack.com",
    description: "Try and experience the power of Web3 with zero risk of losing money.",
    icon: "../opentechstack.svg",
    domain: "https://www.OpenTechStack.com",
    image: "https://imagedelivery.net/V8LKJG1wA8wvjWYrCdF9Bw/367f3e41-52b9-4e72-49da-2c17111b9f00/defi",
  }

  const paths = {
    fullPath: "/playground",
    pathNamesEn: [
      "Playground"
    ],
    pathNamesVi: [
      "Sân chơi"
    ],
  }

  return (
    <>
      <Header content={headerContent} />
      {/* <WagmiConfig client={client}> */}
        <div className="App">
          <div className="markdown-body">
            <h1 id="top">{t("title")}</h1>
            <LanguageSelector />
            <NavigationGroup paths={paths} />
            <h2>{t("subtitle")}</h2>
            <WalletManagement />
            <EnsCheck />
            <br />
            <hr />
            <AppFooter />
          </div>
        </div>
      {/* </WagmiConfig> */}
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "playground"])),
      // Will be passed to the page component as props
    },
  };
}