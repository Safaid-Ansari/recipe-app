import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

//
const APPLICATION_ID = "dda5a5c8";
const API_KEY = "df8f2a19a938f65c4384d5abb72dfb43";

// it is for recipe container styled
const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
  border-radius: 20px;
  background-color: indianred;
`;

// it is for images of the list items
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
  border-radius: 20px;
`;

// for name of the recipes
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// it is for see more text button
const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
  background-color: lightblue;
`;

// it is for ingredients text button
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
  background-color: floralwhite;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;
const RecipeComponent = (props) => {
  // it is for recipe show and hiding
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    // it is for dialog box styling from the material UI library
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};

// it is all about for header styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const RecipeImage = styled.img`
  width: 36px;
  height: 36px;
  margin: 15px;
`;
const Placeholder = styled.img`
  width: 150px;
  height: 150px;
  margin: 200px;
  opacity: 100%;
  border-radius: 10px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;
const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APPLICATION_ID}&app_key=${API_KEY}`
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <RecipeImage src="data:image/jpeg;base64,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" />
          Recipe Finder
        </AppName>
        <SearchBox>
          <SearchIcon src="data:image/png;base64,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" />
          <SearchInput
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="data:image/jpeg;base64,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" />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
