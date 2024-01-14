export enum Link {
  HOME = "/",
  MAP = "/map",
  TAXI = "/taxi",
  DRIVERS = "/drivers",
  PROFILE = "/profile",
  COURSES = "/courses",
}

export type NavigationElement = {
  name: string
  link: Link
}

export const navigationTabs: NavigationElement[] = [
  {
    name: "MAPA",
    link: Link.MAP,
  },
  {
    name: "TAKSÓWKI",
    link: Link.TAXI,
  },
  {
    name: "KIEROWCY",
    link: Link.DRIVERS,
  },
  {
    name: "KURSY",
    link: Link.COURSES,
  },
]
