import Sidebar from "./Components/Sidebar.jsx";
import Chats from "./Components/Chats.jsx";
import { useState } from "react";
import WelcomePage from "./Components/WelcomePage.jsx";

export default function App() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <>
            <div className="h-screen w-screen bg-black text-white flex">
                {/* Sidebar */}
                <Sidebar setUser={setSelectedUser}/>

                {/* Chat Section */}
                <div className="flex flex-col flex-1">
                    {selectedUser ? <Chats user={selectedUser}/> : <WelcomePage/>}
                </div>
            </div>
        </>
    );
}
