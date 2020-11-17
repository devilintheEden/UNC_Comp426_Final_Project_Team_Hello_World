import fetch from "isomorphic-unfetch";
import Messages from "../Snippets/Messages";
const path = require("path");

export default class GenerateTTF extends React.Component {
    constructor(props) {
        super(props);
        this.state = { font_name: "default font name", msgInfo: { type: "", message: "" } };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ font_name: event.target.value });
        this.setState({ msgInfo: { type: "", message: "" } });
    }

    handleSubmit(event) {
        if (this.state.font_name === "") {
            this.setState({ msgInfo: { type: "Alert", message: "You leave the font name blank." } });
        } else if (this.props.bool_prep === 0) {
            this.setState({ msgInfo: { type: "Alert", message: "You haven\'t uploaded any PDF in the previous section yet." } });
        } else {
            this.setState({ msgInfo: { type: "", message: "" } });
            fetch("./api/geneTTF", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    project_name: this.props.project_name,
                    usr_id: this.props.usr_id,
                    font_name: this.state.font_name,
                    timeStamp: new Date(),
                }),
            }).then(() => {
                const url = path.join(
                    "Backend",
                    "Users",
                    `${this.props.usr_id}`,
                    "Projects",
                    `${this.props.project_name}`,
                    "Output",
                    this.state.font_name + ".ttf"
                );
                //const url = './Backend/Users/' + this.usr_id + '/Blank/' + this.state.width + '_' + this.state.height + '.txt';
                let a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = url.split("/").pop();
                a.click();
                document.body.removeChild(a);
            });
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="ba b--dashed ma1 pb3">
                <p className="ma2 pa1">
                    After examine the images on the right, you can choose to
                    give your font a name and generate it!
                </p>
                <form className="mh2 ph2" onSubmit={this.handleSubmit}>
                    <label>
                        Font Name: &nbsp;
                        <input
                            type="text"
                            name="width"
                            value={this.state.font_name}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <input
                        className="f6 ba mv2 pv1 dib black"
                        type="submit"
                        value="Generate TTF"
                    />
                </form>
                <Messages
                    type={this.state.msgInfo.type}
                    message={this.state.msgInfo.message}
                />
            </div>
        );
    }
}
