import { useState } from "react"
import Content from "components/Content"
import Search from "components/Search"
import { Option } from "types/option"

function Main() {
  const [option, setOption] = useState<Option>({
    cardName: "",
    idolName: "",
    limited: { none: true, monthly: true, blanc: true, noir: true },
    type: { cute: true, cool: true, passion: true },
    showName: true,
    awaken: true,
  })

  return (
    <div id="root">
      <Content option={option} />
      <Search option={option} setOption={setOption} />
    </div>
  )
}

export default Main
