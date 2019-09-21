import React,{Component,Fragment} from 'react'
import fetchData from '../../services/fetchData';
import { GET_POST_BY_ID_Api } from '../../constants/serverUrls';
import PostSummary from '../../CommonComponents/PostSummary';
import LoadingIndicator from '../../CommonComponents/LoadingIndicator';

class Post extends Component{

state={
    id:"",
    title:"",
    content:"",
    author:"",
}


componentDidMount(){
    const {match={}}=this.props;
    const {params={}}=match;
    const {id: postId =""}=params;
    fetchData(GET_POST_BY_ID_Api.replace(":id",postId))
    .then(data=>{
        this.setState({
            id:data.id,
            title:data.title,
            author:data.author,
            content:data.content,
        })
        console.log(data);
    })
    .catch(error=>{
        console.log(error);
    })
}
    render(){
        const {
            id="",
            title="",
            content="",
            author="",
        }=this.state;
        return(
            //console.log(this.state);
             //not a good way to destructure state {...this.state} as a prop to PostSummary
            <Fragment>
                {
                    id
                    ?
                    <PostSummary 
                    id={id} 
                    author={author} 
                    content={content} 
                    title={title}/>
                    :
                    <LoadingIndicator/>
                
                }        
            </Fragment>
        )
    };
}
export default Post;