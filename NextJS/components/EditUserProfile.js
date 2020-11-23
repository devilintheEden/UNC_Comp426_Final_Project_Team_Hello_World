import Messages from "./Snippets/Messages";

export default class EditUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedFile: null, msgInfo: { type: "", message: "" } };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({ selectedFile: event.target.files[0]});
        this.setState({ msgInfo: { type: "", message: "" } });
    }

    handleSubmit(event) {
        if (this.state.selectedFile === null) {
            this.setState({msgInfo: {type: "Alert", message: "You haven't select any file to upload."}});
        } 
        else {
            this.setState({ msgInfo: { type: "", message: "" } });
            console.log(this.state.selectedFile);
            fetch("http://localhost:3000/api/userUpdate", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    uid: this.props.uid,
                    profilePic: this.state.selectedFile, 
                    timeStamp: new Date(),
                }),
            }).then(()=>{console.log("Upload successful")});
        }
        event.preventDefault();
    }

    handleSave(event) {
        let name = document.getElementById("name").value;
        let bio = document.getElementById("bio").value;
        fetch("http://localhost:3000/api/userUpdate", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    uid: this.props.uid,
                    profileName: name,
                    profileBio: bio,
                    timeStamp: new Date(),
                }),
            }).then(()=>{console.log("Update successful")});
    }

    render() {
        return (
            <article class="mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                <h1 class="f3 tc">Edit Profile</h1>
                <div class="tc">
                    <img src="https://placeholder.pics/svg/100x100" class="br-100 h3 w3 dib" title="Profile picture"></img> 
                    <form className="mh2 ph2" onSubmit={this.handleSubmit}>
                        <input class="center tc f6 ma1 pv3 ph2 dib black"                         
                            type="file"
                            name="file"
                            accept="image/*" 
                            onChange={this.handleChange}
                        />
                        <br />
                        <input
                            className="f6 ba mv2 pv1 dib black"
                            type="submit"
                            value="Upload Picture"
                        />
                    </form>
                    <Messages
                        type={this.state.msgInfo.type}
                        message={this.state.msgInfo.message}
                    />
                </div>

                <h1 class="f4">Name:</h1>
                <input id="name" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" defaultValue={this.props.profile.profileName || ''}></input>
                <h1 class="f4 center">Bio:</h1>
                <textarea id="bio" name="comment" class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="comment-desc" defaultValue={this.props.profile.profileBio || ''}></textarea>
                <div class="flex items-center justify-center pa1">
                <a href="#" class="f6 no-underline black bg-animate hover-bg-light-blue hover-white inline-flex items-center pa2 ba border-box br3 mr4" onClick={this.handleSave}>
                    <span class="tc">Save</span>
                </a>
                <a href="#" class="f6 no-underline black bg-animate hover-bg-light-blue hover-white inline-flex items-center pa2 ba border-box br3">
                    <span class="tc">Cancel</span>
                </a>
                </div>
            </article>       
        )
    }
}
