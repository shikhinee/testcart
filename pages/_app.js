import { Fragment } from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import { getFetcher } from "@/utils/fetchers";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { StoreProvider } from "@/utils/Store";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import "@/styles/global.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const Layout = Component.Layout ? Component.Layout : Fragment;

  return (
    <SessionProvider>
      <StoreProvider>
        <SWRConfig
          value={{
            // refreshInterval: 0,
            revalidateOnFocus: false,
            fetcher: getFetcher,
          }}
        >
          <RecoilRoot>
            <ThemeContextProvider>
              <Layout>
                {Component.auth ? (
                  <Auth adminOnly={Component.auth.adminOnly}>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
            </ThemeContextProvider>
          </RecoilRoot>
        </SWRConfig>
      </StoreProvider>
    </SessionProvider>
  );
};
function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}

export default App;
