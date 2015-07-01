var AllLackeys = React.createClass({

loadLackeysFromServer : function() {
	$.ajax({
		url: '/allLackeys',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			this.setState({lackeys: data});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

getInitialState: function() {
    return {
	  lackeys : []
	};
},


componentDidMount: function() {
        this.loadLackeysFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "employees">
			
			<Lackey lackeys = {this.state.lackeys}/>
            </div>
			
            <hr/>
             
            
            </div>
            )
          }
});


var Lackey = React.createClass({
render: function() {

return(

<table className = "table table-bordered table-hover data-toggle table-striped" id = "Data">
<thead>
<tr>
<th>Lackey Name</th> <th>Lackey Last Name</th> <th>Lackey DOB</th> <th>Lackey Department</th> <th>Lackey's Position</th> <th>Remove as Lackey</th>  
</tr>
</thead>
<tbody>
{
 this.props.lackeys.map(function(lackey){
 var id = lackey._id;
  return (
   <tr>
   <td>{lackey.local.firstName}</td>   <td>{lackey.local.lastName}</td> <td>{lackey.local.dob}</td> <td>{lackey.local.department}</td> <td>{lackey.local.position}</td> <td><a href ="/lackeys"onClick = 
   {function(event) {
    $.ajax({
            url: '/removeLackey/' + id,
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
   
   ><button className = "btn btn-default">Remove me as an assigned Employee</button></a></td>   
    </tr>
	
	
  )})}
</tbody>
 </table>
 );
 }
 });




React.render(<AllLackeys  />,
document.getElementById('Lackeys'));