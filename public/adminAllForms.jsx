var AllForms = React.createClass({
titleList : function(event){
var updatedList = this.state.forms;
updatedList = updatedList.filter(function(item){
  return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

dateList : function(event){
var updatedList = this.state.forms;
updatedList = updatedList.filter(function(item){
  return item.date.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

authorList : function(event){
var updatedList = this.state.forms;
updatedList = updatedList.filter(function(item){
  return item.author[0].toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},
loadFormsFromServer : function() {
	$.ajax({
		url: '/allAdminForms',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			this.setState({forms: data, items: data});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

getInitialState: function() {
    return {
	  forms : [],
	  items : []
	};
},


componentDidMount: function() {
        this.loadFormsFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
						
						
					<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.titleList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Title!</span>
					</label>
					</span>

						<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.dateList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Date!</span>
					</label>
					</span>

					<span className="input input--hoshi">
					<input className="input__field input__field--hoshi" type="text" id="input-4" onChange = {this.authorList}/>
					<label className="input__label input__label--hoshi input__label--hoshi-color-1" for="input-4">
						<span className="input__label-content input__label-content--hoshi">Search by Author!</span>
					</label>
					</span>
					
						

					
			
            <hr/>
			<div className = "employees">
			
			<Form forms = {this.state.items}/>
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