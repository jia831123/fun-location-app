const searchShowAction = async function (
  category: CategoryEnum = CategoryEnum.EXHIBITION
): Promise<Response> {
  const host =
    'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ'
  return fetch(`${host}&category=${category}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching data:', error))
}

enum CategoryEnum {
  MUSIC = 1,
  DRAMATIC = 2,
  DANCE = 3,
  PARENTING = 4,
  INDEPENDENT_MUSIC = 5,
  EXHIBITION = 6,
  TALK = 7,
  MOVIE = 8,
  CULTURE = 11,
  CAMP = 13,
  ELECTION = 14,
  OTHER = 15,
  CONCERT = 17,
  RESEARCH_CLASS = 19,
}

interface Request {
  method: string
  category: CategoryEnum
}
export interface Data {
  version: string
  UID: string
  title: string
  category: string
  showInfo: ShowInfo[]
  showUnit: string
  discountInfo: string
  descriptionFilterHtml: string
  imageUrl: string
  masterUnit: string[]
  subUnit: string[]
  supportUnit: string[]
  otherUnit: string[]
  webSales: string
  sourceWebPromote: string
  comment: string
  editModifyDate: string
  sourceWebName: string
  startDate: string
  endDate: string
  hitRate: number
}

export interface ShowInfo {
  time: string
  location: string
  locationName: string
  onSales: string
  price: string
  latitude?: string
  longitude?: string
  endTime: string
}
export type Response = Data[]
export default searchShowAction
