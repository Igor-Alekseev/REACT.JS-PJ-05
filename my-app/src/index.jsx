
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, {useState} from 'react';
import "./CSS/style.css";
import "./CSS/style-mobile.css";
import ReactDOM from 'react-dom';
import Description from './modules/description'
import Canbanbody from './modules/canbanbody'
import Footer from './modules/footer';
import Header from './modules/header';

export let taskList = [{
    status: 'Backlog',
    records: []
},
{
    status: 'Ready',
    records: []
},
{
    status: 'In progress',
    records: []
},
{
    status: 'Finished',
    records: []
},
];

export const LS = localStorage;
const storage = LS.getItem('taskList') ? LS.getItem('taskList') : JSON.stringify(taskList)
LS.setItem('taskList', storage)


const App = () => {

const [tasks, setTasks] = useState(JSON.parse(LS.getItem('taskList')));

window.addEventListener('storage', () => {
    setTasks(JSON.parse(LS.getItem('taskList')))
})

    return (<>
        <Header />
        < BrowserRouter >
        <main className='main'>
            <Switch>
                    <Route exact path='/' component={Canbanbody} />
                <Route path='/:status/:id' component={Description} />
            </Switch>
        </main>
        </BrowserRouter>
        <Footer task={tasks} />
    </>
        )
    }

ReactDOM.render(<App />, document.querySelector("#app"))