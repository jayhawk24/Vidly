import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    const promise = axios.get(apiEndpoint);
    const response = await promise;
    this.setState({ posts: response.data });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "Updated";
    await axios.put(apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    await axios.delete(apiEndpoint + "/" + post.id);
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
  };

  render() {
    let i = 1;
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{i++}</td>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;