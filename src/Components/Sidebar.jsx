// eslint-disable-next-line react/prop-types
export default function Sidebar({setUser}) {
    const users = ["Ajinkya Pathak", "Aditya Pathak"];

    return (
        <div className="w-1/4 bg-gray-900 p-4 flex flex-col">
            <h2 className="text-xl font-bold">Chats</h2>
            <div className="mt-4 space-y-2">
                {users.map((user) => (
                    <div
                        key={user}
                        className="p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                        onClick={() => setUser(user)}
                    >
                        {user}
                    </div>
                ))}
            </div>
        </div>
    );
}
