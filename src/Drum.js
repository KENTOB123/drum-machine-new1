import { useState,useEffect } from "react";
import AudioClips from "./Clip";

const Drum = () => {
    const [activekey, setActiveKey] = useState('');
     async function playing(audioClip) {
        const audio = document.getElementById(audioClip.keyTrigger);
        console.log(audio);
        if (audio){
            try{
            audio.currentTime = 0;
            await audio.play();
            setActiveKey(audioClip.description);
            } catch (error) {
                console.error("オーディオ再生中にエラーが発生しました:", error);
            }
            
        }
            // 非同期処理が必要？await/asyncを学ぶ
    
    
}
    const handleKeyPress = (event) => {
        const key = event.key.toUpperCase();
        const matchAudioClip = AudioClips.find((audioClip) => audioClip.keyTrigger === key );

        if(matchAudioClip) {
            
            playing(matchAudioClip);
        }
    };

    useEffect(() => {
     document.addEventListener("keydown", handleKeyPress);
    },[]);


    return(
  <>
  <div id="display">{activekey}</div>
    {AudioClips.map((audioClip) => (
        <div key={audioClip.keyTrigger}>
   <button 
    className="drum-pad"
    id={audioClip.description}
    onClick={() => playing(audioClip)}
   >
    {audioClip.keyTrigger}
    <audio 
    className="clip"
    id={audioClip.keyTrigger}
    src={audioClip.url}/>
   </button>
   </div>
    ))}
  </>
    );
};

export {Drum}