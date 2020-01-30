import React,{ useState} from 'react';
import Header from '../resuable/header';
import styled from 'styled-components';
import { Input, Icon, TextArea, Button } from 'semantic-ui-react';
import  Dropzone  from 'react-dropzone'
import { AddPost } from '../Action/Addpost';
import { useDispatch } from 'react-redux';


const MainWrapper = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    padding:10px;
`
const PostCompo = () => {
    const [Image,setimage] = useState(null);
    const [title,setTitle] = useState(null);
    const [description,setDiscription] = useState(null);
    const dispatch = useDispatch()

    const changeTextArea = (e) => {
        if(e.target.name==='title'){
            setTitle(e.target.value)
        }
        if(e.target.name==='description'){
            setDiscription(e.target.value);
        }
    }
    const postFunct = () => {
        if(title && description && Image){
            console.log('clicked', title,description,Image)
            dispatch(AddPost({title,description,Image }))
        }
        else{
            console.log(' miss clicked', title,description,Image)
        }
    }

    return(
        <div>
           <Header title={"Add Post"}/>
           <MainWrapper>
                <Input value = {title}onChange = {changeTextArea} name = 'title'placeholder = 'Add Post Title'></Input>
                <Dropzone accept="image/png," maxSize={5242880} onDrop={acceptedFiles => {
                        console.log(acceptedFiles)
                        if(acceptedFiles.length===1){
                            setimage(acceptedFiles)
                        }
                }}>
                        {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 242880;
                            return(<section>
                            <div 
                                style= {{width:'100%',height:'259px', border:'2px dashed grey',alignItems:"center",justifyContent:'center',display:'flex',flexDirection:'column', marginTop:'20px'}}{...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                    <p>Please Upload Only png File and Max size of image is 5mb only </p>

                                    
                                    {isDragReject && "File type not accepted, sorry!"}
                                    
                                    {isFileTooLarge && (
                                        <div style={{color:'red'}}className="text-danger mt-2">
                                            File is too large.
                                        </div>
                                    )}
                                    {
                                    Image? <div>
                                        <img  
                                            style={{marginTop :'10px'}}
                                            alt= '' src = {URL.createObjectURL(Image[0]||'')} 
                                            width='200'
                                            height='150'
                                        />
                                        </div>:<Icon size = "huge"  name='image' color="blue"/>
                                    }
                            </div>
                            </section>)
                            }}
                </Dropzone>
                <TextArea 
                    value = {description}
                    onChange = {changeTextArea} 
                    name = 'description'
                    style={{marginTop:'10px',width:'100%',height:'30vh'}} 
                    placeholder='Description ' 
                />
                <Button style={{marginTop:'10px'}}onClick = {postFunct} secondary>
                      Add Post      
                </Button>
           </MainWrapper>
        </div>
    )
}
export default PostCompo