import type {
  PremieresResponse,
  MoviesResponse,
  SubscriptionsResponse,
} from "./pocketbase-types";

export type ExpandedPremiereResponse = PremieresResponse<{
  movie?: MoviesResponse;
  "subscriptions(premiere)"?: SubscriptionsResponse[];
}>;
