import React from "react";
import { Route } from "react-router-dom";

import { defaul as CollectionsOverview } from "../../components/collections-overview/collections-overview.container";

import { default as CollectionPage } from "../collection/collection.component.container";

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
