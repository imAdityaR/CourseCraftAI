"use client";
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from '../../_context/UserInputContext';

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = React.useContext(UserInputContext);

  const handleChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className='mx-20 lg:mx-44'>
      <div className='mt-5'>
        <label>Write The Topic You Want To Generate The Course For...</label>
        <Input 
          placeholder="Topic"
          value={userCourseInput?.topic || ""}
          onChange={(e) => handleChange("topic", e.target.value)}
        />
      </div>
      <div className='mt-5'>
        <label>Write A Short Description For The Course...</label>
        <Textarea 
          placeholder="Description"
          value={userCourseInput?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default TopicDescription;
