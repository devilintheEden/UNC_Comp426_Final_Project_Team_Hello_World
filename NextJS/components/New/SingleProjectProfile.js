export default class SingleProjectProfile extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div key={this.props.key}>
                <div className="w-100 ba b--dotted mb2">
                    <img
                        src="/Backend/Resources/testFont.png"
                        className="w-100"
                    ></img>
                    <div className="dt dt--fixed mb1">
                        <span className="f1 lh-solid dtc georgia">
                            {this.props.data.Font_name}
                        </span>
                        <span className="f3 dtc">
                            Last edit:{" "}
                            {this.props.data.last_modified.toISOString().slice(0, 10)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
