import { getUsers, getASingleUserById ,updateUser, deleteUser } from "../models/userModel.js";


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

export const updateUserController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const {
        first_name,
        last_name,
        email
      } = req.body;
  
      if (!first_name || !last_name || !email) {
        return res.status(400).json({
          message: 'First name, last name and email are required'
        });
      }
  
      const result = await updateUser(
        id,
        first_name,
        last_name,
        email
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
  
      return res.status(200).json({
        message: 'User updated successfully'
      });
  
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        message: 'Server error'
      });
    }
  };

  export const deleteUserController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await deleteUser(id);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
  
      return res.status(200).json({
        message: 'User deleted successfully'
      });
  
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        message: 'Server error'
      });
    }
  };

  

