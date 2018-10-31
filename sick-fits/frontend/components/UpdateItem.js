import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import ErrorMessage from "./ErrorMessage";
import Router from "next/router";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

export default class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  titleFormSnippet = (title) => {
    // defaultValue does not tie to state
    return (
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          required
          defaultValue={title}
          onChange={this.handleChange}
        />
      </label>
    );
  };

  descriptionFormSnippet = (description) => {
    return (
      <label htmlFor="description">
        Description
        <textarea
          id="title"
          name="description"
          placeholder="Enter a description"
          required
          defaultValue={description}
          onChange={this.handleChange}
        />
      </label>
    );
  };

  priceFormSnippet = (price) => {
    return (
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          required
          defaultValue={price}
          onChange={this.handleChange}
        />
      </label>
    );
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log('updating Item');
    console.log(this.state);  
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    }); 
    console.log('Updated!!');
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for id {this.props.id}</p>;

          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}> 
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    {this.titleFormSnippet(data.item.title)}
                    {this.descriptionFormSnippet(data.item.description)}
                    {this.priceFormSnippet(data.item.price)}
                    <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export { UPDATE_ITEM_MUTATION };
