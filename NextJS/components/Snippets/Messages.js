import ReactHtmlParser from 'react-html-parser';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }

    render() {
        let bgcolor, color, icon;
        switch (this.props.type) {
            case "Warning":
                bgcolor = "bright-yellow";
                color = "black";
                icon = <svg width="1.0625em" height="1.125em" viewBox="0 0 17 16" className="bi bi-exclamation-triangle-fill pt1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>;
                break;
            case "Alert":
                bgcolor = "dark-red";
                color = "white";
                icon = <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-exclamation-circle pt1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>;
                break;
            default:
                return <div></div>;
        }
        const classtypes = "ma2 pa1 bg-" + bgcolor + " " + color;
        return <div className={classtypes}>{icon}{" "}{ReactHtmlParser(this.props.message)}</div>;
    }
}
