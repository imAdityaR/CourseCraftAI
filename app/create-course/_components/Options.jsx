import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from '../../_context/UserInputContext';

function Options() {
  const { userCourseInput, setUserCourseInput } = React.useContext(UserInputContext);

  const handleChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10 mx-20 lg:mx-44">
        
        {/* Difficulty */}
        <div>
          <label className="text-sm">Difficulty</label>
          <Select
            value={userCourseInput.difficulty || ""}   // 👈 controlled value
            onValueChange={(value) => handleChange("difficulty", value)}
          >
            <SelectTrigger className="w-[222px]">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Duration */}
        <div>
          <label className="text-sm">Course Duration</label>
          <Select
            value={userCourseInput.duration || ""}   // 👈 controlled value
            onValueChange={(value) => handleChange("duration", value)}
          >
            <SelectTrigger className="w-[222px]">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More Than 3 Hours">More Than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Video */}
        <div>
          <label className="text-sm">Add Video</label>
          <Select
            value={userCourseInput.addVideo || ""}   // 👈 controlled value
            onValueChange={(value) => handleChange("addVideo", value)}
          >
            <SelectTrigger className="w-[222px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chapters */}
        <div>
          <label className="text-sm">Chapters</label>
          <Input
            type="number"
            placeholder="No of Chapters"
            value={userCourseInput.chapters || ""}   // 👈 controlled value
            onChange={(e) => handleChange("chapters", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Options;
