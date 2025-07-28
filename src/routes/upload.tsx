import { createFileRoute } from "@tanstack/react-router";
import { UploadView } from "../features/mediaUploader/upload.view";

export const Route = createFileRoute('/upload')({
  component: UploadView,
})
