import React from "react";
import AuthContext from "../AuthContext";
import { withRouter } from "react-router-dom";

class Tag extends React.Component{

    static contextType = AuthContext;

    //when tag is clicked, redirect to TagList: "/:tag_name/recipes"
    clickTag = () => {
        console.log(`Tag ${this.props.name} is clicked!`)
        this.props.history.push(`/${this.props.id}/recipes`)
    }

    render() {
        console.log('Tag container:', this.props)
        return(
            <>
                <span className='button is-danger is-inverted' onClick={this.clickTag}> #{this.props.name}  </span>
            </>
        )
    }
}

export default withRouter(Tag);