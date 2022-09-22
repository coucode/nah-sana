import { getTasksByProjectId } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTasksByWorkspace } from "../../store/tasks";
import { Modal } from '../../context/Modal';


import { useHistory } from "react-router-dom";
import TaskForm from "./TaskForm";
// import TaskDetail from "./TaskDetail";
// REVISIT CSS
import './TaskStyle/TaskDetail.css'
import './TaskList.css'
import './TaskStyle/TaskTable.css'
import TaskDetail from "./TaskDetail";

const TasksListByProject = ({ projectId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const tasks = useSelector((state) => state.tasks)
    const tasksArr = Object.values(tasks)
    console.log(tasks)

    const [showTaskDetail, setShowTaskDetail] = useState(false)
    const [onClickTaskId, setOnClickTaskId] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    // console.log('**********projects from component****', projects)
    // console.log('**********tasks from component****', tasks)

    useEffect(() => {
        dispatch(getTasksByProjectId(projectId)).then(() => setIsLoaded(true))
    }, [dispatch, showTaskDetail])

    if (!tasksArr.length) return null
    return isLoaded ? (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }} className="table-outer-container">
                    <div className="table-outer-container">
                        <div className='add-task-button'
                            style={{ width: 'fit-content', border: 'solid 1px grey', borderRadius: '4px', fontSize: '18px', fontWeight: 300, marginLeft: '15px', marginTop: '8px', padding: '8px' }}
                            onClick={() => { setShowForm(true) }}>
                            <i className="fa-solid fa-plus"></i> Add Task
                        </div>
                        <table className={showTaskDetail ? "table-onclick" : "table"}>
                            <tr className="table-row">
                                <th className="table-head">Task Name</th>
                                <th className="table-head">Due Date</th>
                            </tr>
                            {tasksArr.map((task) => (

                                <tr key={task.id} className="table-row">
                                    <td className="table-cell" id='task-name'>
                                        <div className="table-cell-text">{task.name}</div>
                                        <div id='button' onClick={() => (
                                            setShowTaskDetail(!showTaskDetail),
                                            setOnClickTaskId(task.id),
                                            setShowSideBar(!showSideBar)
                                        )}>View Details</div>
                                    </td>
                                    <td className="table-cell">{task.dueDate.split(' ')[2]} {task.dueDate.split(' ')[1]}</td>
                                </tr>
                            ))
                            }
                        </table >
                    </div>
                </div>
                <div>
                    {showTaskDetail ? <TaskDetail taskId={onClickTaskId} setShowTaskDetail={setShowTaskDetail} /> : null}
                </div>
            </div >
            {showForm && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    ) : null
}

export default TasksListByProject
