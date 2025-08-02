import { useState } from "react";

export default function UploadHealthCard() {
    const [value, setValue] = useState("");
    function handleFormChange(event){
        console.log(value);
        setValue(event.target.value);
    }

    function handleOnClick(){
        // send a POST request to backend up send this ID
        console.log("clicked");
    }
        
	return (
        <div className="flex flex-col items-center">
                <div className="text-center text-2xl">
                    Upload Healthcard ID
                </div>
                <form className="bg-white">
                    <input onChange={(e) => handleFormChange(e)} type="text" value={value}></input>
                </form> 
                <button className="bg-amber-200 rounded-sm" onClick={handleOnClick}>
                    Upload
                </button>
        </div>
	); 
}