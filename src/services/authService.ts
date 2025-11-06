import { userStore } from "../store/user";
import type { User } from "../types/User";

export function authUser(userEmail: User['email']) {
  const users = window.localStorage.getItem('users');

  if (!users) {
    throw Error("Users not found, try reloading the page")
  }
  const user = JSON.parse(users).data.find((user: User) => user.email === userEmail)

  if (!user) {
    throw Error('User not found, try continue as guest')
  }
  
  window.localStorage.setItem(user.id, JSON.stringify(user))
  userStore.setUser(user)
}