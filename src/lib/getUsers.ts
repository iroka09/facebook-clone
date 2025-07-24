
import { UsersResponse } from "./get_users_types"

export async function getUsers(params?: string): Promise<UsersResponse["users"]> {
  params = params.startsWith("?") ? params : "?" + params
  const res = await fetch('https://dummyjson.com/users/' + params || "", { cache: "force-cache" });
  const json = (await res.json()) as UsersResponse;
  return json.users
}