"use client";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginWithGoogleButton() {
    return (
        <Button
            px={6}
            rounded="full"
            border="1px"
            bg="transparent"
            leftIcon={<FcGoogle size={20} />}
            type="submit"
            onClick={async () => {
                await signIn("google");
            }}
        >
            Continue with Google
        </Button>
    );
}
