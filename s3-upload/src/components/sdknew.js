import React, { useEffect, useState } from 'react'
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3, CreateBucketCommand  } from "@aws-sdk/client-s3";
import { Container, Grid } from '@material-ui/core';
import axios from 'axios';


const Sdknew = () => {

    const [coba, setCoba] = useState([]);
    const url = 'https://mpindo.sgp1.digitaloceanspaces.com/';
    console.log(coba)

    const handleUpload = (file) => {
        var file = file.target.files[0]
        const target = {Bucket: "mpindo", Key:file.name, Body: file};
        const cred = {accessKeyId: 'EN7KLGSM2IIEXYSXQG5Y', secretAccessKey: 'Ox3K1JPiDcXMUN6kZueMjiHHIi0g3ptK/ttdicQ5y/4'};

        try {
            const parallelUploads3 = new Upload({
              client: new S3Client({region: 'ap-southeast-1', credentials: cred}),
              params: target,
              leavePartsOnError: true,
            });
          
            parallelUploads3.on("httpUploadProgress", (progress) => {
              console.log(progress);
            });
          
            parallelUploads3.done();
          } catch (e) {
            console.log(e);
          }
    }

    
    const getId = async () => {
      fetch(`https://mpindo.sgp1.digitaloceanspaces.com/`)
      .then(
        function(res){
          return res.text();
        }
      )
      .then(function(data){
        let parser = new DOMParser(),
        xmlDoc = parser.parseFromString(data, 'text/xml');
        let dat = xmlDoc.querySelectorAll('Contents');
        console.log(dat)
        dat.forEach(xml => {
          let row = document.createElement('tr');
          let areaImg = document.getElementById('areaImg');
          let td = document.createElement('a');
          let da = document.getElementById('da');
          let image = document.createElement('img');
          image.src = "https://mpindo.sgp1.digitaloceanspaces.com/" + xml.children[0].innerHTML;
          image.style.width = "80px"
          td.innerText = xml.children[0].innerHTML;
          td.href = "https://mpindo.sgp1.digitaloceanspaces.com/" + xml.children[0].innerHTML;
          row.appendChild(td);
          areaImg.appendChild(image);
          da.children[1].appendChild(row);
          setCoba(xml.children[0].innerHTML)
        });
      })
    }
    
    useEffect(() => {
      getId();
    }, [])

  return (
    <div>
        <input type="file" onChange={handleUpload}/>
        <Container>
        <Grid id='areaImg' container spacing={4}>
          
        </Grid>
        </Container>
        {/* <div id='areaImg'>
          
        </div> */}
        <div id='content'>
        <table id='da'>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>coba</th>
                </tr>                
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    </div>
  )
}

export default Sdknew