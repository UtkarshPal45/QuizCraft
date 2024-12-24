import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {type:String, required:true, unique:true},
        email: {type:String, required:true, unique:true},
        password: { type: String, required: true },
        avatar: { type: String, default: '' },
        bio: { type: String, default: '' },
        joinDate: { type: Date, default: Date.now },
        quizzesCreated: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
        quizzesTaken: [{
            quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
            score: Number,
            totalQuestions: Number,
            date: { type: Date, default: Date.now }
        }]
    }
)

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model('User',userSchema)