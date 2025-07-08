import { useEffect, useState } from "react";
import { Menu, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../Redux/usernameSlice.jsx";
import Profile from "../assets/profile.jpg"; // fallback profile image

export default function Sidebar({ setUser, currentUserId }) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.username.users || []);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/users");
                const data = await res.json();
                dispatch(setUsers(data));

                // Find current user's own data
                const user = data.find((u) => u._id === currentUserId);
                setCurrentUser(user);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };

        fetchUsers();
    }, [dispatch, currentUserId]);

    return (
        <div className="w-1/4 bg-gray-900 p-4 flex flex-col">
            {/* Top Section: Menu */}
            <div className="flex justify-between items-center mb-6">
                <Menu className="text-white cursor-pointer w-6 h-6" />
            </div>

            {/* Profile Section */}
            {currentUser && (
                <div className="flex items-center space-x-3 mb-6 p-2 bg-gray-800 rounded-lg">
                    <img
                        src={currentUser.image || Profile}
                        alt={currentUser.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-white">{currentUser.name}</h2>
                    </div>
                    <Edit className="text-white cursor-pointer w-5 h-5 hover:text-gray-400" />
                </div>
            )}

            {/* Chats Section */}
            <h2 className="text-xl font-bold text-white">Chats</h2>
            <div className="mt-4 space-y-2 overflow-y-auto">
                {users
                    .filter((user) => user._id !== currentUserId) // ✅ exclude self
                    .map((user) => (
                        <div
                            key={user._id}
                            className="p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 flex items-center space-x-3"
                            onClick={() => setUser(user._id)}
                        >
                            <img
                                src={user.image || Profile}
                                alt={user.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="text-white">{user.name}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
