import React, { SyntheticEvent, useEffect, useState } from "react"
import Data from "./data.json"
import { Option } from "types/option"

interface ContentProps {
  option: Option
}

function Content(props: ContentProps) {
  // 이미 저장된 체크리스트가 있는지 확인
  const [isLoaded, setLoaded] = useState(false)
  const [checklist, setChecklist] = useState({})
  useEffect(() => {
    if (localStorage.getItem("checklist")) {
      let initialData = JSON.parse(localStorage.getItem("checklist"))
      setChecklist(initialData)
    }
    setLoaded(true)
  }, [])

  // 체크리스트 바뀔 때마다 localStorage 갱신하기
  useEffect(() => {
    localStorage.setItem("checklist", JSON.stringify(checklist))
  }, [checklist])

  // json 불러와서 Search 모듈에서 지정한 옵션에 따라 필터링하기
  function cardGenerator() {
    if (!isLoaded) return
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
    let cardHeight = {}
    if (!props.option.showName) {
      // 이름 없을 땐 높이 낮추기
      cardHeight = { height: "55px" }
    }
    for (let i = 0; i < filtered.length; i++) {
      let check = checklist[filtered[i].img]
      let awaken = props.option.awaken ? "right" : "left"
      // let src = require(`images/${filtered[i].img}.png`).default
      cards.push(
        <div
          id={filtered[i].img}
          className={`card ${check ? "checked" : ""}`}
          key={i}
          style={cardHeight}
          onClick={toggleChecked}
        >
          <div
            className="card-image"
            style={{
              backgroundImage: `url("${filtered[i].img}.png")`,
              backgroundPositionX: `${awaken}`,
            }}
          />
          <div hidden={!props.option.showName}>
            [{filtered[i].card_name}] {filtered[i].name}
          </div>
        </div>
      )
    }
    return cards
  }

  // 카드 클릭했을 때 상태 토글하기
  function toggleChecked(e: SyntheticEvent) {
    const id = e.currentTarget.id
    if (checklist[id]) {
      setChecklist({ ...checklist, [id]: false })
    } else {
      setChecklist({ ...checklist, [id]: true })
    }
  }

  return (
    <div id="content">
      <header>
        <span>✅ CGSS SSR Checker</span>
      </header>
      <div id="card-container">{cardGenerator()}</div>
      <footer>ⓒ 2021. hatoba29 All Rights Reserved.</footer>
    </div>
  )
}

export default Content
