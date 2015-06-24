var link = window.location.href;
var array = link.split('/');
var sub  = array[array.length-2];
var str = "Hello";
var HTMLHolder;
console.log("edit form view : " + sub);

var UpdateProfile = React.createClass({




getInitialState: function() {
    return {
	  forms : [],
	  getForm: []
	};
},

loadFormFromServer : function() {
$.ajax({
		url: '/form/' + sub,
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			//console.log(data);
			this.setState({getForm: data[0]});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});



},
loadLackeysFromServer : function() {
	$.ajax({
		url: '/allLackeys',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			//console.log(data);
			this.setState({forms: data});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

componentDidMount: function() {
		this.loadFormFromServer();
        this.loadLackeysFromServer();
		//setInterval(this.loadCommentsFromServer, 2000);
		
    },

handlePSubmit : function(data,callback) {
    console.log(data);
	$.ajax({
		
	    url: '/form/' + sub + '/editForm',
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
			<UpdateForm onSubmit={this.handlePSubmit} user = {this.state.users} forms = {this.state.forms} getForm = {this.state.getForm} str = {this.state.getForm.body}/>
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
	var body  = React.findDOMNode(this.refs.body).value.trim();
	
	
	if(!title||!date || !body ) {
		return;
	}
   
	
	this.props.onSubmit({title:title, date : date, body : body});
	
		React.findDOMNode(this.refs.title).value = '';
		React.findDOMNode(this.refs.date).value = '';
		React.findDOMNode(this.refs.body).value = '';
		//React.findDOMNode(this.refs.sub).value = '';
	
	},
    
	render: function() {




	return(
	
	<div>
		<h1>Editing Master Form</h1>
		<form className="form-horizontal" onSubmit={this.handleSubmit}>
		<div class="form-control">
		<label className="col-sm-0 control-label ">Title:</label>
		<div class="col-sm-5">
		<input className = "form-control" type = "text" placeholder={this.props.getForm.title} ref = "title"/>
		</div>
		</div>
		<div class="form-control">
		<label className="col-sm-0 control-label ">Date:</label>
		<div class="col-sm-5">
		<input className = "form-control" type = "text" placeholder={this.props.getForm.date}ref = "date"/>
		</div>
		</div>
		<div className="form">
		
		<label htmlFor="body" className="col-sm-0 control-label">Report Body:</label>
		<div className="column">
		<textarea className = "ckeditor" id = "ckedit"  ref = "body"></textarea>
		
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

	$(document).ready(function () {
		//CKEDITOR.replace('ckedit');
		AlloyEditor.editable('ckedit');
			
		   
});


  
 