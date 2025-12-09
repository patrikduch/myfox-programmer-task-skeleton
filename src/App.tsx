import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { client } from "@/graphql/client";
import MyReservationsPage from "@/pages/My-Reservations-Page";
import PersonalInfoPage from "@/pages/Personal-Info-Page";
import "./App.css";
import BaseLayout from "@/components/layout/Base.Layout";
import { ROUTES } from "@/constants/routes-constants";

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path={ROUTES.ROOT} element={<BaseLayout />}>
              <Route index element={<MyReservationsPage />} />
              <Route
                path={ROUTES.RESERVATIONS}
                element={<MyReservationsPage />}
              />
              <Route path={ROUTES.PERSONAL} element={<PersonalInfoPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};
