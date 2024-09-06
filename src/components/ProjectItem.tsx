"use client";
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

interface CardProps {
    title: string;
    imageUrl: string;
    authorName: string;
    authorImageUrl: string;
}

export default function ProjectItem({
    title,
    imageUrl,
    authorName,
    authorImageUrl,
}: CardProps) {
    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "white");

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={bgColor}
            color={textColor}
            flex="1"
        >
            <Image src={imageUrl} alt={title} />
            <Box p="6">
                <Heading as="h3" size="md" mb={2}>
                    {title}
                </Heading>
                <Flex align="center" mb={4}>
                    <Image
                        borderRadius="full"
                        boxSize="40px"
                        src={authorImageUrl}
                        alt={authorName}
                        mr={2}
                    />
                    <Text fontWeight="bold">{authorName}</Text>
                </Flex>
                <Button colorScheme="blue" width="100%">
                    Open project
                </Button>
            </Box>
        </Box>
    );
}
