import Movie from "../models/movie.model.js";


export const getMovies=async(req,res,next)=>{
try{
    const movies=await Movie.find().sort({views:-1})
    if(!movies){
    
 res.status(404).json({success:false,message:"no movies found"})
 return
}
res.status(200).json({
    success:true,
    data:movies
})
}catch(error){
res.status(500).send("internal server error")
next(error)
}

}

