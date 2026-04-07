import React from "react";

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center false ${align === "left" && "md:items-start md:text-left"}`}
    >
      <h2 className={`text-lg md:text-[1.4rem] font-bold`}>{title}</h2>
      {subTitle && (
        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174 w">
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default Title;
