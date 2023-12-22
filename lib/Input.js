import { uc } from "./helpers";

export function Input(props) {
  // update name for children
  const name = props.parent ? props.parent.name.replace(
    '[]', '[' + props.index + ']'
  ) + '[' + props.name + ']' : props.name

  // output
  return (
    'checkbox' == props.type ?
      <label className="checkbox">
        {uc(props.label)}
        <input name={name} type={props.type} value='1' />
      </label>
      :
      <input name={name} type={props.type} placeholder={uc(props.label)} />
  )
}