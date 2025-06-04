"use client";

import { Provider } from "react-redux";
import ChatLayoutClient from "../../components/ChatLayoutClient/intex";
import { store } from "../../store";

export default function ChatLayout({ children }: { children: React.ReactNode; }) {
  return (
    <Provider store={store}>
      <ChatLayoutClient>
        {children}
      </ChatLayoutClient>
    </Provider>
  );
}