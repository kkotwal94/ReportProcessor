var link = window.location.href;
var array = link.split('/');
var sub  = array[array.length-1];
console.log("indi form view : " + sub);
var SingleForm = React.createClass({

loadFormFromServer : function() {
	$.ajax({
		url: '/form/' + sub,
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			this.setState({form: data[0]});
			data.splice(0,1);
			for (var x = 0; x < data.length; x++) {
				if(data[x] == null) {
				   data.splice(x,1);
				}
			}
			console.log(data);
			this.setState({subform : data});
			this.setState({author:data.author});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},



loadAuthorFromServer : function() {
$.ajax({
		url: '/' + this.state.author,
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			this.setState({form: data});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});

},

getInitialState: function() {
    return {
	  form : [],
	  subform : [],
	  author : []
	};
},


componentDidMount: function() {
        this.loadFormFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "Form">
			
			<Form forms = {this.state.form} subforms = {this.state.subform}/>
			<p/>
			<a href = {window.location.href + "/edit"}><button className = "btn">  Edit This Form </button></a>
			<hr/>
			<p></p>
			 <a href = {window.location.href + "/sub"}><button className = "btn"> Add Subform </button></a>
			<hr/>
            </div>
			
            <hr/>
             
            
            </div>
            )
          }
});


var Form = React.createClass({



render: function() {

var j = "  " + this.props.forms.body + "  ";
return(



	<div>
   
	<h3>{this.props.forms.author}</h3>
    <pre>{this.props.forms.title}</pre>
	  
	<div dangerouslySetInnerHTML={{__html : j	}} />
	<div>
	{
		this.props.subforms.map(function(subform){
		var x = " " + subform.body + " ";
		console.log(x);
	return (

	<div>
	<pre> {subform.title}</pre>
	<div dangerouslySetInnerHTML={{__html : x	}} />
	</div>
	
  )})}
	</div>
   </div>
  

 )
 }
 
 });




React.render(<SingleForm  />,
document.getElementById('SingleForm'));



