export interface Card {
  name_jp: string
  name_en: string
  name_kr: string
  card_name: string
  limited: "none" | "monthly" | "blanc" | "noir"
  img: string
  type: "cu" | "co" | "pa"
}
