var AllUsers = React.createClass({

loadUsersFromServer : function() {
	$.ajax({
		url: '/allUsers',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			//console.log(data);
			this.setState({users: data});
			this.setState({items : data});
			
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
			
			
            <hr/>
			<div className = "employees">
			
			<User users = {this.state.users}/>
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
<th>First Name</th> <th>Last Name</th> <th>DoB</th> <th> Department</th> <th>Position</th> <th>Assign as Lackey</th>
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
   
   ><button className = "btn btn-default">Enslave me as a Lackey</button></a></td>
    </tr>
	
	
  )})}
</tbody>
 </table>
 );
 }
 });




React.render(<AllUsers  />,
document.getElementById('Users'));