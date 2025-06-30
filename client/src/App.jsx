import Sidebar from "./Components/Sidebar.jsx";
import Chats from "./Components/Chats.jsx";
import { useState } from "react";
import WelcomePage from "./Components/WelcomePage.jsx";

export default function App() {
    const [selectedUserid, setSelectedUserid] = useState(null);

    return (
        <>
            <div className="h-screen w-screen bg-black text-white flex">
                {/* Sidebar */}
                <Sidebar setUser={setSelectedUserid}/>

                {/* Chat Section */}
                <div className="flex flex-col flex-1">
                    {selectedUserid ? <Chats user={selectedUserid}/> : <WelcomePage/>}
                </div>
            </div>
        </>
    );
}
