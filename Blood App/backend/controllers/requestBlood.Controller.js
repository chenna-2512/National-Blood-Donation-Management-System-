import { BloodApplication } from "../models/requestBlood.Model.js";

export const bloodRequest = async (req,res) => {
    try{
        const { name , gender, email, phoneno, address, date, platelets, donorEmail, units, urgencylevel } = req.body;

        if(!email){
            return res.status(400).json({
                message : "Please Login",
            })
        };

        const user = await BloodApplication.findOne({email});

        if(user){
            return res.status(400).json({
                message : "User Already Exists",
            })
        };

        const newBlood = await BloodApplication({
            name : name,
            gender : gender,
            email : email,
            phoneno : phoneno,
            address : address,
            date : date,
            platelets : platelets,
            donorEmail : donorEmail,
            units : units,
            urgencylevel : urgencylevel,
        })

        newBlood.save();

        return res.status(200).json({
            message : "Blood Request Sent Successfully",
            data : newBlood,
        })
    }catch(error){
        console.error("Error in Request:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
}

export const getAllRequests = async (req, res) => {
  try {
    const { donorEmail } = req.query;

    if (!donorEmail) {
      return res.status(400).json({
        message: "User has not registered",
      });
    }

    const data = await BloodApplication.findOne({ donorEmail });

    if (!data) {
      return res.status(404).json({
        message: "No requests found for this profile",
      });
    }

    res.status(200).json({
      message: "Details of requests fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({
      message: "An error occurred while fetching the data",
      error: error.message,
    });
  }
};
