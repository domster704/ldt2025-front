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
