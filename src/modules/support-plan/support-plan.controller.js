import SupportPlan from '../../../Database/models/support-Plan.model.js';
import { createdSuccessfullyMessage } from '../../utils/index.js';
// Ensure correct path

export const addSupportPlan = async (req, res) => {

    const { title, content } = req.body;
    const userId = req.user._id; // User ID from the token
    const userRole = req.user.role; // User role from the token

    const newPlanData = {
        title,
        content,
        createdBy: userId,
        createdByRole: userRole,
    };

    // Set either advisorId or coachId based on user role
    if (userRole === "advisor") {
        newPlanData.advisorId = userId;
    } else if (userRole === "coach") {
        newPlanData.coachId = userId;
    } else {
        return res.error("User role not authorized to create a support plan", 403);
    }

    try {
        const newPlan = await SupportPlan.create(newPlanData);
        return res.success(
            { newPlan },
            createdSuccessfullyMessage("Support Plan"),
            201
        );
    } catch (error) {
        return res.error("Failed to create Support Plan", 500);
    }
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


  