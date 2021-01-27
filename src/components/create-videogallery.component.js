import React, { Component } from 'react';
import axios from 'axios';

export default class CreateVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      file: ''
    }
    this.loadFiles = this.loadFiles.bind(this);
  }
  componentDidMount() {
    this.loadFiles()
  }

  loadFiles() {
    axios.get('http://localhost:5000/videos/files/')
    .then(response => {
        this.setState({ files: response.data.files});
    })
    .catch(err => alert(err));
  }

 fileChanged(event) {
   const f = event.target.files[0];
   this.setState({
     file: f
   });
 }
 deleteFile(event) {
   event.preventDefault();
   const id = event.target.id;
   axios.get('http://localhost:5000/videos/files/' + id) 
            .then((response) => {
                if (response.data.success) {
                    alert('File with ID: ' + id + ' has been deleted');
                    this.setState({ files: this.state.files.filter(el => el._id !== id)});
                }
            })
            .catch(err => alert(err));
 }
 uploadFile(event) {
    event.preventDefault();
    const formData = new FormData(); 
    formData.append('file', this.state.file);
    axios.post("http://localhost:5000/videos/files", formData)
      .then(res =>console.log('Successfully Uploaded!'))
 }
render() {
  const { files } = this.state;
  return (
      <div>
        <h3 className="Upload Files">Choose File to Upload</h3>
          <br></br>
        <div>
          <input type="file" onChange={this.fileChanged.bind(this)}/>
          <button onClick={this.uploadFile.bind(this)}>Upload</button>
          <hr></hr>
          <br></br>
          <h3>Current Videos</h3>
          <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Video</th>
                    <th>Uploaded</th>
                    <th>Size</th>
                    <th></th>
                </tr>
              </thead>
            <tbody>
              {files.map((file, index) => {
                var d = new Date(file.uploadDate);
                return (
                  <tr key={index}>
                    <td><video src={`http://localhost:5000/videos/files/${file.filename}`} height = "500" width = "600" controls="true"/></td>
                    <td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>
                    <td>{(Math.round(file.length/100) / 10)+'KB'}</td>
                    <td><button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
);
}
}