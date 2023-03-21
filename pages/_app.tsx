import "@/styles/globals.css";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import type { AppProps } from "next/app";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";

export default function App({ Component, pageProps }: AppProps) {
  const polybase = new Polybase({
    defaultNamespace: process.env.NEXT_PUBLIC_DEFAULT_NAMESPACE,
  });
  const auth = typeof window !== "undefined" ? new Auth() : null;
  return (
    <PolybaseProvider polybase={polybase}>
      {/* @ts-ignore */}
      <AuthProvider auth={auth} polybase={polybase}>
        <Component {...pageProps} />
      </AuthProvider>
    </PolybaseProvider>
  );
}
