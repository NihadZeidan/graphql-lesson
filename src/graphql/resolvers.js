import { gql } from "apollo-boost";
import { addItemToCart, cartItemCount } from "./cart.utils";

export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddCartItem(item: Item!): [Item]!
  }

  extend type Item {
    quantity: Int!
  }
`;

const GET_CART_HIDDEN = gql`

{
    // Client directive
    
    cartHidden @client
}`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      // This readQuery to read the data from the cache
      const data = cache.readQuery({ query: GET_CART_HIDDEN });

      // This writeQuery to update the data in the cache
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !data.cartHidden },
      });

      //  Anytime we want to update the cache, we need to return the new data so you can use it in the app
      return !data.cartHidden;
    },

    addCartItem: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });

      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: cartItemCount(cartItems) },
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },
  },
};
