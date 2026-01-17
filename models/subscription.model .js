import mongoose from "mongoose";
const subscritiptionSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'the subscription name is required'],
        trim:true,
        minlegth:2,
        maxlength:50

    },
    price:{
        type:Number,
        required:[true,'subscription price is required'],
        min:[0,'price must be greate that zero']   
    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP'],
        default:'USD'
    },
   frequency:{
    type:String,
    enum:['daily','weekly','monthly','yearly'],
    required:true

   },

    category:{
        type:String,
        enum:['sports','news','entertainment','lifestyle','technology','finance','politics','other'],
        required:true
        
    },
    payment:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value<= new Date(),
            message:'start date must in the past or the current date'
        }
    },
     renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator:function(value){
             value>this.startDate
            },
            message:'renewal date must be after the startdate'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }


},{timestamps:true})
subscritiptionSchema.pre('save',function(next){
    if(!this.renewalDate){
    const renewalPeriods= {
        daily:1,
        weekly:7,
        monthly:30,
        yearly:365,
    }
    this.renewalDate=new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency])
}
if(this.renewalDate<new Date()){
    this.status='expired'
}
})
const Subscription= mongoose.model('subscription',subscritiptionSchema)

export default Subscription
