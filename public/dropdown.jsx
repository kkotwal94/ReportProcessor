var DropDown = React.createClass({



getInitialState: function() {
    return {
	  forms : []
	};
},

 addInputField: function(e) {
        e.preventDefault();

        var forms = this.state.forms;
        forms.push({name: null});
        this.setState({forms : forms});
    },



   render: function() {
            
            return(
                  
				<div>
				<Drop forms = {["apple", "giraffes", "bannanas"]}/>
				
				</div>
			)
          }
});

var Drop = React.createClass({




 addInputField: function(e) {
        e.preventDefault();

        var forms = this.props.forms;
        forms.push("giraffes");
        this.setState({forms : forms});
    },
render: function() {

return(
<div className="btn-group">
  <button type="button" className="btn btn-danger">Action</button>
  <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span className="caret"></span>
    <span className="sr-only">Toggle Dropdown</span>
  </button>
  <ul className="dropdown-menu">
  {
    this.props.forms.map(function(form){

  return (
   <li><a href ="#">{form}</a></li>
	
	
  )})}
  </ul>
  <button className="btn btn-success btn-block" onClick={this.addInputField}>Add Input</button>
</div>

 );
 }
 });





React.render(<DropDown  />,
document.getElementById('dropdown'));
