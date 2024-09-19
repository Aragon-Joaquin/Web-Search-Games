import { useEffect, useRef, useState } from 'react'
import { createClassError, ERROR_MESSAGE_TYPE, ERROR_NAME_TYPE } from '../utils/error_handle.js'

const { SEARCH_ERROR } = ERROR_NAME_TYPE
const { SEARCH_LESS_THAN, SEARCH_SAME_NAME } = ERROR_MESSAGE_TYPE

export default function useSearch() {
	const [updateSearch, setUpdateSearch] = useState('') //! could be a better way to do this
	const [validSearch, setValidSearch] = useState('')

	const prevValue = useRef('')
	const firstRender = useRef(true)

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}

		if (updateSearch.length < 3) return setValidSearch(createClassError(SEARCH_ERROR, SEARCH_LESS_THAN))

		if (prevValue.current === updateSearch) return setValidSearch(createClassError(SEARCH_ERROR, SEARCH_SAME_NAME))
		prevValue.current = updateSearch

		setValidSearch(updateSearch)
	}, [updateSearch])

	return { validSearch, setUpdateSearch }
}
