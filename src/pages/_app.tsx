import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import React, { FC, useEffect } from "react";
import "../styles/reset.css";
import "../styles/main.css";

const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const ClearClientCache: FC<{
  apolloClient: ApolloClient<unknown>;
}> = ({ apolloClient }) => {
  const { data: session } = useSession();
  // clear apollo cache on logout
  useEffect(() => {
    if (!session?.user) {
      apolloClient.resetStore();
    }
  }, [session?.user, apolloClient]);
  return null;
};
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ClearClientCache apolloClient={apolloClient} />
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
export default MyApp;
