// async function sleep(ms){
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

async function play(playStatus, dateindex, setDateIndex, setPlayStatus, waittime=250){
    if(playStatus === "Play"){
        await setTimeout(() => {
            if(dateindex === 0){setPlayStatus("Pause");}
            else if(dateindex > 0){
                setDateIndex(dateindex-1);
            }
        },waittime)
    }
}

export default play;