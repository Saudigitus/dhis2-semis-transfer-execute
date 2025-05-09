import { InfoPage } from "dhis2-semis-components";

export default function CustomInfoPage() {
    return (
        <InfoPage
            title="SEMIS-Transfer-Execute"
            sections={[
                {
                    sectionTitle: "Follow the instructions to proceed:",
                    instructions: [
                        "Select the Organization unit you want to view data",
                        "Use global filters(Class, Grade and Academic Year)",
                    ],
                },
            ]}
        />
    );
}   