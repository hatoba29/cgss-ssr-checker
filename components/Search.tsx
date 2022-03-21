import React, { FormEvent, SyntheticEvent, useState } from "react"
import { IoIosArrowUp } from "react-icons/io"
import styled from "@emotion/styled"
import { useOptionDispatch } from "redux-store/store"
import { setLimited, setTextBool, setType } from "redux-store/slice"

const Search = () => {
  // toggle search overlay
  let [isOpen, setOpen] = useState("")
  const showSearch = () => {
    if (isOpen == "" || isOpen == "close") {
      setOpen("open")
    } else {
      setOpen("close")
    }
  }

  // update option
  const dispatch = useOptionDispatch()
  const update = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget

    if (target.type == "text") {
      dispatch(setTextBool([target.id, target.value]))
    } else if (target.className == "type") {
      dispatch(setType([target.id, target.checked]))
    } else if (target.className == "limited") {
      dispatch(setLimited([target.id, target.checked]))
    } else {
      dispatch(setTextBool([target.id, target.checked]))
    }
  }

  // toggle checked status
  const toggleChecked = (e: SyntheticEvent) => {
    const target = e.currentTarget
    target.classList.toggle("checked")
  }

  return (
    <Section className={isOpen}>
      <Opener onClick={showSearch}>
        <IoIosArrowUp id="arrow" className={isOpen} size="24px" />
      </Opener>

      <Options>
        <OptionItem>
          <OptionName>Type</OptionName>
          <Checkbox
            id="cute"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <OptionLabel
            className="cute checked"
            htmlFor="cute"
            onClick={toggleChecked}
          >
            Cute
          </OptionLabel>
          <Checkbox
            id="cool"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <OptionLabel
            className="cool checked"
            htmlFor="cool"
            onClick={toggleChecked}
          >
            Cool
          </OptionLabel>
          <Checkbox
            id="passion"
            className="type"
            defaultChecked={true}
            onInput={update}
          />
          <OptionLabel
            className="passion checked"
            htmlFor="passion"
            onClick={toggleChecked}
          >
            Passion
          </OptionLabel>
        </OptionItem>

        <OptionItem>
          <OptionName>Gacha</OptionName>
          <Checkbox
            id="none"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <OptionLabel
            className="checked"
            htmlFor="none"
            onClick={toggleChecked}
          >
            Normal
          </OptionLabel>
          <Checkbox
            id="monthly"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <OptionLabel
            className="checked"
            htmlFor="monthly"
            onClick={toggleChecked}
          >
            Monthly
          </OptionLabel>
          <Checkbox
            id="blanc"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <OptionLabel
            className="checked"
            htmlFor="blanc"
            onClick={toggleChecked}
          >
            Blanc Fes.
          </OptionLabel>
          <Checkbox
            id="noir"
            className="limited"
            defaultChecked={true}
            onInput={update}
          />
          <OptionLabel
            className="checked"
            htmlFor="noir"
            onClick={toggleChecked}
          >
            Noir Fes.
          </OptionLabel>
        </OptionItem>

        <OptionItem>
          <OptionName>Card Name </OptionName>
          <Input id="cardName" onInput={update} />
        </OptionItem>

        <OptionItem>
          <OptionName>Idol Name </OptionName>
          <Input id="idolName" onInput={update} />
        </OptionItem>

        <OptionItem>
          <OptionName>Display Option</OptionName>
          <Checkbox id="showName" onInput={update} defaultChecked />
          <OptionLabel
            className="checked"
            htmlFor="showName"
            onClick={toggleChecked}
          >
            Show Card Name
          </OptionLabel>
          <Checkbox id="awaken" onInput={update} defaultChecked />
          <OptionLabel
            className="checked"
            htmlFor="awaken"
            onClick={toggleChecked}
          >
            Awaken
          </OptionLabel>
        </OptionItem>
      </Options>
    </Section>
  )
}

const Section = styled.section`
  position: fixed;
  bottom: -340px;
  width: 100%;
  background-color: white;

  &.open {
    animation: open 0.7s ease-out forwards;
  }
  &.close {
    animation: close 0.7s ease-out forwards;
  }

  @keyframes open {
    0% {
      bottom: -340px;
    }
    100% {
      bottom: 0;
    }
  }
  @keyframes close {
    0% {
      bottom: 0;
    }
    100% {
      bottom: -340px;
    }
  }
`

const Opener = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  background-color: white;
  box-shadow: 0 -5px 10px -5px black;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  #arrow.open {
    animation: arrowOpen 0.3s ease-out forwards;
  }
  #arrow.close {
    animation: arrowClose 0.3s ease-out forwards;
  }

  @keyframes arrowOpen {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  @keyframes arrowClose {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0);
    }
  }
`

const Options = styled.ul`
  height: 340px;
  margin: 0 8px;
`

const OptionItem = styled.li`
  margin-bottom: 12px;
`

const OptionName = styled.h1`
  margin: unset;
  margin-left: 8px;
  margin-bottom: 10px;

  font-size: 16px;
  font-weight: bold;
`

const OptionLabel = styled.label`
  @media (min-width: 640px) {
    font-size: 16px;
  }

  margin: 0 6px;
  border-radius: 16px;
  padding: 4px 12px;
  background-color: #c8c8c8;

  cursor: pointer;
  user-select: none;

  color: white;
  font-size: 0.8rem;
  line-height: 1.4rem;

  &.checked {
    &.cute {
      background-color: #f6006e;
    }
    &.cool {
      background-color: #036bfb;
    }
    &.passion {
      background-color: #fbb127;
    }

    background-color: #528bff;
  }
`

const Input = styled.input`
  width: 200px;
  margin-left: 8px;
  border: 1px grey solid;
  border-radius: 6px;
`
Input.defaultProps = { type: "text" }

const Checkbox = styled.input`
  display: none;
`
Checkbox.defaultProps = { type: "checkbox" }

export default Search
