import React, { useState } from 'react'
import '../CSS/style.css'
import Button from './button'
import { taskList } from '..'

const Header = () => {

    const [selectVisible, setSelectVisible] = useState(false)

    const handleSelectVisible = () => {
        setSelectVisible(!selectVisible)
    } 
    
    return (
        <header>
            <div className='header-container'>
                <p className='header__title'>Awesome Kanban Board</p>
                <div className='header__user-block' onClick={handleSelectVisible} >
                    <div className='header__user-block__avatar'></div>
                    <div className={
                        selectVisible? 'header__user-block__select visible' : 'header__user-block__select hidden'}>
                    </div>
                </div>
            </div>
            {selectVisible && <div className='select__block'>
                <div className="triangle"></div>
                <form >
                    <select className='header-select' multiple="multiple" size={2}>   
                        <option className='option' value='Profile' key={1}>Profile</option>
                        <option className='option' value='Log Out' key={2}>Log Out</option>
                        </select>
                    </form>
            </div>}
        </header>
    )
}

export default Header