export enum Link {
  HOME = "/",
  MAP = "/map",
  TAXI = "/taxi",
  DRIVERS = "/drivers",
  PROFILE = "/profile",
}

export type NavigationElement = {
  name: string
  link: Link
}

export const navigationTabs: NavigationElement[] = [
  {
    name: "Mapa",
    link: Link.MAP,
  },
  {
    name: "Taksówki",
    link: Link.TAXI,
  },
  {
    name: "Kierowcy",
    link: Link.DRIVERS,
  },
]
