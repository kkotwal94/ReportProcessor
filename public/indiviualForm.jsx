var link = window.location.href;
var array = link.split('/');
var sub  = array[array.length-1];
console.log("indi form view : " + sub);
var finalData = [];
var SingleForm = React.createClass({

loadFormFromServer : function() {
	$.ajax({
		url: '/form/' + sub,
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			//console.log(data);
			this.setState({form: data[0]});
			data.splice(0,1);
			for (var x = 0; x < data.length; x++) {
				if(data[x] == null) {
				   data.splice(x,1);
				}
			}
			//console.log(data);
			this.setState({subform : data});
			this.setState({author:data.author});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},


loadFullViewFromServer: function() {
$.ajax({
		url: '/formed/' + sub + '/tree',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {

		    treeCycle(data);
			//console.log(finalData);

			data = finalData;
			this.setState({fullView: data});
			
			
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
			//console.log(data);
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
	  author : [],
	  fullView : []
	};
},

handleComplete : function(event) {
$.ajax({
	    url: '/forms/' + sub + '/complete' ,
		dataType:'json',
		type: 'POST',
		data: "true",
		success: function() {
					
					window.location.href ="/formsCompleted";
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});
},

handleIncomplete : function(event) {
$.ajax({
	    url: '/forms/' + sub + '/incomplete' ,
		dataType:'json',
		type: 'POST',
		data: "false",
		success: function() {
					 
					window.location.href ="/formsToComplete";
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});
},

componentDidMount: function() {
        this.loadFormFromServer();
		this.loadFullViewFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "Form">
			
			<Form forms = {this.state.form} subforms = {this.state.fullView}/>
			<p/>
			<a href = {window.location.href + "/edit"}><button className = "btn btn-primary">  Edit This Form </button></a>
			<hr/>
			<p></p>
			 <a href = {window.location.href + "/sub"}><button className = "btn btn-primary"> Add Subform </button></a>
			<hr/>
		
            </div>
			<button className = "btn btn-primary" onClick = {function(event) {
$.ajax({
	    url: '/forms/' + sub + '/complete' ,
		dataType:'json',
		type: 'POST',
		data: "true",
		success: function() {
					
					window.location.href ="/formsCompleted";
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});
}} > If you've completed this form Click here</button>
			
			
			<p/>
			
			<button className = "btn btn-danger" onClick = {function(event) {
$.ajax({
	    url: '/forms/' + sub + '/incomplete' ,
		dataType:'json',
		type: 'POST',
		data: "false",
		success: function() {
					 
					window.location.href ="/formsToComplete";
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});
}}> If you want to set it back to incomplete hit here</button>
           
		   
		   
		   
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
		//console.log(x);
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



function treeCycle(data) {
    
    if(data.subform.length != 0)
    for(var x = 0; x < data.subform.length; x++)
    {
        finalData.push(data.subform[x]);
        if(data.subform[x].subform.length != 0) {
           treeCycle(data.subform[x]);
        }
    }
console.log(finalData);    
}