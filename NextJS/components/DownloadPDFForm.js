import fetch from 'isomorphic-unfetch';
const path = require("path");

export default class DownloadPDFForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: '1', height: '1' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    let n = Math.floor(Number(event.target.value));
    if (n !== Infinity && String(n) === event.target.value && n > 0 || event.target.value == '') {
      this.setState({ [name]: event.target.value });
    } else {
      alert('The value of ' + name + ' is not a positive integer.');
    }

  }

  handleSubmit(event) {
    if (this.state.width != "" && this.state.height != "") {
      this.props.updateProjectWH(this.state);
      fetch('./api/download', {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          project_name: this.props.project_name,
          w: this.state.width,
          h: this.state.height,
          usr_id: this.props.usr_id
        })
      }).then(() => {
        const url = path.join('Backend','Users', `${this.props.usr_id}`, 'Projects', `${this.props.project_name}`, 'Blank', 'Sample_Latin_Alphabets_' + this.state.width + '_' + this.state.height + '.pdf');
        //const url = './Backend/Users/' + this.usr_id + '/Blank/' + this.state.width + '_' + this.state.height + '.txt';
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = url.split('/').pop();
        a.click();
        document.body.removeChild(a);
      })
    } else {
      alert('At least one value is left blank.');
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Grid Width (positive int): &nbsp;
          <input type="text" name="width" value={this.state.width} onChange={this.handleChange} />
        </label> <br /><br />

        <label>
          Grid Height (positive int): &nbsp;
          <input type="text" name="height" value={this.state.height} onChange={this.handleChange} />
        </label> <br /><br />
        <input type="submit" value="Download Template" />
      </form>
    );
  }
}