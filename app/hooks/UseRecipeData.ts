import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form } from '../home-recipe/RegisterRecipe';
import { Ingredient } from '../home-recipe/IngredientList';

export type GetRecipeType = {
  recipeList: Array<ReceipeData>
  setRecipeList: Dispatch<SetStateAction<Array<ReceipeData>>>
};

export type ReceipeData = {
  recipeID?: string;
  recipeName: string;
  type: string;
  ingredient: Ingredient[];
  steps: string;
  imgURL?: string;
};

export enum ACTION {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
} 

type Props = {
  recipeName? : string;
  form? : Form
  recipeIcon? : File | Blob;
  recipeIDTMP?: string | null
}


const useRecipeData = ({ recipeIDTMP, recipeName, form } : Props = {}) => {
  
  const [recipeList, setRecipeList] = useState<Array<ReceipeData>>([]);

  const fetchData = (action: ACTION) => async ({ recipeName, form, recipeIDTMP, recipeIcon }: Props) => {

    try {
      const recipeID = recipeIDTMP as string;
      const formData = new FormData();
      formData.append("recipeID", recipeID as string);
      formData.append("recipeIcon", recipeIcon as Blob);

      if(action === ACTION.get) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((data) => {
          if(data !== null && data !== undefined && data !== "")
            setRecipeList(data)
        })
      }else if(action === ACTION.delete) {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'DELETE',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(recipeID),
        })
          await getData({recipeName: "GetData"});
      }else if(action === ACTION.post) {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe", {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(form)
            // ...form,
            // ingredient: Array.from(form?.ingredient.entries())
          // }),
        })
        
      const recipeID = await response.json();
      return recipeID;

      }else if (action === ACTION.put) {
        if (!recipeID) throw new Error("No recipeID!");
        fetch(process.env.NEXT_PUBLIC_API_URL + "/recipe/addRecipeIcon", {
          method: 'PUT',
          // headers: {
          //   "Content-Type": 'application/json'
          // },
          body: formData,
        })

      }
  
    } catch (error) {
      console.error('Error:', error);
      setRecipeList([]);
    }
  };

  const postData = fetchData(ACTION.post);
  const getData = fetchData(ACTION.get);
  const updateRecipeIcon = fetchData(ACTION.put);
  const updateData = fetchData(ACTION.put);
  const deleteData = fetchData(ACTION.delete);
  
  useEffect(() => {
    getData({recipeName: "GetData"});
  }, []);

  return { recipeList, fetchData, postData, getData, updateData, deleteData, updateRecipeIcon}

}

  export default useRecipeData;
