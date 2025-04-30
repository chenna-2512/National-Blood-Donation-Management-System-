import { Application } from "../models/application.Model.js";

export const postApplication = async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { 
            name, dob, gender, bloodgroup, email, phoneno, address, 
            city, state, pincode, weight, height, lblooddonate, 
            platelets, socialize, typeofdonar, requestorEmail, message
        } = req.body; 

        if (!email) {
            return res.status(400).json({ message: "Email is required!" });
        }

        const a_email = await Application.findOne({ email });
        if (a_email) {
            return res.status(200).json({ message: "User Profile Already Exists" });
        }

        const ApplicationDetails = new Application({
            name, dob, gender, bloodgroup, email, phoneno, address,
            city, state, pincode, weight, height, lblooddonate,
            platelets, socialize, typeofdonar, requestorEmail, message
        });

        await ApplicationDetails.save();

        res.status(201).json({ message: "Profile Saved Successfully" });
    } catch (error) {
        console.error("Error in postApplication:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

export const getApplication = async (req, res) => {
    try {
        const email = req.query.email || req.body.email; // Handle both GET and POST

        if (!email) {
            return res.status(400).json({ message: "Email is required", status: 0 });
        }

        const data = await Application.findOne({ email });

        if (!data) {
            return res.status(404).json({ message: "No application found for this email", status: 0 });
        }

        res.status(200).json({
            message: "Data fetched successfully",
            data: data,
        });
    } catch (error) {
        console.error("Error fetching application:", error);
        res.status(500).json({
            message: "An error occurred while fetching the data",
            status: 0,
            error: error.message,
        });
    }
};

export const getAllApplications = async (req, res) => {
    try {
        const excludeEmail = req.query.email;

        let data;
        if (excludeEmail) {
            data = await Application.find({ email: { $ne: excludeEmail } }); // exclude logged-in user
        } else {
            data = await Application.find(); // return all if no email is passed
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No applications found", status: 0 });
        }

        res.status(200).json({
            message: "All applications fetched successfully",
            data: data,
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({
            message: "An error occurred while fetching all applications",
            status: 0,
            error: error.message,
        });
    }
};


export const updateSocialize = async(req,res) => {
    try{
        const { email , socialize } = req.body;
        if(!email){
            return res.status(400).json({
                message:"Please Check Once"
            })
        };
        const user = await Application.findOne({ email });
        if(!user){
            res.status(400).json({
                message : 'User Not Found'
            })
        };

        user.socialize = socialize;
        
        await user.save();

        res.status(200).json({
            message : "Updated Successfully",
            data : user,
        })

    }
    catch(error){
        console.error("Error in Requesting:", error);
        res.status(500).json({
            message: "An error occurred while requesting",
        });
    }
}

export const updateMessage = async (req,res) => {
    try{
        const {email,requestorEmail,message,socialize} = req.body;

        if(!email){
            return res.status(200).json({
                message : "Please Login first",
            })
        };

        const userData = await Application.findOne({ email });

        if(!userData){
            return res.status(200).json({
                message : "You Dont Have Any Requests",
            })
        };

        userData.requestorEmail = requestorEmail;
        userData.message = message;
        userData.socialize = socialize;

        await userData.save();

        res.status(400).json({
            message : "Updated Successfully",
        });
    }
    catch(error){
        console.error("Error in Requesting:", error);
        res.status(500).json({
            message: "An error occurred while requesting",
        });
    }
}

export const getRequestor = async (req, res) => {
    try {
      const { requestorEmail } = req.query;
  
      if (!requestorEmail) {
        return res.status(400).json({
          message: "Missing requestorEmail",
        });
      }
  
      const data = await Application.find({ requestorEmail }); // find multiple
  
      if (!data || data.length === 0) {
        return res.status(200).json({
          message: "No one replied to you",
          data: [],
        });
      }
  
      return res.status(200).json({
        message: "Your Reply",
        data: data,
      });
  
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({
        message: "An error occurred while fetching the data",
        status: 0,
        error: error.message,
      });
    }
  };
  

  export const updateProfile = async (req, res) => {
    try {
      const {
        name,
        dob,
        gender,
        bloodgroup,
        email,
        phoneno,
        address,
        city,
        state,
        pincode,
        weight,
        height,
        lblooddonate,
        platelets,
        socialize,
        typeofdonar
      } = req.body;
  
      if (!email) {
        return res.status(400).json({
          message: "Email is required for update",
        });
      }
  
      const updatedUser = await Application.findOneAndUpdate(
        { email },
        {
          $set: {
            name,
            dob,
            gender,
            bloodgroup,
            phoneno,
            address,
            city,
            state,
            pincode,
            weight,
            height,
            lblooddonate,
            platelets,
            socialize,
            typeofdonar
          }
        },
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      return res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,
      });
  
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({
        message: "Server error while updating profile",
      });
    }
  };
  