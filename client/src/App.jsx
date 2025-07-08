import {  useState } from "react";
import Sidebar from "./Components/Sidebar.jsx";
import Chats from "./Components/Chats.jsx";
import WelcomePage from "./Components/WelcomePage.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";

export default function App() {
    const [selectedUserid, setSelectedUserid] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [showLogin, setShowLogin] = useState(true);


    if (!currentUserId) {
        return showLogin
            ? <Login setCurrentUser={setCurrentUserId} setShowLogin={setShowLogin} />
            : <Signup setShowLogin={setShowLogin} />;
    }

    return (
        <div className="h-screen w-screen bg-black text-white flex">
            {/* Sidebar */}
            <Sidebar setUser={setSelectedUserid} currentUserId={currentUserId} />

            {/* Chat Section */}
            <div className="flex flex-col flex-1">
                {selectedUserid ? (
                    <Chats userid={selectedUserid} currentUserId={currentUserId} />
                ) : (
                    <WelcomePage />
                )}
            </div>
        </div>
    );
}
