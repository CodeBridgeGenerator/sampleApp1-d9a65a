import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

import SingleProductsPage from "../components/app_components/ProductsPage/SingleProductsPage";
import ProductProjectLayoutPage from "../components/app_components/ProductsPage/ProductProjectLayoutPage";
import SingleObjectsPage from "../components/app_components/ObjectsPage/SingleObjectsPage";
import ObjectProjectLayoutPage from "../components/app_components/ObjectsPage/ObjectProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
  return (
    <Routes>
      {/* ~cb-add-unprotected-route~ */}
      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        
<Route path="/products/:singleProductsId" exact element={<SingleProductsPage />} />
<Route path="/products" exact element={<ProductProjectLayoutPage />} />
<Route path="/objects/:singleObjectsId" exact element={<SingleObjectsPage />} />
<Route path="/objects" exact element={<ObjectProjectLayoutPage />} />
        {/* ~cb-add-protected-route~ */}
      </Route>
    </Routes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AppRouter);
