"use client";

import {
    Box,
    Flex,
    Text,
    Button,
    Image,
    HStack,
    Input,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
    IconButton,
} from "@chakra-ui/react";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const session = useSession();

    return (
        <Box bg={useColorModeValue("white", "gray.900")} px={4}>
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                px={10}
                py={4}
            >
                <Text
                    textAlign={useBreakpointValue({
                        base: "center",
                        md: "left",
                    })}
                    fontSize="2xl"
                    fontWeight="bold"
                    fontStyle="italic"
                    color={useColorModeValue("orange.500", "orange.400")}
                >
                    CodeIO
                </Text>

                <Input
                    type="text"
                    rounded="full"
                    placeholder="Search users "
                    flex={1}
                    mx={9}
                    variant={"filled"}
                />

                <HStack
                    direction={"row"}
                    spacing={6}
                    fontSize={"sm"}
                    fontWeight={500}
                >
                    <Text _hover={{ color: "orange.500" }}>
                        <Link href="/">Home</Link>
                    </Text>
                    <Text _hover={{ color: "orange.500" }}>
                        <Link href="/code-editor">New project</Link>
                    </Text>
                    {session.data ? (
                        <HStack>
                            <Image
                                src={session.data.user?.image as string}
                                alt="picture"
                                rounded="full"
                                objectFit={"cover"}
                                width={"7"}
                            />
                            <Text fontWeight={"medium"} mr="7">
                                {session.data.user?.name}
                            </Text>
                            <Button
                                size="sm"
                                variant={"outline"}
                                border="2px"
                                borderColor={"gray.600"}
                                leftIcon={<FaSignOutAlt />}
                                onClick={async () => {
                                    await signOut();
                                }}
                            >
                                Logout
                            </Button>
                        </HStack>
                    ) : (
                        <Button>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                    <IconButton
                        aria-label="Toggle dark mode"
                        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                        onClick={toggleColorMode}
                        variant="ghost"
                    />
                </HStack>
            </Flex>
        </Box>
    );
}
