import React, { useState } from "react";
import FormField from "../components/FormField";
import Button from "../components/Base/Button";
import { useNavigate } from "react-router-dom";
import { authStorage } from "../services/storage";
import styled, { css } from "styled-components";
import Title from "../components/Base/Title";
import { MOCK_ADMIN } from "../services/mockData";
import { Popover } from "../components/Base/Popover";
const ErrorBox = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #fcc;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Mock 인증
      authStorage.login(email, password);

      // 대시보드로 이동
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col justify-center  items-center py-10 h-screen">
      {error && <ErrorBox>{error}</ErrorBox>}
      <Title title="로그인" subTitle="포트폴리오 어드민 페이지입니다."></Title>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mt-10 border-t pt-5 py-8 w-full max-w-sm"
      >
        <FormField
          label="이메일"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          required
        />
        <FormField
          label="비밀번호"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <Button type="submit" className="w-full">
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </form>
      <Popover>
        <div className="border-b pb-2">로그인 정보</div>
        <div className="pt-2">
          <p>
            <span>admin@example.com</span>
          </p>
          <p>
            <span>password</span>
          </p>
        </div>
      </Popover>
    </main>
  );
};

export default LoginPage;
