import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Chat from "./Chat/Chat";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
