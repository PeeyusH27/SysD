import React from 'react'
import AutoComplete from './components/AutoComplete'

const App = () => {
  const staticData = [
    'apple',
    'banana',
    'berry',
    'orange',
    'grape',
    'mango',
    'melon'
  ]

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    <div>
      <h1>GLORY AHEAD</h1>

      <AutoComplete
        placeholder={"Enter query..."}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipes...</>}
        onSelect={(res) => console.log(res)}

        onChange={(input) => { }}
        onBlur={(e) => { }}
        onFocus={(e) => { }}
        customStyles={{}}
      />
    </div>
  )
}

export default App