import React, { FormEvent, SyntheticEvent, useState } from "react"
import { IoIosArrowUp } from "react-icons/io"
import { Option } from "types/option"

interface SearchProps {
  option: Option
  setOption: React.Dispatch<React.SetStateAction<Option>>
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

  // update option
  function update(e: FormEvent<HTMLInputElement>) {
    const target = e.currentTarget

    if (target.className == "type" || target.className == "limited") {
      props.setOption({
        ...props.option,
        [target.className]: {
          ...props.option[target.className],
          [target.id]: target.checked,
        },
      })
    } else if (target.type == "checkbox") {
      props.setOption({ ...props.option, [target.id]: target.checked })
    } else {
      props.setOption({ ...props.option, [target.id]: target.value })
    }
  }

  // toggle checked status
  function toggleChecked(e: SyntheticEvent) {
    const target = e.currentTarget
    target.classList.toggle("checked")
  }

  return (
    <div id="search" className={isOpen}>
      <div id="opener" onClick={showSearch}>
        <IoIosArrowUp id="arrow" className={isOpen} size="24px" />
      </div>
      <div id="options">
        <div className="option-item">
          <div className="option-name">Type</div>
          <input
            type="checkbox"
            id="cute"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className="cute checked"
            htmlFor="cute"
            onClick={toggleChecked}
          >
            Cute
          </label>
          <input
            type="checkbox"
            id="cool"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className="cool checked"
            htmlFor="cool"
            onClick={toggleChecked}
          >
            Cool
          </label>
          <input
            type="checkbox"
            id="passion"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <label
            className="passion checked"
            htmlFor="passion"
            onClick={toggleChecked}
          >
            Passion
          </label>
        </div>
        <div className="option-item">
          <div className="option-name">Gacha</div>
          <input
            type="checkbox"
            id="none"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label className="checked" htmlFor="none" onClick={toggleChecked}>
            Normal
          </label>
          <input
            type="checkbox"
            id="monthly"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label className="checked" htmlFor="monthly" onClick={toggleChecked}>
            Monthly
          </label>
          <input
            type="checkbox"
            id="blanc"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label className="checked" htmlFor="blanc" onClick={toggleChecked}>
            Blanc Fes.
          </label>
          <input
            type="checkbox"
            id="noir"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <label className="checked" htmlFor="noir" onClick={toggleChecked}>
            Noir Fes.
          </label>
        </div>
        <div className="option-item">
          <div className="option-name">Card Name </div>
          <input type="text" id="cardName" onInput={update} />
        </div>
        <div className="option-item">
          <div className="option-name">Idol Name </div>
          <input type="text" id="idolName" onInput={update} />
        </div>
        <div className="option-item">
          <div className="option-name">Display Option</div>
          <input
            id="showName"
            type="checkbox"
            onInput={update}
            defaultChecked={props.option.showName}
          />
          <label className="checked" htmlFor="showName" onClick={toggleChecked}>
            Show Card Name
          </label>
          <input
            id="awaken"
            type="checkbox"
            onInput={update}
            defaultChecked={props.option.awaken}
          />
          <label className="checked" htmlFor="awaken" onClick={toggleChecked}>
            Awaken
          </label>
        </div>
      </div>
    </div>
  )
}

export default Search
