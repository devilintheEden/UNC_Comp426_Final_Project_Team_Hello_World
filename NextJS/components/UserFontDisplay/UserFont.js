export default class UserFont extends React.Component {
    constructor(props) {
        super(props);
    }

	render() {
        const {fontData} = this.props;
        const divStyle = {
            display: 'flex',
            alignItems: 'center'
          };
		return (
            <div style={divStyle}>
                {
					fontData.map((data) => {
						return (
							<div>
                                <div style={{height: 100, width: 800}}>
								<img src={data.sample_image} alt={data.Font_name} />
                                </div>
								<div style={{height: 100, width: 400}}>
                                    <h2>{data.Font_name} created by {data.Font_author} </h2>
                                    {data.Font_tags.map((value, index) => {
                                        return <h2 key={index}>{value}</h2>
                                     })}
                                    <h2>{data.Font_license} </h2>               
                                    <h2>{data.Font_info} </h2>
								</div>
							</div>
						);
					})
				}
            </div>
        );
    }
}