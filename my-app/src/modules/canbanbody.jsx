import { useState } from 'react';
import Card from './card';
import React from 'react';
import "../CSS/style.css";
import { LS } from '..';


export default function Canbanbody () {

    let tasksCount = 1
    JSON.parse(LS.getItem('taskList')).map((item) => item.records.map(() => tasksCount++));

    const [counter, setTasksCount] = useState(tasksCount); //счетчик кол-ва задач во всех списках
    const [task, setTask] = useState(JSON.parse(LS.getItem('taskList'))); // Заносим в стэйт список задач
    const [value, setValue] = useState('');  // Текст в инпуте
    const [inputVisible, setInputVisible] = useState(false); // Отображается или нет инпут  

    const handleNewTask = event => 
        setValue(event.target.value.trimStart());

    const handleLocalStorage = () => {
        LS.setItem('taskList', JSON.stringify(task));
        window.dispatchEvent(new Event('storage'));
    }

    function HandleSubmit() {
        if (value !== '') {
            setTasksCount(counter+1)
            // Добавляем новую задачу в бэклог:
            task.map(item => item.status === 'Backlog' ? item.records.push(
                {
                    id: counter,
                    title: value,
                    description: '',
                })
                : item.records);
            handleLocalStorage();
            setTask([...task]);
            setValue('');
            setInputVisible(!inputVisible);
        } else if (!inputVisible) { setInputVisible(!inputVisible); }
    }

    const submitSelect = (selectValue, currentCard) => {
        if (selectValue !== '') {
            let newElem = {};
            // удаление выбранного элемента списка задач из текущего списка
            task.map((item) =>
                item.records.map((key, id) =>
                    key.title === selectValue && (newElem = item.records[id]) && item.records.splice(id, 1)));
            // перемещаем задачу в новый список:
            task.map(item => item.status === currentCard && item.records.push(newElem));
            setTask([...task]);
            handleLocalStorage();
        }
    }

    return (
        <div className={'canbanbody'} >{
            task.map((item, id) =>
                <Card key={id} taskStatus={item.status} task={task} inputVisible={inputVisible}
                    value={value} handleNewTask={handleNewTask} HandleSubmit={HandleSubmit}
                    submitSelect={submitSelect} />)}
        </div>
    )
}