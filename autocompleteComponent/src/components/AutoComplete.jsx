import { useCallback, useEffect, useState } from "react"
import './styles.css'
import SuggestionList from "./SuggestionList"
import debounce from 'lodash/debounce'
const AutoComplete = ({ placeholder = '',
    staticData,
    fetchSuggestions,
    dataKey = '',
    customLoading = 'Loading..',
    onSelect = () => { },
    onChange = () => { },
    onBlur = () => { },
    onFocus = () => { },
    customStyles }
) => {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    console.log(suggestions);

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        onChange(e.target.value)
    }

    const getSuggestions = async (query) => {
        setError(null)
        setLoading(true)
        try {
            let result;
            if (staticData) {
                result = staticData.filter((i) => {
                    return i.toLowerCase().includes(query.toLowerCase())
                })
            } else if (fetchSuggestions) {
                result = await fetchSuggestions(query);
            }
            setSuggestions(result)
        } catch (error) {
            setError("Failed to fetch suggestions..")
            setSuggestions([])
        } finally {
            setLoading(false)
        }
    }


    const getSuggestionsDebounced = useCallback(
        debounce(getSuggestions, 300),
        []
    )


    useEffect(() => {
        if (inputValue.length > 1) {
            getSuggestionsDebounced(inputValue)
        } else {
            setSuggestions([])
        }
    }, [inputValue])


    const handleSuggestionClick = (suggestion) => {
        setInputValue(dataKey ? suggestion[dataKey] : dataKey)
        onSelect(suggestion)
        setSuggestions([])
    }

    return (
        <div className="container">
            <input type="text"
                style={customStyles}
                value={inputValue}
                onBlur={onBlur}
                onFocus={onFocus}
                placeholder={placeholder}
                onChange={handleInputChange}
            />

            {(suggestions.length > 0 || loading || error) && (
                <ul className="suggestions-list">
                    {error && <div className="error">{error}</div>}
                    {loading && <div className="loading">{customLoading}</div>}
                    <SuggestionList
                        dataKey={dataKey}
                        highlight={inputValue}
                        suggestions={suggestions}
                        onSuggestionClick={handleSuggestionClick}
                    />
                </ul>
            )}
        </div >
    )
}

export default AutoComplete