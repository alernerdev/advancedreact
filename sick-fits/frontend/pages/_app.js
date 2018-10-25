import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from 'react-apllo';
import withData from '../lib/withData';


class MyApp extends App {
  // special Next.js lifecycle method
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;
    return {pageProps};
  }

  render() {
    // the apollo shows up here because withData at the bottom injects it
    const { Component, apollo, pageProps } = this.props;

    // the container surrounds the content of every page
    // we come to
    return (
      <Container>
        <AplloProvider client={apollo}>
          <Page>
            <Component {...pageProps}/>
          </Page>
        </AplloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
