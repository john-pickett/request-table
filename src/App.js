import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Requests</h1>
      <FilterableRequestTable requests={sorter(REQUESTS)} />
      </div>
    );
  }
}

export default App;


var REQUESTS =	[
    {"id":1, "title":"Request from Nancy","updated_at":"2015-08-15 12:27:01 -0600","created_at":"2015-08-12 08:27:01 -0600","status":"Denied"},
    {"id":2, "title":"Request from David","updated_at":"2015-07-22 11:27:01 -0600","created_at":"2015-07-15 12:27:01 -0600","status":"Approved"},
    {"id":3,"title":"Request from Matt","updated_at":"2015-07-22 11:27:01 -0600","created_at":"2015-06-15 13:27:01 -0600","status":"Pending"},
    {"id":4,"title":"Request from Perry","updated_at":"2015-07-15 13:27:01 -0600","created_at":"2015-07-14 14:27:01 -0600","status":"Pending"},
    {"id":5,"title":"Request from Harrison","updated_at":"2015-08-22 11:27:01 -0600","created_at":"2015-07-29 15:27:01 -0600","status":"Approved"},
    {"id":6,"title":"Request from Josh","updated_at":"2015-07-29 14:27:01 -0600","created_at":"2015-07-15 10:27:01 -0600","status":"Denied"},
    {"id":7,"title":"Request from Michael","updated_at":"2015-06-15 12:27:01 -0600","created_at":"2015-06-13 18:27:01 -0600","status":"Denied"},
    {"id":8,"title":"Request from AJ","updated_at":"2015-09-22 11:10:01 -0600","created_at":"2015-07-15 11:27:01 -0600","status":"Approved"},
    {"id":9,"title":"Request from Jane","updated_at":"2015-09-13 11:18:01 -0600","created_at":"2015-09-10 06:27:01 -0600","status":"Approved"},
    {"id":10,"title":"Request from Jizhen","updated_at":"2015-05-12 08:27:01 -0600","created_at":"2015-04-15 06:27:01 -0600","status":"Pending"},
    {"id":11,"title":"Request from Pardeep","updated_at":"2015-07-28 09:27:01 -0600","created_at":"2015-07-17 05:27:01 -0600","status":"Approved"},
    {"id":12,"title":"Request from Ale","updated_at":"2015-07-22 10:27:01 -0600","created_at":"2015-07-18 15:27:01 -0600","status":"Pending"},
    {"id":13,"title":"Request from Christy","updated_at":"2015-04-22 19:27:01 -0600","created_at":"2015-03-15 16:27:01 -0600","status":"Pending"},
    {"id":14,"title":"Request from Surjadeep","updated_at":"2015-07-01 11:27:01 -0600","created_at":"2015-06-29 17:27:01 -0600","status":"Approved"},
    {"id":15,"title":"Request from Vasanth","updated_at":"2015-07-02 11:27:01 -0600","created_at":"2015-07-01 18:27:01 -0600","status":"Approved"},
    {"id":16,"title":"Request from Moshe","updated_at":"2015-01-22 16:27:01 -0600","created_at":"2014-12-25 11:27:01 -0600","status":"Denied"},
    {"id":17,"title":"Request from Jim","updated_at":"2015-10-22 17:27:01 -0600","created_at":"2015-10-15 13:27:01 -0600","status":"Approved"},
    {"id":18,"title":"Request from Dileep","updated_at":"2015-08-18 18:27:01 -0600","created_at":"2015-07-11 12:27:01 -0600","status":"Denied"},
    {"id":19,"title":"Request from Aaron","updated_at":"2015-06-22 19:27:01 -0600","created_at":"2015-05-28 16:27:01 -0600","status":"Approved"},
    {"id":20,"title":"Request from Vijay","updated_at":"2015-02-14 08:27:01 -0600","created_at":"2015-01-02 12:27:01 -0600","status":"Approved"}
];

/* This function modifies the date/time into the specified format. This renders correctly in Chrome but not in some other browsers due to their finicky handling of date/time inputs. Support for these other browsers could definitely be added. */
function formatDate(input) {
	var d = new Date(input);
	var month = ('0' + (d.getMonth() + 1)).slice(-2);
  var date = ('0' + d.getDate()).slice(-2);
  return d.getFullYear() + "-" + month + "-" + date;
}

/* This function sorts the requests by updated_at */
function sorter(requests){
  return requests.sort(function(a,b){
    var c = new Date(a.updated_at);
    var d = new Date(b.updated_at);
    return d - c;
  });
}

/* This is for the popup on the request statuses */
class Popup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var value = this.props.value;
    var id = this.props.id;
    var status = this.props.status;

    return (
      <div className="popup">
        <p>{value}</p>
      </div>
    )
  }
}


