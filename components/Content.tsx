import React, { SyntheticEvent, useEffect, useState } from "react"
import Image from "next/image"
import Data from "./data.json"
import { Option } from "types/option"
import styles from "css/content.module.scss"

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

  // 카드 클릭했을 때 상태 토글하기
  function toggleChecked(e: SyntheticEvent) {
    const id = e.currentTarget.id
    if (checklist[id]) {
      delete checklist[id]
      setChecklist({ ...checklist })
    } else {
      setChecklist({ ...checklist, [id]: true })
    }
  }

  // json 불러와서 Search 모듈에서 지정한 옵션에 따라 필터링하기
  function cardGenerator() {
    if (!isLoaded) return
    let cards = []
    let filtered = Data.filter((v, i) => {
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

    // 이름 없을 땐 높이 낮추기
    let cardHeight = {}
    if (!props.option.showName) {
      cardHeight = { height: "55px" }
    }

    // 필터링된 카드들만 삽입하기
    const IMG = "https://hidamarirhodonite.kirara.ca/icon_card/"
    for (let i = 0; i < filtered.length; i++) {
      let check = checklist[filtered[i].id]
      let img_src = Number(filtered[i].id) + Number(props.option.awaken)
      cards.push(
        <div
          id={filtered[i].id}
          className={`${styles.card} ${check ? styles.checked : ""}`}
          key={i}
          style={cardHeight}
          onClick={toggleChecked}
        >
          <div className={styles.card_image}>
            <Image
              src={`${IMG + img_src}.png`}
              width={55}
              height={55}
              priority
              alt=""
            />
          </div>
          <div hidden={!props.option.showName}>
            [{filtered[i].card_name}] {filtered[i].name}
          </div>
        </div>
      )
    }
    return cards
  }

  return (
    <div id={styles.content}>
      <header>
        <span>✅ CGSS SSR Checker</span>
      </header>
      <div id={styles.card_container}>{cardGenerator()}</div>
      <footer>ⓒ 2021. hatoba29 All Rights Reserved.</footer>
    </div>
  )
}

export default Content
