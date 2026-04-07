import React, { useState } from "react";
import Title from "../components/Base/Title";
import SubTitle from "../components/Base/SubTitle";
import Card from "../components/Base/Card";
import Button from "../components/Base/Button";
import Input from "../components/Base/Input";
import Select from "../components/Base/Select";
import Textarea from "../components/Base/Textarea";
import FormField from "../components/FormField";
import { Popover } from "../components/Base/Popover";
import Badge from "../components/Base/Badge";
import Tag from "../components/Base/Tag";
import Modal from "../components/Base/Modal";
import Table from "../components/Table";
import {
  INITIAL_PROJECT_FORM_DATA,
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  FEATURED_OPTIONS,
} from "../constants/formConstants";
import Pagination from "../components/Base/Pagination";
import { MOCK_PROJECTS } from "../services/mockData";
const DesignSystemPage = () => {
  const [status, setStatus] = useState("ongoing");
  const [statusChecked, setStatusChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("sm");
  return (
    <>
      <Title
        title="디자인 시스템"
        subTitle="사용되어진 컴포넌트에 대한 가이트 페이지입니다."
        align="left"
      />

      <div className="grid gap-8 mt-6 md:grid-cols-2 xl:grid-cols-3">
        {/* 버튼 */}
        <Card>
          <div className="mb-3">
            <SubTitle title="Button" align="left" />
          </div>
          <ul className="border-t pt-3">
            <li>
              <div className="mb-3 text-sm font-bold">색상</div>
              <div className="flex flex-col gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="outline">outline Button</Button>
              </div>
            </li>
            <li className="mt-6 border-t pt-4">
              <div className="mb-3 text-sm font-bold">크기</div>
              <div className="grid gap-4">
                <div>
                  <Button variant="primary" size="sm">
                    Small Button
                  </Button>
                </div>
                <div>
                  <Button variant="primary" size="md">
                    Medium Button
                  </Button>
                </div>
                <div className="">
                  <Button variant="primary" size="lg">
                    Large Button
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </Card>
        {/* 폼 */}
        <Card>
          <div className="mb-3">
            <SubTitle title="Form" align="left" />
          </div>
          <ul className="border-t pt-3">
            <li className="mb-4 flex flex-col gap-4">
              <Input placeholder="Input default" />
              <Input placeholder="Input focused" focused={true} />
              <Input placeholder="Input disabled" disabled />
              <Input type="file" placeholder="Input disabled" />
            </li>
            <li className="mb-4 flex w-full">
              <Textarea placeholder="Textarea" />
            </li>
            <li className="mb-4">
              <FormField
                id="category"
                label="셀렉트"
                type="select"
                name="category"
                options={CATEGORY_OPTIONS}
                required
              />
            </li>

            <li className="mb-4">
              <FormField label="날짜" type="date" name="startDate" />
            </li>
            <li className="mb-4">
              <FormField
                id="status"
                label="라디오"
                type="radio"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={STATUS_OPTIONS}
              />
            </li>
            <li className="mb-4">
              <div className="mb-2 text-sm font-bold">체크박스</div>
              <FormField
                id="status"
                label="체크박스"
                type="checkbox"
                name="status"
                value={statusChecked}
                onChange={(e) => setStatusChecked(!statusChecked)}
                options={STATUS_OPTIONS}
              />
            </li>
          </ul>
        </Card>

        {/* 타이틀 */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <SubTitle title="Title & SubTitle" align="left" />
            <Popover>
              타이틀 컴포넌트입니다. 헤딩태그/정렬에따라 분류됩니다.
            </Popover>
          </div>
          <ul className="border-t pt-3">
            <li className="mb-4 grid gap-3">
              <Title
                title="Heading 2"
                subTitle="디스크립션 : h2태그 / p태그 / 왼쪽정렬"
                align="left"
              />
              <SubTitle
                title="Heading 3"
                desc="디스크립션 : h3태그 / p태그 / 왼쪽정렬"
                align="left"
              />
            </li>
            <li className="mb-4 grid gap-3 border-t pt-4">
              <Title
                title="Heading 2"
                subTitle="디스크립션 : h2태그 / p태그 / 가운데정렬"
                align="center"
              />
              <SubTitle
                title="Heading 3"
                desc="디스크립션 : h3태그 / p태그 / 가운데정렬"
                align="center"
              />
            </li>
          </ul>
        </Card>
        {/* 페이지네이션 & 테이블 */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <SubTitle title="Pagination & Table" align="left" />
          </div>
          <div className="border-t pt-3">
            <div className="overflow-auto w-full max-h-[400px]">
              <Table
                projects={MOCK_PROJECTS}
                columns={["title", "description"]}
              />
            </div>
            <Pagination
              totalPages={3}
              currentPage={2}
              onPageChange={() => {}}
            ></Pagination>
          </div>
        </Card>
        {/* 뱃지 & 태그 */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <SubTitle title="Badge & Tag" align="left" />
          </div>
          <ul className="border-t pt-3">
            <li className="mb-4 inline-flex gap-3 flex-wrap">
              <Badge variant="default">기본</Badge>
              <Badge variant="proceed">진행중</Badge>
              <Badge variant="success">완료</Badge>
              <Badge variant="warning">주의</Badge>
              <Badge variant="danger">위험</Badge>
            </li>
            <li>
              <Tag>Tag</Tag>
              <Tag>Tag</Tag>
              <Tag>Tag</Tag>
              <Tag>Tag</Tag>
            </li>
          </ul>
        </Card>
        {/* 팝오버 & Modal */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <SubTitle title="Popover & Modal" align="left" />
          </div>
          <div className="flex gap-2 mb-4">
            <div>
              왼쪽: &ensp;
              <Popover align="left">
                팝오버 <strong>왼쪽</strong> 방향 컴포넌트입니다.
              </Popover>
            </div>
            <div>
              오른쪽: &ensp;
              <Popover align="right">
                팝오버 <strong>오른쪽</strong> 방향 컴포넌트입니다.
              </Popover>
            </div>
            <div>
              위: &ensp;
              <Popover position="top">
                팝오버 <strong>위</strong> 방향 컴포넌트입니다.
              </Popover>
            </div>
            <div>
              아래 : &ensp;
              <Popover position="bottom">
                팝오버 <strong>아래</strong> 방향 컴포넌트입니다.
              </Popover>
            </div>
          </div>
          <div className="mb-4 border-t pt-4">
            <div className="mb-3 text-sm font-bold">모달 크기</div>
            <div className="grid gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setModalSize("sm");
                  setIsModalOpen(true);
                }}
              >
                Small Modal
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setModalSize("md");
                  setIsModalOpen(true);
                }}
              >
                Medium Modal
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setModalSize("lg");
                  setIsModalOpen(true);
                }}
              >
                Large Modal
              </Button>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={`${modalSize} Modal`}
            size={modalSize}
          >
            <p>
              <strong>{modalSize}</strong> 크기의 모달입니다.
            </p>
          </Modal>
        </Card>
      </div>
    </>
  );
};

export default DesignSystemPage;
