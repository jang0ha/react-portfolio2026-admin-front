import React, { useState } from "react";
import FormField from "../components/FormField";
import Button from "../components/Base/Button";
import { useNavigate } from "react-router-dom";
import { authStorage } from "../services/storage";
import styled, { css } from "styled-components";
import Title from "../components/Base/Title";
import { MOCK_ADMIN } from "../services/mockData";
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
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
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
    <main className="flex flex-col justify-center items-center py-10 h-screen">
      {error && <ErrorBox>{error}</ErrorBox>}
      <Title title="로그인" subTitle="포트폴리오 어드민 페이지입니다."></Title>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mt-10 border-y py-5 w-full max-w-sm"
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
        <div className="relative mt-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase ">
            <span className="bg-card text-muted-foreground px-2">
              모의 로그인 정보
            </span>
          </div>
        </div>
        <div className="text-center text-muted-foreground text-xs">
          <p>
            이메일: <span>admin@example.com</span>
          </p>
          <p>
            비밀번호: <span>password</span>
          </p>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
