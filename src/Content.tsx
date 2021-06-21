import React from "react"
import Data from "./data.json"
import { Option } from "types/option"
import Image from "url:./images/uzuki1.png"
import "css/content.scss"

interface ContentProps {
  option: Option
}

function Content(props: ContentProps) {
  // json 불러와서 Search 모듈에서 지정한 옵션에 따라 필터링하기
  function cardGenerator() {
    let cards = []
    let filtered = Data
    filtered = Data.filter((v) => {
      let hit = true
      // type
      if (!props.option.type[v.type]) {
        hit = false
      }
      // gacha type
      if (!props.option.limited[v.limited]) {
        hit = false
      }
      // idol name
      if (props.option.idolName) {
        let local_hit = false
        local_hit =
          local_hit ||
          v.name_kr.includes(props.option.idolName) ||
          v.name_en.includes(props.option.idolName) ||
          v.name_jp.includes(props.option.idolName)
        hit = hit && local_hit
      }
      // card name
      if (props.option.cardName) {
        hit = hit && v.card_name.toLowerCase().includes(props.option.cardName)
      }
      return hit
    })

    // 필터링된 카드들만 삽입하기
    let style = {}
    if (!props.option.showName) {
      // 이름 없을 땐 높이 낮추기
      style = { height: "55px" }
    }
    for (let i = 0; i < filtered.length; i++) {
      cards.push(
        <div className="card" key={i} style={style}>
          <img src={Image} />
          <div hidden={!props.option.showName}>
            [{filtered[i].card_name}] {filtered[i].name_jp}
          </div>
        </div>
      )
    }
    return cards
  }

  return (
    <div id="content">
      <div id="card-container">{cardGenerator()}</div>
      <div id="footer">ⓒ 2021. hatoba29 All Rights Reserved.</div>
    </div>
  )
}

export default Content
