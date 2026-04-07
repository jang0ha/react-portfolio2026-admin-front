import styled, { css } from "styled-components";
import Button from "./Base/Button";
import { authStorage } from "../services/storage";
import { useNavigate } from "react-router-dom";

const Header = ({ admin, onLogout }) => {
  const navigate = useNavigate();
  // 로그아웃
  const handleLogout = () => {
    authStorage.logout();
    navigate("/login");
  };
  return (
    <header className="flex justify-between py-3 px-2 w-screen border-b px-8">
      <div className="flex justify-between items-center py-4">
        포트폴리오 관리
      </div>

      <Button size="sm" variant="ghost" onClick={handleLogout}>
        로그아웃
      </Button>
    </header>
  );
};

export default Header;
