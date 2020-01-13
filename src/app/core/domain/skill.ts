export class Skill {
  habilidad: string
  experiencia: string
  nivel: string
  constructor() { }
}

export interface Exp {
  name: string
  value: string
}

export interface Level {
  name: string
  value: string
}

export class Skill2 {
  name: string
  exp: Exp
  level: Level
  constructor() {}
}
