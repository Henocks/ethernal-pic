import React from 'react';

class ImageConvertor extends React.Component {
  state = {
    imgResult : ''
  }

  encodeBase64ImageFile = (image) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      // convert the file to base64 text
      reader.readAsDataURL(image)
      // on reader load somthing...
      reader.onload = (event) => {
        resolve(event.target.result)
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  onFileChange = (event) => {
    let fileList = event.target.files
    if (true) {
      // 한 번에 하나의 파일만 선택하여 업로드 할 수 있으므로 무조건 0번 index
      let file = fileList[0]
      if (!/^image\//.test(file.type)) {
        alert('이미지 파일만 등록이 가능합니다')
        return false
      }
      // encode image file to base64
      this.encodeBase64ImageFile(file)
        .then((data) => {
          console.log(data)
          this.setState({
            imgResult: data
          })
          document.getElementById('result').value=data;
        })
    }
  }

  onResultChange = (event) => {
    this.setState({imgResult : document.getElementById('result').value});
  }

  render() {
    return (
      <div style={{border:'1px solid black'}}>
        <h2>IMGCONV -------------------------</h2>
        <input type="file" accept="image/*" onChange={this.onFileChange}></input>
        <h2>Result</h2>
        <textarea id="result" onChange={this.onResultChange} style={{width:'80%', height:'300px'}}></textarea>
        <br /><br />
        <img src={this.state.imgResult} />
      </div>
    );
  }
}

export default ImageConvertor;