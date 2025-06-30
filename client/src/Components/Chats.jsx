// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { Video, Phone, Paperclip } from "lucide-react"; // Importing icons

export default function Chats({ user }) {
    const [messages, setMessages] = useState([
        "Hello!",
        "I'm good, what about you?"
    ]);
    const [newMessage, setNewMessage] = useState("");

    // Placeholder images for users (replace with actual profile pictures)
    const userImages = {
        "Sumit Pathak": "src/assets/Logo-2.png",
        "Aditya Pathak": "src/assets/Logo-1.png",
        "Avishkar Joshi": "src/assets/Logo-3.png",
        "Saket Tepale": "src/assets/Logo-2.png",
        "Abhay Wangwad": "src/assets/Logo-3.png",
    };

    function handleInputChange(event) {
        setNewMessage(event.target.value);
    }

    function sendMessage() {
        if (newMessage.trim() !== "") {
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Append at the end
            setNewMessage(""); // Clear input after sending
        }
    }

    return (
        <>
            {/* Header Section */}
            <div className="p-4 bg-gray-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={userImages[user]} alt={user} className="w-10 h-10 rounded-full" />
                    <h2 className="text-lg font-semibold text-white">{user}</h2>
                </div>
                <div className="flex gap-4">
                    <Phone className="text-white cursor-pointer hover:text-blue-500" size={24} />
                    <Video className="text-white cursor-pointer hover:text-blue-500" size={24} />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-950 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className="flex justify-end">
                        <div className="bg-blue-600 p-3 rounded-lg max-w-xs text-white">{msg}</div>
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
                    value={newMessage}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                    onChange={handleInputChange}
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
