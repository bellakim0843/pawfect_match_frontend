import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";
import Cookie from "js-cookie";
import axios from "axios";
import { formatDate } from "./lib/utils";
import { IUser } from "./types";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

export interface IUploadSitterVariables {
  pk: number;
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

export interface IUpdateSitterVariables {
  sitterPk: string;
  name: string;
  country: string;
  city: string;
  address: string;
  price: number;
  description: string;
  services: number[];
  category: number[];
}

export const updateSitter = (variables: IUpdateSitterVariables) =>
  instance
    .put(`sitters/${variables.sitterPk}`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

type CheckBookingQueryKey = [string, string?, Date[]?];

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

export interface IUploadOwnerVariables {
  id: number;
  account: IUser;
  pet_name: string;
  pet_gender: string;
  pet_age: number;
  pet_weight: number;
  pet_breed: string;
  neutering: boolean;
  pet_description: string;
}

export const uploadOwner = (variables: IUploadOwnerVariables) =>
  instance
    .post(`users/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getOwners = () =>
  instance.get("users/").then((response) => response.data);

export const getOwner = ({ queryKey }: QueryFunctionContext) => {
  const [, ownerPk] = queryKey;
  return instance.get(`users/${ownerPk}`).then((response) => response.data);
};

export const getOwnerMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export interface IUpdateOwnerVariables {
  ownerPk: string;
  pet_name: string;
  pet_gender: string;
  pet_age: number;
  pet_weight: number;
  pet_breed: string;
  neutering: boolean;
  pet_description: string;
}

export const updateOwner = (variables: IUpdateOwnerVariables) =>
  instance
    .put(`users/${variables.ownerPk}`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

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

interface ISignUpVariables {
  name: string;
  email: string;
  username: string;
  password: string;
  is_sitter: boolean;
}

export const SignUp = ({
  username,
  password,
  email,
  name,
  is_sitter,
}: ISignUpVariables) =>
  instance
    .post(
      `users/`,
      { username, password, email, name, is_sitter },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.data);

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [first, sitterPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = formatDate(firstDate);
    const checkOut = formatDate(secondDate);
    return instance
      .get(
        `sitters/${sitterPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};

export interface ISitterBookingVariables {
  check_in: string;
  check_out: string;
  sitterPk: string;
  pets: number;
}

export interface ISitterBookingSuccess {
  check_in: string;
  check_out: string;
}

export type sitterBookingErrMsgType = {
  [key: string]: string[];
};

export interface ISitterBookingError {
  response: {
    data: sitterBookingErrMsgType;
    status: number;
    statusText: string;
  };
}

export const sitterBooking = (variables: ISitterBookingVariables) =>
  instance
    .post(`sitters/${variables.sitterPk}/bookings`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUserBookings = () =>
  instance.get("users/bookings").then((response) => response.data);

export const getSitterBookings = ({ queryKey }: QueryFunctionContext) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, sitterPk] = queryKey;
  return instance
    .get(`sitters/${sitterPk}/bookings`)
    .then((response) => response.data);
};

export const getUploadURL = () =>
  instance
    .post(`photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadImageVarialbes {
  file: FileList;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbes) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  description: string;
  file: string;
  sitterPk: string;
}

export const createPhoto = ({
  description,
  file,
  sitterPk,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `sitters/${sitterPk}/photos`,
      { description, file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
