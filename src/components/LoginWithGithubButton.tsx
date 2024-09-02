import { Button } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";

export default function LoginWithGithubButton() {
    return (
        <Button
            px={6}
            border="1px"
            rounded="full"
            bg="transparent"
            leftIcon={<BsGithub size={20} />}
        >
            Continue with Github
        </Button>
    );
}
