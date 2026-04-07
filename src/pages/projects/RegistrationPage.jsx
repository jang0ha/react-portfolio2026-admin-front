import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Base/Title";
import Modal from "../../components/Base/Modal";
import Button from "../../components/Base/Button";
import ProjectForm from "../../components/Form";
import { projectStorage } from "../../services/storage";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async (formData) => {
    try {
      await projectStorage.create(formData);
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.message || "등록에 실패했습니다");
      setShowErrorModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/projects/list");
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
  };

  const handleCancel = () => {
    navigate("/projects/list");
  };

  return (
    <>
      <Title title="프로젝트 등록" align="left" />
      <div className="max-w-4xl mt-6">
        <ProjectForm onSave={handleSave} onCancel={handleCancel} />
      </div>

      {/* 성공 모달 */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="성공"
      >
        <div className="text-center py-8">
          <p className="text-lg font-semibold mb-6">등록이 완료되었습니다.</p>
          <Button onClick={handleSuccessClose} variant="primary">
            목록으로 이동
          </Button>
        </div>
      </Modal>

      {/* 실패 모달 */}
      <Modal isOpen={showErrorModal} onClose={handleErrorClose} title="오류">
        <div className="text-center py-8">
          <p className="text-lg font-semibold mb-6 text-red-600">
            등록에 실패했습니다.
          </p>
          {errorMessage && (
            <p className="text-sm text-gray-600 mb-6">{errorMessage}</p>
          )}
          <Button
            onClick={handleErrorClose}
            variant="primary"
            className="w-full"
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RegistrationPage;
