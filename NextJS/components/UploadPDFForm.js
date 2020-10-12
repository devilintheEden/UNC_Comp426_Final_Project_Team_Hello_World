import fetch from 'isomorphic-unfetch';
import FormData from 'form-data';

export default class UploadPDFForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedFile: null };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ selectedFile: event.target.files[0] });
    }

    handleSubmit(event) {
        if(this.props.pdfWH.downloaded && this.state.selectedFile != null){
            const data = new FormData();
            data.append('file', this.state.selectedFile);
            const json_data = JSON.stringify({
                usr_id: this.props.usr_id,
                project_name: this.props.project_name,
                pdfWH: this.props.pdfWH
            })
            data.append('data', json_data);
            fetch('./api/upload', {
                method: "POST",
                credentials: 'include',
                body: data
            }).then(response => response.json())
            .then(data => {
            console.log(data);
            }).then(
                () => {this.props.hasUploaded();}
            )
            .catch(error => {
            console.error(error);
            });
        }else{
            alert("Careful! You haven't select any file to upload or you have never download a template in this project!");
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="file" name="file" accept="application/pdf" onChange={this.handleChange} />
                <input type="submit" value="Upload PDF" />
            </form>
        );
    }
}