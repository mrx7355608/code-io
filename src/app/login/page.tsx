import { Heading, Text, VStack } from "@chakra-ui/react";
import LoginWithGoogleButton from "@/components/LoginWithGoogleButton";
import LoginWithGithubButton from "@/components/LoginWithGithubButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession();

    if (session) {
        return redirect("/");
    }

    return (
        <VStack minH="100vh" justifyContent={"center"}>
            <Heading fontFamily={"Fira Code"} as="h2" mb="3">
                CodeIO
            </Heading>
            <Text mb={8}>Save your creative work, login now {`(> ~ <)`} </Text>
            <LoginWithGoogleButton />
            <LoginWithGithubButton />
        </VStack>
    );
}
