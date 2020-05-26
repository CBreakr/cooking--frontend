import React from "react";

import { withRouter } from 'react-router-dom';

import ImageUploader from "./ImageUploader";

import { createRecipe, updateRecipe, getSingleRecipe, getAllIngredients, getAllTags } from "../requests";

import AuthContext from "../AuthContext";

class RecipeForm extends React.PureComponent {

    state = {
        id: null,
        imageURL: null,
        imageSrc: null,
        loadedImageUrl: "",
        changedImage: false,
        title: "",
        description: "",
        steps: "",
        isPublic: false,
        ingredients: [],
        tags: [],
        editIngredient: null
    }

    static contextType = AuthContext;

    componentDidMount(){
        console.log("FORM MOUNT", this.props);

        console.log("FORM PATH PARAMS", this.props.match.params);

        // if we have an id, attempt to load
        // then check if the user matches
        // if not, then redirect to RecipeList
        // if yes, then fill in the form state

        // this.context.user.id

        const id = this.props.match.params.id;
        if(id) {
            getSingleRecipe(id, this.context.token)
            .then(res => {
                console.log("get recipe", res);
                if(res&& res.data && res.data.recipe.user_id === this.context.user.id){
                    this.fillStateFromRecipe(res.data);
                }
                else{
                    this.props.history.push("/recipes");
                }
            });
        }
    }

    componentDidUpdate(){
        console.log("RECIPE FORM STATE", this.state);
        if(this.props.new && this.state.id){
            this.setState({
                id: null,
                imageURL: null,
                imageSrc: null,
                changedImage: false,
                title: "",
                description: "",
                steps: "",
                isPublic: false,
                ingredients: [],
                tags: []
            });
        }
    }

    fillStateFromRecipe = (recipe) => {
        const inner = recipe.recipe;
        this.setState({
            id: inner.id,
            imageURL: null,
            imageSrc: null,
            loadedImageUrl: inner.image,
            changedImage: false,
            title: inner.title,
            description: inner.description,
            steps: inner.steps,
            isPublic: inner.isPublic,
            ingredients: recipe.ingredients,
            tags: recipe.tags
        });
    }

    submitRecipe = (event) => {
        event.preventDefault();

        /*
        const recipe = {...this.state};

        console.log("recipe SUBMIT", recipe);
        */

        console.log('Submitted!');

        const recipe = {...this.state};
        const formRecipeData = new FormData(event.target);

        console.log("editable recipe");
        console.log(recipe);
        console.log("selected image");

        formRecipeData.append("changedImage", recipe.changedImage);
        formRecipeData.append("id", recipe.id);

        if(recipe.changedImage !== null) {
            formRecipeData.append('imageURL', recipe.imageURL);
            formRecipeData.append('imageSrc', recipe.imageSrc);
        }

        console.log("FORM DATA");
        console.log(formRecipeData.get("changedImage"));

        // do the submission
        // callback to switch the URL

        let func = null;

        if(recipe.id) {
            func = updateRecipe;
        }
        else {
            func = createRecipe;
        }

        func(formRecipeData, this.context.token)
        .then(res => {
            this.props.history.push("/recipes");
        });        
    }

    addIngredient = (ingredient) => {
        this.setState({
            ingredients: [...this.state.ingredients, ingredient],
            editIngredient: null
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
        });
    }

    onCheckChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    }

    removeTag = (event) => {
        const name = event.target.dataset.name;
        const copy = [];
        this.state.tags.forEach(tag => {
            if(tag.name !== name){
                copy.push(tag);
            }
        });
        this.setState({tags: copy});
    }

    removeIngredient = (event) => {
        const name = event.target.dataset.name;
        const copy = [];
        this.state.ingredients.forEach(ing => {
            if(ing.name !== name){
                copy.push(ing);
            }
        });
        this.setState({ingredients: copy});
    }

    editIngredient = (event) => {
        const name = event.target.dataset.name;
        let match = null;
        const copy = [];
        this.state.ingredients.forEach(ing => {
            if(ing.name !== name){
                copy.push(ing);
            }
            else {
                match = ing;
            }
        });
        this.setState({ingredients: copy, editIngredient: match});
    }

    selectImage = imageSrc => this.setState({ imageSrc, imageUrl: null, changedImage:true });

    setImageUrl = imageURL => this.setState({ imageSrc: null, imageURL, changedImage: true });

    unselectImage = () => this.setState({ imageSrc: null, imageUrl: null, changedImage: true });

    resetImage = () => this.setState({ imageSrc: null, imageUrl: null, changedImage: false });

    render(){

        /*loadedImage={this.props.recipe.image}*/

        return (
            <>
            <div>Recipe Form</div>
            <ImageUploader
                    loadedImageUrl={this.state.loadedImageUrl}
                    
                    setImageUrl={this.setImageUrl}
                    selectImage={this.selectImage}
                    unselectImage={this.unselectImage}
                    resetImage={this.resetImage}
            />
            <hr/>
            <form onSubmit={this.submitRecipe}>
                <input type="checkbox" id="isPublic" name="isPublic"
                    checked={this.state.isPublic}
                    onChange={this.onCheckChange}
                />
                <label htmlFor="isPublic">Public</label>
                <br />
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
                <table className="ingredient-table">
                    <thead>
                        <tr>
                            <td>Quantity</td>
                            <td>Unit</td>
                            <td>Name</td>
                            <td>Instruction</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.ingredients.map((ing, index) => {
                            console.log("ingredient", ing);
                            return ( 
                                <tr key={index}>
                                    <td>{ing.quantity_number}</td>
                                    <td>{ing.measurement}</td>
                                    <td>{ing.name}</td>
                                    <td>{ing.instruction}</td>
                                    <td>
                                        <button type="button" 
                                            data-name={ing.name}
                                            onClick={this.editIngredient}
                                        >Edit</button>
                                    </td>
                                    <td>
                                        <button type="button" 
                                            data-name={ing.name}
                                            onClick={this.removeIngredient}
                                        >X</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <IngredientInput editIngredient={this.state.editIngredient} addIngredient={this.addIngredient} />
                <br />
                <label htmlFor="steps">Steps</label>
                <textarea id="steps" name="steps"
                    value={this.state.steps}
                    onChange={this.onChange}
                ></textarea>
                <br />
                <ul>
                    {
                        this.state.tags.map((tag, index) => {
                            return (
                                <li key={index}>
                                    {tag.name}
                                    <button type="button" 
                                        data-name={tag.name} 
                                        onClick={this.removeTag}
                                    >X</button>
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

export default withRouter(RecipeForm);

//
//
//
class IngredientInput extends React.Component {
    state = {
        quantity_number: "",
        measurement: "",
        name: "",
        instruction: "",
        existingIngredients: []
    }

    static contextType = AuthContext;

    componentDidMount(){
        // get the existing ingredients

        getAllIngredients(this.context.token)
        .then(res => {
            this.setState({
                existingIngredients: res.data
            });
        })
    }

    componentDidUpdate(prevProps){
        // console.log(this.props, prevProps);
        if(this.props.editIngredient          
            && ( 
                !prevProps.editIngredient
                || this.props.editIngredient.name !== prevProps.editIngredient.name
            )
        ){
            // console.log("update ingredient", this.props, this.prevProps);
            this.setState({
                quantity_number: this.props.editIngredient.quantity_number,
                measurement: this.props.editIngredient.measurement,
                name: this.props.editIngredient.name,
                instruction: this.props.editIngredient.instruction,
            });
        }
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
            quantity_number: this.state.quantity_number,
            measurement: this.state.measurement,
            name: this.state.name,
            instruction: this.state.instruction
        }
    }

    setDefaultState = () => {
        this.setState({
            id: null,
            quantity_number: "",
            measurement: "",
            name: "",
            instruction: ""
        })
    }

    render(){
        return (
            <div>
                <label htmlFor="quantity_number">Quantity</label>
                <input type="number" id="quantity_number" name="quantity_number"
                    value={this.state.quantity_number}
                    onChange={this.onChange}
                />
                <br />
                <label htmlFor="measurement">Unit</label>
                <input type="text" id="measurement" name="measurement" 
                    value={this.state.measurement}
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
                <label htmlFor="instruction">Instruction</label>
                <input type="text" id="instruction" name="instruction" 
                    value={this.state.instruction}
                    onChange={this.onChange}
                />
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

    static contextType = AuthContext;

    componentDidMount(){
        // get the existing tags

        getAllTags(this.context.token)
        .then(res => {
            this.setState({
                existingTags: res.data
            });
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