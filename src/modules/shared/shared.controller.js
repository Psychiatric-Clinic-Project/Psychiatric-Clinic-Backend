import SupportPlan from '../../../Database/models/support-Plan.model.js';
import { ROLES } from '../../constant.js';
import { createdSuccessfullyMessage } from '../../utils/index.js';

export const addSupportPlan = async (req, res) => {

    const { title, content } = req.body;
    const userId = req.user._id; 
    const userRole = req.user.role;
    const newPlanData = {
        title,
        content,
        createdBy: userId,
        createdByRole: userRole,
    };

    if (userRole === ROLES.advisor) {
        newPlanData.advisorId = userId;
    } else if (userRole === ROLES.coach) {
        newPlanData.coachId = userId;
    }

        const newPlan = await SupportPlan.create(newPlanData);
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


  