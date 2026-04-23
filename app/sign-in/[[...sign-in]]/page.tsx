import { Terminal } from "@/components/ui/terminal";
import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center ">
            <div className="flex  items-center justify-center ">
                <div className="mx-10 ">
                    <SignIn
                        path="/sign-in"
                        routing="path"
                        signUpUrl="/sign-up"
                       
                    />
                </div>
                <div className="hidden lg:flex items-center justify-center h-120 w-lg">
                    <Terminal
                        commands={[
                            "Display Group Members",
                            "Display Project Name",
                            "Display Technologies Used",
                            "Sign-In to Continue"
                        ]}
                        outputs={{
                            0: [
                                "24K-2521 Shazil Ahmed",
                                "24K-2565 Syeda Narmeen Zehra",
                                "24K-2509 Syeda Wajiha Hassan",
                            ],
                            1: ["ONE-STOP-HUB"],
                            2: [
                                "FrontEnd: NextJS",
                                "BackEnd: NextJS",
                                "Database: PostgreSql"
                            ],
                        }}
                        typingSpeed={30}
                        delayBetweenCommands={2000}
                        enableSound={false}
                        username="Project Hackurz"
                        initialDelay={600}
                    />
                </div>
            </div>

        </div>
    );
}