var AllUsers = React.createClass({
firstList : function(event){
var updatedList = this.state.users;

updatedList = updatedList.filter(function(item){
  return item.local.firstName.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

lastList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.lastName.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

emailList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.email.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

dobList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.dob.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

departmentList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.department.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

positionList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.position.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

loadUsersFromServer : function() {
	$.ajax({
		url: '/allUsers',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			//console.log(data);
			this.setState({users: data, items: data});
		
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

getInitialState: function() {
    return {
	  users: [],
	  items: []
	};
},


componentDidMount: function() {
        this.loadUsersFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			<div className="form-group">
				<button for="collapseOnes" className="btn btn-default" data-toggle="collapse" href="#collapseOnes" aria-expanded="false" aria-controls="collapseOnes">Search By +</button>
					<div id="collapseOnes" className="collapse">
						
						
					<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.emailList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Email!</span>
					</label>
					</span>

						<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.firstList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by firstName!</span>
					</label>
					</span>
					
						<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.lastList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by lastName!</span>
					</label>
					</span>

					<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.dobList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by DOB!</span>
					</label>
					</span>

					<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.departmentList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Department!</span>
					</label>
					</span>

					<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.positionList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Position!</span>
					</label>
					</span>

							
					</div>
					</div>
            <hr/>
			<div className = "employees">
			
			<User users = {this.state.items}/>
            </div>
			
            <hr/>
             
            
            </div>
            )
          }
});


var User = React.createClass({
render: function() {

return(

<table className = "table table-bordered table-hover data-toggle table-striped" id = "Data">
<thead>
<tr>
<th>First Name</th> <th>Last Name</th> <th>DoB</th> <th> Department</th> <th>Position</th> <th>Assign as your Employee</th>
</tr>
</thead>
<tbody>
{
 this.props.users.map(function(user){
 var id = user._id;
  return (
   <tr>
   <td>{user.local.firstName}</td>   <td>{user.local.lastName}</td> <td>{user.local.dob}</td> <td>{user.local.department}</td> <td>{user.local.position}</td>  <td><a href = {"/lackeys"}onClick = 
   {function(event) {
    $.ajax({
            url: '/addLackey/' + id,
            dataType: 'json',
            type: 'POST',
			data: id,
			
            success: function() {
            
              console.log("id sent : " + id);
            }.bind(this),
        error: function(xhr, status, err) {
               console.error(this.props.url,status, err.toString());
            }.bind(this)
        });

}
}
   
   ><button className = "btn btn-default">Assign as an Employee</button></a></td>
    </tr>
	
	
  )})}
</tbody>
 </table>
 );
 }
 });




React.render(<AllUsers  />,
document.getElementById('Users'));