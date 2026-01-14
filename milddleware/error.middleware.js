const errormiddleware=(error,req,res,next)=>{
    try{
        let error={...error}
        error.massage=err.message
        console.error(err)

        if(error.name=='CastError'){
          const message='resource not found' 
          error=new Error(message)
          error.statusCode=404
        }

        if(err.code==11000){
            const message='duplicate field value is entered'
            error=new Error(message)
            error.statusCode=400
        }
        if(err.name=='validationError'){
        const message=Object.values(err.errors).map(val=>val.message)
        error=new Error(message)
        error.statusCode=400
        }
    }catch(error){
}
}