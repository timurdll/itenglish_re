import About from "../../pages/About/About";
import AdminPanel from "../../pages/AdminPanel/AdminPanel";
import Landing from "../../pages/Landing/Landing";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import SignUp from "../../pages/SignUp/SignUp";
import { Lesson } from "../Lesson/Lesson";
import {
  ADMIN_ROUTE,
  CONTACT_ROUTE,
  LANDING_ROUTE,
  LESSONS_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SIGNUP_ROUTE,
} from "./consts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: CONTACT_ROUTE,
    Component: About,
  },
  {
    path: LANDING_ROUTE,
    Component: Landing,
  },
  {
    path: SIGNUP_ROUTE,
    Component: SignUp,
  },
  {
    path: ADMIN_ROUTE,
    Component: AdminPanel,
  },
  //   {
  //     path: CONTACT_ROUTE,
  //     Component: ContactForm,
  //   },
];

export const privateRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: LESSONS_ROUTE,
    Component: Lesson,
  },
];

export const adminRoutes = [
  // {
  //   path: ADMIN_ROUTE,
  //   Component: AdminPanel,
  // },
];
