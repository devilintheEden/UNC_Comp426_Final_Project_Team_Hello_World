import React from 'react';
// import FontShow from '../FontShow';
import { Download, Heart } from 'react-bootstrap-icons';

class UserFont extends React.Component {
    constructor(props) {
        super(props);
        let FontShow = this.props.info;
    }

    /*
    componentDidMount() {
        fetch("http://localhost:3000/api/getProjectInfo", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                pid: this.props.pid,
                timeStamp: new Date(),
            })
        }).then((response) => response.json())
        .then((data) => {
            FontShow = data;
        })
    }
    */
    handleClick(event){
        window.open(`/community/${FontShow.pid}`);
    }

	render() {
            // <img src="https://placeholder.pics/svg/1200x80" alt={FontShow.Font_name} />
            return(
                <div class= "dt center pt2 pb2 flex" onclick={ this.handleClick } > 
                    <div class="db dtc-ns v-mid">
                        <img src={FontShow.publish.Sample_pics[0]} alt={FontShow.Font_name}/>
                    </div>

                    <div class="db dtc-ns v-mid ph2 pl3-ns">                       
                        <div class="mb2 ml2">{FontShow.projectName} by {FontShow.userName} </div>
                        <div class="ma2 flex">               
                        <div><Download size='16'/> {FontShow.publish.downloads} &nbsp;</div>
                        <div><Heart size='16'/> {FontShow.publish.likes.length} </div>
                        </div>
                        <div class="ma2 flex flex-wrap">
                            {FontShow.publish.tags.map((value, index) => {
                                return <div class="bg-gray mr1 pa1 near-white">{value}</div> 
                            })}
                        </div>
                        <div class="mt2 ml2">{FontShow.publish.license} </div>
                    </div>
                </div>
        );
    }
}

export default UserFont;
