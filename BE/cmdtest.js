const {exec} = require("child_process")
var cmd = require("node-cmd")


exec("ffmpeg -y -ss 00:00:01 -to 00:00:04 -i video.mp4 -c copy output.mp4", (err, stdout, stderr) => {
    if(err){
        console.log("err",err)
        return
    }
    if(stderr){
        console.log("stderr: ", stderr)
        return
    }
    console.log(`stdout: ${stdout}`)
})

/*
cmd.run(`ffmpeg -ss 00:00:01 -to 00:00:04 -i video.mp4 -c copy output.mp4`, (err, data, stderr)=>{
    if(data){
        console.log(`data \n ${data}`)
    }
})
*/

