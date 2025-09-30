import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const LoadingDialog = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>

          {/* ✅ Move custom content outside AlertDialogDescription */}
          <div className="flex flex-col items-center py-10">
            <Image
              alt="Loading animation"
              src="/loading.gif"
              width={100}
              height={100}
            />
            <h2 className="mt-4 text-center">
              Please wait... Course is being crafted on your request
            </h2>
          </div>

          {/* ✅ Keep description plain text only */}
          <AlertDialogDescription className="sr-only">
            Please wait while the course is generated
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
