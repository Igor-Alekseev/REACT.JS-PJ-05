import React, { useEffect, useState } from "react";
import '../CSS/style.css';

const Footer = ({...props}) => {
    
    const [countBacklog, setCountBacklog] = useState(handleTasksNumber('Backlog'));
    const [countFinished, setCountFinished] = useState(handleTasksNumber('Finished'));
    
    function handleTasksNumber (status) {
        for (let i = 0; i < props.task.length; i++) {
            if (props.task[i].status === status)
            { return props.task[i].records.length; }
        }
    }
    
    useEffect(() => {setCountBacklog(handleTasksNumber('Backlog'));
    setCountFinished(handleTasksNumber('Finished'))}, 
    [props.task]);
    
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-container__tasks">
                    <p>Active tasks: {countBacklog}</p> 
                    <p className="footer-container__paragraph">Finished tasks: {countFinished}</p>
                </div>
                <p className="footer-container__copyright">Kanban board by Igor Alekseev, 2023</p>
            </div>
        </footer>
        )
}
    
export default Footer;