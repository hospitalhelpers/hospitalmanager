import UploadHealthCard from "./UploadHealthCard";

export default function Homepage() {
        
	return (
        <div className="bg-blue-200 w-screen h-screen flex justify-center">
            <div className="bg-blue-300 w-[80%] items-center flex flex-col">
                <div className="items-center text-3xl">
                        Homepage
                </div>
                {/* upload card online */}
                <UploadHealthCard />
            </div>
        </div>
	); 
}