"use client";

import Nav from "@/components/UI/nav";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import store from "../redux/store";

interface Props {
  children: ReactNode;
}

export default function ClientLayout({ children }: Props) {
  return (
    <Provider store={store}>
      <Nav />
      {children}
    </Provider>
  );
}
