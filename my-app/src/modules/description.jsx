import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './button';
import '../CSS/style.css';
import { LS } from '..';

export default function Description ({ ...props }) {
    
    let rez
    const [task, setTask] = useState(JSON.parse(LS.getItem('taskList')));
    const [value, setValue] = useState(checkValue);
    const [disableBtn, setDisabled] = useState(true); 
    
    function checkValue () {
        for (let n in task) {
            if (task[n].status === props.match.params.status)
            { for (let x in task[n].records) {
                    if (task[n].records[x].id === +props.match.params.id)
                    { return rez = task[n].records[x].description; }
                }}
            }}
            
    const handleInput = event => {
        setValue(event.target.value);
        setDisabled(rez === value ? true : false);
    }
    
    const handleSubmit = () => {
        for (let n in task) {
            if (task[n].status === props.match.params.status) {
                for (let x in task[n].records) {
                    if (task[n].records[x].id === +props.match.params.id) {
                        task[n].records[x].description = value.trim();
                        setValue(value.trim());
                        setDisabled(true);
                        LS.setItem('taskList', JSON.stringify(task));
                        setTask([...task]);
                    }
                }
            }
        }
    }
    
    return (
        <div className='description-container'>
            <div>
                <h1 className='description-container__title'>{task.map(item => item.status === props.match.params.status 
            && item.records.map(key => key.id === +props.match.params.id && key.title))}</h1>        
            <input type='text' value={value} placeholder='This task has no description' 
            className='description-container__input block' onChange={handleInput}/>
                <div className="description-container__back-to-main">
                <NavLink to='/'>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1.35355" y1="0.646447" x2="24.3536" y2="23.6464" stroke="black" />
                    <line y1="-0.5" x2="32.5269" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 24 1)" stroke="black" />
                </svg>
                </NavLink>
                </div>
            </div>
        <Button label='Save description' disableBtn={disableBtn} onClick={handleSubmit}
                className='description-container__save-button'/>
        </div>)
            }
