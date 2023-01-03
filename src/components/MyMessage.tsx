interface MyMessageProps {
    message: string;
    owner: string;
}

export function MyMessage(props: MyMessageProps) {
    return (
        <div className="flex mt-2 justify-end w-full">
            <div className="w-5/6 mr-2 p-2 rounded-md text-white text-end bg-blue-500">
                <b>{props.owner}</b> diz:<br/>
                {props.message}
            </div>
        </div>
    );
}