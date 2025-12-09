import { gql } from "@apollo/client";

export const GET_CUSTOMER = gql`
  query GetCustomer($id: String!) {
    getCustomer(where: { id: $id }) {
      id
      name
      surname
      email
      phone
      address
      picture {
        id
        secret
      }
    }
  }
`;

export const GET_CALENDARS = gql`
  query GetCalendars($customerId: String!) {
    listCalendars(
      where: {
        customers: { some: { id: { equals: $customerId } } }
        eventType: { equals: Individual }
      }
      orderBy: { from: DESC }
    ) {
      id
      from
      to
      state
      note
      carts {
        id
        name
        item {
          id
          name
          picture {
            id
            secret
          }
        }
      }
      shop {
        id
        name
        address {
          id
          street
          city
          zip
        }
        phone
        email
      }
      subject {
        id
        name
        alias
        microsite {
          id
          logo {
            id
            secret
          }
        }
      }
      employees {
        id
        userMyFox {
          id
          name
          surname
          phone
          email
        }
      }
    }
  }
`;
