var AllForms = React.createClass({

loadFormsFromServer : function() {
	$.ajax({
		url: '/allAdminForms',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			this.setState({forms: data});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

getInitialState: function() {
    return {
	  forms : []
	};
},


componentDidMount: function() {
        this.loadFormsFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "employees">
			
			<Form forms = {this.state.forms}/>
            </div>
			
            <hr/>
             
            
            </div>
            )
          }
});


var Form = React.createClass({
render: function() {

return(

<table className = "table table-bordered table-hover data-toggle table-striped" id = "Data">
<thead>
<tr>
<th>Document Name</th> <th>Date(s)</th> <th>Author</th><th>Is Complete</th> <th>Form Body</th>
</tr>
</thead>
<tbody>
{
 this.props.forms.map(function(form){
 var bool = form.isCompleted;
 var x = bool.toString();
  return (
   <tr>
   <td>{form.title}</td>   <td>{form.date}</td> <td>{form.author[0]}</td> <td>{x}</td><td><a href = {'/forms/' + form._id}>View Form Here</a></td>   
    </tr>
	
	
  )})}
</tbody>
 </table>
 );
 }
 });




React.render(<AllForms  />,
document.getElementById('Forms'));