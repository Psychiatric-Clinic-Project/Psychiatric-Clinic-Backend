import SupportPlan from "../../../Database/models/support-Plan.model.js";
import { createdSuccessfullyMessage, retrievedSuccessfullyMessage } from "../../utils/index.js";

export const addSupportPlan = async (req, res) => {
    console.log("yes")
    const { title, content } = req.body;
    const userId = req.user.id; 
    const userRole = req.user.role; 

    const newPlan = await SupportPlan.create({
        advisorId,
        coachId,
        title,
        content,
        createdBy: userId, 
        createdByRole: userRole 
    });
      return res.success(
        { newPlan },
        createdSuccessfullyMessage("Support Plan"),
        201
      );
    
  };


//   export const getSupportPlanById = async (req, res) => {
//     const {id} = req.params;
//           const supportPlan = await SupportPlan.findById(id);
//           if (supportPlan) {
//             return res.success(
//                 { supportPlan },
//                 retrievedSuccessfullyMessage("Support Plan"),
//                 200
//               );
//           } else {
//             return res.error(notFoundMessage("Support plan"), 404);
//           }
        
//       };


  