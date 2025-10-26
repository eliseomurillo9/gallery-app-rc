import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "../features/signIn/signIn.view";

export const Route = createFileRoute('/signIn')({
  component: SignIn,
})