import React,{Component} from 'react';
import fetchData from '../../services/fetchData';
import { GET_POSTS_API } from "../../constants/serverUrls";
import PostSummary from '../../CommonComponents/PostSummary';
import LoadingIndicator from '../../CommonComponents/LoadingIndicator';
//import ErrorBoundaryV1 from '../../HigherOrderComponents/ErrorBoundaryV1';
import ErrorBoundaryV2 from '../../HigherOrderComponents/ErrorBoundaryV2';
class Home extends Component{
    state={
        posts:[],
    }
    componentDidMount()
    {
        //fetchData(GET_POSTS_API,"GET");
        this.loadPostData();
    }
    loadPostData=async()=>{
        try{
            const posts=await fetchData(GET_POSTS_API,"GET");
            this.setState({posts})
            console.log(posts);
        }
        catch(e){
            console.log(e);
        }
    }
    //map function has 3 args..2nd arg is the index of the array element
    //no if inside jsx..so we have ternary conditional operator...coz if can resolve itseld unlike if stamtnt
    render(){
        //undefined.fun(); --> This error is handled with HOC->ErrorBoundaryV2
        const {posts}=this.state;
        return(
            
           // <ErrorBoundaryV1> //initi --no longer required since we have ErrorBoundaryV2
            <div>
                {
                    posts.length
                    ? //here, it checksthe condition below is evaluated based on Truthy value check
                    posts.map((post,postIndex)=>{
                        return(
                            <PostSummary
                            key={postIndex}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            author={post.author}
                        />
                        )
                    })
                    :
                    <LoadingIndicator/>   

                }     
                   
                
            </div>
          //  </ErrorBoundaryV1>
        )
    };
}

export default ErrorBoundaryV2(Home);//HOC