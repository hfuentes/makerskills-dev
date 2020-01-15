export interface Exp {
  name: string
  value: string
}

export interface Level {
  name: string
  value: string
}

export class Skill {
  name: string
  exp: Exp
  level: Level
  constructor() {}
}
