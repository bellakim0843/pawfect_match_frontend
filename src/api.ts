import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";
import Cookie from "js-cookie";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

export const getSitters = () =>
  instance.get("sitters/").then((response) => response.data);

export const getSitter = ({ queryKey }: QueryFunctionContext) => {
  const [, sitterPk] = queryKey;
  return instance.get(`sitters/${sitterPk}`).then((response) => response.data);
};

export const getSitterReviews = ({ queryKey }: QueryFunctionContext) => {
  const [, sitterPk] = queryKey;
  return instance
    .get(`sitters/${sitterPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getServices = () =>
  instance.get(`sitters/services/`).then((response) => response.data);

export const getCategories = () =>
  instance.get(`categories/`).then((response) => response.data);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance.post(
    `users/log-in`,
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );

export interface IUploadSitterVariables {
  name: string;
  country: string;
  city: string;
  address: string;
  price: number;
  description: string;
  services: number[];
  category: number[];
}

export const uploadSitter = (variables: IUploadSitterVariables) =>
  instance
    .post(`sitters/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [first, sitterPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const [checkIn] = firstDate.toJSON().split("T");
    const [checkOut] = secondDate.toJSON().split("T");
    return instance
      .get(
        `sitters/${sitterPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};
