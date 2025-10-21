import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ViewSneakers from "./pages/ViewSneakers";
import EditSneaker from "./pages/EditSneaker";
import CreateSneaker from "./pages/CreateSneaker";
import SneakerDetails from "./pages/SneakerDetails";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <CreateSneaker title="SoleMate | Customize" />,
    },
    {
      path: "/customsneakers",
      element: <ViewSneakers title="SoleMate | Custom Sneakers" />,
    },
    {
      path: "/customsneakers/:id",
      element: <SneakerDetails title="SoleMate | View" />,
    },
    {
      path: "/edit/:id",
      element: <EditSneaker title="SoleMate | Edit" />,
    },
  ]);

  return (
    <div className="app">
      {/* Floating sneaker background elements */}
      <div className="floating-sneaker">👟</div>
      <div className="floating-sneaker">👟</div>
      <div className="floating-sneaker">👟</div>

      <Navigation />

      {element}
    </div>
  );
};

export default App;
