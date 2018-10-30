import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export default class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            console.log(data);
            if (loading) return <p>Loading ...</p>;

            if (error) return <p>Error: {error.message}</p>;

            if (!data || !data.items || data.items.length === 0) return <p>No inventory</p>

            return <ItemsList>
              {data.items.map(item => <Item item={item} key={item.id} />)}
            </ItemsList>
          }}
        </Query>
      </Center>
    );
  }
}

export { ALL_ITEMS_QUERY };