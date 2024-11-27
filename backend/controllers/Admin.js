import UserModel from "../models/user.js"


const Getuser = async(req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const checkAdmin = await UserModel.findById(userId)

        if (checkAdmin.role === 'admin'){
            return res.status(409).json({
                message: "Admin cannot be deleted"
            })
        }

        const user = await UserModel.findByIdAndDelete(userId)

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User deleted successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        console.log({error})
    }
}
export  {Getuser, deleteUser}