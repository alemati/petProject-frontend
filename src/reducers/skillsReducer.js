import skillService from '../services/skillService'

const reducer = (state = [], action) => {
    switch (action.type) {
        case ('CREATE_NEW_SKILL'):
            return state.concat(action.data)
        case ('INIT_SKILLS'):
            return action.data
        case ('REMOVE_SKILL'):
            const newState = state.filter(s => s.id !== action.data)
            return newState
        case 'UPDATE_SKILL': {
            const id = action.data.id
            return state.map(user => user.id !== id ? user : action.data)
        }
        default:
    }
    return state
}

export const updateSkill = (skill) => {
    return async dispatch => {
        const updated = await skillService.update(skill.id, skill)
        dispatch({
            type: 'UPDATE_SKILL',
            data: updated,
        })
    }
}

export const initializeSkills = () => {
    return async dispatch => {
        const skillsFromServer = await skillService.getAll()
        dispatch({
            type: 'INIT_SKILLS',
            data: skillsFromServer,
        })
    }
}

export const createNewSkill = obj => {
    return async dispatch => {
        const createdSkill = await skillService.createNew(obj)
        dispatch({
            type: 'CREATE_NEW_SKILL',
            data: createdSkill,
        })
    }
}

export const removeSkill = (skillId) => {
    return async dispatch => {
        const res = await skillService.remove(skillId)
        dispatch({
            type: 'REMOVE_SKILL',
            data: skillId
        })
    }
}

export default reducer