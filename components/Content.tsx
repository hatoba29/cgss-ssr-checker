import React, { SyntheticEvent, useEffect, useState } from "react"
import Image from "next/image"
import styled from "@emotion/styled"
import Data from "./data.json"
import { useOptionSelector } from "redux-store/store"

const Content = () => {
  const opt = useOptionSelector((state) => state)

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
  const toggleChecked = (e: SyntheticEvent) => {
    const id = e.currentTarget.id
    if (checklist[id]) {
      delete checklist[id]
      setChecklist({ ...checklist })
    } else {
      setChecklist({ ...checklist, [id]: true })
    }
  }

  // json 불러와서 Search 모듈에서 지정한 옵션에 따라 필터링하기
  const cardGenerator = () => {
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
      const checked = checklist[filtered[i].id] ? "checked" : ""
      const id = Number(filtered[i].id)
      cards.push(
        <Card
          id={filtered[i].id}
          className={checked}
          key={i}
          onClick={toggleChecked}
        >
          <Image width={55} height={55} src={`${IMG}${id}.png`} alt="" />
          <Image width={55} height={55} src={`${IMG}${id + 1}.png`} alt="" />
          <CardName className="card-name">
            [{filtered[i].card_name}] {filtered[i].name}
          </CardName>
        </Card>
      )
    }
    return cards
  }

  // display option
  const showName = opt.showName ? "" : "hide_name"
  const awaken = opt.awaken ? "awaken" : "normal"
  return (
    <Main>
      <Title>✅&nbsp;CGSS SSR Checker</Title>
      <CardContainer className={`${showName} ${awaken}`}>
        {cardGenerator()}
      </CardContainer>
      <footer>ⓒ 2021. hatoba29 All Rights Reserved.</footer>
    </Main>
  )
}

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 64px);
  padding-bottom: 12px;
  overflow: hidden scroll;
`

const Title = styled.header`
  height: 36px;
  margin: 12px 0;
  padding: 0 8px;

  display: flex;
  align-items: center;

  font-size: 20px;
  font-weight: 700;
`

const CardContainer = styled.section`
  margin: 0 8px;

  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));

  &.hide_name > article > .card-name {
    display: none;
  }

  & > article > span {
    display: none !important;
  }
  &.normal > article > span:nth-child(1) {
    display: block !important;
  }
  &.awaken > article > span:nth-child(2) {
    display: block !important;
  }
`

const Card = styled.article`
  max-width: 100%;
  border: 1px solid #ccc;
  padding: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 12px;
  font-weight: 300;

  cursor: pointer;
  user-select: none;

  transition: background-color 0.3s;

  @media (max-width: 640px) {
    font-size: 0.7rem;
  }

  &.checked {
    background-color: #c6e5f6;
  }
`

const CardName = styled.div`
  margin-top: 4px;
`

export default Content
