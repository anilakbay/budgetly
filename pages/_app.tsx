import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "../redux/store";

const RootApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ mode: "light" }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default RootApp;
