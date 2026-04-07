import React from "react";

const SubTitle = ({ title, desc, align }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center false ${align === "left" && "md:items-start md:text-left"}`}
    >
      <h3 className={`text-lg md:text-[1.2rem]`}>{title}</h3>
      {desc && (
        <p className="text-[1rem] md:text-base text-gray-500 max-w-174 mb-5">
          {desc}
        </p>
      )}
    </div>
  );
};

export default SubTitle;
