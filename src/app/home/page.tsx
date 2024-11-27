import Chat from "../../app/components/chat";

export default function Home() {
    return (
        <>
            <div className="text-center py-12 bg-gradient-to-r from-teal-500 to-lime-400 rounded-xl shadow-lg">
                <h1 className="text-5xl font-extrabold text-white mb-4">Mental Muse</h1>
                <p className="text-2xl text-white opacity-90">Talk to the best <span className="font-bold text-yellow-300">Psychiatrist</span> in town</p>
            </div>
            <div className="flex justify-center py-6 bg-gray-50">
                <Chat />
            </div>
        </>
    );
}
