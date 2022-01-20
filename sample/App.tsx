import { useState, useEffect } from 'react'
import './App.css'
import TestComponent from './hooks/EvenMoreReactComponent';
import UserContextComponent from "./hooks/UseContextComponent"
import UseReducerComponent from "./hooks/UseReducerComponent"
// import RichTextEditor from "./RichTextEditor.jsx";

function App() {
    const [arr, setArr] = useState<number[]>([]);
    const [name, setName] = useState<string | null>(null);
    const [counter, setCounter] = useState<number>(1);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCounter(v => v + 1);
        }, 1000);
        return () => window.clearInterval(timer);
    }, [])

    return (
        // <div>
        //   <RichTextEditor />
        // </div>
        <div className="container mx-auto">
            <h1>Hello World : {counter}</h1>
            <button onClick={() => setArr([...arr, arr.length + 1])}>Add to array</button>
            <p>{JSON.stringify(arr)}</p>
            <hr />
            <UserContextComponent />
            <hr />
            <UseReducerComponent />
            <hr />
            <TestComponent />
        </div>
    )
}

export default App
