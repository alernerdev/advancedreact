import App, { Container } from "next/app";
import Page from "../components/Page";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    // the container surrounds the content of every page
    // we come to
    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
