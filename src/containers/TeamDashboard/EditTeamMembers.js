import React from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import firebase from "./../../config/fbConfig";

class EditTeamMembers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			membersToAddDelete: {
				value: []
			},
			allUsersAvailable: [],
			allUsersInTeam: []
		}
	}
	componentWillMount() {
		let availableUsers = [];
		let membersInTeam = [];
		let unavailableUsers = [];
		if(this.props.teamMembers === undefined )
		return;
		Object.keys(this.props.teamMembers).forEach(teamMember => {
			unavailableUsers.push(this.props.teamMembers[teamMember].userId)
		});
		Object.keys(this.props.allUsers.data).forEach(user => {
			if (!unavailableUsers.includes(user)) {
				var currUser = {
					value: user,
					label: this.props.allUsers.data[user]
				};
				availableUsers.push(currUser);
			}
		});

		Object.keys(this.props.allUsers.data).forEach(user => {
			if (unavailableUsers.includes(user) && user !== this.props.admin) {
				var currUser = {
					value: user,
					label: this.props.allUsers.data[user]
				};
				membersInTeam.push(currUser);
			}
		});

		this.setState({ allUsersAvailable: availableUsers });
		this.setState({ allUsersInTeam: membersInTeam });
	}
	addDeleteMember = selectedMember => {
		if (selectedMember === null) {
			this.setState({
				membersToAddDelete: {
					value: [],
					valid: false
				}
			})
		}
		else {
			let tempMembers = [];
			for (let i = 0; i < selectedMember.length; i = i + 1) {
				tempMembers.push({ id: selectedMember[i].value, username: selectedMember[i].label })
			}
			this.setState({
				membersToAddDelete: {
					value: tempMembers,
					valid: true
				}
			});
		}
	}
	addTeamMembers = event => {
		if (!this.state.membersToAddDelete.value.length) {
			alert("NO MEMBERS TO ADD");
			return;
		}
		let teamMembersToAddDelete = this.state.membersToAddDelete.value;
		let db = firebase.firestore();
		teamMembersToAddDelete.forEach(userToAdd => {
			db.collection("teams")
				.doc(this.props.teamId)
				.collection("teamMembers").doc(userToAdd.id).set({
					userId: userToAdd.id,
					username: userToAdd.username
				});
			db.collection("users")
				.doc(userToAdd.id)
				.collection('inTeams')
				.doc(this.props.teamId)
				.set({ teamId: this.props.teamId });
			db.collection("users")
				.doc(userToAdd.id)
				.collection("notifications")
				.doc()
				.set({
					title: "YOU WERE ADDED TO A NEW TEAM",
					body: `team "${this.props.teamName}" created by "${this.props.adminName}" welcomes you!!`,
					createdOn: this.props.createdOn,
					index: Date.now()
				});
		});
		this.setState({
			membersToAddDelete: {
				value: []
			}
		});
	}
	deleteTeamMembers = event => {
		if (!this.state.membersToAddDelete.value.length) {
			alert("NO MEMBERS TO DELETE");
			return;
		}
		let teamMembersToAddDelete = this.state.membersToAddDelete.value;
		let db = firebase.firestore();
		teamMembersToAddDelete.forEach(userToDelete => {
			db.collection("teams")
				.doc(this.props.teamId)
				.collection("teamMembers")
				.doc(userToDelete.id).delete();
			db.collection("users")
				.doc(userToDelete.id)
				.collection("inTeams")
				.doc(this.props.teamId).delete();
			db.collection("users")
				.doc(userToDelete.id)
				.collection("notifications")
				.doc()
				.set({
					title: `YOU WERE Removed from "${this.props.teamName}"`,
					body: `team "${this.props.teamName}" created by "${this.props.adminName}" welcomes you!!`,
					createdOn: this.props.createdOn,
					index: Date.now()
				});
		});
		this.setState({
			membersToAddDelete: {
				value: []
			}
		});
	}
	render() {
		const user = firebase.auth().currentUser;
		return (
			<div>
				{
					user.uid === this.props.admin && this.props.teamMembers !== undefined ?
						<div id="wrapper-univ">
							<h1>EDIT MEMBERS</h1>
							<div id="wrapper-inside-1">
								{
									this.state.allUsersAvailable.length > 0 ?
										<div>
											<li>
												<label>Add Members: </label>
												<Select
													isMulti
													options={this.state.allUsersAvailable}
													onChange={this.addDeleteMember}
												/>
											</li>
											<li>
												<button onClick={this.addTeamMembers}>ADD</button>
											</li>
										</div> : <h2>NO MEMBERS TO ADD</h2>
								}
							</div>
						</div> : null
				}
				{
					user.uid === this.props.admin ?
						<div id="wrapper-univ">
							<div id="wrapper-inside-1">
								{
									this.state.allUsersInTeam.length > 0 ?
										<div>
											<li>
												<label>Delete Members: </label>
												<Select
													isMulti
													options={this.state.allUsersInTeam}
													onChange={this.addDeleteMember}
												/>
											</li>
											<li>
												<button onClick={this.deleteTeamMembers}>DELETE</button>
											</li>
										</div> : <h2>NO MEMBERS TO DELETE</h2>
								}
							</div>
						</div> : null
				}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	if (ownProps.teamId &&
		state.teams.data[ownProps.teamId] !== undefined) {
		return {
			teamMembers: state.teams.data[ownProps.teamId].teamMembers,
			allUsers: state.allUsers,
			admin: state.teams.data[ownProps.teamId].createdBy,
			adminName: state.teams.data[ownProps.teamId].creatorUsername,
			teamName: state.teams.data[ownProps.teamId].teamName,
			createdOn: state.teams.data[ownProps.teamId].createdOn
		}
	}
	else
		return {};
};

export default connect(
	mapStateToProps,
	null
)(EditTeamMembers)