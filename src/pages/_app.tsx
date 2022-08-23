import { AppProps } from "next/app";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "../styles/global.scss";
import { Header } from "../components/Header/index";
import { Provider as NextAuthProvider } from "next-auth/client";

//AWI9VA9YY--4fY1iTsmjKMlpZkKetySVoogfzPqQBBh-KSNqi-sbf2bi05Bw3JmqDT2KArFFxi0m2OQp    conta real limitada

const initialOptions = {
  "client-id":
    "ASiWxmFSmYLAY2wrr_DwrbTmk9YlcsnJKTuoEC3w3ll6pI2c0DApOga7ber2ti71qhSGnrxk9dTkl2hV",
  currency: "BRL",
  intent: "capture",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
