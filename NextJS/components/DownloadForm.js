import fetch from 'isomorphic-unfetch'

export default class DownloadForm extends React.Component {
  constructor(props) {
    super(props);
    this.usr_id = 0;
    this.state = {width: '1', height: '1'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    let n = Math.floor(Number(event.target.value));
    if(n !== Infinity && String(n) === event.target.value && n > 0 || event.target.value === ''){
      this.setState({[name]: event.target.value});
    }else{
      alert('The value of ' + name + ' is not a positive integer.');
    }
  }

  handleSubmit(event) {
    fetch('./api/download', { 
      method: "POST", 
      headers: { 
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ 
          w: this.state.width,
          h: this.state.height,
          usr_id: this.usr_id
      })
    }).then( () => {
    const url = './python-related/Users/' + this.usr_id + '/Blank/Sample_Latin_Alphabets_' + this.state.width + '_' + this.state.height + '.pdf';
    //const url = './python-related/Users/' + this.usr_id + '/Blank/' + this.state.width + '_' + this.state.height + '.txt';
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = url.split('/').pop();
    a.click();
    document.body.removeChild(a);
    })
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Grid Width (positive int): &nbsp;
          <input type="text" name="width" value={this.state.width} onChange={this.handleChange} />
        </label> <br/><br/>

        <label>
          Grid Height (positive int): &nbsp;
          <input type="text" name="height" value={this.state.height} onChange={this.handleChange} />
        </label> <br/><br/>
        <input type="submit" value="Download Template" />
      </form>
    );
  }
}