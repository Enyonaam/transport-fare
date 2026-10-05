import { getUsers, getASingleUserById  } from "../models/userModel.js";


export const getUsersController = async (req, res) => {
    try {
        const Users = await getUsers();

        res.status(200).json(Users)
    
    } catch (error) {
        res.status(500).json({

            message: 'Failed to get Users',
            error: error.message
        });
    }
};

 export const getASingleUserByIdController = async (req, res) => {
    try {
        const {id} = req.params;

       const SingleUser = await getASingleUserById(id);

        if(!SingleUser) {
            return res.status(404).json({
                message: 'SingleUser not found'
            });
        } 

        res.status(200).json(SingleUser);
         
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get SingleUser',
            error: error.message
        });
    }
};