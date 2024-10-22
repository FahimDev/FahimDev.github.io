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
