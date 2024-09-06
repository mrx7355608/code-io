import { Box, Container, Flex } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem";

export default function ProjectsList() {
    const projects = [
        {
            title: "Project 1",
            imageUrl: "/placeholder.svg?height=200&width=300",
            authorName: "John Doe",
            authorImageUrl: "/placeholder.svg?height=40&width=40",
        },
        {
            title: "Project 2",
            imageUrl: "/placeholder.svg?height=200&width=300",
            authorName: "Jane Smith",
            authorImageUrl: "/placeholder.svg?height=40&width=40",
        },
        {
            title: "Project 3",
            imageUrl: "/placeholder.svg?height=200&width=300",
            authorName: "Bob Johnson",
            authorImageUrl: "/placeholder.svg?height=40&width=40",
        },
        {
            title: "Project 4",
            imageUrl: "/placeholder.svg?height=200&width=300",
            authorName: "Alice Brown",
            authorImageUrl: "/placeholder.svg?height=40&width=40",
        },
    ];

    return (
        <Box minH="100vh" py={8} w="full">
            <Flex flexWrap="wrap" justifyContent="center" w="full" gap="4">
                {projects.map((project, index) => (
                    <ProjectItem key={index} {...project} />
                ))}
            </Flex>
        </Box>
    );
}
