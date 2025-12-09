import {
  BASE_PHOTO_URL,
  BASE_FORM_DOMAIN,
} from "@/constants/graphql-constants";

export const getImageUrl = async (secret: string): Promise<string | null> => {
  if (!secret) return null;

  try {
    const response = await fetch(
      `${BASE_PHOTO_URL}/${encodeURIComponent(secret)}`
    );

    if (!response.ok) {
      console.error("Failed to fetch image URL", response.status);
      return null;
    }

    const text = await response.text();
    return text.trim();
  } catch (err) {
    console.error("Error fetching image URL", err);
    return null;
  }
};

export const getFormUrl = (alias: string): string =>
  `https://${alias}.${BASE_FORM_DOMAIN}/form/show`;
