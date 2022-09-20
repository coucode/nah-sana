import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import LogoutButton from './auth/LogoutButton';
import Topbar from "./Topbar";
import DevOnlyContent from "./DevOnlyContent";
import GetOne from "./Workspace-test-reducer/GetOneWorkspace";
import GetProjects from "./Projects/ProjectsList";
import ProjectDetail from "./Projects/ProjectDetail";
import ProjectDetailList from "./Projects/ProjectDetailList";



export default function Workspace() {
    const dispatch = useDispatch();
    // routeMatch is used to choose isolate which workspace we are on
    const match = useRouteMatch();
    const workspaceId = match.params.id

    const [workspaceLoaded, setWorkspaceLoaded] = useState(null)

    const [navDisplay, setNavDisplay] = useState(true)

    // this will be updated with a fetch containing all info
    // in the future, we may instead use useSelectors on all slices of state
    //    which are filled when fetch hydrates state
    const [workspace, setWorkspace] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `/api/workspaces/${workspaceId}`
            )
            const loadedWorkspace = await response.json()
            // console.log(loadedWorkspace)
            setWorkspace(loadedWorkspace)
            setWorkspaceLoaded(true)
            // dispatch(actionLoadWorkspace(loadedWorkspace.workspace))
            // dispatch(actionLoadProjects(loadedWorkspace.projects))
            // dispatch(actionLoadUsers(loadedWorkspace.users))
            // dispatch(actionLoadTasks(loadedWorkspace.tasks))
        })()
    }, [dispatch])

    function toggleNavbarDisplay() {
        setNavDisplay(state => !state)
    }

    return workspaceLoaded ? (
        <>
            <Topbar toggleNavbarDisplay={toggleNavbarDisplay} />
            <div id='navbar-and-content'>
                <div id='navbar' style={{ display: navDisplay ? 'flex' : 'none' }}></div>
                <div id='content'>
                    <Switch>
                        {/* Put all other main content routes here */}
                        {/* This one below is just a placeholder for content */}
                        <Route exact path='/workspaces/:id'>
                            {/* changed path from / */}
                            {/* <DevOnlyContent workspace={workspace} /> */}
                            <GetOne workspaceId={workspaceId} />
                            <GetProjects workspaceId={workspaceId} />
                        </Route>
                        <Route exact path='/workspaces/:id/projects'>
                            <GetProjects workspaceId={workspaceId}/>
                        </Route>
                        <Route exact path='/workspaces/:workspaceId/projects/:id'>
                            <ProjectDetail workspaceId={workspaceId} />
                        </Route>

                    </Switch>
                </div>
            </div>
        </>
    ) : null
}
