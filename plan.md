### Components

App
 - contains user state
 - function for setting current user

route: "/"

LoginForm
SignupForm
 - both with callbacks to App state

MainContainer
    - SearchBar + ListView
    - SearchBar + Recipe Display
    - New Recipe Form

route: "/food"
ListView
 - search results
 - social posts
 - personal cookbook
    - recipes by user_id
    - AND liked recipes

SearchBar
 - default/popular searches
    - so that we have something to show to new users

route: "/create_recipe"
RecipeForm

route: "recipes/:id"
RecipeDisplay

