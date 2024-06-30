// import { CategoryEnum } from '../service/api/searchShowAction'
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
  ALL = 'all',
}
const getIconsPath = (type: CategoryEnum): string => {
  const mapper: Record<CategoryEnum, string> = {
    [CategoryEnum.MUSIC]: '/music.png',
    [CategoryEnum.DRAMATIC]: '/dramatic.png',
    [CategoryEnum.DANCE]: '/dance.png',
    [CategoryEnum.PARENTING]: '/parenting.png',
    [CategoryEnum.INDEPENDENT_MUSIC]: '/independent_music.png',
    [CategoryEnum.EXHIBITION]: '/exhibition.png',
    [CategoryEnum.TALK]: '/talk.png',
    [CategoryEnum.MOVIE]: '/movie.png',
    [CategoryEnum.CULTURE]: '/culture.png',
    [CategoryEnum.CAMP]: '/camp.png',
    [CategoryEnum.ELECTION]: '/election.png',
    [CategoryEnum.OTHER]: '/other.png',
    [CategoryEnum.CONCERT]: '/concert.png',
    [CategoryEnum.RESEARCH_CLASS]: '/research_class.png',
    [CategoryEnum.ALL]: '/dynamic.png',
  }

  return `icons` + mapper[type]
}
export default getIconsPath
