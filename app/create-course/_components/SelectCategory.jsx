import React from "react";
import Image from "next/image";
import { UserInputContext } from "../../_context/UserInputContext";
import CategoryList from "@app/_shared/CategoryList";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } =
    React.useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category }));
  };

  return (
    <div className="grid grid-cols-3 gap-10 px-10 md:px-20">
      {CategoryList.map((category, index) => (
        <div
          key={index}
          className={`flex flex-col items-center border p-4 rounded-xl cursor-pointer hover:bg-primary/10 transition hover:border-primary ${
            userCourseInput?.category === category.name
              ? "border-primary bg-primary/10"
              : ""
          }`}
          onClick={() => handleCategoryChange(category.name)}
        >
          <Image
            src={category.icon}
            alt={category.name}
            width={50}
            height={50}
            className="mb-2"
          />
          <h3 className="text-lg font-medium">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SelectCategory;
