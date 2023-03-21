import { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import React from 'react';
import "../CSS/style.css";
import { useEffect } from 'react';
import Button from './button'

export default function Card({ ...props }) {
    const [disableBtn, setDisabled] = useState(false);   // Активна или нет кнопка ****
    const [selectVisible, setSelectVisible] = useState(false); // Виден или нет выпадающий список задач
    const [selectValue, setSelectValue] = useState(''); //Создаем стэйт для выпадающего списка

const handleSelect = event => {
    setSelectValue(event.target.value);
}

function handleDisableBtn () {
    for (let i = 1; i < props.task.length; i++) {
        if (props.task[i].status === props.taskStatus
            && props.task[i - 1].records.length < 1) {
                setDisabled(true)
            }
            else if (props.task[i].status === props.taskStatus
                && props.task[i - 1].records.length > 0) {
                    setDisabled(false)
                }
            }
        }

function handleSelectVisible() {
    if (!selectVisible) { setSelectVisible(true); }
}

function selectSubmitted() {
    if (selectVisible && selectValue !== '') { 
        setSelectVisible(false);
        setSelectValue('');
    }
}

    useEffect(handleDisableBtn, [props.task, props.taskStatus])
    
    return (
        <div className='canbanbody-card' >
            <nav className='scroll'> {<ul >
                {props.taskStatus}
                {props.task.map((item) => item.status === props.taskStatus &&
                    item.records.map(key =>
                        <li key={key.id} className='canbanbody-card__tasklist'>
                        <NavLink to={`/${props.taskStatus}/${key.id}`} 
                        className='canbanbody-card__links'>
                        {key.title}</NavLink>
                        </li>
                    ))}
            </ul> }
            {props.taskStatus === 'Backlog' ?
                <>
                    {props.inputVisible &&
                        <input className='canbanbody-card__input' type='text' value={props.value}
                        placeholder="______________________________________________________________________________________________________________________" 
                        onChange={props.handleNewTask}>
                        </input>
                    }
                    <Button label={props.inputVisible ? 'Submit' : '+ Add card'}
                            className={props.inputVisible ? 
                                'canbanbody-card__button__submit' : 'canbanbody-card__button'}
                            onClick={props.HandleSubmit} /> </>
                :
                <><form >
                    {selectVisible &&
                            <select className='canbanbody-card__select block' required 
                                onChange={handleSelect}
                                onClick={() => 
                                { props.submitSelect(selectValue, props.taskStatus); selectSubmitted (); }}>
                            <option value={''} key={9999} ></option>
                            {props.task.map((item, ind) => item.status === props.taskStatus &&
                                props.task[ind - 1].records.map(key =>
                                    <option value={key.title} key={key.id}>{key.title}</option>
                                ))}
                            </select>
                    }</form>
                    <Button btnName={props.taskStatus} 
                            label='+ Add card' disableBtn={disableBtn}
                            className={'canbanbody-card__button'}
                        onClick={() => handleSelectVisible()} />
                </>
                }</nav>
        </div>
    )
}

