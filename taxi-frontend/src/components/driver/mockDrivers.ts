export type Driver = {
  firstName: string
  lastName: string
  dateOfBirth: Date
  gender: Gender
}
export enum Gender {
  MALE = "Mężczyzna",
  FEMALE = "Kobieta",
}

export const mockDrivers: Driver[] = [
  {
    firstName: "Karol",
    lastName: "Karolewicz",
    dateOfBirth: new Date("1988-04-03"),
    gender: Gender.MALE,
  },
  {
    firstName: "Jacek",
    lastName: "Jaculewicz",
    dateOfBirth: new Date("1989-05-03"),
    gender: Gender.MALE,
  },
  {
    firstName: "Marian",
    lastName: "Marianski",
    dateOfBirth: new Date("1989-05-11"),
    gender: Gender.MALE,
  },
  {
    firstName: "Ela",
    lastName: "Elżbietowa",
    dateOfBirth: new Date("2003-12-14"),
    gender: Gender.FEMALE,
  },
  {
    firstName: "Karol",
    lastName: "Karolewicz",
    dateOfBirth: new Date("1988-04-03"),
    gender: Gender.MALE,
  },
]
