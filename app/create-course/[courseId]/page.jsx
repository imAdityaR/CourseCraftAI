"use client";

import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState, use } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const unwrappedParams = use(params); // Next.js 15+ unwrap

  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch course when params or user changes
  useEffect(() => {
    if (unwrappedParams?.courseId && user?.primaryEmailAddress?.emailAddress) {
      getCourse();
    }
  }, [unwrappedParams, user]);

  // Fetch course from DB
  const getCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, unwrappedParams.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]);
      console.log("Course fetched:", result);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  // Generate chapters with content and video
// Generate chapters with content and video
const generateChapterContent = async () => {
  if (!course) return;
  setLoading(true);

  const chapters = course?.courseOutput?.course?.chapters || [];

  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index];
    try {
      // Fetch video
      const videoResp = await service.getVideos(
        `${course?.name}:${chapter?.name}`
      );

      // ✅ corrected access
      const rawVideoId = videoResp[0]?.videoId || "";
      const embedUrl = rawVideoId
        ? `https://www.youtube.com/embed/${rawVideoId}`
        : "";
      console.log(`Fetched video link for chapter ${index}:`, embedUrl);
      console.log(`Fetched video id for chapter ${index}:`, rawVideoId);

      // Generate AI chapter content
      const PROMPT = `Explain the concept in detail on Topic: ${course?.name}, Chapter: ${chapter?.name}, in JSON format with fields: title, description in detail, Code Example (in <precode> tags) if applicable`;
      console.log("AI Prompt:", PROMPT);

      const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
      const content = JSON.parse(result?.response?.text() || "{}");

      // Save Chapter to DB
      await db.insert(Chapters).values({
        chapterId: index,
        courseId: course?.courseId,
        content,
        videoId: rawVideoId,   // ✅ store raw ID
      });

      // Update course publish state after last chapter
      if (index === chapters.length - 1) {
        await db
          .update(CourseList)
          .set({ publish: true })
          .where(eq(CourseList.courseId, course?.courseId));
        router.replace(`/create-course/${course?.courseId}/finish`);
      }
    } catch (error) {
      console.error("Error generating chapter:", error);
    }
  }

  setLoading(false);
};

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <LoadingDialog loading={loading} />

      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={getCourse} />

      {/* Course Detail */}
      <CourseDetails course={course} />

      {/* List of Chapters */}
      <ChapterList course={course} refreshData={getCourse} />

      <Button onClick={generateChapterContent} className="my-10">
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
