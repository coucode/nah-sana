import { NavLink, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { useContext } from "react";
import UserIcon, { ProjectLi } from "../UserIcon";
import { NavAddUserModal, NavDropdownAddUserModal, NavTaskModal, NavProjectForm } from "./NavModals";
import { DropdownHandlingContext } from "../../context/DropdownHandlingContext";

import './leftbar.css';


export default function LeftNavBar() {
    const workspace = useSelector(state => state.workspace);
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory();

    const { createDropdownOpen,
        createDropdownRef,
        setCreateDropdownOpen,
        setWorkspaceDropdownOpen,
        workspaceDropdownOpen,
        workspaceDropdownRef } = useContext(DropdownHandlingContext);

    function redirectToProfile(userId) {
        history.push(`/workspaces/${workspace.workspace.id}/user/${userId}`)
    }
    function redirectToProject(projectId) {
        history.push(`/workspaces/${workspace.workspace.id}/projects/${projectId}`)
    }

    return (workspace && currentUser && workspace.workspace ? (
        <>
            <div id='left-nav-bar'>
                <div id='add-any'>
                    <span onClick={() => setCreateDropdownOpen(val => !val)}>
                        <i className="fas fa-plus" /> Create
                    </span>
                </div>
                <div id='user-main-links'>
                    <NavLink to={`/workspaces/${workspace.workspace.id}`} exact>
                        <i className="fas fa-home" />Home
                    </NavLink>
                    <NavLink to={`/workspaces/${workspace.workspace.id}/user/${currentUser.id}/list`} exact>
                        <i className="far fa-check-circle" />
                        My Tasks
                    </NavLink>
                </div>
                <div className='horizontal-separator' style={{ margin: "10px 0" }} />
                <div id='this-workspace-links'>
                    <span id='workspace-name'>
                        {workspace.workspace.name}
                        <i className="fas fa-plus" onClick={() => setWorkspaceDropdownOpen(val => !val)} />
                    </span>
                    <div id='user-circles'>
                        {Object.values(workspace.users).map(user => (
                            <UserIcon user={user} clickHandler={() => redirectToProfile(user.id)} />
                        )
                        )}
                    </div>
                    <ul id='left-nav-projects-list'>
                        {
                            workspace.projects.map(project => (
                                <ProjectLi project={project} clickHandler={() => redirectToProject(project.id)} />
                            ))
                        }
                    </ul>
                </div>
                <div className='horizontal-separator' style={{ margin: "10px 0" }} />
                <div id='extra-space' />
                <div className='horizontal-separator' style={{ margin: "10px 0" }} />
                <div style={{ marginBottom: 10 }}>
                    <NavAddUserModal />
                </div>
            </div>
            <div id='create-dropdown' className="left-dropdowns" style={{ display: createDropdownOpen ? 'flex' : 'none' }} ref={createDropdownRef}>
                <NavTaskModal handleClick={() => setCreateDropdownOpen(false)} />
                <NavProjectForm handleClick={() => setCreateDropdownOpen(false)} />
                <NavDropdownAddUserModal handleClick={() => setCreateDropdownOpen(false)} />
            </div>
            <div id='create-dropdown-workspace' className="left-dropdowns" style={{ display: workspaceDropdownOpen ? 'flex' : 'none' }} ref={workspaceDropdownRef}>
                <NavProjectForm handleClick={() => setWorkspaceDropdownOpen(false)} />
                <NavDropdownAddUserModal handleClick={() => setWorkspaceDropdownOpen(false)} />
            </div>
        </>) : null
    )

}
