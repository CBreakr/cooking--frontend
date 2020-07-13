
# CookBook

Many thanks to my project partner Yueying Wang: https://github.com/wyy1234567

Production URL: https://cookbook-social.herokuapp.com/

server-side repo: https://github.com/CBreakr/cooking--backend

## Search and Share Recipes

CookBook is a social media site for recipes. Users can search for recipes (both from other users and the Spoonacular API), create their own, copy recipes, like, comment, or follow other users.

## Technical Details

This site was made with a React javascript frontend and a Ruby on Rails backend. It uses a PostgreSQL database for storage, ActiveStorage & the React Dropzone component for drag-and-drop image upload.

## Next Steps

Right now there's no splash page for users when they first log in. We had thought to just display the user's current recipes, but this wouldn't be useful for users who just signed up. Something more instructive would be a better choice.