export interface User {
  id: number,
  user_id: string,
  phone: string,
  first_name: string,
  last_name: string,
  email: string,
  notifications: boolean,
  isPassedOnboarding: boolean
}

export interface User_ extends Partial<Omit<User, 'user_id'>> {
}

export interface UserMainData {
  phone: string,
  first_name: string,
  last_name: string,
  email: string,
}

export enum ActivationType {
  social = "social",
  web = "web",
  telephone = "telephone",
}

export interface UserPromoActivationInfo {
  user_id: string,
  promo_id: number,
  activationType: ActivationType
}

export interface UserPromoLinkInfo {
  user_id: string,
  promo_id: number
}