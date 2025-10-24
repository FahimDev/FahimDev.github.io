import ChallengeCard from "./ChallengeCard";

interface Props {
    project: any;
}

export default function MoreAboutProject({ project }: Props) {
    return (
        <>
            {project ? (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap justify-center gap-20">
                        <div className=" max-w-[53rem]">
                            <h3 className="text-2xl mb-3">Feature List</h3>
                            <ul className="list-disc flex flex-col gap-3">
                                {project.features.map(
                                    (feature: any, index: number) => (
                                        <li key={index}>{feature}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Check if project has challenges_and_solution array for new card layout */}
                    {project.challenges_and_solution ? (
                        <div className="my-5">
                            <h3 className="text-2xl mb-6 text-center">Business Challenges & Solutions</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
                                {project.challenges_and_solution.map(
                                    (item: any, index: number) => (
                                        <ChallengeCard
                                            key={index}
                                            title={item.title}
                                            challenge={item.challenge}
                                            solution={item.solution}
                                            impact={item.impact}
                                            challengeNumber={index + 1}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-20 my-5">
                            <div className="max-w-96">
                                <h3 className="text-2xl mb-3">
                                    Business Challenges
                                </h3>
                                <ol className="list-decimal flex flex-col gap-3">
                                    {project.business_challenges.map(
                                        (challenge: any, index: number) => (
                                            <li key={index}>{challenge}</li>
                                        )
                                    )}
                                </ol>
                            </div>
                            <div className=" max-w-96">
                                <h3 className="text-2xl mb-3">Solutions</h3>
                                <ol className="list-decimal flex flex-col gap-3">
                                    {project.solutions.map(
                                        (solution: any, index: number) => (
                                            <li key={index}>{solution}</li>
                                        )
                                    )}
                                </ol>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-20">
                        <div className=" max-w-[53rem]">
                            <h3 className="text-2xl mb-3">My Contributions</h3>
                            <ul className="list-disc flex flex-col gap-3">
                                {project.contributions.map(
                                    (contribution: any, index: number) => (
                                        <li key={index}>{contribution}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                "Loading..."
            )}
        </>
    );
}
