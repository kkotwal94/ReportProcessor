var isFinished = [];
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
loadFormsFromServer : function() {
	$.ajax({
		url: '/Userforms',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			arrayChecker(data);
			data = isFinished;
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
			<div className="form-group">
				<button for="collapseOnes" className="btn btn-default" data-toggle="collapse" href="#collapseOnes" aria-expanded="false" aria-controls="collapseOnes">Search By +</button>
					<div id="collapseOnes" className="collapse">
						
						
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
					
						

							
					</div>
					</div>
			
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

 function arrayChecker(something) {
    for (var i = 0; i < something.length; i++){
        if(something[i].isCompleted == true) {
            isFinished.push(something[i]);
        }
    }
    console.log(isFinished);
}


React.render(<AllForms  />,
document.getElementById('Forms'));