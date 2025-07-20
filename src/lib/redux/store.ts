
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import Cookies from "js-cookie"


const testMiddleware = (store) => (next) => (action) => {
  return next(action)
}

export const store = configureStore(
  {
    reducer: {
      user: userReducer
    },
    preloadedState: undefined,
    middleware: (defaultOnes) => defaultOnes().concat(testMiddleware),
  }
);

store.subscribe(async () => {
  Cookies.set("redux-state", JSON.stringify(store.getState()), {
    path: "/",
    sameSite: "strict",
    secure: false,
    expires: 1, //1day
  })
})

type StoreType = typeof store
export type RootStateType = ReturnType<StoreType["getState"]>
export type DispatchType = StoreType["dispatch"]