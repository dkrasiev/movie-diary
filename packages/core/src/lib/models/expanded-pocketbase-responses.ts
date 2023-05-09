import type {
  PremieresResponse,
  MoviesResponse,
  SubscriptionsResponse,
  UsersResponse,
} from "./pocketbase-types";

export type ExpandedPremiereResponse = PremieresResponse<{
  movie?: MoviesResponse;
  "subscriptions(premiere)"?: SubscriptionsResponse[];
}>;

export type ExpandedSubscriptionResponse = SubscriptionsResponse<{
  user: UsersResponse;
  premiere: PremieresResponse<{ movie: MoviesResponse }>;
}>;
