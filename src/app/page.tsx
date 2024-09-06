import HomepageSearchbar from "@/components/HomepageSearchbar";
import ProjectsList from "@/components/ProjectsList";

export default function Home() {
    return (
        <main style={{ width: "70vw", margin: "auto", padding: "40px 0px" }}>
            <HomepageSearchbar />
            <ProjectsList />
        </main>
    );
}
