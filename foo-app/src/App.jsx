import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fubars: [],          // To store all fubars
      newFubar: '',        // To store input for new fubar
      updatedFubar: '',    // To store updated fubar details
      error: '',           // To store errors
      loading: false,      // To track loading state
    };
  }

  // Fetch all fubars from the server
  fetchFubars = async () => {
    try {
      const res = await axios.get('http://localhost:3000/fubar');
      this.setState({fubars: res.data, loading: false})

    } catch (error) {
      this.setState({ error: 'Error fetching fubars', loading: false });
    }
    
  };

  // Create a new fubar
  createFubar = async () => {
    if (!this.state.newFubar) {
      this.setState({ error: 'Please provide a fubar value' });
      return;
    }
    const newFubar = { name: this.state.newFubar };
    try {
      await axios.post('http://localhost:3000/fubar', newFubar);
      this.setState({ newFubar: '', error: '' });
      this.fetchFubars(); // Refresh the list of fubars
    } catch (error) {
      this.setState({ error: 'Error creating fubar' });
    }
  };

  // Update an existing fubar
  updateFubar = async (fu_id) => {
    if (!this.state.updatedFubar) {
      this.setState({ error: 'Please provide an updated value' });
      return;
    }
    const updatedData = { fu_id, name: this.state.updatedFubar };
    try {
      await axios.patch('http://localhost:3000/fubar', updatedData);
      this.setState({ updatedFubar: '', error: '' });
      this.fetchFubars(); // Refresh the list of fubars
    } catch (error) {
      this.setState({ error: 'Error updating fubar' });
    }
  };

  // Delete a fubar
  deleteFubar = async (fu_id) => {
    try {
      await axios.delete(`http://localhost:3000/fubar/${fu_id}`);
      this.fetchFubars(); // Refresh the list of fubars
    } catch (error) {
      this.setState({ error: 'Error deleting fubar' });
    }
  };

  componentDidMount() {
    console.log("Test Trigger for ComponentDidMount");
    this.fetchFubars(); // Load fubars when the component mounts
  }

  render() {
    console.log("Test Trigger for render");
    const { fubars, error, loading, newFubar, updatedFubar } = this.state;

    return (
      <div>
        <h1>Fubar Management</h1>

        {/* Display errors */}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {/* Loading spinner */}
        {loading && <div>Loading...</div>}

        {/* Display fubars */}
        <h2>Fubars List</h2>
        <ul>
          {fubars.map(fubar => (
            <li key={fubar.fu_id}>
              <span>{fubar.name}</span>
              <button onClick={() => this.updateFubar(fubar.fu_id)}>Update</button>
              <button onClick={() => this.deleteFubar(fubar.fu_id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* Form to add a new fubar */}
        <div>
          <input
            type="text"
            value={newFubar}
            onChange={(e) => this.setState({ newFubar: e.target.value })}
            placeholder="Enter new fubar name"
          />
          <button onClick={this.createFubar}>Create Fubar</button>
        </div>

        {/* Form to update an existing fubar */}
        <div>
          <input
            type="text"
            value={updatedFubar}
            onChange={(e) => this.setState({ updatedFubar: e.target.value })}
            placeholder="Enter updated fubar name"
          />
          <button onClick={() => this.updateFubar(fubars[0]?.fu_id)}>Update Fubar</button>
        </div>
      </div>
    );
  }
}

export default App;