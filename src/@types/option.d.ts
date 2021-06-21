export interface Option {
  cardName: string
  idolName: string
  limited: { none: boolean; monthly: boolean; blanc: boolean; noir: boolean }
  type: { cute: boolean; cool: boolean; passion: boolean }
  showName: boolean
  awaken: boolean
}
