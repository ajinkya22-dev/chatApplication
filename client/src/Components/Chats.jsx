import { useEffect, useState } from "react";
import { Video, Phone, Paperclip } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setChats, addMessage } from "../Redux/chatslice.jsx";
import { io } from "socket.io-client";
import { getUserById } from "../Redux/usernameSlice.jsx";
import Profile from "/profile.png";
import {useMemo} from "react";

// eslint-disable-next-line react/prop-types
export default function Chats({ userid, currentUserId }) {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const userChats = useSelector((state) => state.chats.userChats);
    const UserChats = useMemo(() => userChats[userid] || [], [userChats, userid]);
    const userData = useSelector((state) => getUserById(state, userid));

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/chats/${userid}?senderId=${currentUserId}`
                );
                dispatch(setChats({ userId: userid, messages: res.data }));
            } catch (err) {
                console.error("Error loading chat history", err);
            }
        };

        fetchChatHistory();
    }, [dispatch, userid, currentUserId]);


    useEffect(() => {
        const newSocket = io("http://localhost:5000", {
            transports: ["websocket"], // more stable
        });
        setSocket(newSocket);

        newSocket.on("receiveMessage", (message) => {
            const isRelevant =
                (message.from === userid && message.to === currentUserId) ||
                (message.from === currentUserId && message.to === userid);

            if (isRelevant) {
                dispatch(addMessage({ userId: userid, message }));
            }
        });

        return () => newSocket.disconnect();
    }, [dispatch, userid, currentUserId]);

    const sendMessage = async () => {
        if (input.trim() !== "") {
            const message = {
                from: currentUserId,
                to: userid,
                content: input,
            };

            try {
                const res = await axios.post("/api/chats/send", message);
                dispatch(addMessage({ userId: userid, message: res.data }));
                socket.emit("sendMessage", res.data);
                setInput("");
            } catch (err) {
                console.error("Failed to send message", err);
            }
        }
    };

    if (!userData) return <div className="text-white p-4">Loading user...</div>;

    return (
        <>
            {/* Chat Header */}
            <div className="p-4 bg-gray-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={userData.profileImage || Profile}
                        alt={userData.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <h2 className="text-lg font-semibold text-white">{userData.name}</h2>
                </div>
                <div className="flex gap-4">
                    <Phone className="text-white hover:text-blue-500" size={24} />
                    <Video className="text-white hover:text-blue-500" size={24} />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-950 space-y-4">
                {UserChats.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.from === currentUserId ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`p-3 rounded-lg max-w-xs text-white ${
                                msg.from === currentUserId ? "bg-blue-600" : "bg-gray-700"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
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
