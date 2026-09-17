// Central recipe data. Both RecipeList and RecipeDetail read from here,
// so a recipe only has to be described once.
//
// `have` / `missing` (plain strings) are used by the summary card on the list page.
// `haveIngredients` / `needIngredients` / `instructions` (structured) are used by the detail page.

export const recipes = [
  {
    id: "creamy-lemon-garlic-pasta",
    title: "Creamy Lemon Garlic Pasta",
    image: "https://loremflickr.com/640/480/pasta,lemon,garlic",
    detailImage: "https://loremflickr.com/900/1200/pasta,lemon,garlic",
    match: 98,
    time: "20 Mins",
    difficulty: "Easy",
    servings: "2 Servings",
    have: "Pasta, Lemon, Garlic, Butter, Parmesan.",
    missing: "Fresh Parsley.",
    haveIngredients: [
      { icon: "🍝", text: "8 oz Spaghetti" },
      { icon: "🍋", text: "1 Lemon, zested & juiced" },
      { icon: "🧄", text: "4 Garlic Cloves" },
      { icon: "🧈", text: "3 tbsp Butter" },
    ],
    needIngredients: [
      { icon: "🧀", text: "Grated Parmesan" },
      { icon: "🌿", text: "Fresh Parsley" },
    ],
    instructions: [
      {
        title: "Cook the Pasta",
        description:
          "Boil the spaghetti in salted water until al dente. Reserve a cup of pasta water before draining.",
      },
      {
        title: "Build the Sauce",
        description:
          "Melt the butter with garlic and lemon zest over low heat until fragrant, about 2 minutes.",
      },
      {
        title: "Toss & Finish",
        description:
          "Add the pasta, a splash of pasta water, lemon juice and Parmesan. Toss until glossy and finish with parsley.",
      },
    ],
  },
  {
    id: "classic-shakshuka",
    title: "Classic Shakshuka",
    image: "https://loremflickr.com/640/480/shakshuka,skillet",
    detailImage: "https://loremflickr.com/900/1200/shakshuka,skillet",
    match: 92,
    time: "35 Mins",
    difficulty: "Medium",
    servings: "3 Servings",
    have: "Eggs, Canned Tomatoes, Onions, Olive Oil.",
    missing: "Bell Peppers, Cumin.",
    haveIngredients: [
      { icon: "🥚", text: "5 Large Eggs" },
      { icon: "🍅", text: "1 Can Crushed Tomatoes" },
      { icon: "🧅", text: "1 Onion, diced" },
      { icon: "💧", text: "2 tbsp Olive Oil" },
    ],
    needIngredients: [
      { icon: "🫑", text: "2 Bell Peppers" },
      { icon: "🌡️", text: "1 tsp Cumin" },
    ],
    instructions: [
      {
        title: "Build the Base",
        description:
          "Sauté onion and peppers in olive oil until soft, then stir in cumin and crushed tomatoes.",
      },
      {
        title: "Simmer the Sauce",
        description:
          "Let the tomato sauce simmer for 10 minutes until it thickens slightly.",
      },
      {
        title: "Poach the Eggs",
        description:
          "Make wells in the sauce, crack in the eggs, cover and cook until the whites are just set.",
      },
    ],
  },
  {
    id: "roasted-sweet-potato-quinoa-bowl",
    title: "Roasted Sweet Potato Quinoa Bowl",
    image: "https://loremflickr.com/640/480/quinoa,sweetpotato,bowl",
    detailImage: "https://loremflickr.com/900/1200/quinoa,sweetpotato,bowl",
    match: 85,
    time: "45 Mins",
    difficulty: "Easy",
    servings: "2 Servings",
    have: "Sweet Potatoes, Black Beans, Olive Oil.",
    missing: "Quinoa, Lime, Cilantro, Corn.",
    haveIngredients: [
      { icon: "🍠", text: "2 Sweet Potatoes" },
      { icon: "🫘", text: "1 Can Black Beans" },
      { icon: "💧", text: "2 tbsp Olive Oil" },
    ],
    needIngredients: [
      { icon: "🌾", text: "1 cup Quinoa" },
      { icon: "🌿", text: "Fresh Cilantro" },
      { icon: "🌽", text: "1 cup Corn" },
    ],
    instructions: [
      {
        title: "Roast the Sweet Potato",
        description:
          "Cube and roast sweet potatoes with olive oil at 425°F for 25 minutes, until caramelized.",
      },
      {
        title: "Cook the Quinoa",
        description:
          "Simmer quinoa in salted water for 15 minutes, then fluff with a fork.",
      },
      {
        title: "Assemble the Bowl",
        description:
          "Layer quinoa, sweet potato, black beans and corn, then finish with lime and cilantro.",
      },
    ],
  },
  {
    id: "rustic-potato-rice",
    title: "Rustic Potato Rice",
    image: "https://loremflickr.com/640/480/potato,rice,indian",
    detailImage: "https://loremflickr.com/900/1200/potato,rice,indian",
    match: 95,
    time: "35 Mins",
    difficulty: "Easy",
    servings: "4 Servings",
    have: "Basmati Rice, Potatoes, Olive Oil, Salt.",
    missing: "Cumin Seeds, Fresh Coriander.",
    haveIngredients: [
      { icon: "🌾", text: "2 cups Basmati Rice" },
      { icon: "🥔", text: "3 Medium Potatoes" },
      { icon: "💧", text: "2 tbsp Olive Oil" },
      { icon: "🧂", text: "Salt to taste" },
    ],
    needIngredients: [
      { icon: "🌡️", text: "1 tsp Cumin Seeds" },
      { icon: "🌿", text: "Fresh Coriander" },
    ],
    instructions: [
      {
        title: "Prep the Potatoes",
        description:
          "Wash, peel, and cube the potatoes into bite-sized pieces. Rinse the basmati rice thoroughly until the water runs clear, then soak for 15 minutes.",
      },
      {
        title: "Temper Spices",
        description:
          "Heat olive oil in a heavy-bottomed pan over medium heat. Add cumin seeds and let them sizzle for about 30 seconds until fragrant.",
      },
      {
        title: "Cook the Rice",
        description:
          "Add the potatoes and drained rice to the pan, pour in water, cover and simmer on low heat for 18 minutes until the rice is tender.",
      },
      {
        title: "Finish & Serve",
        description:
          "Fluff the rice with a fork, season with salt, and top with fresh coriander and a squeeze of lime before serving.",
      },
    ],
  },
];

export function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}