var AllForms = React.createClass({

loadFormsFromServer : function() {
	$.ajax({
		url: '/allForms',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			var total = data.length;
			console.log(data.length);
			var z = 0;
			
			for (var x = 0; x < total; x++) {
				if(data[x] == null) {
				   data.splice(x, 1);
				}
			}
			total = data.length;
			for (var i = 0; i< data.length; i++) {
			
			
			 if(data[i].isCompleted != true){
			 console.log(data[i]);
					data.splice(i, 1);
			 }
			}	
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
<th>Document Name</th> <th>Date(s)</th> <th>Author</th> <th>Form Body</th>  
</tr>
</thead>
<tbody>
{
 this.props.forms.map(function(form){

  return (
   <tr>
   <td>{form.title}</td>   <td>{form.date}</td> <td>{form.author[0]}</td> <td><a href = {'/forms/' + form._id}>View Form Here</a></td>   
    </tr>
	
	
  )})}
</tbody>
 </table>
 );
 }
 });




React.render(<AllForms  />,
document.getElementById('Forms'));