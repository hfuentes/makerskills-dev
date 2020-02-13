import { DecimalPipe } from '@angular/common'

export const minLevel = 0
export const maxLevel = 5
export const minExp = 0
export const maxExp = 30
export const levelLabels = ['Rookie', 'Trainee', 'Middle', 'Expert', 'Referente']

export const getLevelLabel = (level) => {
  if (0 <= level && level < 2) return levelLabels[0]
  if (2 <= level && level < 3) return levelLabels[1]
  if (3 <= level && level < 4) return levelLabels[2]
  if (4 <= level && level < 5) return levelLabels[3]
  if (5 <= level && level < 6) return levelLabels[4]
  return (new DecimalPipe('en_US')).transform(level)
}
