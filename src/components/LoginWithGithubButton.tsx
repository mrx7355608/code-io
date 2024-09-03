"use client";
import { Button } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";

export default function LoginWithGithubButton() {
    return (
        <Button
            px={6}
            border="1px"
            rounded="full"
            bg="transparent"
            leftIcon={<BsGithub size={20} />}
            onClick={async () => {
                await signIn("github");
            }}
        >
            Continue with Github
        </Button>
    );
}
