const User = require("../model/Usermodel");   
const bcrypt = require("bcrypt");
// CREATE USER

exports.createuser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            ...req.body,
            password: hashedPassword,
        });

        await user.save();  

        res.status(201).json({
            message: "USER CREATE SUCCESSFULLY",
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

// GET ALL USER

exports.getalluser = async (req , res) => {
    try{
        const user = await User.find();

        res.status(200).json({
            message:"ALL USER ARE FATCHED",
            data: user,
        });

    }catch(err){
        res.status(500)({
            message:err.message,
        });
    }
}

// LOGIN 

exports.login = async (req , res) => {
    try{
        const users = await User.findOne({email:req.body.email});

        if(!users){
           return res.status(404).json({
                message:"USER NOT FOUND"
            });
        }
        const ismatch = await bcrypt.compare(req.body.password, users.password);

        if(!ismatch){
            return res.status(404).json({
                message:"PAASWORD NOT MATCH",
            });
        }
        res.json(users);
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
};

// SEARCH USER

exports.searchuser = async (req , res) => {
    try{
        const value = req.params.value;
        const found = await User.findOne({
            $or : [
                {name:value},
                {email:value},
                {aadharnumber:value},
            ],
        });
        if(!found){
        return res.status(200).json({
            message:"USER FIND SUCCESSFULLY",
        });
    }
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    } 
};

// UPDATE

exports.update = async (req , res) => {
    try{
        const updatedUser  = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
        
            {
            new:true,
            runValidators:true,
            }
        )
        if(!updatedUser ){
            return res.status(404).json({
                message:"USER IS NOT FOUND"
            });
        }
        res.status(200).json({
            message:"USER UPDATE SUCCESSFULLY",
            data:user,
        });
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
};

// SOFT DELETE

exports.delete = async (req , res) => {
    try{
        const deletedUser = await User.findByIdAndUpdate(
            req.params.id,
        {
            isDeleted:true
        },
        {
            new:true
        }
        );
        if(!deletedUser){
            return res.status(404).json({
                message:"USER NOT FOUND",
            });
        }
         res.status(200).json({
      message: "User deleted successfully"
    });
        } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
    }
}

//LOGIN AND TOKEN GENRATE

exports.login = async (req , res) => { 
    try{
        const user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
                message:"USER NOT FOUND",
            });
        }
        const ismatch = await bcrypt.compare(req.body.password, user.password);

        if(!ismatch){
            return res.status(400).json({
                message:"PASSWORD NOT MATCH",
            });
        }
            const accesstoken = jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET,
                {expiresIn:process.env.JWT_EXPIRES_IN},
            );

            res.status(200).json({
                message:"LOGIN SUCCESSFULLY",
                token: accesstoken,
                data: user,
            });
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}