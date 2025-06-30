import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function WelcomePage() {
    const [userName, setUserName] = useState("");
    const nameToDisplay = "Welcome, Ajinkya !";

    // Typewriter effect for user name
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setUserName(nameToDisplay.slice(0, index));
            index++;
            if (index > nameToDisplay.length) clearInterval(interval);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            {/* Animated Text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center"
            >
                <motion.h1
                    className="text-6xl font-extrabold text-white glow-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                >
                    {userName}
                </motion.h1>

                <motion.p
                    className="text-xl text-gray-300 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                >
                    Select a user to start chatting!
                </motion.p>
            </motion.div>

            {/* Custom CSS for glowing text */}
            <style>
                {`
                .glow-text {
                    text-shadow: 0px 0px 8px #ffffff, 0px 0px 20px #00c3ff, 0px 0px 30px #ff00ff;
                }
                `}
            </style>
        </div>
    );
}
