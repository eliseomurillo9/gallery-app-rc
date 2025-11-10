import { UploadView } from "@features/mediaUploader/upload.view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/$userId/upload')({
  component: UploadView,
})
