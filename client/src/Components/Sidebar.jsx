
import {useEffect, useState} from "react";
import { Menu, Edit } from "lucide-react"; // Importing icons
import { useDispatch, useSelector } from "react-redux";
import {setUsers} from "../Redux/usernameSlice.jsx";

export default function Sidebar({ setUser }) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [profile, setProfile] = useState({
        name: "Ajinkya Pathak ",
        img: "src/assets/profile.jpg",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await fetch("http://localhost:3001/api/users/me");
            dispatch(setUsers(res.data));
        }
        fetchProfile();
    })


    return (
        <div className="w-1/4 bg-gray-900 p-4 flex flex-col">
            {/* Top Section: Profile and Menu */}
            <div className="flex justify-between items-center mb-6">
                <Menu className="text-white cursor-pointer w-6 h-6" />
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-3 mb-6 p-2 bg-gray-800 rounded-lg">
                <img
                    src={profile.img}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-white">{profile.name}</h2>
                </div>
                <Edit className="text-white cursor-pointer w-5 h-5 hover:text-gray-400" />
            </div>

            {/* Chats Section */}
            <h2 className="text-xl font-bold text-white">Chats</h2>
            <div className="mt-4 space-y-2">
                {users.map((user) => (
                    <div
                        key={user.name}
                        className="p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 flex items-center space-x-3"
                        onClick={() => setUser(user.id)}
                    >
                        <img
                            src={user.img}
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
