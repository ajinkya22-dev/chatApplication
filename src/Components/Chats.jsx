
// eslint-disable-next-line react/prop-types
export default function Chats({user}){
    return (
        <>
            <div className="p-4 bg-gray-900">
                <h2 className="text-lg font-semibold">{user}</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-950 space-y-4">
                <div className="flex justify-start">
                    <div className="bg-gray-800 p-3 rounded-lg max-w-xs">Hello!</div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-blue-600 p-3 rounded-lg max-w-xs">Hi, how are you?</div>
                </div>
                <div className="flex justify-start">
                    <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
                        I'm good, what about you?
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-900 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                    Send
                </button>
            </div>
        </>
    );
}
