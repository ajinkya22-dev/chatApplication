import { useEffect, useState } from "react";
import { Video, Phone, Paperclip } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setChats, addMessage } from "../Redux/chatslice.jsx";
import { getUserById } from "../Redux/usernameSlice.jsx";

export default function Chats({ userid }) {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const UserChats = useSelector((state) => state.chats.userChats);
    const userData = useSelector((state) => getUserById(state, userid));


    if (!userData) {
        return <div className="text-white p-4">Loading user...</div>;
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axios.get(`/api//${userid}`);
                if (res.data) {
                    dispatch(setChats(res.data));
                }
            } catch (err) {
                console.error("Error fetching chats:", err);
            }
        };
        fetchChats();
    }, [dispatch, userid]);

    // 💬 Send message
    function sendMessage() {
        if (input.trim() !== "") {
            dispatch(addMessage(input));
            setInput("");
        }
    }

    return (
        <>
            {/* Header Section */}
            <div className="p-4 bg-gray-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={userData.image || "https://via.placeholder.com/40"}
                        alt={userData.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <h2 className="text-lg font-semibold text-white">
                        {userData.name}
                    </h2>
                </div>
                <div className="flex gap-4">
                    <Phone className="text-white cursor-pointer hover:text-blue-500" size={24} />
                    <Video className="text-white cursor-pointer hover:text-blue-500" size={24} />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-950 space-y-4">
                {UserChats.map((msg, index) => (
                    <div key={index} className="flex justify-end">
                        <div className="bg-blue-600 p-3 rounded-lg max-w-xs text-white">
                            {msg}
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input Section */}
            <div className="p-4 bg-gray-900 flex items-center gap-2">
                <button className="text-white hover:text-blue-500">
                    <Paperclip size={24} />
                </button>
                <input
                    type="text"
                    value={input}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 text-white"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </>
    );
}
