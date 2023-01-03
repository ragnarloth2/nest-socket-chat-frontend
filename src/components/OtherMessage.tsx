interface OtherMessageProps {
    message: string;
    owner: string;
}

export function OtherMessage(props: OtherMessageProps) {
    return (
        <div className="mt-2 w-full">
            <div className="w-5/6 ml-2 p-2 rounded-md text-start bg-slate-300">
                <b>{props.owner}</b> diz:<br/>
                {props.message}
            </div>
        </div>
    );
}