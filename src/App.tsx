import React, { useState } from "react"
import { render } from "react-dom"

import Content from "./Content"
import Search from "./Search"
import { Option } from "types/option"
import "css/main.scss"

function Main() {
  const [option, setOption] = useState<Option>({
    cardName: "",
    idolName: "",
    limited: "",
    type: "",
    showName: true,
    awaken: true,
  })

  return (
    <>
      <div id="header">CGSS SSR Checker</div>
      <Content option={option} />
      <Search option={option} setOption={setOption} />
    </>
  )
}

render(<Main />, document.getElementById("root"))
