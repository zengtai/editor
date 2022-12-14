import "@/styles/globals.css";
import { useRouter } from "next/router";
import Script from "next/script";
import { ADSENSE_ID } from "@/lib/constants";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log("🚀 ~ file: _app.js:8 ~ MyApp ~ router", router);

  // 排除错误页、协议页
  if (router.pathname === "_error" || router.pathname.match(`\/t\/`)) {
    return <Component {...pageProps} />;
  } else {
    return (
      <>
        <Script
          id="ads-init"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          async
          crossOrigin="anonymous"
        />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
