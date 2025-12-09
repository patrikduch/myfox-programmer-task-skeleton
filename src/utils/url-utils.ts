import {
  BASE_PHOTO_URL,
  BASE_FORM_DOMAIN,
} from "@/constants/graphql-constants";

export const getImageUrl = (secret: string): string =>
  `${BASE_PHOTO_URL}/${secret}`;

export const getFormUrl = (alias: string): string =>
  `https://${alias}.${BASE_FORM_DOMAIN}/form/show`;
