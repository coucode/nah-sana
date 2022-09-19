//constants

const LOAD_WORKSPACE = 'workspace/LOAD_WORKSPACE'
const CREATE_WORKSPACE = 'workspace/CREATE_WORKSPACE'
const UPDATE_WORKSPACE = 'workspace/UPDATE_WORKSPACE'
const GET_ONE_WORKSPACE = 'workspace/GET_ONE_WORKSPACE'

const ADD_USER = 'workspace/ADD_USER'
const REMOVE_USER = 'workspace/DELETE_USER'

const loadWorkspace = (workspace) => ({
    type: LOAD_WORKSPACE,
    workspace
})
const getOneWorkspace = (workspace) => ({
    type: GET_ONE_WORKSPACE,
    workspace
})

const createWorkspace = (workspace) => ({
    type: CREATE_WORKSPACE,
    workspace
})
const updateWorkspace = (workspace) => ({
    type: UPDATE_WORKSPACE,
    workspace
})

const addUser = (user) => ({
    type: ADD_USER,
    user
})
const removeUser = (user) => ({
    type: REMOVE_USER,
    user
})
// Get All Workspace
export const workspaceGet = () => async (dispatch) => {
    const response = await fetch(`/api/workspaces`)
    if (response.ok) {
        const workspace = await response.json()
        dispatch(loadWorkspace(workspace))
    }
}
//Get All workspace details
export const oneWorkspace = (id) => async (dispatch) => {
    // console.log(id)
    const response = await fetch(`/api/workspaces/${id}`)
    if (response.ok) {
        const workspace = await response.json()
        dispatch(getOneWorkspace(workspace))
        return workspace
    }
}
//Create Workspace
export const workspaceCreate = (workspace) => async (dispatch) => {
    const response = await fetch('/api/workspaces', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workspace)
    })
    if (response.ok) {
        const wks = await response.json();
        dispatch(createWorkspace(wks))
        // return wks
    }
    return response
}
//Update Workspace
export const workspaceUpdate = (workspace, id) => async (dispatch) => {
    // console.log('THUNK WORKSPAXCE', workspace, id)
    const response = await fetch(`/api/workspaces/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workspace)
    })
    if (response.ok) {
        const wks = await response.json();
        dispatch(updateWorkspace(wks));
        return wks
    }
    return response
}
//add user
export const addUserToWorkspace = (user, id) => async (dispatch) => {
    const response = await fetch(`/api/workspaces/${id}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    if (response.ok) {
        const user = await response.json();
        dispatch(addUser(user));
        return user
    }
    return response
}
export const removeUserFromWorkspace = (user, id, userId) => async (dispatch) => {
    const response = await fetch(`/api/workspace/${id}/users/${userId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const res = await response.json()
        dispatch(removeUser(res))
    }
    return response
}
const initialState = {};
export default function workspaceReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_WORKSPACE:
            const allWorkspaces = {}
            // console.log('HELLLO', action.workspace.workspaces)
            action.workspace.workspaces.forEach(ws => {
                allWorkspaces[ws.id] = ws
            });
            return {
                ...allWorkspaces
            }
        case GET_ONE_WORKSPACE:
            newState = { ...state }
            newState = { ...newState[action.workspace.id], ...action.workspace }
            return newState
        case CREATE_WORKSPACE:
            newState = { ...state }
            newState[action.workspace.id] = action.workspace
            return newState
        case UPDATE_WORKSPACE:
            newState = { ...state }
            newState['workspace'] = { ...action.workspace }
            return newState

        case ADD_USER:
            newState = { ...state }
            newState['users'] = { ...newState[action.user.id] }
            // newState['users'].push(action.user)
            return newState
        case REMOVE_USER:
            newState = { ...state }
            newState['user'] = delete newState[action.user.id]
            return newState
        // newState['users'].filter(user => user.id === action.user.id)
        // return newState
        // delete newState['user'] = action.user
        default:
            return state;

    }
}
