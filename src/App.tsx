import {useEffect, useRef, useState} from 'react'
import './App.css'
import io from 'socket.io-client'
import {MyMessage} from "./components/MyMessage";
import {OtherMessage} from "./components/OtherMessage";

const socket = io('http://localhost:3333')

interface ServerMessage {
    owner: string,
    message: string;
}

function App() {

    const bottomRef = useRef<HTMLHeadingElement>(null);

    const [messages, setMessages] = useState<ServerMessage[]>([]);
    const [name, setName] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        socket.on('sendMessageToUser', onReceiveMessage)
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages])

    function onReceiveMessage(message: ServerMessage) {
        setMessages([...messages, message])
    }

    function emitUserMessage() {
        socket.emit('userSendMessage', {
            owner: name,
            message: message
        })
    }

    function onSendMessageClick(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        emitUserMessage();
        setMessage('');
    }

    function onNameChange(e: React.FormEvent<HTMLInputElement>) {
        setName(e.currentTarget.value)
    }

    function onMessageChange(e: React.FormEvent<HTMLInputElement>) {
        setMessage(e.currentTarget.value)
    }

    function onEnterKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            emitUserMessage();
            setMessage('')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-slate-600">
            <div className="flex flex-col w-96 h-96 p-2 bg-slate-200 rounded-sm">
                <input placeholder="Digite seu nome"
                       className="w-full mb-2 h-12 p-4 border-slate-700 border-2"
                       onChange={onNameChange}
                       value={name}
                       type="text"/>
                <div className="h-full overflow-auto bg-white border-2 border-slate-700">
                    {
                        messages?.map((response, i) => response.owner === name ?
                            <MyMessage key={i} message={response.message} owner={response.owner}/>
                            : <OtherMessage key={i} message={response.message} owner={response.owner}/>)
                    }
                    <div ref={bottomRef}></div>
                </div>
                <div className="flex mt-1">
                    <input placeholder="Digite uma mensagem"
                           onChange={onMessageChange}
                           onKeyDown={onEnterKeyDown}
                           value={message}
                           className="w-full h-12 p-4 border-slate-700 border-2" type="text"/>
                    <button
                        onClick={onSendMessageClick}
                        className="bg-slate-800 text-white p-3">Enviar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
