//Subform code


<Subform onSubmit={this.handlePSubmit} user = {this.state.users} forms = {this.state.forms}/>

var Subform = React.createClass({

handleSubmit : function(e) {
	  e.preventDefault();
	var title = React.findDOMNode(this.refs.title).value.trim();
	var date   = React.findDOMNode(this.refs.date).value.trim();
	
	
	
	
    if(!title||!date  ) {
		return;
	}
	
	this.props.onSubmit({title:title, date : date});
	
		React.findDOMNode(this.refs.title).value = '';
		React.findDOMNode(this.refs.date).value = '';
		
	
	},
    
	render: function() {

	return(
	<div>
		<h1>Sub Form</h1>
		<form className="form-horizontal" onSubmit={this.handleSubmit}>
		<div class="form-control">
		<label className="col-sm-0 control-label ">Title:</label>
		<div class="col-sm-5">
		<input className = "form-control" type = "text" placeholder="Title...." ref = "title"/>
		</div>
		</div>
		<div class="form-control">
		<label className="col-sm-0 control-label ">Date:</label>
		<div class="col-sm-5">
		<input className = "form-control" type = "text" placeholder="Date...." ref = "date"/>
		</div>
		</div>
		
		
		<div className="btn-group">
	<button type="button" className="btn btn-danger">Assign to</button>
	<button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		<span className="caret"></span>
		<span className="sr-only">Toggle Dropdown</span>
	</button>
	<ul className="dropdown-menu">
	{
		this.props.forms.map(function(form){

	return (
	<li><a href ="#">{form.local.firstName + " " + form.local.lastName}</a></li>
	
	
  )})}
	</ul>
	</div>
		
		<div class="form-group">
		<label className="col-sm-0 control-label"></label>
		<div class="col-sm-5">
		<input type = "submit" value="Save Changes" className = "btn btn-primary" />
		</div>
		</div>
		</form>
		
	
	<button className="btn btn-success " onClick={this.addInputField}>Add Subform</button>
	
		</div>
);
}

});