import React from "react";

import { withRouter } from 'react-router-dom';

class NewRecipeForm extends React.Component {

    state = {
        id: null,
        title: "",
        description: "",
        steps: "",
        ingredients: [],
        tags: []
    }

    submitRecipe = () => {
        const recipe = {...this.state};
        // do the submission
        // callback to switch the URL
        this.props.history.push("/food");
    }

    addIngredient = (ingredient) => {
        this.setState({
            ingredients: [...this.state.ingredients, ingredient]
        });
    }

    addTag = (tag) => {
        this.setState({
            tags: [...this.state.tags, tag]
        });
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){

        console.log("recipe form props", this.props);

        return (
            <>
            <div>NewRecipeForm</div>
            <form onSubmit={this.submitRecipe}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <br />
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                ></textarea>
                <br />
                <ul>
                    {
                        this.state.ingredients.map(ing => {
                            return ( 
                                <li>
                                    {ing.quantity}
                                    {ing.unit}
                                    {ing.name}
                                </li>
                            )
                        })
                    }
                </ul>
                <IngredientInput addIngredient={this.addIngredient} />
                <br />
                <ul>
                    {
                        this.state.tags.map(tag => {
                            return (
                                <li>
                                    {tag.name}
                                </li>
                            )
                        })
                    }
                </ul>
                <TagInput addTag={this.addTag} />
                <br />
                <button>Submit Recipe</button>
            </form>
            </>
        )
    }
}

export default withRouter(NewRecipeForm);

//
//
//
class IngredientInput extends React.Component {
    state = {
        quantity: "",
        unit: "",
        name: "",
        prep: "",
        existingIngredients: []
    }

    componentDidMount(){
        // get the existing ingredients
        this.setState({
            existingIngredients: [
                {id:1, name:"garlic"},
                {id:2, name:"chicken"},
                {id:3, name:"noodles"}
            ]
        });
    }

    onChange = (event) => {
        console.log("on change", event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const ingredient = this.createIngredientFromState();
        this.props.addIngredient(ingredient);
        this.setDefaultState();
    }

    createIngredientFromState = () => {

        let id = null;
        this.state.existingIngredients.forEach(ing => {
            if(ing.name === this.state.name){
                id = ing.id;
            }
        });

        return {
            id,
            quantity: this.state.quantity,
            unit: this.state.unit,
            name: this.state.name,
            prep: this.state.prep
        }
    }

    setDefaultState = () => {
        this.setState({
            id: null,
            quantity: "",
            unit: "",
            name: "",
            prep: ""
        })
    }

    render(){
        return (
            <div>
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity"
                    value={this.state.quantity}
                    onChange={this.onChange}
                />
                <br />
                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" name="unit" 
                    value={this.state.unit}
                    onChange={this.onChange}
                />
                <br />
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" 
                    list="ingredients"
                    value={this.state.name}
                    onChange={this.onChange}
                />
                <datalist id="ingredients">
                    {
                        this.state.existingIngredients.map(ing => {
                            return <option key={ing.id} value={ing.name} />
                        })
                    }
                </datalist>
                <br />
                <button onClick={this.onSubmit}>Add Ingredient</button>
            </div>
        );
    }
}

//
//
//
class TagInput extends React.Component {
    state = {
        name: "",
        existingTags: []
    }

    componentDidMount(){
        // get the existing tags
        this.setState({
            existingTags: [
                {id: 1, name: "dinner"},
                {id: 2, name: "vegetarian"},
                {id: 3, name: "seafood"}
            ]
        });
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const tag = this.createTagFromState();
        this.props.addTag(tag);
        this.setDefaultState();
    }

    createTagFromState = () => {
        let id = null;

        this.state.existingTags.forEach(tag => {
            if(tag.name === this.state.name){
                id =  tag.id;
            }
        });

        return {
            id,
            name: this.state.name
        };
    }

    setDefaultState = () => {
        this.setState({name: ""});
    }

    render(){
        return (
            <div>
                <label htmlFor="tag">Tag</label>
                <input type="text" id="name" name="name"
                    list="tags"
                    value={this.state.name} 
                    onChange={this.onChange} 
                />
                <datalist id="tags">
                    {
                        this.state.existingTags.map(tag => {
                            return <option key={tag.id} value={tag.name} />
                        })
                    }
                </datalist>
                <button onClick={this.onSubmit}>Add Tag</button>
            </div>
        )
    }
}