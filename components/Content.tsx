import React, { SyntheticEvent, useEffect, useState } from "react"
import Image from "next/image"
import Data from "./data.json"
import styles from "css/content.module.scss"
import { useAppSelector } from "./redux/configureStore"

function Content() {
  const opt = useAppSelector((state) => state)

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
      if (!opt.type[v.type]) {
        hit = false
      }
      // gacha type
      if (!opt.limited[v.limited]) {
        hit = false
      }
      // idol name
      if (opt.idolName) {
        let local_hit = false
        local_hit =
          local_hit ||
          v.name_kr.includes(opt.idolName) ||
          v.name_en.includes(opt.idolName) ||
          v.name_jp.includes(opt.idolName)
        hit = hit && local_hit
      }
      // card name
      if (opt.cardName) {
        hit = hit && v.card_name.toLowerCase().includes(opt.cardName)
      }
      return hit
    })

    // 필터링된 카드들만 삽입하기
    const IMG = "https://hidamarirhodonite.kirara.ca/icon_card/"
    for (let i = 0; i < filtered.length; i++) {
      const checked = checklist[filtered[i].id] ? styles.checked : ""
      const id = Number(filtered[i].id)
      cards.push(
        <div
          id={filtered[i].id}
          className={`${styles.card} ${checked}`}
          key={i}
          onClick={toggleChecked}
        >
          <Image width={55} height={55} src={`${IMG}${id}.png`} alt="" />
          <Image width={55} height={55} src={`${IMG}${id + 1}.png`} alt="" />
          <div className={styles.card_name}>
            [{filtered[i].card_name}] {filtered[i].name}
          </div>
        </div>
      )
    }
    return cards
  }

  // display option
  const showName = opt.showName ? "" : styles.hide_name
  const awaken = opt.awaken ? styles.awaken : styles.normal
  return (
    <div id={styles.content}>
      <header>
        <span>✅&nbsp;</span>CGSS SSR Checker
      </header>
      <div id={styles.card_container} className={`${showName} ${awaken}`}>
        {cardGenerator()}
      </div>
      <footer>ⓒ 2021. hatoba29 All Rights Reserved.</footer>
    </div>
  )
}

export default Content
