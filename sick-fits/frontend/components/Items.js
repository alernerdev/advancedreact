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

/* this is a Render Prop approach: 
  we are placing a component in the render and the 
  child of a component is a function that gives you different results back:
    - a loading state, error, or a list of items
*/
class Items extends Component {
  render() {
    // data is coming back inside the function and I am "spreading" out those payload pieces
    // that I am interested in
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

export default Items;
export { ALL_ITEMS_QUERY };