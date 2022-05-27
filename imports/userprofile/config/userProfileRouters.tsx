import React from "react";
import UserProfileContainer from "../ui/pages/userProfileContainer";

export const userProfileRouterList = [
  {
    path: "/userprofile/:screenState/:userprofileId",
    component: UserProfileContainer,
    isProtected: true,
  },
  {
    path: "/userprofile/:screenState",
    component: UserProfileContainer,
    isProtected: true,
  },
  {
    path: "/userprofile",
    component: UserProfileContainer,
    isProtected: true,
  },
];