/* This renders the data for each request to use in the table. It also sets state for the popup. */
class TableRow extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      visible: false
    	};
    }

	handleClick(id) {
    	this.props.remove(id);
    }

  showPopup(value, id) {
    if (!this.state.visible) {
      this.setState({
        visible: true
      });
    } else {
      this.setState({
      	visible: false
      });
     }
  }

  update(id, status){
  	this.showPopup();
    this.props.update(id, status);
  }

  render(){
  	var created = formatDate(this.props.request.created_at);
    var updated = formatDate(this.props.request.updated_at);
    var id = this.props.request.id;
    var status = this.props.request.status;
    var popValue = null;
    var rowColor = null;

/* This sets the appropriate contents of the popup for each request, assigning the other two possible statuses to popValue. */
    if (status === "Approved"){
      popValue = <div><p><a href="#" onClick={() => this.update(id, "Pending")}>Pending</a></p><p><a href="#" onClick={() => this.update(id, "Denied")}>Denied</a></p></div>;
     } else if (status === "Pending") {
      popValue = <div><p><a href="#" onClick={() => this.update(id, "Approved")}>Approved</a></p><p><a href="#" onClick={() => this.update(id, "Denied")}>Denied</a></p></div>;
     } else {
      popValue = <div><p><a href="#" onClick={() => this.update(id, "Approved")}>Approved</a></p><p><a href="#" onClick={() => this.update(id, "Pending")}>Pending</a></p></div>;
     }

/* This line is what controls the popup visibility. If !this.state.visible, the popup renders. If it's already visible, it renders null and disappears. */
    var popup = (this.state.visible ? <Popup value={popValue} status={status} id={id} /> : null);

/* This controls the CSS class for each row, so they are color coordinated according to the status */
    if (status === "Approved"){
    	rowColor = "approved";
    } else if (status === "Pending") {
    	rowColor = "pending";
    } else {
    	rowColor = "denied";
    }

  return (
			<tr className={rowColor}>
        <td>{this.props.request.title}</td>
        <td><a href="#" onClick={() => this.showPopup({status}, {id})}>{this.props.request.status}</a><p>{popup}</p></td>
        <td>{formatDate(this.props.request.created_at)}</td>
        <td>{formatDate(this.props.request.updated_at)}</td>
        <td><a href="#" onClick={ () => this.handleClick(this.props.request.id) }>Delete</a></td>
			</tr>
    );
  }
 }

/* This class renders the HTML table with the table headings and the request details from TableRow */
class RequestTable extends React.Component {
	constructor(props) {
    super(props);
   }

  remove(id){
  	this.props.remove(id);
  }

  update(id, status){
  	this.props.update(id, status);
  }

	render(){
  	var popup = this.props.popup;
  	var remove = this.props.remove;
    var update = this.props.update;
  	var filterOption = this.props.filterOption;
		var row = [];
 /* This if/else filters the requests that show in the table */
    if (filterOption == "All") {
    	this.props.requests.forEach(function(req){
    		row.push(<TableRow request={req}
        key={req.id} remove={remove} update={update} />);
    	});
    } else {
    	this.props.requests.forEach(function(req){
      	if (req.status == filterOption ) {
      		row.push(<TableRow request={req}
            key={req.id} remove={remove} update={update} />);
      }
      });
    }

    return (
    	<table>
      	<thead>
        	<tr>
          	<th>Request Title</th>
            <th>Status</th>
            <th>Created</th>
            <th>Updated</th>
 						<th>Delete</th>
          </tr>
        </thead>
        <tbody>
					{row}
        </tbody>
      </table>
    );
    }
  }

 /* Dropdown selector for filtering requests */
 class FilterSelector extends React.Component {
 	constructor(props) {
  super(props);

  this.handleFilterSelectMenu =
  	this.handleFilterSelectMenu.bind(this);
  }
  handleFilterSelectMenu(e){
  	this.props.onFilterSelect(e.target.value)
  }

  render() {
  var message = "Filter by status: ";
    return (
 			<form>
      	<label>
        	{message}
        </label>
         <select value={this.props.filterOption} onChange={this.handleFilterSelectMenu}>
           <option value="All">All Requests</option>
           <option value="Approved">Approved</option>
           <option value="Pending">Pending</option>
           <option value="Denied">Denied</option>
         </select>
       </form>
    );
 	}
 }

/* This is the parent element for the request table. This element includes the filtering options, and I also set the state for much of the table here. */
 class FilterableRequestTable extends React.Component {
 	constructor(props) {
    super(props);
    this.state = {
      filterOption: 'All',
      data: this.props.requests,
    };

  this.handleFilterSelectMenu = this.handleFilterSelectMenu.bind(this);
  }

/* This removes the selected request from the table */
  remove(id){
    let data = this.state.data;
    data = data.filter(req => {return req.id != id });
    this.setState({
    	data: data
    });
   }

/* This function finds the request to be updated in the REQUESTS array. It gets the id of the request, locates it in REQUESTS, and returns the request object. */
  findReq(id, data){
    return data.filter(function(item){
    	return item.id == id;
  	});
   };


/* This function updates the request on a status change, and then updates the state for the table. */
  update(id, status){
    var data = this.state.data;
    var request = this.findReq(id, data)[0];
    request.status = status;
    request.updated_at = new Date();
    data = sorter(this.state.data);
    this.setState({
    	data: data
    });
  }

  handleFilterSelectMenu(filterOption) {
    this.setState({
      filterOption: filterOption
    });
  }
  render() {

    return (
      <div>
      	<FilterSelector
        filterOption={this.state.filterOption}
        onFilterSelect={this.handleFilterSelectMenu} />

        <RequestTable requests={this.state.data}
          filterOption={this.state.filterOption}
          remove={this.remove.bind(this)}
          update={this.update.bind(this)}/>

      </div>

    );
  }
}
