import React from "react";

import { withRouter } from 'react-router-dom';

import ImageUploader from "./ImageUploader";

import { createRecipe, updateRecipe, getSingleRecipe, getAllIngredients, getAllTags } from "../requests";

import AuthContext from "../AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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
        editIngredient: null,
        errors: []
    }

    static contextType = AuthContext;

    componentDidMount() {
        console.log("FORM MOUNT", this.props);

        console.log("FORM PATH PARAMS", this.props.match.params);

        // if we have an id, attempt to load
        // then check if the user matches
        // if not, then redirect to RecipeList
        // if yes, then fill in the form state

        // this.context.user.id

        const id = this.props.match.params.id;
        if (id) {
            getSingleRecipe(id, this.context.token)
                .then(res => {
                    console.log("get recipe", res);
                    if (res && res.data && res.data.recipe.user_id === this.context.user.id) {
                        this.fillStateFromRecipe(res.data);
                    }
                    else {
                        this.props.history.push("/recipes");
                    }
                });
        }
    }
// do i need the errors state in here? 
// probably because this is maybe resetting things? 
    componentDidUpdate() {
        // console.log("RECIPE FORM STATE", this.state);
        if (this.props.new && this.state.id) {
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
                tags: [],

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
///// new ////////
    // require title and description 
    // require steps.length > 10 && steps || ingredients.length > 0
    // should check that it contains at least some letters... to avoid some spaces and no text
    // how to add refocus after submit to focus on first field that has an error? or just to focus on the error message? 



    validate = (title, description, steps, ingredients) => {
        const errors = [];
        // let titleInput = document.getElementById('title')
        // ^comment and in title is for reference on how to add color border on error in vanilla js
        
        if (title.length === 0){
            errors.push("Title field can't be empty");
            // titleInput.style.borderColor = "red"
        } 
        // else {
        //     titleInput.style.borderColor = "none"
        // }

        if (description.length === 0){
            errors.push("Description field can't be empty");
        } 
        
        if (steps.length === 0 && ingredients.length === 0){
            errors.push("Steps or Ingredients must be included")
        } 

        return errors;
    }
    
//////////////
// end new
//////////////
    submitRecipe = (event) => {
        event.preventDefault();

        /*
        const recipe = {...this.state};
        console.log("recipe SUBMIT", recipe);
        */

        console.log('Submitted!');

        const recipe = { ...this.state };
        const formRecipeData = new FormData(event.target);
        ////////
        // new
        ///////
        const errors = this.validate(recipe.title, recipe.description, recipe.steps, recipe.ingredients);

        if (errors.length > 0) {
            this.setState({ errors });
            window.scrollTo(0, 0)
            return;
        }
        ////////
        // end new
        ///////

        console.log("editable recipe");
        console.log(recipe);
        console.log("selected image");

        formRecipeData.append("changedImage", recipe.changedImage);
        formRecipeData.append("id", recipe.id);
        formRecipeData.append("tags", JSON.stringify(recipe.tags));
        formRecipeData.append("ingredients", JSON.stringify(recipe.ingredients));

        if (recipe.changedImage !== null) {
            formRecipeData.append('imageURL', recipe.imageURL);
            formRecipeData.append('imageSrc', recipe.imageSrc);
        }

        console.log("FORM DATA");
        console.log(formRecipeData.get("changedImage"));

        // do the submission
        // callback to switch the URL

        let func = null;

        if (recipe.id) {
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
            if (tag.name !== name) {
                copy.push(tag);
            }
        });
        this.setState({ tags: copy });
    }

    removeIngredient = (event) => {
        const name = event.target.dataset.name;
        const copy = [];
        this.state.ingredients.forEach(ing => {
            if (ing.name !== name) {
                copy.push(ing);
            }
        });
        this.setState({ ingredients: copy });
    }

    editIngredient = (event) => {
        const name = event.target.dataset.name;
        let match = null;
        const copy = [];
        this.state.ingredients.forEach(ing => {
            if (ing.name !== name) {
                copy.push(ing);
            }
            else {
                match = ing;
            }
        });
        this.setState({ ingredients: copy, editIngredient: match });
    }

    selectImage = imageSrc => this.setState({ imageSrc, imageUrl: null, changedImage: true });

    setImageUrl = imageURL => this.setState({ imageSrc: null, imageURL, changedImage: true });

    unselectImage = () => this.setState({ imageSrc: null, imageUrl: null, changedImage: true });

    resetImage = () => this.setState({ imageSrc: null, imageUrl: null, changedImage: false });

    notice = () => {

        return(
            <div>
                <p>Required fields: title, description, and at least one ingredient or step</p>
            </div>
        )
    }


    render() {
        const { errors } = this.state
        /*loadedImage={this.props.recipe.image}*/


        return (
            <>
                <h4 className='title is-2'>
                    {
                        this.state.id
                            ? "Update Your Recipe"
                            : "Create a New Recipe"
                    }
                </h4>
                <ImageUploader
                    loadedImageUrl={this.state.loadedImageUrl}

                    setImageUrl={this.setImageUrl}
                    selectImage={this.selectImage}
                    unselectImage={this.unselectImage}
                    resetImage={this.resetImage}
                />
                <hr />
                <form onSubmit={this.submitRecipe}>
                    {this.notice()}
                    <div style={{margin: '1rem 0 2rem 0'}}>
                        {
                            errors.map(error => (
                                <p className='error' key={error}>Error: {error}</p>
                            ))
                            
                        }
                    </div>

                    <div className='field is-horizontal'>
                        <div className='field-label'>
                            <label className='label' htmlFor="isPublic">Public</label>
                        </div>
                        <div className="field-body">
                            <div className="field is-narrow">
                                <div className="control">
                                    <label className="radio">
                                        <input type="checkbox" id="isPublic" name="isPublic"
                                            checked={this.state.isPublic}
                                            onChange={this.onCheckChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label" htmlFor="title">Title</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control is-expanded has-icons-left has-icons-right">
{/* ////////// TITLE ///////////// */}
                                    <input className='input' type="text" id="title" name="title"
                                        value={this.state.title}
                                        onChange={this.onChange}
                                        placeholder='Enter your recipe title here'
                                    />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon color='orange' icon={faCarrot} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label" htmlFor="description">Description</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control" >
{/* ////////// DESCRIPTION ///////////// */}
                                    <textarea id="description" name="description" className="textarea"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        placeholder='Talk about your recipe'
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Ingredients table</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <table className="ingredient-table new-form-margin">
                                        {/* <table className="new-ingredient-table"> */}
                                        <thead>
{/* ////////// ALTERING ORDER OF TABLE ///////////// */}
                                            <tr>
                                                <td>Quantity</td>
                                                <td>Unit</td>
                                                <td>Name</td>
                                                <td>Instruction</td>
                                                <td className="button-cell"></td>
                                                <td className="button-cell"></td>
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
                                                            <td className="button-cell">
                                                                <button type="button"
                                                                    data-name={ing.name}
                                                                    onClick={this.editIngredient}
                                                                >Edit</button>
                                                            </td>
                                                            <td className="button-cell">
                                                                <button type="button"
                                                                    className="delete-button"
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <IngredientInput editIngredient={this.state.editIngredient} addIngredient={this.addIngredient} />
                    <br />
                    <br />
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label" htmlFor="steps">Steps</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control" >
{/* ////////// STEPS ///////////// */}
                                    <textarea className="textarea" id="steps" name="steps"
                                        value={this.state.steps}
                                        onChange={this.onChange}
                                        placeholder='Enter steps here'
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div  className='tag-margin'>
                        {
                            this.state.tags.map((tag, index) => {
                                return (
                                    <span key={index} className='tag is-warning is-inverted is-medium'>
                                        
                                        {tag.name}
                                        <button type="button"
                                            className="delete-button"
                                            data-name={tag.name}
                                            onClick={this.removeTag}
                                        >X</button>
                                    </span>

                                )
                            })
                        }
                    </div>
                    <TagInput addTag={this.addTag} />
                    <br />
                    <button className='button is-success recipe-submit'>Submit Recipe</button>
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
        name: "",
        instruction: "",
        quantity_number: "",
        measurement: "",
        existingIngredients: []
    }

    static contextType = AuthContext;

    componentDidMount() {
        // get the existing ingredients

        getAllIngredients(this.context.token)
            .then(res => {
                this.setState({
                    existingIngredients: res.data
                });
            })
    }

    componentDidUpdate(prevProps) {
        // console.log(this.props, prevProps);
        if (this.props.editIngredient
            && (
                !prevProps.editIngredient
                || this.props.editIngredient.name !== prevProps.editIngredient.name
            )
        ) {
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
            if (ing.name === this.state.name) {
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
            name: "",
            instruction: "",
            quantity_number: "",
            measurement: "",
        })
    }

    render() {
        return (

            <>
                <br />
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="name">Name</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className='input' type="text" id="name" name="name"
                                    list="ingredients"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    placeholder='Enter or select an ingredient name'
                                />
                                <datalist id="ingredients">
                                    {
                                        this.state.existingIngredients.map(ing => {
                                            return <option key={ing.id} value={ing.name} />
                                        })
                                    }
                                </datalist>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="instruction">Instruction</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className='input' type="text" id="instruction" name="instruction"
                                    value={this.state.instruction}
                                    onChange={this.onChange}
                                    placeholder='e.g. peeld, minced, ground'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="quantity_number">Quantity</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className='input' type="number" id="quantity_number" name="quantity_number"
                                    value={this.state.quantity_number}
                                    onChange={this.onChange}
                                    placeholder='Enter a quantity number'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="measurement">Unit</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className='input' type="text" id="measurement" name="measurement"
                                    value={this.state.measurement}
                                    onChange={this.onChange}
                                    placeholder='e.g. pound, teaspoon, oz'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                

                <button className='add-ingredient-button button is-info' onClick={this.onSubmit}>Add Another Ingredient</button>
            </>
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

    componentDidMount() {
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
            if (tag.name === this.state.name) {
                id = tag.id;
            }
        });

        return {
            id,
            name: this.state.name
        };
    }

    setDefaultState = () => {
        this.setState({ name: "" });
    }

    render() {
        return (
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label" htmlFor="tag">Tag</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control tag-input">
                            <input className='input ' type="text" id="name" name="name"
                                list="tags"
                                value={this.state.name}
                                onChange={this.onChange}
                                placeholder='Enter or selec a tag'
                            />
                            <datalist id="tags">
                                {
                                    this.state.existingTags.map(tag => {
                                        return <option key={tag.id} value={tag.name} />
                                    })
                                }
                            </datalist>
                        </div>
                    </div>
                </div>
                <button className='button is-info' onClick={this.onSubmit}>Add Tag</button>
            </div>
        )
    }
}