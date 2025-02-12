export const USER_CATEGORY = ['Anxiety', 'Depression', 'Bipolar Disorder', 'PTSD', 'OCD', 'Other'];

export const USER_STATUS = ['Under Treatment', 'Recovered', 'No Action Taken', 'In Progress'];

export const ROLES = {
    user: "user",
    admin: "admin",
    coach: "coach",
    advisor: "advisor"
}

export const STATUS_TYPES= ['In progress', 'In proccess', 'Closed']

export const ROLES_MAPPING = {
    [ROLES.advisor]: 'advisorId',
    [ROLES.coach]: 'coachId',
    [ROLES.admin]: 'adminId',
    [ROLES.user]: 'userId',
};

export const SESSION_STATUS = {
    Scheduled: 'Scheduled',
    In_Progress: 'In Progress',
    Completed: 'Completed',
    Canceled: 'Canceled',
    Rescheduled: 'Rescheduled',
    Pending: 'Pending'
}
