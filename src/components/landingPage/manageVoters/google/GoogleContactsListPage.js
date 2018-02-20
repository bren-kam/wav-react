import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleAction from "../../../../actions/GoogleAction";



class GoogleContactsListPage extends Component {

	render() {
		const { connections } = this.prop;
		return (
			<div className="container">
				<ul className="collection">
					{
						connections.map((connection, i)=>{
							return <li className="collection-item" key={connection.names.source.id}> {connection.names.displayName }</li>
						})
					}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { connections } = state.importGoogleContacts.response;
	return {
		connections
	}
}


const mapDispatchToProps = (dispatch) => ({

})


export default connect (mapStateToProps, null) (GoogleContactsListPage);