import { createFileRoute } from "@tanstack/react-router";
import { UploadView } from "./upload.view";

export const Route = createFileRoute('/mediaUploader/router')({
  component: UploadView,
})