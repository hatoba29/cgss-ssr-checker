import React, { FormEvent, useState } from "react"
import { IoIosArrowUp } from "react-icons/io"
import { Option } from "types/option"
import "css/search.scss"

interface SearchProps {
  option: Option
  setOption: any
}

function Search(props: SearchProps) {
  let [isOpen, setOpen] = useState("")

  function showSearch() {
    if (isOpen == "" || isOpen == "close") {
      setOpen("open")
    } else {
      setOpen("close")
    }
  }

  function update(e: FormEvent<HTMLInputElement>) {
    const target = e.currentTarget
    props.setOption({ ...props.option, [target.id]: target.value })
  }

  return (
    <div id="search" className={isOpen}>
      <div id="opener" onClick={showSearch}>
        <IoIosArrowUp id="arrow" className={isOpen} size="24px" />
      </div>
      <div id="options">
        <div className="option-item">Type</div>
        <div className="option-item">Gacha</div>
        <div className="option-item">
          Card Name: <input id="cardName" onInput={update} />
        </div>
        <div className="option-item">
          Idol Name: <input id="idolName" onInput={update} />
        </div>
        <div className="option-item">
          Show Card Name&nbsp;
          <input id="showName" type="checkbox" onInput={update} />
        </div>
        <div className="option-item">
          Awaken <input id="awaken" type="checkbox" onInput={update} />
        </div>
      </div>
    </div>
  )
}

export default Search
