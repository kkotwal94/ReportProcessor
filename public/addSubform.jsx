var link = window.location.href;
var array = link.split('/');
var sub  = array[array.length-2];
console.log(sub);
var label = "Lackeys";
var id;
var UpdateProfile = React.createClass({




getInitialState: function() {
    return {
	  forms : [],
	  users: []
	};
},

loadLackeysFromServer : function() {
	$.ajax({
		url: '/allLackeys',
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

componentDidMount: function() {
        this.loadLackeysFromServer();
		
    },

handlePSubmit : function(data,callback) {
    console.log(data);
	$.ajax({
	    url: '/addSubForm',
		dataType:'json',
		type: 'POST',
		data: data,
		success: function() {
					callback;  
					window.location.href ="/forms";
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});
   },
   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "Form">
			
			
            </div>
			<UpdateForm onSubmit={this.handlePSubmit} user = {this.state.users} forms = {this.state.forms}/>
            <hr/>
            
            
            
            </div>
            )
          }
});





var UpdateForm = React.createClass({

    handleSubmit : function(e) {
	  e.preventDefault();
	var title = React.findDOMNode(this.refs.title).value.trim();
	var date   = React.findDOMNode(this.refs.date).value.trim();
	
	
	var masterform = sub;
	
	
	
	
    if(!title||!date ) {
		return;
	}
	
	this.props.onSubmit({title:title, date : date, label:label, masterform: masterform, id : id});
	
		React.findDOMNode(this.refs.title).value = '';
		React.findDOMNode(this.refs.date).value = '';
		
		
		
	
	},
   
	render: function() {
	
	
	
	return(
	<div>
		<h1>SubForm</h1>
		<form className="form-horizontal" onSubmit={this.handleSubmit}>
		<div class="form-control">
		<label className="col-sm-0 control-label ">Sub Form Title:</label>
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
		<div className="form">
		<div className="btn-group">
  
    
    <button className="btn btn-primary dropdown-toggle" id = "drop" data-toggle="dropdown"> <span className="caret"></span> 
    {label}
	</button>
  <ul className="dropdown-menu dropdown-inverse" id = "drops">
  {
    this.props.forms.map(function(form){
	var name = form.local.firstName + " " + form.local.lastName;
  return (
   <li><a href ="#" onClick = {function() {label = name; console.log(label);  id = form._id; console.log(id); alert("Will assign to: " +  label)	}} >{form.local.firstName + " " + form.local.lastName}</a></li>
	
	
  )})}
  </ul>
  </div>
  </div>
		
		
		
		<div class="form-group">
		<label className="col-sm-0 control-label"></label>
		<div class="col-sm-5">
		<input type = "submit" value="Save Changes" className = "btn btn-primary" />
		</div>
		</div>
		</form>
		
	
	
	
		</div>
);
}
});

React.render(<UpdateProfile  />,
document.getElementById('contents'));

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

