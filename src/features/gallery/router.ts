import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "./Gallery";

export const Route = createFileRoute('/photos')({
  component: Gallery,
})