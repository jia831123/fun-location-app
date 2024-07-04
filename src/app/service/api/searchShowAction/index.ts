const searchShowAction = async function (
  category: CategoryEnum = CategoryEnum.ALL
): Promise<Response> {
  const host =
    'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ'
  return fetch(`${host}&category=${category}`)
    .then((response) => response.json() as Promise<Response>)
    .then((res) => {
      const r = res.filter((item) => {
        return (
          item.showInfo[0] &&
          item.showInfo[0].latitude !== null &&
          item.showInfo[0].longitude !== null &&
          item.showInfo[0].latitude !== '0' &&
          item.showInfo[0].longitude !== '0'
        )
      })
      return r
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
      return []
    })
}

export enum CategoryEnum {
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
  ALL = 'all',
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
