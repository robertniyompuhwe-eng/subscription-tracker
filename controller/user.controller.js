import User from "../models/user.model.js"
export const getUsers=async (req,res,next)=>{
    try{
    const users=await User.find()
res.status(200).send({
    success:true,
    data:users
})

}catch(error){
next(error)
}
}  

export const getUSer= async(req,res,next)=>{
    try{
    const user=await findOne({_id:req.params.id}).select('-password')

    if(!user){
        const error=new Error("user is not found")
        error.statusCode=404
        throw error
    }
    res.status(200).send({
        success:true,data:user
    })
}catch(error){
    next(error)
}

}

