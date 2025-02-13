import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

const GET_COLLECTIONS_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => {
  return (
    <Query
      query={GET_COLLECTIONS_BY_TITLE}
      variables={{ title: match.params.collectionId }}
    >
      {({ loading, data: { getCollectionsByTitle } }) => {
        if (loading) return <Spinner />;
        return <CollectionPage collection={getCollectionsByTitle} />;
      }}
    </Query>
  );
};

export default CollectionPageContainer;
