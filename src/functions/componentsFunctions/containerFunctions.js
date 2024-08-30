import { queriesInfo } from '../../magicStrings'
import { AGE_CATEGORIES, ESRB_AGE_RATINGS } from '../../utils/age_ratings'

const { searchWhereFunction, AGE_RATING_IMAGE } = queriesInfo

/**
 * @description
 * logosFetchedNumber -> they come from the state of the reducer (platformRawLogo) to simulate a cache-systemlike with the logos
 *
 * categoryUniqueList -> grabs every id_logo_platform from the fetched games in SearchBar.jsx without any id duplicated
 *
 * @param {Array.<Number>} logosFetchedNumber
 * @param {Array.<Number>} categoryUniqueList
 * @returns {[Array.<Number>,string]}
 */

export function searchLogos(logosFetchedNumber, categoryUniqueList) {
	const toFetch = categoryUniqueList.filter((number) => (logosFetchedNumber.includes(number) ? undefined : number))
	const searchParams = searchWhereFunction('*', toFetch.length, 'id', toFetch)

	const returnFullArray = toFetch.length > 0 ? toFetch.concat(logosFetchedNumber) : logosFetchedNumber
	const returnValidation = toFetch.length > 0 ? searchParams : undefined

	return [returnFullArray, returnValidation]
}

/**
 * @param {Array.<Object>} ageRating
 * @returns {string} Returns only ESRB ratings for now.
 */

export function searchPlatforms(ageRating) {
	const ERSB = ageRating?.find((element) => (element.category === 1 ? element : undefined))
	if (!ERSB) return AGE_RATING_IMAGE(AGE_CATEGORIES[1], ESRB_AGE_RATINGS[6])
	const ERSB_RATING = ERSB.rating
	return AGE_RATING_IMAGE(AGE_CATEGORIES[1], ESRB_AGE_RATINGS[ERSB_RATING])
}
