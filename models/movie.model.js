import mongoose from "mongoose";

const movieSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50
    },
    description:{
        type:String,
        required:true

    },
    genre:{
        type:String,
        required:[true,"the movie genre is required"],

    },
    picUlr:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        require:true
    },
    views:{
        type:Number,
        required:true,

    }

})

const Movie=mongoose.model("movie",movieSchema)
export default Movie