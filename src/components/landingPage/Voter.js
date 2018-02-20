import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Voter extends Component {


	constructor(props){
		super(props);
		this.state = {
			item: props.vo,
			id: props.id
		}
	}


	render() {
		return (
			<li className = "collection-item avatar">
				<img src={this.state.item.photos[0].url} alt="" className="circle"></img>
				<Link to ={`/landingPage/votersList/ValidateVoter/${this.state.id}`}>
					{this.state.item.names[0].displayName} {this.state.item.phoneNumbers[0].canonicalForm}
				</Link>
			</li>
		);
	}
}

export default Voter;