import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { io } from "socket.io-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:5000" : "/api";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket"],
    });
  }
  return io("/", {
    path: "/api/socket.io",
    autoConnect: false,
    withCredentials: true,
    transports: ["websocket"],
  });
};
