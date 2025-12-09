import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { client } from "@/graphql/client";
import MyReservationsPage from "@/pages/My-Reservations-Page";
import PersonalInfoPage from "@/pages/Personal-Info-Page";
import "./App.css";
import BaseLayout from "./components/layout/Base.Layout";

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<MyReservationsPage />} />
              <Route path="reservations" element={<MyReservationsPage />} />
              <Route path="personal" element={<PersonalInfoPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};
